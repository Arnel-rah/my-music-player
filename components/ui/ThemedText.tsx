import React from "react";
import { Text, TextProps } from "react-native";

type TextVariant = "title" | "subtitle" | "body" | "caption" | "error";

interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
}

const variantConfig: Record<TextVariant, string> = {
  title:    "text-3xl font-bold text-white",
  subtitle: "text-xl font-semibold text-white",
  body:     "text-base text-white",
  caption:  "text-xs text-gray-400",
  error:    "text-sm text-red-500 font-medium",
};

export function ThemedText({ variant = "body", children, className, ...rest }: ThemedTextProps) {
  return (
    <Text className={`${variantConfig[variant]} ${className ?? ""}`} {...rest}>
      {children}
    </Text>
  );
}

export default ThemedText;