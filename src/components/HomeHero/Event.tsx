import type { FC } from 'react';
import { type IconProps, Card, Text } from '@radix-ui/themes';
import { classNames } from '@junipero/core';

export interface EventProps {
  icon: FC<IconProps>;
  name: string;
  active?: boolean;
}

const Event = ({
  icon: Icon,
  name,
  active,
}: EventProps) => {
  return (
    <Card
      className={classNames(
        'flex! w-[200px] items-center gap-2',
        {
          'outline-2 outline-(--accent-9)': active,
        }
      )}
    >
      <Icon
        className="[&_path]:fill-(--accent-9)"
      />
      <Text>{ name }</Text>
    </Card>
  );
};

export default Event;
