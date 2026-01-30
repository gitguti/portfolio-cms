#!/usr/bin/env node
// Simple script to test Dribbble shot fetching with scraping fallback.
// Usage:
//   export NEXT_PUBLIC_DRIBBBLE_ACCESS_TOKEN="<TOKEN>"
//   node scripts/dribbble-fetch.mjs [SHOT_ID]

const token = process.env.NEXT_PUBLIC_DRIBBBLE_ACCESS_TOKEN || process.env.DRIBBBLE_TOKEN;
if (!token) {
  console.error('[dribbble-fetch] No token found in NEXT_PUBLIC_DRIBBBLE_ACCESS_TOKEN or DRIBBBLE_TOKEN');
  console.error('[dribbble-fetch] Export a token and re-run:');
  console.error('  export NEXT_PUBLIC_DRIBBBLE_ACCESS_TOKEN="<TOKEN>"');
  process.exit(2);
}

const id = parseInt(process.argv[2] || '22047950', 10);
const base = 'https://api.dribbble.com/v2';
const headers = { Authorization: `Bearer ${token}` };

/**
 * Fallback: Raspa la página HTML para encontrar URLs de CDN
 */
async function findCdnAssetsFromPage(htmlUrl, shotId) {
  try {
    const res = await fetch(htmlUrl);
    if (!res.ok) return null;
    const html = await res.text();

    const patterns = [
      /https:\/\/cdn\.dribbble\.com\/userupload\/[\/\w-]+\.(?:mov|mp4|webm|gif)\b/gi,
      /https:\/\/cdn\.dribbble\.com\/userupload\/[^\s"'<>]+/gi,
    ];

    const matches = new Set();
    for (const pattern of patterns) {
      const found = html.match(pattern);
      if (found) {
        found.forEach(url => {
          const cleaned = url.replace(/\\u0026/g, '&').split(/[\s"'<>]/)[0];
          if (cleaned.startsWith('https://cdn.dribbble.com/')) {
            matches.add(cleaned);
          }
        });
      }
    }

    const array = Array.from(matches);
    if (array.length === 0) return null;

    const priorityOrder = ['.mov', '.mp4', '.webm'];
    for (const ext of priorityOrder) {
      const found = array.find(u => u.includes(ext));
      if (found) {
        console.log(`[dribbble-fetch] Shot ${shotId}: found ${ext} in page`);
        return found;
      }
    }

    console.log(`[dribbble-fetch] Shot ${shotId}: found ${array.length} asset(s), using first:`, array[0]);
    return array[0] || null;
  } catch (error) {
    console.warn(`[dribbble-fetch] Error scraping ${shotId}:`, error.message);
    return null;
  }
}

async function fetchJson(url) {
  const res = await fetch(url, { headers });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch (e) { body = text; }
  return { ok: res.ok, status: res.status, statusText: res.statusText, body };
}

(async () => {
  try {
    console.log(`[dribbble-fetch] Fetching shot ${id}...`);
    const shotRes = await fetchJson(`${base}/shots/${id}`);
    if (shotRes.ok) {
      const shot = shotRes.body;
      console.log('[dribbble-fetch] /shots/{id} result:');
      console.dir(shot, { depth: null });

      // Fallback: si no hay video, raspar la página
      if (!shot.video) {
        console.log(`[dribbble-fetch] No video in API response, attempting scrape fallback...`);
        const cdnUrl = await findCdnAssetsFromPage(shot.html_url, shot.id);
        if (cdnUrl) {
          console.log('\n[dribbble-fetch] ✓ Scrape successful! Found CDN URL:');
          console.log(cdnUrl);
          console.log('\n[dribbble-fetch] Shot enriched with video URL.');
        } else {
          console.log(`[dribbble-fetch] No video URL found in scrape (may not have video).`);
        }
      } else {
        console.log('[dribbble-fetch] ✓ Video found in API response');
      }
    } else {
      console.warn('[dribbble-fetch] shot fetch failed', shotRes.status, shotRes.statusText);
      console.dir(shotRes.body, { depth: null });
    }

    console.log(`\n[dribbble-fetch] Fetching attachments for shot ${id}...`);
    const attRes = await fetchJson(`${base}/shots/${id}/attachments`);
    if (attRes.ok) {
      console.log('[dribbble-fetch] /shots/{id}/attachments result:');
      console.dir(attRes.body, { depth: null });
    } else {
      console.log('[dribbble-fetch] attachments endpoint not available (404 is expected)');
    }
  } catch (err) {
    console.error('[dribbble-fetch] Error:', err);
    process.exit(1);
  }
})();
