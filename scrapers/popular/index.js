import {agentNewPage, agentClose} from '../../utils/browser.js'

export const getPopular = async (page = 1, order = `followedCount.desc`) => {
    const popularPage = await agentNewPage()
    await popularPage.goto(`https://mangadex.org/titles?page=${page}&translatedLang=en&onlyAvailableChapters=false&order=${order}`, {waitUntil: 'load'})

    await popularPage.waitForSelector('.manga-card')
    const title = await popularPage.$$eval('.manga-card .title span', els =>
        els.map(el => el.textContent.trim())
    )
    await agentClose()
    return title
}