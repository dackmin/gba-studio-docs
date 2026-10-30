import { useCallback, useEffect, useState } from 'react';
import { OSName, CPUArch } from 'ua-parser-js/enums';
import { classNames } from '@junipero/core';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import { useUserAgent } from '../services/hooks';
import HomeHero from '../components/HomeHero';

const Home = () => {
  const ua = useUserAgent();
  const [platformLink, setPlatformLink] = useState<string | null>(null);

  const getOS = useCallback(() => {
    switch (ua.getOS().name) {
      case OSName.WINDOWS:
        return 'win32';
      case OSName.MACOS:
        return 'macos';
      default:
        return 'unknown';
    }
  }, [ua]);

  const getCPUArch = useCallback(async () => {
    const cpu = await ua.getCPU().withClientHints();

    switch (cpu.architecture) {
      case CPUArch.ARM_64:
        return 'arm64';
      case CPUArch.X86_64:
        return 'x64';
      default:
        return 'unknown';
    }
  }, [ua]);

  const resolvePlatformLink = useCallback(async () => {
    const { tag_name: name } = await fetch(
      'https://api.github.com/repos/dackmin/gba-studio/releases/latest'
    ).then(res => res.json());

    const os = getOS();
    const arch = await getCPUArch();

    if (os === 'unknown' || arch === 'unknown') {
      return null;
    }

    setPlatformLink(
      `https://github.com/dackmin/gba-studio/releases` +
        `/download/${name}` +
        `/gba-studio-${name.replace(/^v/, '')}-${os}-${arch}.zip`
    );
  }, [getOS, getCPUArch]);

  useEffect(() => {
    resolvePlatformLink();
  }, [resolvePlatformLink]);

  return (
    <Layout
      description="GB Studio but worse and for the GBA"
    >
      <header className="bg-concrete dark:bg-onyx">
        <div className="container">
          <div
            className={classNames(
              'flex flex-col-reverse xl:grid xl:grid-cols-2 justify-center items-center gap-8',
              'py-12 xl:py-48'
            )}
          >
            <div className="flex flex-col gap-8 px-4 xl:px-12">
              <h1>Create real GBA games in minutes with zero coding knowledge.</h1>
              <p>
                GBA Studio is a no-code, event-based game creation tool for the Game Boy Advance.
                Much like { ' ' }
                <a href="https://gbstudio.dev" target="_blank" rel="noopener noreferrer">
                  GB Studio
                </a>, but badly made.
              </p>
              <div className="flex items-center gap-4">
                <a
                  className="button button--primary button--lg"
                  href={platformLink || 'https://github.com/dackmin/gba-studio/releases/latest'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download for { ua.getOS().name }
                </a>
                <a
                  href="https://github.com/dackmin/gba-studio/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Other platforms
                </a>
              </div>
            </div>
            <div className="flex justify-center xl:justify-end">
              <HomeHero />
            </div>
          </div>
        </div>
      </header>
      <main className="container py-12 xl:py-24">
        <h2 className="text-center mb-12">Create <strong>any</strong> type of 2D game</h2>
        <div className="grid xl:grid-cols-3 gap-12">
          <figure>
            <a
              className="block group"
              target="_blank"
              rel="noopener noreferrer"
              href="https://widseylabs.itch.io/pocket-valley-essentials"
            >
              <img
                src="/images/top-down.png"
                alt="Example Top-Down 2D Game"
                className="rounded-xl group-hover:scale-102 transition-transform duration-200"
              />
            </a>
            <figcaption className="text-center">Top-Downs/Adventures</figcaption>
          </figure>
          <figure>
            <a
              className="block group"
              target="_blank"
              rel="noopener noreferrer"
              href="https://shackhal.itch.io/multi-platformer-tileset"
            >
              <img
                src="/images/platformer.png"
                alt="Example Side-Scroller 2D Game"
                className="rounded-xl group-hover:scale-102 transition-transform duration-200"
              />
            </a>
            <figcaption className="text-center">Side-Scrollers/Platformers</figcaption>
          </figure>
          <figure>
            <a
              className="block group"
              target="_blank"
              rel="noopener noreferrer"
              href="https://everyday-hologram.itch.io/parallax-city-background"
            >
              <img
                src="/images/pnc.png"
                alt="Example Point-and-Click 2D Game"
                className="rounded-xl group-hover:scale-102 transition-transform duration-200"
              />
            </a>
            <figcaption className="text-center">Point-and-Clicks</figcaption>
          </figure>
        </div>
        <div className="text-center mt-12">
          <Link
            className="button button--primary button--lg"
            to="/docs"
          >
            Get Started
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
