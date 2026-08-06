import React, {type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';

import {useThemeConfig} from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';

function Footer(): ReactNode {
  const {pathname} = useLocation();
  const {footer} = useThemeConfig();

  if (!footer || pathname === '/docs' || pathname.startsWith('/docs/')) {
    return null;
  }

  const {copyright, links, logo, style} = footer;

  return (
    <FooterLayout
      style={style}
      links={links && links.length > 0 && <FooterLinks links={links} />}
      logo={logo && <FooterLogo logo={logo} />}
      copyright={copyright && <FooterCopyright copyright={copyright} />}
    />
  );
}

export default React.memo(Footer);
