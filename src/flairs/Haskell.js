import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgHaskell(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="17cm"
      height="12cm"
      viewBox="0 0 170 120"
      {...props}
    >
      <Path
        d="M0 120l40-60L0 0h30l40 60-40 60m106.667-35l-13.334-20H170v20m-53.333-30l-13.334-20H170v20"
        fill="#666"
      />
      <Path d="M40 120l40-60L40 0h30l80 120h-30L95 82.5 70 120" fill="#999" />
    </Svg>
  );
}

export default SvgHaskell;
