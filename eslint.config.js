import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
//import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginNode from 'eslint-plugin-n';

//TODO: missing unsupported plugins to support eslint v9's "flat" configuration
// 1. eslint-plugin-import
// 2. eslint-plugin-promise
// 3. eslint-plugin-unicorn (temporary disable - conflict with ts-eslint - false positive errors - @typescript-eslint/no-unused-vars)

const ignorePatterns = [
  '*', // ignore everything
  '!src', //except source code
];

// const eslintPluginUnicornConfig = eslintPluginUnicorn.configs['flat/recommended'];
// const eslintPluginUnicornRules = eslintPluginUnicornConfig.rules;
// const eslintPluginUnicornScope = {
//   ...eslintPluginUnicornConfig,
//   languageOptions: { globals: globals.browser },
//   files: ['src/**'],
//   rules: {
//     ...eslintPluginUnicornRules,
//     'unicorn/no-unused-properties': 'off',
//     'unicorn/prevent-abbreviations': 'warn',
//   },
// };

const NODE_LTS_VERSION = '>=20.13.1';

const eslintPluginNodeConfig = eslintPluginNode.configs['flat/recommended-module'];
const eslintPluginNodeRules = eslintPluginNodeConfig.rules;
const eslintPluginNodeScope = {
  ...eslintPluginNodeConfig,
  languageOptions: { globals: globals.browser },
  rules: {
    ...eslintPluginNodeRules,
    'n/no-missing-import': 'off',
    'n/no-unsupported-features/es-syntax': [
      'error',
      {
        version: NODE_LTS_VERSION,
      },
    ],
    'n/no-unsupported-features/es-builtins': [
      'error',
      {
        version: NODE_LTS_VERSION,
      },
    ],
  },
};

// notes: the order of the object matter
export default [
  // scopes - workaround solution as global ignores not working properly for this plugin
  // eslintPluginUnicornScope,
  eslintPluginNodeScope,

  // global
  {
    languageOptions: { globals: globals.browser },
  },
  {
    // ignores object must be a object itself or else it may not work as intended
    ignores: ignorePatterns,
  },
  // standards
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
];
