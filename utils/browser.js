let browser = null

const agentLaunch = async () => {
    if (!browser) {
        const puppeteer = await import('puppeteer')
        browser = await puppeteer.launch({headless: true})
    }
    return browser
}

const agentNewPage = async () => {
    const browserInstance = await agentLaunch()
    return browserInstance.newPage()
}

const agentClose = async () => {
    if (browser) {
        await browser.close()
        browser = null
    }
}

export { agentLaunch, agentNewPage, agentClose }
