/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useOverflow } from '../hooks/useOverflow';
import { CommonProps } from '../props';

const ELLIPSIS_CHAR = '…';

export type MiddleTextTruncationProps = {
  /**
   * Text to truncate.
   */
  text: string;
  /**
   * Number of characters to leave at the end.
   * @default 6
   */
  endCharsCount?: number;
  /**
   * Callback fired when text is truncated.
   */
  onTruncate?: (isTruncated: boolean) => void;
} & CommonProps;

/**
 * Truncates text with the ellipsis in the middle,
 * leaving defined number of chars at the end.
 * @example
 * <MiddleTextTruncation text='ThisIsMyVeryLongFileName.dgn' />
 */
export const MiddleTextTruncation = (props: MiddleTextTruncationProps) => {
  const { text, endCharsCount = 6, onTruncate, style, ...rest } = props;
  const [ref, visibleCount] = useOverflow(text);

  const truncatedText = React.useMemo(() => {
    if (visibleCount < text.length) {
      onTruncate?.(true);
      return `${text.substring(
        0,
        visibleCount - endCharsCount - ELLIPSIS_CHAR.length,
      )}${ELLIPSIS_CHAR}${text.substring(text.length - endCharsCount)}`;
    } else {
      onTruncate?.(false);
      return text;
    }
  }, [endCharsCount, onTruncate, text, visibleCount]);

  return (
    <span
      style={{
        display: 'flex',
        minWidth: 0,
        flexGrow: 1,
        whiteSpace: 'nowrap',
        ...style,
      }}
      ref={ref}
      {...rest}
    >
      {truncatedText}
    </span>
  );
};

export default MiddleTextTruncation;
