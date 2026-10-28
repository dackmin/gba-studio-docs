import type { ComponentPropsWithoutRef } from 'react';
import { Theme } from '@radix-ui/themes';
import { useColorMode } from '@docusaurus/theme-common';

const Inner = (props: ComponentPropsWithoutRef<'div'>) => {
  const { colorMode } = useColorMode();

  return (
    <Theme appearance={colorMode} { ...props } />
  );
};

export default Inner;
