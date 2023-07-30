import React from 'react';
import {View} from 'react-native';
import {chartTypes} from '../../utils';

const RenderVerticalLines = props => {
  const {
    verticalLinesAr,
    verticalLinesSpacing,
    spacing,
    initialSpacing,
    verticalLinesZIndex,
    verticalLinesHeight,
    verticalLinesThickness,
    verticalLinesColor,
    verticalLinesUptoDataPoint,
    xAxisThickness,
    labelsExtraHeight,
    containerHeight,
    data,
    stackData,
    barWidth,
    maxValue,
    chartType,
    containerHeightIncludingBelowXAxis,
  } = props;

  const getHeightOfVerticalLine = index => {
    if(verticalLinesUptoDataPoint){
      if(index < data.length){
        return (data[index].value * containerHeight) / maxValue - xAxisThickness;
      }
      else{
        return verticalLinesHeight ?? 0;
      }
    }
    else{
      return verticalLinesHeight || containerHeightIncludingBelowXAxis - xAxisThickness;
    }
  }

  return verticalLinesAr.map((item: any, index: number) => {
    let totalSpacing = initialSpacing;
    if (verticalLinesSpacing) {
      totalSpacing = verticalLinesSpacing * (index + 1);
    } else {
      if (stackData) {
        totalSpacing += (stackData[0].barWidth || barWidth || 30) / 2;
      } else {
        totalSpacing += (data[0].barWidth || barWidth || 30) / 2;
      }
      for (let i = 0; i < index; i++) {
        let actualSpacing = spacing;
        if (stackData) {
          if (i >= stackData.length - 1) {
            actualSpacing += (barWidth || 30) / 2;
          } else {
            if (stackData[i].spacing || stackData[i].spacing === 0) {
              actualSpacing = stackData[i].spacing;
            }
            if (stackData[i + 1].barWidth) {
              actualSpacing += stackData[i + 1].barWidth;
            } else {
              actualSpacing += barWidth || 30;
            }
          }
        } else {
          if (i >= data.length - 1) {
            actualSpacing += (barWidth || 30) / 2;
          } else {
            if (data[i].spacing || data[i].spacing === 0) {
              actualSpacing = data[i].spacing;
            }
            if (data[i + 1].barWidth) {
              actualSpacing += data[i + 1].barWidth;
            } else {
              actualSpacing += barWidth || 30;
            }
          }
        }
        totalSpacing += actualSpacing;
      }
    }

    return (
      <View
        key={index}
        style={{
          position: 'absolute',
          zIndex: verticalLinesZIndex || -1,
          marginBottom: xAxisThickness,
          height: getHeightOfVerticalLine(index),
          width: verticalLinesThickness,
          backgroundColor: verticalLinesColor,
          bottom: 60 + labelsExtraHeight,
          left:
            chartType === chartTypes.BAR
              ? totalSpacing
              : verticalLinesSpacing
              ? verticalLinesSpacing * (index + 1)
              : index * spacing + (initialSpacing - 4 / 2),
        }}
      />
    );
  });
};

export default RenderVerticalLines;
