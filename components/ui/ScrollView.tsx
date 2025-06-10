import { cssInterop } from "nativewind";
import * as React from "react";
import type { ScrollViewProps } from "react-native";
import { ScrollView as RNScrollView } from "react-native";

cssInterop(RNScrollView, { className: "style" });

export type ScrollProps = ScrollViewProps & {
  className?: string;
};

export const ScrollView = ({ className, style, ...props }: ScrollProps) => {
  return <RNScrollView className={className} style={style} {...props} />;
};
