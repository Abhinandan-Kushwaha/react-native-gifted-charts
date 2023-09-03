import React from 'react';
import Svg, {Defs, Rect} from 'react-native-svg';

const BarBackgroundPattern = props => {
  const {
    barBackgroundPatternFromItem,
    barBackgroundPatternFromProps,
    patternIdFromItem,
    patternIdFromProps,
  } = props;
  return (
    <Svg>
        <Defs>
            {barBackgroundPatternFromItem
            ? barBackgroundPatternFromItem()
            : barBackgroundPatternFromProps()}
        </Defs>
        <Rect
            stroke="transparent"
            x="1"
            y="1"
            width="100%"
            height="100%"
            fill={`url(#${patternIdFromItem ?? patternIdFromProps})`}
        />
        </Svg>
  );
};

export default BarBackgroundPattern;
