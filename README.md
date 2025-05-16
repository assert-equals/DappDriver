<h1 align="center">
  DappDriver
</h1>
<p align="center">
  <b>Automated tests for dApps</b>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@assert-equals/dappdriver">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/v/@assert-equals/dappdriver?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/v/@assert-equals/dappdriver?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Version">
    </picture>
  </a>
  <a href="https://github.com/assert-equals/dappdriver/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/l/@assert-equals/dappdriver?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/l/@assert-equals/dappdriver?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="MIT License">
    </picture>
  </a>
  <a href="https://www.npmjs.com/package/@assert-equals/dappdriver">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/@assert-equals/dappdriver?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/dm/@assert-equals/dappdriver?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Downloads per month">
    </picture>
  </a>
</p>

[DappDriver](https://github.com/assert-equals/dappdriver) is a web testing framework designed for testing decentralized applications (dApps).

It's all about being flexible and user-friendly, DappDriver seamlessly integrates both [Playwright](https://playwright.dev/) and [Selenium WebDriver](https://www.selenium.dev/).

DappDriver loads [MetaMask](https://metamask.io/), [MetaMask Flask](https://metamask.io/flask/), [Rainbow](https://rainbow.me/) or [Zerion](https://zerion.io/) into the browser session, empowering you to efficiently confirm blockchain transactions.

Read on to get started locally in a couple of minutes.

> [!NOTE]
> DappDriver is in active development, so all APIs are subject to change.

## Install

DappDriver is [available on npm](https://www.npmjs.com/package/@assert-equals/dappdriver):

```shell
yarn add @assert-equals/dappdriver
```

## Get Started

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

  async getAccounts(): Promise<string> {
    return await this.accountsLabel().getText();
  }

  async connect(): Promise<Connect> {
    return await this.connectButton().clickAndOpensInWindow<Connect>(Connect);
  }
}
```

**Write Your First Test**

Next, write your test in `test/spec/dapp.spec.ts`:

```ts
import { CHROME, DappDriver, METAMASK, PLAYWRIGHT, BrowserOptions } from '@assert-equals/dappdriver';
import { Connect } from '@assert-equals/dappdriver/wallet';
import { expect } from 'chai';
import { Dapp } from '../page/dapp';

describe('E2E Test Dapp', () => {
  let dapp: Dapp;
  const browserOptions: BrowserOptions = {
    extension: {
      wallet: METAMASK,
      seed: 'phrase upgrade clock rough situate wedding elder clever doctor stamp excess tent' // MetaMask test seed https://github.com/MetaMask/metamask-extension/blob/v12.7.1/test/e2e/seeder/ganache.ts
    }
  };

  beforeEach(async () => {
    dapp = await DappDriver.create<Dapp>(
      'https://metamask.github.io/test-dapp/',
      PLAYWRIGHT,
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

## Examples

If you learn best by example, check out our [example project](https://github.com/assert-equals/DappDriver-examples) to help you get going.

## Documentation

Read our [API documentation](https://assert-equals.github.io/DappDriver/).

## Support

Join our [community](https://github.com/assert-equals/DappDriver/discussions) and elevate your decentralized testing experience.

If you like DappDriver, [give us a star ⭐ on GitHub!](https://github.com/assert-equals/DappDriver)
