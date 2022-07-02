import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
import AnonymizeUserAgentPlugin from 'puppeteer-extra-plugin-anonymize-ua'
import UserPreferencesPlugin from 'puppeteer-extra-plugin-user-preferences'

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin());
puppeteer.use(AnonymizeUserAgentPlugin());

(async () => {
    
    const browser = await puppeteer.launch({
        headless: false, 
        defaultViewport: null,
        userDataDir: '/Users/xtronda/zrekcehcPuppeterChromeUserData',
        args: [
            '--disable-infobars',
            '--start-maximized',
            '--disable-web-security',
            '--allow-file-access-from-files'
        ]
    })

    const page = await browser.newPage();
    const timeout = 5000;

    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto("https://web.telegram.org/k/");
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#folders-container > div > div.chatlist-top > ul > li:nth-child(1) > div.c-ripple"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
          offset: {
            x: 113,
            y: 30,
          },
        });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#column-center > div > div > div.chat-input > div > div.rows-wrapper-wrapper > div > div.new-message-wrapper.has-offset > div.input-message-container > div.input-message-input.scrollable.scrollable-y.i18n.no-scrollbar"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
          offset: {
            x: 170.5,
            y: 16,
          },
        });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("o");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("o");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("i");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("i");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Enter");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Enter");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("/");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("/");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("i");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("i");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("n");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("n");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("i");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("i");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("t");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("t");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Enter");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Enter");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("/");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("/");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("r");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("r");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("e");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("e");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("c");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("a");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("a");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("r");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("r");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("g");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("g");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("a");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("a");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Enter");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Enter");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("/");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("/");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("2");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("2");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("0");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("0");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("0");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("0");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Enter");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Enter");
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#column-center > div > div > div.chat-input > div > div.rows-wrapper-wrapper > div > div.new-message-wrapper.has-offset > div.btn-icon.btn-menu-toggle.attach-file.tgico-attach"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
          offset: {
            x: 15.5,
            y: 13,
          },
        });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#column-center > div > div > div.chat-input > div > div.rows-wrapper-wrapper > div > div.new-message-wrapper.has-offset > div.btn-icon.btn-menu-toggle.attach-file.tgico-attach.menu-open > div.btn-menu.top-left.active > div.btn-menu-item.rp-overflow.tgico-image"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
          offset: {
            x: 95.5,
            y: 17,
          },
        });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["body > div.popup.popup-send-photo.popup-new-media.active > div > div.popup-header > button > div"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
          offset: {
            x: 33.9375,
            y: 13.75,
          },
        });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#column-center > div > div > div.bubbles.scrolled-down.has-sticky-dates > div > div > section > div.bubble.is-message-empty.hide-name.photo.is-in"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
          offset: {
            x: 495.5,
            y: 311,
          },
        });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#column-center > div > div > div.bubbles.scrolled-down.has-sticky-dates > div > div > section > div.bubble.is-message-empty.hide-name.photo.is-in"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
          offset: {
            x: 496.5,
            y: 303,
          },
        });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#column-center > div > div > div.bubbles.scrolled-down.has-sticky-dates > div > div > section > div.bubble.is-message-empty.hide-name.photo.is-in"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
          offset: {
            x: 497.5,
            y: 322,
          },
        });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#column-center > div > div > div.bubbles.scrolled-down.has-sticky-dates > div > div > section > div:nth-child(18)"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
          offset: {
            x: 488.5,
            y: 27,
          },
        });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#column-center > div > div > div.bubbles.scrolled-down.has-sticky-dates > div > div > section > div:nth-child(18)"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
          offset: {
            x: 497.5,
            y: 7,
          },
        });
    }

    await browser.close();

    async function waitForSelectors(selectors, frame, options) {
      for (const selector of selectors) {
        try {
          return await waitForSelector(selector, frame, options);
        } catch (err) {
          console.error(err);
        }
      }
      throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
    }

    async function scrollIntoViewIfNeeded(element, timeout) {
      await waitForConnected(element, timeout);
      const isInViewport = await element.isIntersectingViewport({threshold: 0});
      if (isInViewport) {
        return;
      }
      await element.evaluate(element => {
        element.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'auto',
        });
      });
      await waitForInViewport(element, timeout);
    }

    async function waitForConnected(element, timeout) {
      await waitForFunction(async () => {
        return await element.getProperty('isConnected');
      }, timeout);
    }

    async function waitForInViewport(element, timeout) {
      await waitForFunction(async () => {
        return await element.isIntersectingViewport({threshold: 0});
      }, timeout);
    }

    async function waitForSelector(selector, frame, options) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to waitForSelector');
      }
      let element = null;
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (element) {
          element = await element.waitForSelector(part, options);
        } else {
          element = await frame.waitForSelector(part, options);
        }
        if (!element) {
          throw new Error('Could not find element: ' + selector.join('>>'));
        }
        if (i < selector.length - 1) {
          element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
        }
      }
      if (!element) {
        throw new Error('Could not find element: ' + selector.join('|'));
      }
      return element;
    }

    async function waitForElement(step, frame, timeout) {
      const count = step.count || 1;
      const operator = step.operator || '>=';
      const comp = {
        '==': (a, b) => a === b,
        '>=': (a, b) => a >= b,
        '<=': (a, b) => a <= b,
      };
      const compFn = comp[operator];
      await waitForFunction(async () => {
        const elements = await querySelectorsAll(step.selectors, frame);
        return compFn(elements.length, count);
      }, timeout);
    }

    async function querySelectorsAll(selectors, frame) {
      for (const selector of selectors) {
        const result = await querySelectorAll(selector, frame);
        if (result.length) {
          return result;
        }
      }
      return [];
    }

    async function querySelectorAll(selector, frame) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to querySelectorAll');
      }
      let elements = [];
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (i === 0) {
          elements = await frame.$$(part);
        } else {
          const tmpElements = elements;
          elements = [];
          for (const el of tmpElements) {
            elements.push(...(await el.$$(part)));
          }
        }
        if (elements.length === 0) {
          return [];
        }
        if (i < selector.length - 1) {
          const tmpElements = [];
          for (const el of elements) {
            const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            if (newEl) {
              tmpElements.push(newEl);
            }
          }
          elements = tmpElements;
        }
      }
      return elements;
    }

    async function waitForFunction(fn, timeout) {
      let isActive = true;
      setTimeout(() => {
        isActive = false;
      }, timeout);
      while (isActive) {
        const result = await fn();
        if (result) {
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error('Timed out');
    }
})();
