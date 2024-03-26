import { BrowserContext, FrameLocator, Page as PlaywrightPage } from 'playwright-core';
import { WebDriver } from 'selenium-webdriver';

type Page = PlaywrightPage | null;
type Frame = FrameLocator | null;
type Driver = WebDriver | BrowserContext;
type Framework = 'playwright' | 'webdriver';
type Browser = 'chrome';
type Wallet = 'metamask' | 'zerion';

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
  seed: string;
};

export { Asset, Browser, Driver, Frame, Framework, JsonRpcRequest, Page, Wallet, WalletOptions };
