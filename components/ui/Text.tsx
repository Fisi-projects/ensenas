import { cssInterop } from 'nativewind';
import * as React from 'react';
import type { TextProps } from 'react-native';
import { Text as RNText } from 'react-native';

cssInterop(RNText, { className: 'style' });

export type StyledTextProps = TextProps & {
  className?: string;
};

export const Text = ({
  className,
  style,
  ...props
}: StyledTextProps) => {
  return (
    <RNText
      className={className}
      style={style}
      {...props}
    />
  );
};
