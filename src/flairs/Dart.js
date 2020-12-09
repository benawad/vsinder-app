import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgDart(props) {
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
          d="M35.833 43l10.75 89.583L17.85 103.85a14.331 14.331 0 01-2.853-16.197z"
          fill="#1565c0"
        />
        <Path
          d="M97.893 22.643a16.132 16.132 0 00-19.06-2.799L35.833 43v72.896c0 3.802 1.509 7.446 4.2 10.133l6.55 6.554h78.834v-17.916L150.5 75.25z"
          fill="#42a5f5"
        />
        <Path
          d="M35.833 43h76.48c3.801 0 7.446 1.509 10.133 4.2L150.5 75.25v57.333h-25.083z"
          fill="#1565c0"
        />
        <Path d="M125.417 132.583H46.583l21.5 21.5h57.334z" fill="#85cbf8" />
      </G>
    </Svg>
  );
}

export default SvgDart;
