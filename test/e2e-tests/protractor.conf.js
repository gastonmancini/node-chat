'use strict';

exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine 2 is recommended.
  framework: 'jasmine2',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['./scenarios/*.spec.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  
  baseUrl: 'http://localhost:3000/',
  
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  
  // Bootstrap the e2e tests
  beforeLaunch: './beforeLaunch'
};
