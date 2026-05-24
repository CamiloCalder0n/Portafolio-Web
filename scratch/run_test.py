import sys
from playwright.sync_api import sync_playwright

url = 'http://localhost:3000'

console_logs = []
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1920, 'height': 1080})

    def handle_console_message(msg):
        log_str = f"[{msg.type}] {msg.text}"
        console_logs.append(log_str)
        print(f"BROWSER_CONSOLE: {log_str}")

    page.on("console", handle_console_message)

    try:
        page.goto(url)
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(2000) # Wait for canvas to render and lerp
        
        # Take screenshot of Hero
        page.screenshot(path='/Users/camilocalderon/Projects/portfolio-jc/scratch/hero_screenshot.png')
        print("Hero screenshot saved.")

        # Scroll to About
        page.evaluate("document.getElementById('about').scrollIntoView()")
        page.wait_for_timeout(2000) # Wait for scroll and canvas transition
        page.screenshot(path='/Users/camilocalderon/Projects/portfolio-jc/scratch/about_screenshot.png')
        print("About screenshot saved.")

    except Exception as e:
        print(f"Error during test: {e}")
    finally:
        browser.close()

# Save logs
with open('/Users/camilocalderon/Projects/portfolio-jc/scratch/console.log', 'w') as f:
    f.write('\n'.join(console_logs))
