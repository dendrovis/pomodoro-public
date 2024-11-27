import { defineConfig } from 'cypress';

enum DEFAULT_SIZE {
  HEIGHT = 1080,
  WIDTH = 1920,
}

const basePath = 'cypress';
const outputPath = `${basePath}/output`;

export default defineConfig({
  e2e: {
    //https://docs.cypress.io/api/plugins/browser-launch-api#Set-screen-size-when-running-headless
    setupNodeEvents(on, _) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--window-size=1920,1080');
          // force screen to be non-retina (1920x1080 size)
          launchOptions.args.push('--force-device-scale-factor=1');
        }
        return launchOptions;
      });
    },

    trashAssetsBeforeRuns: true,

    //set default as desktop view
    viewportHeight: DEFAULT_SIZE.HEIGHT,
    viewportWidth: DEFAULT_SIZE.WIDTH,

    reporter: 'junit',
    reporterOptions: {
      mochaFile: `${outputPath}/results/[hash].xml`,
    },
    downloadsFolder: `${outputPath}/downloads`,
    screenshotsFolder: `${outputPath}/screenshots`,
    videosFolder: `${outputPath}/videos`,
  },
});
