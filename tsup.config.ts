import { defineConfig } from 'tsup';

export default defineConfig({
  format: 'esm',
  sourcemap: true,
  external: ['eslint', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser'],
  outDir: 'dist',
});
