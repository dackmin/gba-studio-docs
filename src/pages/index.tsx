import { classNames } from '@junipero/core';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const Home = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />"
    >
      <header className={classNames('hero hero--primary')}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            { siteConfig.title }
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div>
            <Link
              className="button button--secondary button--lg"
              to="/docs">
              Docusaurus Tutorial - 5min ⏱️
            </Link>
          </div>
        </div>
      </header>
      <main>
        <h1>Hello world</h1>
      </main>
    </Layout>
  );
};

export default Home;
