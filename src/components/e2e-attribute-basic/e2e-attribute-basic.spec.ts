import { TestWindow } from '@stencil/core/testing';
import { AttributeBasic } from './e2e-attribute-basic';

import { Browser, Page } from 'puppeteer';

declare const browser: Browser;
declare var page: Page;

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/expect-puppeteer/index.d.ts

type ExpectPolling = number | "mutation" | "raf";

/**
 * Configures how to poll for an element.
 */
interface ExpectTimingActions {
  /**
   * An interval at which the pageFunction is executed. Defaults to "raf".
   */
  polling?: ExpectPolling;

  /**
   * Maximum time to wait for in milliseconds. Defaults to 500.
   */
  timeout?: number;
}

interface ExpectToClickOptions extends ExpectTimingActions {
  /**
   * A text or a RegExp to match in element textContent.
   */
  text?: string | RegExp;
}
declare global {
  namespace jest {
      // tslint:disable-next-line no-empty-interface
      interface Matchers<R> {
          // These must all match the ExpectPuppeteer interface above.
          // We can't extend from it directly because some method names conflict in type-incompatible ways.
          toClick(selector: string, options?: ExpectToClickOptions): Promise<void>;
          toDisplayDialog(block: () => Promise<void>): Promise<void>;
          toFill(selector: string, value: string, options?: ExpectTimingActions): Promise<void>;
          toMatch(selector: string, options?: ExpectTimingActions): Promise<void>;
          // toMatchElement(selector: string, value: string, options?: ExpectTimingActions): Promise<void>;
          toMatchElement(selector: string, options?: ExpectToClickOptions): Promise<void>;          
          toSelect(selector: string, valueOrText: string, options?: ExpectTimingActions): Promise<void>;
          toUploadFile(selector: string, filePath: string, options?: ExpectTimingActions): Promise<void>;
      }
  }
}

describe('e2e-attribute-basic', () => {
  it('should build', () => {
    expect(new AttributeBasic()).toBeTruthy();
  });
});

// jest
describe('attributes', () => {
  it('should set props from attributes', async () => {
    const expectedResult = `<!----><div id="data-aa"><div class="single">Single</div><div class="multiWord">Multi Word</div><div class="customAttr">My Custom Attr</div></div>`;
    const window = new TestWindow();
    const element: HTMLUnknownElement = await window.load({
      components: [AttributeBasic],
      html:
        '<e2e-attribute-basic single="Single" multi-word="Multi Word" my-custom-attr = "My Custom Attr"  ></e2e-attribute-basic>',
    });
    // console.log(element.textContent);
    // console.log(element.innerHTML);
    // console.log(element.innerText);

    expect(element.innerHTML).toEqual(expectedResult);
  });
});

//
describe('puppeteer', () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3335/');
  });

  it('should display "Ionic PWA Toolkit" text on page', async () => {
    await expect(page).toMatch('Ionic PWA Toolkit');
    await page.waitForSelector('.single');
    await expect(page).toMatch('Single');
  });

  it('toMatchElement', async () => {
    // const elementHandle = await page.$("e2e-attribute-basic");
    // expect(elementHandle).not.toBe(null);

       // await expect(page).toMatchElement('e2e-attribute-basic', { text: 'Home' });
     await expect(page).toMatchElement('e2e-attribute-basic .single', { text: 'Single' });

    // await expect(page).toMatchElement('e2e-attribute-basic .single', 'Single');
    // await expect(page).toMatchElement('e2e-attribute-basic .multiWord', 'Multi Word');
    // await expect(page).toMatchElement('e2e-attribute-basic .customAttr', 'My Custom Attr');    

    const ppp = await page.$('e2e-attribute-basic .customAttr');
    await expect(ppp).toMatch('My Custom Attr');

    //  console.log('aaa>', aaa);

    // const bbb = await page.content();
    // console.log('aaa.content()>', bbb);

    // const ccc = aaa as ElementHandle;
    // console.log('ccc.toString()>', ccc.toString());

    // const ddd = await ccc.getProperty('value');
    // console.log('ddd>', ddd);

    // await aaa.waitForSelector('.single');
    //  await expect(aaa).toMatch('Single');
/*
    const testElement = await page.$eval(
      'e2e-attribute-basic',
      (el) => el.innerHTML,
    );
    console.log('testElement>', testElement);

    const testElementA = await page.$eval(
      'e2e-attribute-basic .single',
      (el) => el.innerHTML,
    );
    console.log('testElementA>', testElementA);
*/
   // await page.screenshot({ path: 'test/screens/page.png' });

    // const ppp = await page.waitForSelector('e2e-attribute-basic .single');
    // const ppp = await page.$('e2e-attribute-basic');
    // await ppp.screenshot({ path: 'test/screens/item.png' });
  });

  it('test name', async () => {
    const ppp = await page.$('e2e-attribute-basic #data-aa');
    await ppp.screenshot({ path: 'test/screens/item.png' });
    
    const ggg = await page.evaluate(
      () => document.querySelector('e2e-attribute-basic').innerHTML,
    );
    console.log('ggg>', ggg);
    
  });
  
});
