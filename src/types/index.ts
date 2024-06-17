import { BrowserContext, FrameLocator, Page as PlaywrightPage } from 'playwright-core';
import { WebDriver } from 'selenium-webdriver';

type Page = PlaywrightPage | null;
type Frame = FrameLocator | null;
type Driver = WebDriver | BrowserContext;
type Framework = 'playwright' | 'webdriver';
type Browser = 'chrome';
type Wallet = 'metamask' | 'metamask-flask' | 'rainbow' | 'zerion';

type Artifact = {
  archive_download_url: string;
  name: string;
};

type Asset = {
  browser_download_url: string;
  name: string;
};

type JsonRpcRequest = {
  method: string;
  params?: Array<object>;
};

type WalletOptions = {
  wallet: Wallet;
  path?: string;
  seed?: string;
};

type BrowserOptions = {
  proxy?: boolean;
  extension?: WalletOptions;
};

export {
  Artifact,
  Asset,
  Browser,
  BrowserOptions,
  Driver,
  Frame,
  Framework,
  JsonRpcRequest,
  Page,
  Wallet,
  WalletOptions
};
