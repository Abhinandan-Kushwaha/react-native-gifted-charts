import * as React from 'react';
import {ColorValue} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';
import { ruleTypes } from 'gifted-charts-core';

type ruleProps = {
  thickness: number;
  width: number;
  color: ColorValue | String | any;
  type: String;
  dashWidth: number;
  dashGap: number;
};

type configType = {
  config: ruleProps;
};

function Rule(props: configType) {
  const {thickness, width, color, type, dashWidth, dashGap} = props.config;
  if (type === ruleTypes.SOLID) {
    return (
      <Svg height={thickness} width={width} {...props}>
        <G fill="lightgray" stroke={color} strokeWidth={thickness}>
          <Path d={`M0 ${thickness / 2}h${width}`} />
        </G>
      </Svg>
    );
  }
  return (
    <Svg height={thickness} width={width} {...props}>
      <G fill="lightgray" stroke={color} strokeWidth={thickness}>
        <Path
          strokeDasharray={`${dashWidth},${dashGap}`}
          d={`M0 ${thickness / 2}h${width}`}
        />
      </G>
    </Svg>
  );
}

export default Rule;
