import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img className={styles.heroLogo} src={`${siteConfig.baseUrl}img/Starknet-JS_logo.png`} />
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/guides/intro">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function SkillSection() {
  return (
    <div className={clsx('hero hero--primary', styles.heroBanner, styles.skillSection)}>
      <div className={clsx(styles.skillContainer)}>
        <h2>Teach your AI coding agent starknet.js</h2>
        <p>
          AI training data is outdated — install the starknet.js skill to give your coding agent
          accurate, up-to-date guidance. Works with Claude Code, Codex, Cursor, Gemini CLI, and any
          other agent supporting the open skill standard.
        </p>
        <CodeBlock language="bash">npx skills add starknet-io/starknet.js</CodeBlock>
        <p>or copy the skill files directly:</p>
        <CodeBlock language="bash">
          {'mkdir -p ~/.claude/skills/starknet-js && curl -s --output-dir ~/.claude/skills/starknet-js --remote-name-all "https://raw.githubusercontent.com/starknet-io/starknet.js/develop/skills/starknet-js/{SKILL.md,calldata.md,interacting.md}"'}
        </CodeBlock>
        <p className={styles.skillNote}>
          This command installs into Claude Code&apos;s skills folder — adapt the target directory
          for other agents.
        </p>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title={``} description="JavaScript library for Starknet">
      <HomepageHeader />
      <main>
        <SkillSection />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
