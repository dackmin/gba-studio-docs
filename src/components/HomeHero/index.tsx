import { type ComponentPropsWithoutRef, type SyntheticEvent, useState } from 'react';
import { classNames } from '@junipero/core';
import {
  ChatBubbleIcon,
  LayersIcon,
  MoveIcon,
  ShadowIcon,
  ShadowNoneIcon,
} from '@radix-ui/react-icons';

import Event from './Event';

const HomeHero = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<'div'>) => {
  const [active, setActive] = useState(0);

  const onProgress = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    const currentTime = video.currentTime;

    if (currentTime < 0.2) setActive(0);
    else if (currentTime < 1) setActive(1);
    else if (currentTime < 4.5) setActive(2);
    else if (currentTime < 7) setActive(3);
    else if (currentTime < 10.5) setActive(-1);
    else if (currentTime < 11) setActive(4);
    else if (currentTime < 11.5) setActive(5);
    else setActive(-1);
  };

  return (
    <div { ...rest } className={classNames('relative', className)}>
      <div
        className={classNames(
          'hidden xl:flex xl:absolute!',
          'top-1/2 right-[calc(100%+20px)] -translate-y-[50%] flex-col gap-2',
        )}
      >
        <Event
          icon={ShadowIcon}
          name="Fade In"
          active={active === 0}
        />
        <Event
          icon={MoveIcon}
          name="Move Actor To"
          active={active === 1}
        />
        <Event
          icon={ChatBubbleIcon}
          name="Show Dialog"
          active={active === 2}
        />
        <Event
          icon={MoveIcon}
          name="Move Actor To"
          active={active === 3}
        />
        <Event
          icon={ShadowNoneIcon}
          name="Fade Out"
          active={active === 4}
        />
        <Event
          icon={LayersIcon}
          name="Go To Scene"
          active={active === 5}
        />
      </div>
      <video
        src="/videos/intro.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="h-[320px] rounded-xl relative z-10"
        onTimeUpdate={onProgress}
      />
    </div>
  );
};

export default HomeHero;
