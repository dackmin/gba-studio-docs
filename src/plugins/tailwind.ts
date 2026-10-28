import type { Plugin } from '@docusaurus/types';
import autoprefixer from 'autoprefixer';
import tailwind from '@tailwindcss/postcss';

export default function tailwindPlugin (): Plugin {
  return {
    name: 'tailwind-plugin',
    configurePostCss (postcssOptions) {
      postcssOptions.plugins.push(tailwind, autoprefixer);

      return postcssOptions;
    },
  };
}
