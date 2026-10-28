import { useState } from 'react';
import { UAParser } from 'ua-parser-js';

export const useUserAgent = () => {
  const [ua] = useState(() => new UAParser());

  return ua;
};
