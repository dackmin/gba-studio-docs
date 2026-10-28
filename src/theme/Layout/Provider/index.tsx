import type { ReactNode } from 'react';
import type ProviderType from '@theme/Layout/Provider';
import type { WrapperProps } from '@docusaurus/types';
import Provider from '@theme-original/Layout/Provider';

import Inner from './Inner';

type Props = WrapperProps<typeof ProviderType>;

export default function ProviderWrapper ({ children, ...rest }: Props): ReactNode {
  return (
    <Provider { ...rest }>
      <Inner>
        { children }
      </Inner>
    </Provider>
  );
}
