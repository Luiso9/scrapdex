import { agentNewPage, agentClose } from '../../utils/browser.js';

export async function getPopularMostFollow() {
    const popularPage = await agentNewPage();
    await popularPage.goto("https://mangadex.org/titles?page=1&translatedLang=en&onlyAvailableChapters=false&order=followedCount.desc", {waitUntil: 'load'});

    await popularPage.waitForSelector('.manga-card');
    const title = await popularPage.$$eval('.manga-card .title span', els =>
        els.map(el => el.textContent.trim())
    );

    await agentClose();
    return title;
}

export async function getPopularByRating() {
    const popularPage = await agentNewPage();
    await popularPage.goto("https://mangadex.org/titles?page=1&translatedLang=en&onlyAvailableChapters=false&order=rating.desc", {waitUntil: 'load'});

    await popularPage.waitForSelector('.manga-card');
    const title = await popularPage.$$eval('.manga-card .title span', els =>
        els.map(el => el.textContent.trim())
    );

    await agentClose();
    return title;
}
