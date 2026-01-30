#!/usr/bin/env node
// Script to refresh/update a Dribbble shot via PUT to force API reprocessing
// Usage:
//   export NEXT_PUBLIC_DRIBBBLE_ACCESS_TOKEN="<TOKEN>"
//   node scripts/dribbble-refresh.mjs [SHOT_ID]

const token = process.env.NEXT_PUBLIC_DRIBBBLE_ACCESS_TOKEN || process.env.DRIBBBLE_TOKEN;
if (!token) {
  console.error('[dribbble-refresh] No token found in NEXT_PUBLIC_DRIBBBLE_ACCESS_TOKEN or DRIBBBLE_TOKEN');
  console.error('[dribbble-refresh] Export a token and re-run:');
  console.error('  export NEXT_PUBLIC_DRIBBBLE_ACCESS_TOKEN="<TOKEN>"');
  process.exit(2);
}

const id = parseInt(process.argv[2] || '22047950', 10);
const base = 'https://api.dribbble.com/v2';
const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

async function fetchJson(url, options = {}) {
  const res = await fetch(url, { headers, ...options });
  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch (e) { body = text; }
  return { ok: res.ok, status: res.status, statusText: res.statusText, body };
}

(async () => {
  try {
    // 1. Fetch current shot
    console.log(`[dribbble-refresh] Fetching current shot ${id}...`);
    const getRes = await fetchJson(`${base}/shots/${id}`);
    if (!getRes.ok) {
      console.error('[dribbble-refresh] Failed to get shot:', getRes.status, getRes.statusText);
      process.exit(1);
    }

    const shot = getRes.body;
    console.log(`[dribbble-refresh] Current shot data:
  title: "${shot.title}"
  tags: [${shot.tags.join(', ')}]
  video: ${shot.video ? 'YES' : 'NO'}
  animated: ${shot.animated}`);

    // 2. Try a minimal PUT update (just resubmit the same tags)
    // This should trigger Dribbble's backend to reprocess/refresh
    console.log(`\n[dribbble-refresh] Attempting PUT to refresh shot ${id}...`);
    const putRes = await fetchJson(`${base}/shots/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        tags: shot.tags, // Resubmit same tags to trigger refresh
      }),
    });

    if (putRes.ok) {
      console.log('[dribbble-refresh] ✓ PUT successful (status 200)');
      console.log('[dribbble-refresh] Waiting 2 seconds before checking...');
      await new Promise(r => setTimeout(r, 2000));

      // 3. Fetch shot again to see if video appeared
      console.log(`\n[dribbble-refresh] Re-fetching shot ${id}...`);
      const getRes2 = await fetchJson(`${base}/shots/${id}`);
      if (getRes2.ok) {
        const shot2 = getRes2.body;
        console.log(`[dribbble-refresh] Updated shot data:
  title: "${shot2.title}"
  tags: [${shot2.tags.join(', ')}]
  video: ${shot2.video ? '✓ YES' : 'NO'}
  animated: ${shot2.animated}`);

        if (shot2.video && !shot.video) {
          console.log('\n[dribbble-refresh] ✓✓✓ SUCCESS! Video now appears in API!');
          console.log('Video URL:', shot2.video.url);
        } else if (shot2.video) {
          console.log('\n[dribbble-refresh] Video was already there.');
        } else {
          console.log('\n[dribbble-refresh] Video still not present. May not have one.');
        }
      } else {
        console.error('[dribbble-refresh] Failed to re-fetch:', getRes2.status);
      }
    } else {
      console.warn('[dribbble-refresh] PUT failed:', putRes.status, putRes.statusText);
      console.log('Response:', putRes.body);
    }
  } catch (err) {
    console.error('[dribbble-refresh] Error:', err);
    process.exit(1);
  }
})();
