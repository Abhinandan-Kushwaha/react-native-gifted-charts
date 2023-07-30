import React, {Fragment} from 'react';
import {View, ScrollView} from 'react-native';
import {renderHorizSections} from './renderHorizSections';
import RenderLineInBarChart from './renderLineInBarChart';
import RenderVerticalLines from './renderVerticalLines';
import {chartTypes} from '../../utils';

const BarAndLineChartsWrapper = props => {
  const {
    chartType,
    containerHeight,
    horizSectionsBelow,
    stepHeight,
    labelsExtraHeight,
    yAxisLabelWidth,
    yAxisThickness,
    horizontal,
    scrollRef,
    yAxisAtTop,
    initialSpacing,
    data,
    stackData,
    barWidth,
    xAxisThickness,
    totalWidth,
    disableScroll,
    showScrollIndicator,
    scrollToEnd,
    scrollAnimation,
    setSelectedIndex,
    showVerticalLines,
    verticalLinesAr,
    verticalLinesSpacing,
    spacing,
    verticalLinesZIndex,
    verticalLinesHeight,
    verticalLinesThickness,
    verticalLinesColor,
    verticalLinesUptoDataPoint,
    showLine,
    lineConfig,
    maxValue,
    lineData,
    animatedWidth,
    lineBehindBars,
    points,
    arrowPoints,
    renderChartContent,
    remainingScrollViewProps,

    width,
    horizSections,
    endSpacing,
    horizontalRulesStyle,
    noOfSections,
    showFractionalValues,
    axesAndRulesProps,
    referenceLinesConfig,

    yAxisLabelTexts,
    yAxisOffset,
    hideAxesAndRules,

    showXAxisIndices,
    xAxisIndicesHeight,
    xAxisIndicesWidth,
    xAxisIndicesColor,

    pointerConfig,
    getPointerProps,
    pointerIndex,
    pointerX,
    pointerY,
  } = props;

  const yAxisSide = axesAndRulesProps.yAxisSide || 'left';
  const yAxisLabelContainerStyle = axesAndRulesProps.yAxisLabelContainerStyle;
  const yAxisColor = axesAndRulesProps.yAxisColor || 'black';
  const xAxisColor = axesAndRulesProps.xAxisColor || 'black';
  const xAxisLength = axesAndRulesProps.xAxisLength;
  const xAxisType = axesAndRulesProps.xAxisType || 'solid';
  const dashWidth = axesAndRulesProps.dashWidth ?? 4;
  const dashGap = axesAndRulesProps.dashGap ?? 8;
  const backgroundColor = axesAndRulesProps.backgroundColor || 'transparent';
  const hideRules = axesAndRulesProps.hideRules || false;
  const rulesLength = axesAndRulesProps.rulesLength;
  const rulesType = axesAndRulesProps.rulesType || 'line';
  const rulesThickness = axesAndRulesProps.rulesThickness ?? 1;
  const rulesColor = axesAndRulesProps.rulesColor || 'lightgray';
  const showYAxisIndices = axesAndRulesProps.showYAxisIndices || false;
  const yAxisIndicesHeight = axesAndRulesProps.yAxisIndicesHeight || 2;
  const yAxisIndicesWidth = axesAndRulesProps.yAxisIndicesWidth || 4;
  const yAxisIndicesColor = axesAndRulesProps.yAxisIndicesColor || 'black';
  const hideOrigin = axesAndRulesProps.hideOrigin || false;
  const hideYAxisText = axesAndRulesProps.hideYAxisText || false;
  const yAxisTextNumberOfLines = axesAndRulesProps.yAxisTextNumberOfLines || 1;
  const yAxisLabelPrefix = axesAndRulesProps.yAxisLabelPrefix || '';
  const yAxisLabelSuffix = axesAndRulesProps.yAxisLabelSuffix || '';
  const yAxisTextStyle = axesAndRulesProps.yAxisTextStyle;

  const horizSectionProps = {
    width,
    horizSections,
    horizSectionsBelow,
    totalWidth,
    endSpacing,
    yAxisSide,
    horizontalRulesStyle,
    noOfSections,
    stepHeight,
    yAxisLabelWidth,
    yAxisLabelContainerStyle,
    yAxisThickness,
    yAxisColor,
    xAxisThickness,
    xAxisColor,
    xAxisLength,
    xAxisType,
    dashWidth,
    dashGap,
    backgroundColor,
    hideRules,
    rulesLength,
    rulesType,
    rulesThickness,
    rulesColor,
    spacing,
    showYAxisIndices,
    yAxisIndicesHeight,
    yAxisIndicesWidth,
    yAxisIndicesColor,

    hideOrigin,
    hideYAxisText,
    showFractionalValues,
    yAxisTextNumberOfLines,
    yAxisLabelPrefix,
    yAxisLabelSuffix,
    yAxisTextStyle,

    containerHeight,
    maxValue,

    referenceLinesConfig,

    yAxisLabelTexts,
    yAxisOffset,
    hideAxesAndRules,
  };

  const lineInBarChartProps = {
    yAxisLabelWidth,
    initialSpacing,
    spacing,
    containerHeight,
    lineConfig,
    maxValue,
    lineData,
    animatedWidth,
    lineBehindBars,
    points,
    arrowPoints,
    data,
    totalWidth,
    barWidth,
  };
  const extendedContainerHeight = containerHeight + 10;
  const containerHeightIncludingBelowXAxis =
    extendedContainerHeight + horizSectionsBelow.length * stepHeight;
  const verticalLinesProps = {
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
  };

  const container = {
    width: '100%',
    marginBottom: 40,
  };
  return (
    <View
      style={[
        container,
        {
          height: containerHeightIncludingBelowXAxis + labelsExtraHeight - 10,
        },
        horizontal && {
          transform: [
            {rotate: '90deg'},
            {translateY: 15},
            {translateX: props.width ?? 140}, // update needed
          ],
        },
      ]}>
      {props.hideAxesAndRules !== true &&
        renderHorizSections(horizSectionProps)}
      <ScrollView
        horizontal
        ref={scrollRef}
        style={[
          {
            marginLeft:
              horizontal && !yAxisAtTop
                ? -initialSpacing -
                  yAxisThickness -
                  (data[data.length - 1].barWidth ?? props.barWidth ?? 30) / 2
                : yAxisSide === 'right'
                ? 0
                : yAxisLabelWidth + yAxisThickness,
            position: 'absolute',
            bottom:
              stepHeight * -0.5 -
              60 +
              (chartType === chartTypes.LINE_BI_COLOR ? 0 : xAxisThickness),
          },
          !!props.width && {width: props.width - 11},
          horizontal && {width: props.width ?? totalWidth},
        ]}
        contentContainerStyle={[
          {
            height:
              containerHeightIncludingBelowXAxis + labelsExtraHeight + 120,
            width: totalWidth - spacing + endSpacing,
            paddingLeft: initialSpacing,
            paddingBottom:
              horizSectionsBelow.length * stepHeight + labelsExtraHeight,
            alignItems: 'flex-end',
          },
          !props.width && {width: totalWidth},
        ]}
        scrollEnabled={!disableScroll}
        showsHorizontalScrollIndicator={showScrollIndicator}
        indicatorStyle={props.indicatorColor}
        onContentSizeChange={() => {
          if (scrollRef.current && scrollToEnd) {
            scrollRef.current.scrollToEnd({animated: scrollAnimation});
          }
        }}
        {...remainingScrollViewProps}>
        <Fragment>
          {showVerticalLines && <RenderVerticalLines {...verticalLinesProps} />}
          {
            // Only For Bar Charts-
            showLine ? <RenderLineInBarChart {...lineInBarChartProps} /> : null
          }
          {
            // Only For Line Charts-
            chartType === 'line' &&
              showXAxisIndices &&
              data.map((item: any, index: number) => {
                return (
                  <View
                    key={index + '' + item.value}
                    style={{
                      position: 'absolute',
                      height: xAxisIndicesHeight,
                      width: xAxisIndicesWidth,
                      backgroundColor: xAxisIndicesColor,
                      bottom: 60 - xAxisIndicesHeight / 2,
                      left:
                        index * spacing +
                        (initialSpacing - xAxisIndicesWidth / 2) -
                        3,
                    }}
                  />
                );
              })
          }
          {renderChartContent()}
        </Fragment>
      </ScrollView>
      {
        // Only For Line Charts-
        pointerConfig &&
          getPointerProps &&
          getPointerProps({pointerIndex, pointerX, pointerY})
      }
    </View>
  );
};

export default BarAndLineChartsWrapper;
