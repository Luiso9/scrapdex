// import { scraperMap } from '../utils/scraperMap.js'
import {PARAMS} from '../config/params.js'
import {loadScraperModules} from '../utils/loadScraperModules.js'

let scraperMap = {}

export const handleScrape = async (req, res) => {
    // lazy load
    if (Object.keys(scraperMap).length === 0) {
        scraperMap = await loadScraperModules()
    }

    const category = req.params.category
    const page = parseInt(req.query.page) || 1
    const order = parseInt(req.query.order) || 'followedCount.desc'

    const availableParams = {
        category: Object.keys(scraperMap),
        order: PARAMS.order,
        page: {
            min: PARAMS.page.min,
            max: PARAMS.page.max
        }
    }

    if (!scraperMap[category]) {
        return res.status(404).json({error: 'Invalid', available: availableParams})
    }

    const isOrderValid = PARAMS.order.includes(order)
    const isPageValid = page >= PARAMS.page.min && page <= PARAMS.page.max

    if (!isOrderValid || !isPageValid) {
        return res.status(400).json({
            error: 'Invalid parameter(s)',
            availableParams
        })
    }

    try {
        const result = await scraperMap[category](page, order)
        res.json(result)
    } catch (err) {
        res.status(500).json({error: err.toString()})
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}


export default handleScrape
