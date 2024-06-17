import { BrowserContext } from 'playwright-core';
import { WebDriver } from 'selenium-webdriver';
import {
  DEFAULT_METAMASK_BINARY_PATH,
  DEFAULT_METAMASK_FLASK_BINARY_PATH,
  METAMASK,
  METAMASK_FLASK,
  PLAYWRIGHT,
  RAINBOW,
  WEBDRIVER,
  ZERION,
} from '../constants';
import { setupMetaMaskFlaskWallet } from '../flask/setup';
import { enableMetaMaskAutomation, setupMetaMaskWallet } from '../metamask/setup';
import { PageObject } from '../page';
import { PlaywrightFactory } from '../playwright/playwright-factory';
import { setupRainbowWallet } from '../rainbow/setup';
import { Browser, BrowserOptions, Driver, Frame, Framework, Page, Wallet } from '../types';
import { WebDriverFactory } from '../webdriver/webdriver-factory';
import { setupZerionWallet } from '../zerion/setup';
/**
 *
 *
 * @export
 * @class DappDriver
 */
export class DappDriver {
  private static instance: DappDriver | null = null;
  private domain: string;
  private extension: string;
  private isDisposed: boolean;
  private driver: Driver;
  private page: Page;
  private frame: Frame;
  private framework: Framework;
  private wallet: Wallet;
  /**
   * Creates an instance of DappDriver.
   * @param {string} domain
   * @param {Framework} framework
   * @param {Driver} driver
   * @memberof DappDriver
   */
  constructor(domain: string, framework: Framework, driver: Driver) {
    this.domain = domain;
    this.framework = framework;
    this.driver = driver;
  }

  static get Instance(): DappDriver | null {
    return this.instance;
  }

  static set Instance(value: DappDriver) {
    this.instance = value;
  }

  get Framework(): Framework {
    return this.framework;
  }

  get Disposed(): boolean {
    return this.isDisposed;
  }

  set Disposed(value: boolean) {
    this.isDisposed = value;
  }

  get Driver(): Driver {
    return this.driver;
  }

  get Domain(): string {
    return this.domain;
  }

  get Extension(): string {
    return this.extension;
  }

  set Extension(value: string) {
    this.extension = value;
  }

  get Page(): Page {
    return this.page;
  }

  set Page(value: Page) {
    this.page = value;
  }

  get Frame(): Frame {
    return this.frame;
  }

  set Frame(value: Frame) {
    this.frame = value;
  }

  get Wallet(): Wallet {
    return this.wallet;
  }

  set Wallet(value: Wallet) {
    this.wallet = value;
  }

