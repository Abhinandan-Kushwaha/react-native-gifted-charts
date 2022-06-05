import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Svg from 'react-native-svg';
import {rainbowColors} from './colors';
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
    rainbow,
    rowLabelConfig,
    columnLabelConfig,
    labelConfig,
    showValuesAsLabels,
    showNonZeroLabels,
    // animationConfig = {
    //   initialValue: 15,
    //   finalValue: 25,
    //   interpolation: 'cubic',
    //   noOfFrames: 50,
    //   duration: 1000,
    // },
    // animationConfig = {
    //   initialValue: 22,
    //   finalValue: 2,
    //   interpolation: 'cubic',
    //   noOfFrames: 50,
    //   duration: 1000,
    // },
    animationConfig = {
      initialValue: Math.PI / 512,
      finalValue: Math.PI / 6,
      interpolation: 'cubic',
      noOfFrames: 20,
      duration: 1000,
    },
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

  let maxValue = 0;
  data.forEach(dataItem => {
    dataItem.bars.forEach(barItem => {
      if (barItem.value > maxValue) maxValue = barItem.value;
    });
  });

  const q1 = maxValue / 3;
  const q3 = (2 * maxValue) / 3;

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
  let c = 0;

  const getNextX = (x, n) => {
    return x + n * (cos + gap);
  };

  const getNextY = (y, n) => {
    return y + n * (sin + gap);
  };

  const sevenColors = [
    'violet',
    'indigo',
    'blue',
    'green',
    'yellow',
    'orange',
    'red',
  ];

  // let prevColorIndex = -1;
  // let prev2ColorIndex = -1;

  return (
    <View style={{height: height}}>
      <Svg>
        {data.map((item, index) => {
          const colorIndex = Math.round((index * 7) / data.length);
          // console.log('colorIndex', colorIndex);
          const columnColor = rainbowColors[sevenColors[colorIndex]];
          // console.log('columnColor', columnColor);

          let baseFront = columnColor.front.baseDark;
          let baseTop = columnColor.top.baseDark;
          let baseSide = columnColor.side.baseDark;

          // if (prevColorIndex === colorIndex) {
          //   baseFront = columnColor.front.baseMedium;
          //   baseTop = columnColor.top.baseMedium;
          //   baseSide = columnColor.side.baseMedium;
          // }
          // if (prev2ColorIndex === colorIndex) {
          //   baseFront = columnColor.front.baseDark;
          //   baseTop = columnColor.top.baseDark;
          //   baseSide = columnColor.side.baseDark;
          // }

          // prev2ColorIndex = prevColorIndex;
          // prevColorIndex = colorIndex;

          return (
            <Column
              key={index + 'col'}
              ix={getNextX(ix, index)}
              iy={getNextY(iy, index)}
              size={size}
              gap={gap}
              angle={angle}
              rainbow={rainbow}
              columnColor={columnColor}
              q1={q1}
              q3={q3}
              topColor={item.topColor || topColor}
              frontColor={item.frontColor || frontColor}
              sideColor={item.sideColor || sideColor}
              // topColor={
              //   rainbow
              //     ? item.topColor ||
              //       topColor ||
              //       (item.value < q1
              //         ? columnColor.top.dark
              //         : item.value < q3
              //         ? columnColor.top.medium
              //         : columnColor.top.light)
              //     : item.topColor || topColor
              // }
              // frontColor={
              //   rainbow
              //     ? item.frontColor ||
              //       frontColor ||
              //       (item.value < q1
              //         ? columnColor.front.dark
              //         : item.value < q3
              //         ? columnColor.front.medium
              //         : columnColor.front.light)
              //     : item.frontColor || frontColor
              // }
              // sideColor={
              //   rainbow
              //     ? item.sideColor ||
              //       sideColor ||
              //       (item.value < q1
              //         ? columnColor.side.dark
              //         : item.value < q3
              //         ? columnColor.side.medium
              //         : columnColor.side.light)
              //     : item.sideColor || sideColor
              // }
              data={item.bars}
              rowLabels={item.labels}
              columnLabel={item.columnLabel}
              showValuesAsLabels={showValuesAsLabels}
              showNonZeroLabels={showNonZeroLabels}
              showBase={showBase}
              baseHeight={baseHeight}
              baseTopColor={rainbow ? baseTopColor || baseTop : baseTopColor}
              baseFrontColor={
                rainbow ? baseFrontColor || baseFront : baseTopColor
              }
              baseSideColor={
                rainbow ? baseSideColor || baseSide : baseSideColor
              }
              rowLabelConfig={rowLabelConfig}
              columnLabelConfig={columnLabelConfig}
              labelConfig={labelConfig}
            />
          );
        })}
      </Svg>
    </View>
  );
};
export default BarChartThreeD;
