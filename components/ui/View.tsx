import { cssInterop } from "nativewind";
import * as React from "react";
import type { ViewProps as RNViewProps } from "react-native";
import { View as RNView } from "react-native";

cssInterop(RNView, { className: "style" });

export type ViewProps = RNViewProps & {
  className?: string;
};

export const View = ({ className, style, ...props }: ViewProps) => {
  return <RNView className={className} style={style} {...props} />;
};
