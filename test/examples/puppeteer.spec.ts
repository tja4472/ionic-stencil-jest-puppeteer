import { Browser, Page } from 'puppeteer';

declare const browser: Browser;
declare var page: Page;

describe('Puppeteer Tests - Google', () => {    
  beforeAll(async () => {
    await page.goto('https://google.com');
  });

  it('should display "google" text on page', async () => {
    await expect(page).toMatch('google');
  });
});

describe('Puppeteer Tests - Ionic PWA Toolkit', () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3335/');
  });

  it('should display "Ionic PWA Toolkit" text on page', async () => {
    await expect(page).toMatch('Ionic PWA Toolkit');
  });
});
