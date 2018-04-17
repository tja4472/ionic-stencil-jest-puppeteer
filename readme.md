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

# AAAAA

```bash
npm run build --dev
```

    "@types/expect-puppeteer": "2.2.1",
    Has incorrect definition for toMatchElement
    Disallows
    ```
    text: 'Home' });
     await expect(page).toMatchElement('e2e-attribute-basic .single', { text: 'Singleaahh' });
    ```
