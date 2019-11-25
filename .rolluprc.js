/* eslint-disable import/no-extraneous-dependencies */

import babel from 'rollup-plugin-babel';
import common from 'rollup-plugin-commonjs';
import replacePlugin from '@rollup/plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

import {
  author as pkgAuthor,
  name as pkgName,
  version as pkgVersion,
} from './package.json';

const authorName = pkgAuthor.replace(/<.*?>/g, '').trim();
const nameWithoutScope = pkgName.replace(/^@.*?\//g, '');
const namePascalCased = nameWithoutScope.replace(/^([a-z])|-([a-z])/g, (g) => g.slice(-1).toUpperCase());

const yearNow = new Date().getFullYear();
const devYears = [2019];

if (devYears[0] < yearNow) devYears.push(yearNow);

const banner = `/*!
 * ${namePascalCased} v${pkgVersion}
 * (c) ${devYears.join('-')} ${authorName}
 * Released under the MIT License.
 */
`;

const babelConfig = {
  babelrc: false,
  exclude: 'node_modules/**',
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        targets: '> 1%, last 2 versions',
      },
    ],
  ],
};

const replace = () => replacePlugin({
  __PKG_NAME__: namePascalCased,
  __PKG_VERSION__: pkgVersion,
});

const input = () => ({
  input: 'src/main.js',
});

const output = (suffix, format, globals) => ({
  output: {
    file: `dist/${nameWithoutScope}.${suffix}.js`,
    format,
    name: namePascalCased,
    banner,
    globals,
  },
});

export default [
  {
    ...input(),
    ...output('common', 'cjs'),
    plugins: [
      replace(),
      babel(babelConfig),
    ],
  },
  {
    ...input(),
    ...output('esm', 'es'),
    plugins: [
      replace(),
      babel(babelConfig),
    ],
  },
  {
    ...input(),
    ...output('umd', 'umd'),
    plugins: [
      replace(),
      common(),
      babel(babelConfig),
    ],
  },
  {
    ...input(),
    ...output('umd.min', 'umd'),
    plugins: [
      replace(),
      common(),
      babel(babelConfig),
      uglify({
        output: {
          comments: /^!/,
        },
      }),
    ],
  },
];