  /**
   *
   * Creates a new DappDriver session based on this current configuration
   * @static
   * @template TPage
   * @param {string} domain
   * @param {Framework} framework
   * @param {Browser} browser
   * @param {new () => TPage} tPage
   * @param {BrowserOptions} options
   * @return {*}  {Promise<TPage>}
   * @memberof DappDriver
   */
  static async create(domain: string, framework: Framework, browser: Browser): Promise<void>;
  static async create(domain: string, framework: Framework, browser: Browser, options: BrowserOptions): Promise<void>;
  static async create<TPage>(
    domain: string,
    framework: Framework,
    browser: Browser,
    tPage: new () => TPage,
  ): Promise<TPage>;
  static async create<TPage>(
    domain: string,
    framework: Framework,
    browser: Browser,
    tPage: new () => TPage,
    options: BrowserOptions,
  ): Promise<TPage>;
  static async create<TPage>(
    domain: string,
    framework: Framework,
    browser: Browser,
    arg4?: any,
    options?: BrowserOptions,
  ): Promise<any> {
    let tPage: new () => TPage = null;
    options = options || { proxy: false, extension: { wallet: null, path: null, seed: null } };
    options.proxy = options.proxy ?? false;
    options.extension = options.extension ?? { wallet: null, path: null, seed: null };
    if (typeof arg4 === 'function') {
      tPage = arg4 as new () => TPage;
    } else if (typeof arg4 === 'object') {
      options = arg4 as BrowserOptions;
    }
    await DappDriver.enableAutomation(options);
    const driver: Driver = await DappDriver.build(framework, browser, options);
    const session = new DappDriver(domain, framework, driver);
    if (DappDriver.instance === null) {
      DappDriver.instance = session;
    }
    let page: Page = null;
    if (framework === PLAYWRIGHT) {
      page = (driver as BrowserContext).pages()[0];
      DappDriver.Instance.Page = page;
    }
    await DappDriver.setupWallet(options);
    await this.open(domain);
    if (tPage === null) return;
    const newPage: TPage = await this.getPage(tPage);
    return newPage;
  }
  /**
   *
   *
   * @private
   * @static
   * @param {Framework} framework
   * @param {Browser} browser
   * @param {BrowserOptions} options
   * @return {*}  {Promise<Driver>}
   * @memberof DappDriver
   */
  private static async build(framework: Framework, browser: Browser, options: BrowserOptions): Promise<Driver> {
    let driver: Driver;
    if (framework === PLAYWRIGHT) {
      driver = await new PlaywrightFactory().build(browser, options);
    } else if (framework === WEBDRIVER) {
      driver = await new WebDriverFactory().build(browser, options);
    } else {
      throw new Error('Unsupported framework: ' + framework);
    }
    return driver;
  }
  /**
   *
   *
   * @private
   * @static
   * @param {BrowserOptions} options
   * @return {*}  {Promise<void>}
   * @memberof DappDriver
   */
  private static async enableAutomation(options: BrowserOptions): Promise<void> {
    if (options.extension.wallet === METAMASK || options.extension.wallet === METAMASK_FLASK) {
      try {
        let metamaskPath: string;
        if (options.extension.wallet === METAMASK) {
          metamaskPath = options.extension.path || DEFAULT_METAMASK_BINARY_PATH;
        } else if (options.extension.wallet === METAMASK_FLASK) {
          metamaskPath = options.extension.path || DEFAULT_METAMASK_FLASK_BINARY_PATH;
        }
        await enableMetaMaskAutomation(metamaskPath);
      } catch (error) {
        throw new Error(
          'Could not enable automation in MetaMask, try running `npx dappdriver -w metamask` to install MetaMask.',
        );
      }
    }
  }
  /**
   *
   * Schedules a command to navigate to a new URL
   * @private
   * @static
   * @param {string} url
   * @return {*}  {Promise<void>}
   * @memberof DappDriver
   */
  private static async open(url: string): Promise<void> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      const page: Page = DappDriver.Instance.Page;
      await page.goto(url);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      await (DappDriver.Instance.Driver as WebDriver).get(url);
    }
  }
  /**
   *
   *
   * @private
   * @static
   * @param {BrowserOptions} options
   * @return {*}  {Promise<void>}
   * @memberof DappDriver
   */
  private static async setupWallet(options: BrowserOptions): Promise<void> {
    try {
      switch (options.extension.wallet) {
        case METAMASK:
          DappDriver.Instance.Wallet = METAMASK;
          await setupMetaMaskWallet(options.extension.seed);
          break;
        case METAMASK_FLASK:
          DappDriver.Instance.Wallet = METAMASK_FLASK;
          await setupMetaMaskFlaskWallet(options.extension.seed);
          break;
        case ZERION:
          DappDriver.Instance.Wallet = ZERION;
          await setupZerionWallet(options.extension.seed);
          break;
        case RAINBOW:
          DappDriver.Instance.Wallet = RAINBOW;
          await setupRainbowWallet(options.extension.seed);
          break;
      }
    } catch (error) {
      await this.dispose();
      throw new Error('Error setting up wallet: ' + error);
    }
  }
  /**
   *
   *
   * @static
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof DappDriver
   */
  static async getPage<TPage>(page: new () => TPage): Promise<TPage> {
    const newPage: TPage = new page();
    if (newPage instanceof PageObject) {
      await newPage.waitForTitle();
      await newPage.waitForURL();
    }
    return newPage;
  }
  /**
   *
   * Schedules a command to quit the current session
   * @static
   * @return {*}  {Promise<void>}
   * @memberof DappDriver
   */
  static async dispose(): Promise<void> {
    if (DappDriver.Instance === null) {
      return;
    }
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      await (DappDriver.Instance.Driver as BrowserContext).close();
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      await (DappDriver.Instance.Driver as WebDriver).quit();
    }
    DappDriver.instance = null;
  }
  /**
   *
   * Schedules a command to make the driver sleep for the given amount of time
   * @static
   * @param {number} duration
   * @return {*}  {Promise<void>}
   * @memberof DappDriver
   */
  static async sleep(duration: number): Promise<void> {
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      await DappDriver.Instance.Page.waitForTimeout(duration);
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      await (DappDriver.Instance.Driver as WebDriver).sleep(duration);
    }
  }
  /**
   *
   * Schedule a command to take a screenshot
   * @static
   * @return {*}  {Promise<string>}
   * @memberof DappDriver
   */
  static async takeScreenshot(): Promise<string> {
    let screenShot: string;
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      screenShot = (await DappDriver.Instance.Page.screenshot()).toString('base64');
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      screenShot = await (DappDriver.Instance.Driver as WebDriver).takeScreenshot();
    }
    return screenShot;
  }
}
