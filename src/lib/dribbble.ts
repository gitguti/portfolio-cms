import type { CraftProject } from '@src/components/features/craft/craft-data';

interface DribbbleImage {
  hidpi?: string;
  normal: string;
  one_x?: string;
  teaser: string;
}

interface DribbbleVideo {
  id: number;
  duration: number;
  video_file_name: string;
  video_file_size: number;
  width: number;
  height: number;
  url: string;
}

interface DribbbleShot {
  id: number;
  title: string;
  description: string | null;
  html_url: string;
  animated: boolean;
  tags: string[];
  images: DribbbleImage;
  video?: DribbbleVideo;
  published_at: string;
  updated_at: string;
  width: number;
  height: number;
}

/** Dribbble shot IDs to exclude from the grid */
const excludedDribbbleIds: number[] = [
  21473952, 21921124, 21553546, 21436395, 21415738, 21426317, 21595854, 21867465, 21867509,
  22048053, 22047950, 21531345, 21920960, 21921365, 21867581, 21867419, 21404871,
];

/** Dribbble shot IDs to mark as featured (shown first) */
const featuredDribbbleIds: number[] = [];

const SIZE_CYCLE: Array<CraftProject['size']> = [
  'small',
  'medium',
  'small',
  'large',
  'small',
  'medium',
];

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Fallback: Raspa la página HTML para encontrar URLs de CDN de Dribbble
 * cuando el API no devuelve video/attachments. Útil para archivos subidos
 * que aún no han sido procesados por el API de Dribbble.
 */
async function findCdnAssetsFromPage(htmlUrl: string, shotId: number): Promise<string | null> {
  try {
    const res = await fetch(htmlUrl);
    if (!res.ok) return null;
    const html = await res.text();

    // Buscar URLs de CDN: https://cdn.dribbble.com/userupload/.../*.mov, *.mp4, etc.
    const patterns = [
      /https:\/\/cdn\.dribbble\.com\/userupload\/[\/\w-]+\.(?:mov|mp4|webm|gif)\b/gi,
      /https:\/\/cdn\.dribbble\.com\/userupload\/[^\s"'<>]+/gi,
    ];

    const matches = new Set<string>();
    for (const pattern of patterns) {
      const found = html.match(pattern);
      if (found) {
        found.forEach(url => {
          // Limpiar y desescapear si es necesario
          const cleaned = url.replace(/\\u0026/g, '&').split(/[\s"'<>]/)[0];
          if (cleaned.startsWith('https://cdn.dribbble.com/')) {
            matches.add(cleaned);
          }
        });
      }
    }

    // Retornar la primera URL encontrada (preferencia: .mov, .mp4, .webm)
    const array = Array.from(matches);
    if (array.length === 0) return null;

    const priorityOrder = ['.mov', '.mp4', '.webm'];
    for (const ext of priorityOrder) {
      const found = array.find(u => u.includes(ext));
      if (found) {
        console.log(`[Dribbble][Scrape] Shot ${shotId}: encontrado ${ext} en página`);
        return found;
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `[Dribbble][Scrape] Shot ${shotId}: encontrado(s) ${array.length} asset(s):`,
        array.slice(0, 3),
      );
    }
    return array[0] || null;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `[Dribbble][Scrape] Error raspando ${shotId}:`,
        error instanceof Error ? error.message : error,
      );
    }
    return null;
  }
}

/**
 * Enriquece el shot con información de video/assets desde scraping
 * solo si el API no los devolvió.
 */
async function enrichShotWithFallback(shot: DribbbleShot): Promise<DribbbleShot> {
  // Si ya tiene video en el API, devolver tal cual
  if (shot.video) return shot;

  // Si video es null y no hay attachments, intentar raspar
  if (!shot.video) {
    const cdnUrl = await findCdnAssetsFromPage(shot.html_url, shot.id);
    if (cdnUrl) {
      // Inferir tipo de video por extensión
      const isVideo = /\.(mov|mp4|webm|avi|mkv|flv)$/i.test(cdnUrl);
      const isGif = /\.gif$/i.test(cdnUrl);

      if (isVideo || isGif) {
        return {
          ...shot,
          video: isVideo
            ? {
                id: shot.id,
                duration: 0, // Desconocido desde scrape
                video_file_name: cdnUrl.split('/').pop() || 'video',
                video_file_size: 0, // Desconocido desde scrape
                width: shot.width,
                height: shot.height,
                url: cdnUrl,
              }
            : undefined,
          // Marcar como gif si aplica
        };
      }
    }
  }

  return shot;
}

function mapShotToProject(shot: DribbbleShot, index: number): CraftProject {
  let medium: CraftProject['medium'] = 'image';
  let src = shot.images.hidpi || shot.images.normal;

  if (shot.video) {
    medium = 'video';
    src = shot.video.url;
  } else if (shot.animated) {
    medium = 'gif';
  }

  return {
    id: `dribbble-${shot.id}`,
    title: shot.title,
    description: shot.description ? stripHtml(shot.description) : '',
    medium,
    src,
    ...(shot.video ? { poster: shot.images.hidpi || shot.images.normal } : {}),
    tags: shot.tags.length > 0 ? shot.tags : ['design'],
    link: shot.html_url,
    date: shot.published_at,
    size: SIZE_CYCLE[index % SIZE_CYCLE.length],
    aspectRatio: '4/3',
    source: 'dribbble',
    featured: featuredDribbbleIds.includes(shot.id),
  };
}

export async function fetchDribbbleShots(): Promise<CraftProject[]> {
  const token = process.env.NEXT_PUBLIC_DRIBBBLE_ACCESS_TOKEN;
  if (!token) {
    console.warn('[Dribbble] No access token found, skipping Dribbble fetch');
    return [];
  }

  try {
    const res = await fetch('https://api.dribbble.com/v2/user/shots?per_page=100', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.warn(`[Dribbble] API returned ${res.status}: ${res.statusText}`);
      return [];
    }

    const shots: DribbbleShot[] = await res.json();

    if (process.env.NODE_ENV !== 'production') {
      console.log('[Dribbble] Available shots:');
      shots.forEach(s =>
        console.log(
          `  ID: ${s.id} — "${s.title}" ${s.animated ? '(animated)' : ''}${
            s.video ? '(video)' : ''
          }`,
        ),
      );
    }

    // Enriquecer shots que no tengan video: raspar la página si es necesario
    const enrichedShots = await Promise.all(shots.map(shot => enrichShotWithFallback(shot)));

    return enrichedShots
      .filter(shot => !excludedDribbbleIds.includes(shot.id))
      .map(mapShotToProject);
  } catch (error) {
    console.warn('[Dribbble] Failed to fetch shots:', error);
    return [];
  }
}
