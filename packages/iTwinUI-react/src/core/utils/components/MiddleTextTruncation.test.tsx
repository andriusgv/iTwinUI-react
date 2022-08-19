/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import MiddleTextTruncation from './MiddleTextTruncation';
import * as UseOverflow from '../hooks/useOverflow';

it('should truncate the text', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 20]);
  const { container } = render(
    <div>
      <MiddleTextTruncation text='This is some very long text to truncate and expect ellipsis' />
    </div>,
  );

  const containerSpan = container.querySelector('span') as HTMLSpanElement;
  expect(containerSpan.textContent).toBe('This is some …lipsis');
});

it('should truncate the text and leave 20 symbols at the end', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 50]);
  const { container } = render(
    <div>
      <MiddleTextTruncation
        endCharsCount={20}
        text='This is some very long text to truncate and you never know what could happen, because we have twenty characters expectation at the end of the truncated text'
      />
    </div>,
  );

  const containerSpan = container.querySelector('span') as HTMLSpanElement;
  expect(containerSpan.textContent).toBe(
    'This is some very long text t…f the truncated text',
  );
});

it('should leave original text (same length)', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 20]);
  const { container } = render(
    <div>
      <MiddleTextTruncation text='This is a short text' />
    </div>,
  );

  const containerSpan = container.querySelector('span') as HTMLSpanElement;
  expect(containerSpan.textContent).toBe('This is a short text');
});

it('should leave original text', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 20]);
  const { container } = render(
    <div>
      <MiddleTextTruncation text='No trunc' />
    </div>,
  );

  const containerSpan = container.querySelector('span') as HTMLSpanElement;
  expect(containerSpan.textContent).toBe('No trunc');
});

it('should call onTruncate callback with true', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 20]);
  const onTruncate = jest.fn();
  render(
    <div>
      <MiddleTextTruncation
        onTruncate={onTruncate}
        text='This is some very long text to truncate and get callback'
      />
    </div>,
  );

  expect(onTruncate).toHaveBeenCalledWith(true);
});

it('should call onTruncate callback with false', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 20]);
  const onTruncate = jest.fn();
  render(
    <div>
      <MiddleTextTruncation onTruncate={onTruncate} text='No trunc' />
    </div>,
  );

  expect(onTruncate).toHaveBeenCalledWith(false);
});
