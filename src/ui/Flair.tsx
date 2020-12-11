import React from "react";
import {
  Angular,
  C,
  CSharp,
  Css,
  Cpp,
  Dart,
  Flutter,
  Go,
  Haskell,
  Html,
  Java,
  Javascript,
  Julia,
  Kotlin,
  Python,
  React1,
  Rust,
  Svelte,
  Swift,
  Typescript,
  Vue,
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
  css: Css,
  cpp: Cpp,
  dart: Dart,
  flutter: Flutter,
  go: Go,
  haskell: Haskell,
  html: Html,
  java: Java,
  javascript: Javascript,
  julia: Julia,
  kotlin: Kotlin,
  python: Python,
  react: React1,
  rust: Rust,
  svelte, Svelte,
  swift: Swift,
  typescript: Typescript,
  vue: Vue,
};

export const Flair: React.FC<FlairProps> = ({ size = 24, name }) => {
  const Comp = flairToComponent[name];
  return Comp ? <Comp width={size} height={size} /> : null;
};
