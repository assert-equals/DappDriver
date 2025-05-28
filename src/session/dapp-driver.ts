import { setupHeadlessWallet } from '@assert-equals/headless-wallet';
import { BrowserContext } from 'playwright-core';
import { WebDriver } from 'selenium-webdriver';
import {
  HEADLESS,
  METAMASK,
  METAMASK_FLASK,
  NODE_MODULE_DIR,
  PLAYWRIGHT,
  RAINBOW,
  WEBDRIVER,
  ZERION
} from '../constants';
import { IWallet } from '../interface/extension/wallet';
import { PageObject } from '../page';
import { PlaywrightFactory } from '../playwright/playwright-factory';
import { Browser, BrowserOptions, Driver, Frame, Framework, Page, Wallet } from '../types';
import { WebDriverFactory } from '../webdriver/webdriver-factory';

/**
 *
 *
 * @export
 * @class DappDriver
 */
export class DappDriver {
  private static instance: DappDriver | null = null;
  private domain: string;
  private extension: IWallet;
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

  set Driver(value: Driver) {
    this.driver = value;
  }

  get Domain(): string {
    return this.domain;
  }

  get Extension(): IWallet {
    return this.extension;
  }

  set Extension(value: IWallet) {
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
    tPage: new () => TPage
  ): Promise<TPage>;
  static async create<TPage>(
    domain: string,
    framework: Framework,
    browser: Browser,
    tPage: new () => TPage,
    options: BrowserOptions
  ): Promise<TPage>;
  static async create<TPage>(
    domain: string,
    framework: Framework,
    browser: Browser,
    arg4?: any,
    options?: BrowserOptions
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
    let driver: Driver = null;
    const session = new DappDriver(domain, framework, driver);
    DappDriver.instance ??= session;
    await DappDriver.loadExtensionModule(options);
    await DappDriver.install(options);
    driver = await DappDriver.build(framework, browser, options);
    DappDriver.Instance.Driver = driver;
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
  private static async install(options: BrowserOptions): Promise<void> {
    try {
      switch (options.extension.wallet) {
        case METAMASK:
        case METAMASK_FLASK:
        case RAINBOW:
        case ZERION: {
          const initCwd: string = process.env.INIT_CWD;
          const cwd: string = process.cwd();
          const downloadDir: string = `${initCwd || cwd}/${NODE_MODULE_DIR}`;
          const path: string = await DappDriver.Instance.Extension.install(downloadDir, options.extension.version);
          options.extension.path ??= path;
          break;
        }
      }
    } catch (error) {
      throw new Error('Failed to install extension: ' + error);
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
  private static async loadExtensionModule(options: BrowserOptions): Promise<void> {
    try {
      switch (options.extension.wallet) {
        case METAMASK:
        case METAMASK_FLASK:
        case RAINBOW:
        case ZERION: {
          const extensionModule = await import(`../${options.extension.wallet}`);
          DappDriver.Instance.Extension = extensionModule.default as IWallet;
          break;
        }
      }
    } catch (error) {
      throw new Error('Failed to load extension module: ' + error);
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
        case METAMASK_FLASK:
        case RAINBOW:
        case ZERION:
          DappDriver.Instance.Wallet = options.extension.wallet;
          await DappDriver.Instance.Extension.setup(options.extension.seed);
          break;
        case HEADLESS:
          DappDriver.Instance.Wallet = HEADLESS;
          if (DappDriver.Instance.Framework === PLAYWRIGHT) {
            const page = DappDriver.Instance.Page as Page;
            await setupHeadlessWallet({ page, port: options.extension.port });
          } else if (DappDriver.Instance.Framework === WEBDRIVER) {
            const driver = DappDriver.Instance.Driver as WebDriver;
            await setupHeadlessWallet({ driver });
          }
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
    await new Promise((resolve) => setTimeout(resolve, duration));
  }
  /**
   *
   * Schedule a command to take a screenshot
   * @static
   * @return {*}  {Promise<string>}
   * @memberof DappDriver
   */
  static async takeScreenshot(): Promise<string> {
    if (DappDriver.Instance === null) {
      return;
    }
    let screenShot: string;
    if (DappDriver.Instance.Framework === PLAYWRIGHT) {
      screenShot = (await DappDriver.Instance.Page.screenshot()).toString('base64');
    } else if (DappDriver.Instance.Framework === WEBDRIVER) {
      screenShot = await (DappDriver.Instance.Driver as WebDriver).takeScreenshot();
    }
    return screenShot;
  }
}
