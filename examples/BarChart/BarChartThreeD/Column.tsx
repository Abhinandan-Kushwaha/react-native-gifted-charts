import React from 'react';
import {G} from 'react-native-svg';
import Cuboid from './Cuboid';

const Column = props => {
  const {
    ix,
    iy,
    size,
    gap,
    angle,
    data,
    topColor,
    frontColor,
    sideColor,
    showBase = true,
    baseHeight = 2,
    baseTopColor,
    baseFrontColor,
    baseSideColor,
    labelConfig,
    rowLabels,
    rowLabelConfig,
    columnLabel,
    columnLabelConfig,
    showValuesAsLabels,
    showNonZeroLabels,
    rainbow,
    columnColor,
    baseOpacity,
    q1,
    q3,
  } = props;
  const sinFactor = Math.PI / angle / 2 - 1;
  const getNextX = (x, n) => {
    return x - n * (size * Math.cos(angle) + gap);
  };

  const getNextY = (y, n) => {
    return y + n * (size * Math.cos(angle * sinFactor) + gap);
  };

  // console.log('columnColor...........',columnColor)

  return (
    <G>
      {data.map((item, index) => {
        if (showBase && !item.value) {
          return (
            <Cuboid
              key={index + 'k'}
              ix={getNextX(ix, index)}
              iy={getNextY(iy, index)}
              height={baseHeight}
              size={size}
              angle={angle}
              opacity={baseOpacity || (rainbow ? 0.5 : 1)}
              topColor={item.baseTopColor || baseTopColor || '#ddd'}
              frontColor={item.baseFrontColor || baseFrontColor || '#999'}
              sideColor={item.baseSideColor || baseSideColor || '#aaaaaa'}
              columnLabel={index === data.length - 1 ? columnLabel : ''}
              rowLabel={rowLabels ? rowLabels[index] : ''}
              rowLabelConfig={rowLabelConfig}
              columnLabelConfig={columnLabelConfig}
              label={
                item.label ||
                (showValuesAsLabels
                  ? item.value === 0
                    ? showNonZeroLabels
                      ? ''
                      : '0'
                    : item.value || ''
                  : '')
              }
              labelConfig={labelConfig}
            />
          );
        }
        if(!item.value) return null;
        return (
          <Cuboid
            key={index + 'k'}
            ix={getNextX(ix, index)}
            iy={getNextY(iy, index)}
            height={item.value + baseHeight}
            size={size}
            angle={angle}
            // topColor={item.topColor || topColor || 'rgb(150,200,150)'}
            // frontColor={item.frontColor || frontColor || 'lightgreen'}
            // sideColor={item.sideColor || sideColor || 'green'}
            topColor={
              rainbow
                ? item.topColor ||
                  topColor ||
                  (item.value < q1
                    ? columnColor.top.dark
                    : item.value < q3
                    ? columnColor.top.medium
                    : columnColor.top.light)
                : item.topColor || topColor
            }
            frontColor={
              rainbow
                ? item.frontColor ||
                  frontColor ||
                  (item.value < q1
                    ? columnColor.front.dark
                    : item.value < q3
                    ? columnColor.front.medium
                    : columnColor.front.light)
                : item.frontColor || frontColor
            }
            sideColor={
              rainbow
                ? item.sideColor ||
                  sideColor ||
                  (item.value < q1
                    ? columnColor.side.dark
                    : item.value < q3
                    ? columnColor.side.medium
                    : columnColor.side.light)
                : item.sideColor || sideColor
            }
            columnLabel={index === data.length - 1 ? columnLabel : ''}
            rowLabel={rowLabels ? rowLabels[index] : ''}
            rowLabelConfig={rowLabelConfig}
            columnLabelConfig={columnLabelConfig}
            label={
              item.label ||
              (showValuesAsLabels
                ? item.value === 0
                  ? showNonZeroLabels
                    ? ''
                    : '0'
                  : item.value || ''
                : '')
            }
            labelConfig={labelConfig}
          />
        );
      })}
    </G>
  );
};
export default Column;
