import {
  Before,
  BeforeAll,
  AfterAll,
  After,
  setDefaultTimeout,
  Status,
} from "@cucumber/cucumber";
import { chromium } from "playwright";
import { OurWorld } from "./types";

setDefaultTimeout(60000);

BeforeAll(async function () {
  // Browsers are expensive in Playwright so only create 1
  global.browser = await chromium.launch({
    // Not headless so we can watch test runs
    headless: false,
    // Slow so we can see things happening
    slowMo: 1000,
  });
});

AfterAll(async function () {
  await global.browser.close();
});

// Create a new test context and page per scenario
Before(async function (this: OurWorld) {
  // run with different viewport or size.
  /*   const pixel2 = devices["Pixel 2"];
  this.context = await global.browser.newContext({
    viewport: pixel2.viewport,
    userAgent: pixel2.userAgent,
  }); */
  
  this.context = await global.browser.newContext({
    recordVideo: {
      dir: "videos/",
      size: { width: 800, height: 600 },
    },
    
  });
  this.page = await this.context.newPage();
  await this.context.tracing.start({ screenshots: true, snapshots: true });
});
// Cleanup after each scenario
After(async function (this: OurWorld, testCase:any) {
  if (testCase.result.status === Status.FAILED) {
    let random = Math.random()*10;
    await this.context.tracing.stop({ path: `./test-results/test-trace${random}.zip` });
    var stream = await this.page.screenshot();
    this.attach(stream, 'image/png');
  }

  await this.page.close();
  await this.context.close();
});
