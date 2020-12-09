import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgFlutter(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 172 172"
      {...props}
    >
      <G
        strokeMiterlimit={10}
        style={{
          mixBlendMode: "normal",
        }}
      >
        <Path d="M0 172V0h172v172z" />
        <Path
          d="M93.167 14.333L21.5 86 43 107.5l93.167-93.167zM136.167 78.833L96.75 118.25l-21.5-21.5 17.917-17.917z"
          fill="#40c4ff"
        />
        <Path
          fill="#03a9f4"
          d="M53.749 118.251l21.499-21.5 21.5 21.5-21.5 21.5z"
        />
        <Path d="M136.167 157.667h-43L75.25 139.75l21.5-21.5z" fill="#01579b" />
        <Path d="M75.25 139.75L107.5 129l-10.75-10.75z" fill="#084994" />
      </G>
    </Svg>
  );
}

export default SvgFlutter;
