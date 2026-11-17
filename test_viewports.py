from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    
    # Test 320x568 (iPhone SE smallest width)
    page = browser.new_page(viewport={'width': 320, 'height': 568})
    page.goto('http://localhost:3000/concepts/industrial', wait_until='networkidle')
    scroll_w = page.evaluate('document.documentElement.scrollWidth')
    inner_w = page.evaluate('window.innerWidth')
    print(f'320px viewport: scrollWidth={scroll_w}, innerWidth={inner_w}, overflow={scroll_w > inner_w}')
    
    # Test 767px (1px below md breakpoint)
    page.set_viewport_size({'width': 767, 'height': 800})
    scroll_w_767 = page.evaluate('document.documentElement.scrollWidth')
    print(f'767px viewport: scrollWidth={scroll_w_767}, overflow={scroll_w_767 > 767}')
    
    # Test 1023px (1px below lg breakpoint)
    page.set_viewport_size({'width': 1023, 'height': 800})
    scroll_w_1023 = page.evaluate('document.documentElement.scrollWidth')
    print(f'1023px viewport: scrollWidth={scroll_w_1023}, overflow={scroll_w_1023 > 1023}')
    
    # Test phone held sideways 812x375 (short height)
    page.set_viewport_size({'width': 812, 'height': 375})
    page.locator('text=DCL-DEMO-2024-REF-001').first.click()
    page.wait_for_timeout(300)
    modal_scroll = page.evaluate('() => { const m = document.querySelector("[role=\'dialog\']"); return m ? { maxH: window.getComputedStyle(m).maxHeight, clientH: m.clientHeight, scrollH: m.scrollHeight } : null; }')
    print('812x375 landscape phone modal status:', modal_scroll)
    
    # Check if close button is in viewport
    close_btn_rect = page.evaluate('() => { const b = document.querySelector("button[aria-label=\'Close report preview\']"); return b ? b.getBoundingClientRect() : null; }')
    print('Close button rect in 812x375:', close_btn_rect)
    
    browser.close()
