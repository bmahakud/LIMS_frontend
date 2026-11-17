from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page(viewport={'width': 1024, 'height': 768})
    page.goto('http://localhost:3000/concepts/industrial', wait_until='networkidle')
    page.evaluate('() => { document.documentElement.style.fontSize = "200%"; }')
    page.wait_for_timeout(500)
    
    script = """
    () => {
        const culprits = [];
        const all = document.querySelectorAll('*');
        all.forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > window.innerWidth + 5) {
                culprits.push({
                    tag: el.tagName,
                    cls: el.className ? (typeof el.className === 'string' ? el.className.slice(0, 50) : '') : '',
                    right: Math.round(r.right),
                    width: Math.round(r.width)
                });
            }
        });
        return culprits.slice(0, 15);
    }
    """
    culprits = page.evaluate(script)
    print('Culprits pushing past 1024 on 200% zoom:')
    for c in culprits:
        print(' ', c)
    browser.close()
