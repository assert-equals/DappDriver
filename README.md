<h1 align="center">
  DappDriver
</h1>
<p align="center">
  <b>Automated tests for dApps</b>
</p>

[DappDriver](https://github.com/assert-equals/dappdriver) is a web testing framework designed for testing decentralized applications (dApps).

It's all about being flexible and user-friendly, DappDriver seamlessly integrates both [Playwright](https://playwright.dev/) and [Selenium WebDriver](https://www.selenium.dev/).

DappDriver loads [MetaMask](https://metamask.io/), [Rainbow](https://rainbow.me/) or [Zerion](https://zerion.io/) into the browser session, empowering you to efficiently confirm blockchain transactions.

Read on to get started locally in a couple of minutes.

## Install

DappDriver is [available on npm](https://www.npmjs.com/package/@assert-equals/dappdriver):

```shell
yarn add @assert-equals/dappdriver
```

## Get Started

**Download a Wallet**

First, install MetaMask, Rainbow or Zerion:

```shell
npx dappdriver -w metamask
```

Installing Rainbow:

DappDriver requires a personal access token to call Github’s API over HTTPS to download Rainbow from GitHub's artifact repository. You can configure the token through the `GITHUB_TOKEN` environment variable:

```shell
GITHUB_TOKEN=token npx dappdriver -w rainbow
```

**Add a Page Object**

Then, write your page object in `test/page/dapp.ts`:

```ts
import { HTMLElement, PageObject } from '@assert-equals/dappdriver';
import { Connect } from '@assert-equals/dappdriver/wallet';

export class Dapp extends PageObject {
  private accountsLabel: () => HTMLElement = () => new HTMLElement('#accounts');
  private connectButton: () => HTMLElement = () => new HTMLElement('#connectButton');
  constructor() {
    super('https://metamask.github.io/', 'E2E Test Dapp');
  }

  getAccounts(): Promise<string> {
    return this.accountsLabel().getText();
  }

  connect(): Promise<Connect> {
    return this.connectButton().clickAndOpensInExtension<Connect>(Connect);
  }
}
```

**Write Your First Test**

Next, write your test in `test/spec/dapp.spec.ts`:

```ts
import { CHROME, DappDriver, METAMASK, WEBDRIVER, BrowserOptions } from '@assert-equals/dappdriver';
import { Connect } from '@assert-equals/dappdriver/wallet';
import { expect } from 'chai';
import { Dapp } from '../page/dapp';

describe('E2E Test Dapp', () => {
  let dapp: Dapp;
  const browserOptions: BrowserOptions = {
    extension: {
      wallet: METAMASK,
      seed: 'phrase upgrade clock rough situate wedding elder clever doctor stamp excess tent'
    }
  };

  beforeEach(async () => {
    dapp = await DappDriver.create<Dapp>(
      'https://metamask.github.io/test-dapp/',
      WEBDRIVER,
      CHROME,
      Dapp,
      browserOptions
    );
  });

  afterEach(async () => {
    await DappDriver.dispose();
  });

  it('connects Account One to the dapp', async () => {
    const connectPopup: Connect = await dapp.connect();
    dapp = await connectPopup.accept<Dapp>(Dapp);
    const actualAccount: string = await dapp.getAccounts();
    const expectedAccount: string = '0xe18035bf8712672935fdb4e5e431b1a0183d2dfc';
    expect(actualAccount).to.be.equal(expectedAccount);
  });
});
```

**Run the Test**

Finally, run your tests:

```shell
yarn test
```

## Documentation

Read our [API documentation](https://assert-equals.github.io/DappDriver/).

## Support

Join our [community](https://github.com/assert-equals/DappDriver/discussions) and elevate your decentralized testing experience.

If you like DappDriver, [give us a star on GitHub!](https://github.com/assert-equals/DappDriver) ⭐
