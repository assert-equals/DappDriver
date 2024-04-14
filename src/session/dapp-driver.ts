import { BrowserContext } from 'playwright-core';
import { PlaywrightFactory } from '../playwright/playwright-factory';
import { WebDriverFactory } from '../webdriver/webdriver-factory';
import { WebDriver } from 'selenium-webdriver';
import { enableMetaMaskAutomation, setupMetaMaskWallet } from '../metamask/setup';
import { PageObject } from '../page';
import { Browser, Driver, Frame, Framework, Page, WalletOptions } from '../types';
import {
  DEFAULT_METAMASK_BINARY_PATH,
  DEFAULT_METAMASK_FLASK_BINARY_PATH,
  METAMASK,
  METAMASK_FLASK,
  PLAYWRIGHT,
  WEBDRIVER,
  ZERION,
} from '../constants';
import { setupZerionWallet } from '../zerion/setup';
import { setupMetaMaskFlaskWallet } from '../flask/setup';
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

  /**
   *
   * Creates a new DappDriver session based on this current configuration
   * @static
   * @template TPage
   * @param {string} domain
   * @param {Framework} framework
   * @param {Browser} browser
   * @param {new () => TPage} tPage
   * @param {WalletOptions} options
   * @return {*}  {Promise<TPage>}
   * @memberof DappDriver
   */
  static async create(domain: string, framework: Framework, browser: Browser): Promise<void>;
  static async create(domain: string, framework: Framework, browser: Browser, options: WalletOptions): Promise<void>;
  static async create<TPage extends PageObject>(
    domain: string,
    framework: Framework,
    browser: Browser,
    tPage: new () => TPage,
  ): Promise<TPage>;
  static async create<TPage extends PageObject>(
    domain: string,
    framework: Framework,
    browser: Browser,
    tPage: new () => TPage,
    options: WalletOptions,
  ): Promise<TPage>;
  static async create<TPage extends PageObject>(
    domain: string,
    framework: Framework,
    browser: Browser,
    arg4?: any,
    options?: WalletOptions,
  ): Promise<any> {
    let tPage: new () => TPage = null;
    options = options || { wallet: null, path: null, seed: null };
    if (typeof arg4 === 'function') {
      tPage = arg4 as new () => TPage;
    } else if (typeof arg4 === 'object') {
      options = arg4 as WalletOptions;
    }
    let driver: Driver;
    if (options.wallet !== ZERION) {
      try {
        let metamaskPath: string;
        if (options.wallet === METAMASK) {
          metamaskPath = options.path || DEFAULT_METAMASK_BINARY_PATH;
        } else if (options.wallet === METAMASK_FLASK) {
          metamaskPath = options.path || DEFAULT_METAMASK_FLASK_BINARY_PATH;
        }
        await enableMetaMaskAutomation(metamaskPath);
      } catch (error) {
        throw new Error('Error enabling automation in MetaMask: ' + error);
      }
    }
    if (framework === PLAYWRIGHT) {
      driver = (await new PlaywrightFactory().build(browser, options)) as BrowserContext;
    } else if (framework === WEBDRIVER) {
      driver = await new WebDriverFactory().build(browser, options);
    } else {
      throw new Error('Unsupported framework: ' + framework);
    }
    const session = new DappDriver(domain, framework, driver);
    if (DappDriver.instance === null) {
      DappDriver.instance = session;
    }
    let page: Page = null;
    if (framework === PLAYWRIGHT) {
      page = (driver as BrowserContext).pages()[0];
      DappDriver.Instance.Page = page;
    }
    try {
      if (options.wallet === METAMASK) {
        await setupMetaMaskWallet(options.seed);
      } else if (options.wallet === METAMASK_FLASK) {
        await setupMetaMaskFlaskWallet(options.seed);
      } else if (options.wallet === ZERION) {
        await setupZerionWallet(options.seed);
      }
    } catch (error) {
      await this.dispose();
      throw new Error('Error setting up wallet: ' + error);
    }
    await this.open(domain);
    if (tPage === null) return;
    const newPage: TPage = await this.getPage(tPage);
    return newPage;
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
   * @static
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof DappDriver
   */
  static async getPage<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    const newPage: TPage = new page();
    await newPage.waitForTitle();
    await newPage.waitForURL();
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
   * Schedule a command to take a screenshot
   * @static
   * @return {*}  {Promise<string>}
   * @memberof DappDriver
   */
  static async takeScreenshot(): Promise<string> {
    let screenShot: string;
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      screenShot = (await (DappDriver.Instance.Page as Page).screenshot()).toString('base64');
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      screenShot = await (DappDriver.Instance.Driver as WebDriver).takeScreenshot();
    }
    return screenShot;
  }
}
