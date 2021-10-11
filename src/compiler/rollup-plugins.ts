import { Plugin } from 'rollup';
import { createFilter, FilterPattern } from '@rollup/pluginutils';
import * as fs from "fs";

export function importer(): Plugin {
  return {
    name: 'transform-code',
    transform(code, id) {
      // proceed with the transformation...
      return {
        code: '',
        map: null,
      };
    },
  };
}
