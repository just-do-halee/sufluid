import typescript from '@rollup/plugin-typescript';
import { importer } from './src/compiler/rollup-plugins';

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [typescript()],
};
