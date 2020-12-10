import React from "react";
import {
  Angular,
  C,
  CSharp,
  Cpp,
  Dart,
  Flutter,
  Go,
  Java,
  Kotlin,
  Python,
  React1,
  Swift,
  Vue,
  Rust,
  // @ts-ignore
} from "../flairs";

interface FlairProps {
  size?: number;
  name: keyof typeof flairToComponent;
}

const flairToComponent = {
  angular: Angular,
  c: C,
  cSharp: CSharp,
  cpp: Cpp,
  dart: Dart,
  flutter: Flutter,
  go: Go,
  java: Java,
  kotlin: Kotlin,
  python: Python,
  react: React1,
  swift: Swift,
  vue: Vue,
  rust: Rust,
};

export const Flair: React.FC<FlairProps> = ({ size = 24, name }) => {
  const Comp = flairToComponent[name];
  return Comp ? <Comp width={size} height={size} /> : null;
};
