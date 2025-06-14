import { scraperMap } from '../utils/scraperMap.js'

export const handleScrape = async (req, res) => {
    const category = req.params.category
    const type = req.query.type

    const categoryMap = scraperMap[category]
    if (!categoryMap) {
        return res.status(404).json({ error: 'Invalid category route' })
    }

    const defaultType = categoryMap._default
    const scrapeFn = categoryMap[type] || categoryMap[defaultType]
    if (!scrapeFn) {
        return res.status(400).json({ error: 'Invalid or missing type parameter' })
    }

    try {
        const result = await scrapeFn()
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.toString() })
    }
}

export default handleScrape
