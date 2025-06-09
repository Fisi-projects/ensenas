import { cssInterop } from 'nativewind';
import * as React from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';

cssInterop(RNTouchableOpacity, { className: 'style' });

export type TouchableProps = TouchableOpacityProps & {
  className?: string;
};

export const TouchableOpacity = ({
  className,
  style,
  ...props
}: TouchableProps) => {
  return (
    <RNTouchableOpacity
      className={className}
      style={style}
      {...props}
    />
  );
};
