import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import json from "@rollup/plugin-json";
import pkg from './package.json';

const config = {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: 'cjs',
    paths: {
      "react-native": "react-native-web"
    }
  },
  external: [...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    alias({
      entries: [
        { find: 'react-native$', replacement: 'react-native-web' },
      ]
    }),
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [['@babel/env', { loose: true, modules: false }], '@babel/react'],
      plugins: ['@babel/plugin-proposal-class-properties'],
    }),
    commonjs(),
    json(),
  ]
}

export default config;