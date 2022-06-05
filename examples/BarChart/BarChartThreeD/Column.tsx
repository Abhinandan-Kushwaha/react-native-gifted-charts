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
    baseHeight = 3,
    baseTopColor,
    baseFrontColor,
    baseSideColor,
    rowLabel,
    columnLabel,
    showValuesAsLabels,
    showNonZeroLabels,
  } = props;
  const sinFactor = Math.PI / angle / 2 - 1;
  const getNextX = (x, n) => {
    return x - n * (size * Math.cos(angle) + gap);
  };

  const getNextY = (y, n) => {
    return y + n * (size * Math.cos(angle * sinFactor) + gap);
  };

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
              topColor={item.baseTopColor || baseTopColor || '#ddd'}
              frontColor={item.baseFrontColor || baseFrontColor || '#999'}
              sideColor={item.baseSideColor || baseSideColor || '#aaaaaa'}
              columnLabel={index === data.length - 1 ? columnLabel : ''}
              rowLabel={rowLabel}
              rowLabelConfig={{color: 'yellow', fontSize: 13}}
              columnLabelConfig={{color: 'white', fontSize: 13}}
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
            />
          );
        }
        return (
          <Cuboid
            key={index + 'k'}
            ix={getNextX(ix, index)}
            iy={getNextY(iy, index)}
            height={item.value + baseHeight}
            size={size}
            angle={angle}
            topColor={item.topColor || topColor || 'rgb(150,200,150)'}
            frontColor={item.frontColor || frontColor || 'lightgreen'}
            sideColor={item.sideColor || sideColor || 'green'}
            columnLabel={index === data.length - 1 ? columnLabel : ''}
            rowLabel={rowLabel}
            rowLabelConfig={{color: 'yellow', fontSize: 13}}
            columnLabelConfig={{color: 'white', fontSize: 13}}
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
          />
        );
      })}
    </G>
  );
};
export default Column;
