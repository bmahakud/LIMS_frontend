import json
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000/concepts/industrial', wait_until='networkidle')
    
    script = """
    () => {
        const elements = Array.from(document.querySelectorAll('header, footer, section, .max-w-7xl, .container'));
        return elements.map(el => {
            const comp = window.getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return {
                tag: el.tagName,
                cls: el.className.split(' ').slice(0, 5).join(' '),
                left: Math.round(r.left),
                right: Math.round(r.right),
                width: Math.round(r.width),
                padLeft: comp.paddingLeft,
                padRight: comp.paddingRight,
                padTop: comp.paddingTop,
                padBottom: comp.paddingBottom
            };
        });
    }
    """
    data = page.evaluate(script)
    print(json.dumps(data, indent=2))
    browser.close()
