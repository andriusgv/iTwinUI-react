// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import SvgError from '@bentley/icons-generic-react/cjs/icons/status/Error';
import SvgSuccess from '@bentley/icons-generic-react/cjs/icons/status/Success';
import SvgWarning from '@bentley/icons-generic-react/cjs/icons/status/Warning';
import React from 'react';

export const StatusIconMap: {
  [key in 'negative' | 'positive' | 'warning']: JSX.Element;
} = {
  negative: <SvgError />,
  positive: <SvgSuccess />,
  warning: <SvgWarning />,
};
