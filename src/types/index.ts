import { BrowserContext, FrameLocator, Page as PlaywrightPage } from 'playwright-core';
import { WebDriver } from 'selenium-webdriver';

export type Page = PlaywrightPage | null;
export type Frame = FrameLocator | null;
export type Driver = WebDriver | BrowserContext;
export type Framework = 'playwright' | 'webdriver';
export type Browser = 'chrome';
export type Wallet = 'metamask' | 'metamask-flask' | 'rainbow' | 'zerion';

export type Artifact = {
  archive_download_url: string;
  name: string;
};

export type Asset = {
  browser_download_url: string;
  name: string;
};

export type JsonRpcRequest = {
  method: string;
  params?: Array<object>;
};

export type WalletOptions = {
  wallet: Wallet;
  path?: string;
  seed?: string;
};

export type BrowserOptions = {
  proxy?: boolean;
  extension?: WalletOptions;
};

export type Comparator = (a: number, b: number) => boolean;
