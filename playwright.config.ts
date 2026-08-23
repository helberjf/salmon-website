import { defineConfig, devices } from '@playwright/test';

const host = '127.0.0.1';
const port = 4173;
const localBaseUrl = `http://${host}:${port}`;
const externalBaseUrl = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results/artifacts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  timeout: 45_000,
  expect: {
    timeout: 7_500,
  },
  reporter: process.env.CI
    ? [
        ['line'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
      ]
    : [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: externalBaseUrl ?? localBaseUrl,
    locale: 'pt-BR',
    reducedMotion: 'reduce',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  webServer: externalBaseUrl
    ? undefined
    : {
        command: `${process.env.CI ? '' : 'npm run build && '}npm run preview -- --host ${host} --port ${port} --strictPort`,
        url: localBaseUrl,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    {
      name: 'desktop-chromium',
      testIgnore: /.*\.mobile\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        reducedMotion: 'reduce',
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'mobile-chromium',
      testMatch: /.*\.mobile\.spec\.ts/,
      use: {
        ...devices['Pixel 5'],
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
        viewport: { width: 375, height: 812 },
      },
    },
  ],
});
