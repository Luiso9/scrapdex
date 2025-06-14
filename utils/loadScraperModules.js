import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function loadScraperModules() {
    const scrapersDir = path.join(__dirname, '../scrapers')
    const scraperMap = {}

    const categories = await fs.readdir(scrapersDir, { withFileTypes: true })

    for (const dirent of categories) {
        if (dirent.isDirectory()) {
            const availableRoute = dirent.name
            const modulePath = path.join(scrapersDir, availableRoute, 'index.js')

            try {
                const moduleUrl = pathToFileURL(modulePath).href
                const scraper = await import(moduleUrl)

                /**
                 * @typedef {Object} ScraperModule
                 * @property {function} getPopular
                 */
                scraperMap[availableRoute] =
                    scraper.default ||
                    scraper.getPopular ||
                    scraper[Object.keys(scraper)[0]]
            } catch (err) {
                console.warn(`Failed to load route '${availableRoute}':`, err.message)
            }
        }
    }

    return scraperMap
}
