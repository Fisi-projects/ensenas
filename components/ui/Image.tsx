import * as React from 'react';
import type { ImageProps as ExpoImageProps } from 'expo-image';
import { Image as NImage } from 'expo-image';
import { cssInterop } from 'nativewind';

cssInterop(NImage, { className: 'style' });

export type ImgProps = ExpoImageProps & {
  className?: string;
  placeholder?: string;
};

export const Image = ({
  className,
  placeholder = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
  style,
  ...props
}: ImgProps) => {
  return (
    <NImage
      className={className}
      placeholder={placeholder}
      style={style}
      {...props}
    />
  );
};
