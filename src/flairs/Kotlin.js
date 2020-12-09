import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgKotlin(props) {
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
          d="M86 21.5L64.464 44.254 42.892 66.973 21.5 89.582V21.5z"
          fill="#0d91d6"
        />
        <Path
          d="M86 21.5h-.143L64.392 44.183 42.858 66.937 21.5 89.476V150.5l31.14-31.14 22.144-22.144 22.181-22.181 22.18-22.18L150.5 21.5z"
          fill="#f88909"
        />
        <Path d="M52.64 119.36L21.5 150.5V89.906z" fill="#c757bc" />
        <Path
          d="M74.784 97.216L52.64 119.36 21.5 89.906v-.323l21.393-22.61z"
          fill="#d3638f"
        />
        <Path
          d="M96.965 75.035l-22.18 22.18-31.892-30.243 21.571-22.718z"
          fill="#e07063"
        />
        <Path
          d="M119.146 52.854L96.965 75.035l-32.5-30.78L86 21.5z"
          fill="#ec7d36"
        />
        <Path d="M150.5 21.5l-31.354 31.354L86 21.5z" fill="#f88909" />
        <Path
          d="M41.244 68.62L28.631 81.988 21.5 75.25V49.952z"
          fill="#0095d5"
        />
        <Path
          d="M53.858 55.255L41.243 68.621 21.5 49.95V24.618z"
          fill="#2b88da"
        />
        <Path
          d="M66.507 41.925l-12.65 13.33L21.5 24.617V21.5h23.4z"
          fill="#557bde"
        />
        <Path d="M79.12 28.56L66.507 41.924 44.899 21.5H86z" fill="#806ee3" />
        <Path d="M82.417 89.583L21.5 150.5h121.833z" fill="#0095d5" />
        <Path
          d="M92.02 150.5H62.78l-20.64-20.604 14.62-14.62z"
          fill="#2b88da"
        />
        <Path
          d="M121.332 150.5H92.02l-35.26-35.224 14.62-14.62z"
          fill="#557bde"
        />
        <Path d="M150.5 150.5h-29.168L71.38 100.656 86 86z" fill="#806ee3" />
      </G>
    </Svg>
  );
}

export default SvgKotlin;
