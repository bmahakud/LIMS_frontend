import json
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page()
    page.goto('https://www.danieli-corus.com/', wait_until='networkidle')
    
    script = """
    () => {
        const header = document.querySelector('header');
        const headerImgs = header ? Array.from(header.querySelectorAll('img')).map(i => ({ src: i.src, alt: i.alt, outerHTML: i.outerHTML })) : [];
        const headerSvgs = header ? Array.from(header.querySelectorAll('svg')).map(s => s.outerHTML) : [];
        const allLogos = Array.from(document.querySelectorAll('img')).filter(i => /logo/i.test(i.src) || /logo/i.test(i.alt)).map(i => ({ src: i.src, alt: i.alt }));
        return {
            headerImgs,
            headerSvgs,
            allLogos
        };
    }
    """
    res = page.evaluate(script)
    print(json.dumps(res, indent=2))
    
    # Download header image if any
    if res.get('headerImgs'):
        for idx, img in enumerate(res['headerImgs']):
            src = img['src']
            resp = page.request.get(src)
            ext = src.split('.')[-1].split('?')[0]
            with open(f'public/images/danieli-corus-logo.{ext}', 'wb') as f:
                f.write(resp.body())
            print(f'Saved logo: public/images/danieli-corus-logo.{ext}')
            
    browser.close()
