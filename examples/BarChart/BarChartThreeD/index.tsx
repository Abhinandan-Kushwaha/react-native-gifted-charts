import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Svg from 'react-native-svg';
import Column from './Column';

const BarChartThreeD = props => {
  const {
    data,
    height = 350,
    animationProperty,
    topColor,
    frontColor,
    sideColor,
    showBase,
    baseHeight,
    baseTopColor,
    baseFrontColor,
    baseSideColor,
    rowLabels,
    showValuesAsLabels,
    showNonZeroLabels,
    animationConfig = {
      initialValue: 22,
      finalValue: 2,
      interpolation: 'cubic',
      noOfFrames: 30,
      duration: 1000,
    },
    // animationConfig = {
    //   initialValue: Math.PI / 256,
    //   finalValue: Math.PI / 8,
    //   interpolation: 'cubic',
    //   noOfFrames: 100,
    //   duration: 1000,
    // },
  } = props;
  const [size, setSize] = useState(22);
  const [gap, setGap] = useState(2);
  const [angle, setAngle] = useState(Math.PI / 8);
  const ix = 130,
    iy = 110;

  const diff = animationConfig.finalValue - animationConfig.initialValue;
  const cubicAcc = (2 * diff) / Math.pow(animationConfig.noOfFrames, 3);
  const quadraticAcc = (2 * diff) / Math.pow(animationConfig.noOfFrames, 2);
  const getNextFrame = n => {
    if (animationConfig.interpolation === 'cubic') {
      return (n * n * n * cubicAcc) / 2;
    }
    return (n * n * quadraticAcc) / 2;
  };

  useEffect(() => {
    for (let i = 0; i < animationConfig.noOfFrames; i++) {
      setTimeout(() => {
        if (animationProperty === 'gap') {
          setGap(animationConfig.initialValue + getNextFrame(i));
        } else if (animationProperty === 'angle') {
          setAngle(animationConfig.initialValue + getNextFrame(i));
        } else if (animationProperty === 'size') {
          setSize(animationConfig.initialValue + getNextFrame(i));
        }
      }, (animationConfig.duration * i) / animationConfig.noOfFrames);
    }
  }, []);

  const cos = size * Math.cos(angle);
  const sin = size * Math.sin(angle);

  const getNextX = (x, n) => {
    return x + n * (cos + gap);
  };

  const getNextY = (y, n) => {
    return y + n * (sin + gap);
  };

  return (
    <View style={{height: height}}>
      <Svg>
        {data.map((item, index) => {
          return (
            <Column
              key={index + 'col'}
              ix={getNextX(ix, index)}
              iy={getNextY(iy, index)}
              size={size}
              gap={gap}
              angle={angle}
              topColor={item.topColor || topColor}
              frontColor={item.frontColor || frontColor}
              sideColor={item.sideColor || sideColor}
              data={item.bars}
              rowLabel={index === data.length - 1 ? 'here is it' : ''}
              columnLabel={item.columnLabel}
              showValuesAsLabels={showValuesAsLabels}
              showNonZeroLabels={showNonZeroLabels}
              showBase={showBase}
              baseHeight={baseHeight}
              baseTopColor={baseTopColor}
              baseFrontColor={baseFrontColor}
              baseSideColor={baseSideColor}
            />
          );
        })}
      </Svg>
    </View>
  );
};
export default BarChartThreeD;
