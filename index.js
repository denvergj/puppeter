const puppeteer = require('puppeteer');


(async function main(){
	try { 
		
		const browser = await puppeteer.launch({headless: false});
		const page = await browser.newPage();
		
		page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/67.0.3372.0 Safari/537.36');
		
		await page.goto('http://experts.shopify.com/');
		await page.waitForSelector('.section');
		
		const sections = await page.$$('.section');
		
		for (const section of sections) {
			const button = await section.$('a.marketing-button');
			button.click();
			
			await page.waitForSelector('#ExpertsResults');
			
			const list = await page.$$('#ExpertsResults > li');
			
			for(const li of list) {
				const name = await li.$eval('h2', h2 => h2.innerText);
				console.log('name: ', name);
			}
			
		}
		
		console.log('its showing');
		
	} catch(e) {
		console.log('our error', e);
	}
})();
