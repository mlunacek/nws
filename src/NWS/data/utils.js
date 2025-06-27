import { DateTime } from 'luxon';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchWithRetry(url, n) {
    let res = await fetch(url).catch(async function (e) {
        throw e;
    });

    if (res.ok) {
        return res;
    } else if (n > 1) {
        await sleep(500);
        return fetchWithRetry(url, n - 1);
    }
}

async function fetchWithHourRetry(url, hours, n) {
    const now = DateTime.local().minus({ hours }).toFormat('yyyy-MM-dd_HH:00:00');
    const hour_url = `${url}_${now}.json`;

    let res = await fetch(hour_url).catch(async function (e) {
        throw e;
    });

    if (res.ok) {
        return res;
    } else if (n > 1) {
        await sleep(50);
        return fetchWithHourRetry(url, hours + 1, n - 1);
    }
}

export { fetchWithRetry, fetchWithHourRetry };
