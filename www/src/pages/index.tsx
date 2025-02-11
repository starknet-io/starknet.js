import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import { Helmet } from 'react-helmet';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img src={`${siteConfig.baseUrl}img/Starknet-JS_logo.png`} />
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/guides/intro">
            Get Started - 5 min ⏱️
          </Link>
        </div>
      </div>
      <a className="twitter-timeline" data-width="250" data-height="500" data-dnt="true" data-theme="dark" href="https://twitter.com/starknetjs?ref_src=twsrc%5Etfw">Tweets by Starknetjs</a>
      <Helmet>
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      </Helmet>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={``}
      description="JavaScript library for Starknet"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
