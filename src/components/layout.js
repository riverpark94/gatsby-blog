import React, { useState, useEffect } from 'react';
import Header from './header';
import '../../static/reset.css';
import 'prismjs/themes/prism-tomorrow.css';
import '../../static/common.css';
import { Box } from 'rebass/styled-components';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import OutsideClick from './outsideClick';
import { Helmet } from 'react-helmet';
import get from 'lodash/get';

export default function Template(props) {
  const { children, data } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const siteTitle = get(data, 'site.siteMetadata.title');
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const curScrollY = window.pageYOffset;
      if (curScrollY > 80 && prevScrollY < curScrollY && showHeader) {
        setShowHeader(false);
      } else if (
        (curScrollY <= 80 || prevScrollY > curScrollY) &&
        !showHeader
      ) {
        setShowHeader(true);
      }
      showMenu && setShowMenu(false);
      setPrevScrollY(window.pageYOffset);
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          '@media screen and (max-width: 768px)': {
            overflowX: 'hidden',
          },
        }}
      >
        <Helmet htmlAttributes={{ lang: 'ko' }} title={siteTitle}>
          <meta
            name="google-site-verification"
            content="R3ZeY1PmaJUY9j_cgNABjesJFgHWVCJpb4TsdfXntMA"
          />
          <meta
            name="naver-site-verification"
            content="23eddf7267bb527337927baff11fc26157637f30"
          />
        </Helmet>
        <OutsideClick onClick={() => setShowMenu(false)}>
          <Header
            {...props}
            showMenu={showMenu}
            showHeader={showHeader}
            onClickMenu={() => setShowMenu(!showMenu)}
          />
        </OutsideClick>

        <Box
          as="main"
          className="contents"
          mx="auto"
          p="45px 15px"
          sx={{
            maxWidth: '720px',
            // '@media screen and (min-width: 1200px)': {
            //   maxWidth: '100%',
            //   padding: '0 20px',
            // },
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
