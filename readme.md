# Setup

package.json

```json
"devDependencies": {
  "@types/jest": "22.2.3",
  "@types/puppeteer": "1.2.1",
  "jest": "22.4.3",
  "jest-puppeteer": "2.3.0",
  "jest-puppeteer-preset": "2.3.0",
  "puppeteer": "1.3.0"
},
"jest": {
  "preset": "jest-puppeteer-preset",
  "transform": {
    "^.+\\.(js|ts|tsx)$": "<rootDir>/node_modules/@stencil/core/testing/jest.preprocessor.js"
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(tsx?|jsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "json",
    "jsx"
  ]
}
```

jest-puppeteer.config.js

```js
module.exports = {
  server: {
    command: 'npm run serve --config stencil.config.e2e.js --no-open',
  },
};
```

stencil.config.e2e.js

```js
exports.devServer = {
  root: 'www',
  // watchGlob: '**/**'
  httpPort: 3335,
};
```

# References

* https://github.com/ionic-team/ionic-pwa-toolkit
* https://github.com/ionic-team/stencil
* https://stenciljs.com/
* https://facebook.github.io/jest/
* https://github.com/smooth-code/jest-puppeteer
* https://github.com/smooth-code/jest-puppeteer/tree/master/packages/expect-puppeteer

# Jest

jest.spec.ts

```typescript
describe('Jest Tests', () => {
  describe('group name 1', () => {
    it('test name 1', async () => {
      expect(3).toBe(3);
    });

    it('test name 2', async () => {
      expect(3).toBe(3);
    });
  });

  describe('group name 2', () => {
    it('test name 3', async () => {
      debugger;
      expect(3).toBe(3);
    });
  });
});
```

Run all tests.

```bash
npm test
```

Run tests in file.

```bash
npm test jest.spec
```

Run group test in file (match against the name in describe).

```bash
npm test -- jest.spec -t 'group name 1'
```

Run single test in file (match against the name in it).

```bash
npm test -- jest.spec -t 'test name 1'
```

## Jest Debugging

chrome://inspect and click on "Open Dedicated DevTools for Node"

```bash
node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand jest.spec -t 'test name 3'
```

# Puppeteer

Update app.

```bash
npm run build --dev
```

puppeteer.spec.ts
```typescript
import { Browser, Page } from 'puppeteer';

declare const browser: Browser;
declare var page: Page;

describe('Puppeteer Tests - Google', () => {    
  beforeAll(async () => {
    await page.goto('https://google.com');
  });

  it('should display "google" text on page', async () => {
    await expect(page).toMatch('googlea');
  });
});

describe('Puppeteer Tests - Ionic PWA Toolkit', () => {
  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3335/');
  });

  it('should display "Ionic PWA Toolkit" text on page', async () => {
    await expect(page).toMatch('Ionic PWA Toolkita');
  });
});
```

Run tests
```bash
npm test puppeteer.spec
```

# Problems
    "@types/expect-puppeteer": "2.2.1",
    Has incorrect definition for toMatchElement
    Disallows
    ```
    text: 'Home' });
     await expect(page).toMatchElement('e2e-attribute-basic .single', { text: 'Singleaahh' });
    ```
