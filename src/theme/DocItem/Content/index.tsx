import React, {type ReactNode} from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type {WrapperProps} from '@docusaurus/types';

import ValueDiagram from '@site/src/components/HomepageFeatures/ValueDiagram';

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): ReactNode {
  return (
    <>
    <ValueDiagram/>
      <Content {...props} />
    </>
  );
}
