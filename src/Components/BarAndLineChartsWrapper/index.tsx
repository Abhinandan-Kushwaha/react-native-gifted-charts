import React, {Fragment, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {renderHorizSections} from './renderHorizSections';
import RenderLineInBarChart from './renderLineInBarChart';
import RenderVerticalLines from './renderVerticalLines';
import {
  AxesAndRulesDefaults,
  BarDefaults,
  chartTypes,
  yAxisSides,
} from '../../utils/constants';
import {
  BarAndLineChartsWrapperTypes,
  horizSectionPropTypes,
} from '../../utils/types';

const BarAndLineChartsWrapper = (props: BarAndLineChartsWrapperTypes) => {
  const {
    chartType,
    containerHeight,
    noOfSectionsBelowXAxis,
    stepHeight,
    labelsExtraHeight,
    yAxisLabelWidth,
    horizontal,
    rtl,
    shiftX,
    shiftY,
    scrollRef,
    initialSpacing,
    data,
    stackData,
    secondaryData,
    barWidth,
    xAxisThickness,
    totalWidth,
    disableScroll,
    showScrollIndicator,
    scrollToEnd,
    scrollToIndex,
    scrollAnimation,
    indicatorColor,
    setSelectedIndex,
    spacing,
    showLine,
    lineConfig,
    lineConfig2,
    maxValue,
    lineData,
    lineData2,
    animatedWidth,
    lineBehindBars,
    points,
    points2,
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

    yAxisLabelTexts,
    yAxisOffset,
    rotateYAxisTexts,
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

    scrollEventThrottle,
  } = props;

  let yAxisAtTop = rtl ? !props.yAxisAtTop : props.yAxisAtTop;

  const hideOrigin =
    axesAndRulesProps.hideOrigin ?? AxesAndRulesDefaults.hideOrigin;

  const yAxisSide =
    axesAndRulesProps.yAxisSide ?? AxesAndRulesDefaults.yAxisSide;
  const yAxisLabelContainerStyle = axesAndRulesProps.yAxisLabelContainerStyle;
  const yAxisColor =
    axesAndRulesProps.yAxisColor ?? AxesAndRulesDefaults.yAxisColor;
  const yAxisExtraHeight =
    axesAndRulesProps.yAxisExtraHeight ?? containerHeight / 20;
  const trimYAxisAtTop =
    axesAndRulesProps.trimYAxisAtTop ?? AxesAndRulesDefaults.trimYAxisAtTop;
  const overflowTop =
    axesAndRulesProps.overflowTop ?? AxesAndRulesDefaults.overflowTop;
  const yAxisThickness =
    axesAndRulesProps.yAxisThickness ?? AxesAndRulesDefaults.yAxisThickness;
  const xAxisColor =
    axesAndRulesProps.xAxisColor ?? AxesAndRulesDefaults.xAxisColor;
  const xAxisLength = axesAndRulesProps.xAxisLength;
  const xAxisType =
    axesAndRulesProps.xAxisType ?? AxesAndRulesDefaults.xAxisType;
  const xAxisLabelsVerticalShift =
    axesAndRulesProps.xAxisLabelsVerticalShift ??
    AxesAndRulesDefaults.xAxisLabelsVerticalShift;
  const xAxisLabelsHeight = axesAndRulesProps.xAxisLabelsHeight;
  const xAxisTextNumberOfLines = axesAndRulesProps.xAxisTextNumberOfLines;
  const dashWidth =
    axesAndRulesProps.dashWidth ?? AxesAndRulesDefaults.dashWidth;
  const dashGap = axesAndRulesProps.dashGap ?? AxesAndRulesDefaults.dashGap;
  const backgroundColor =
    axesAndRulesProps.backgroundColor ?? AxesAndRulesDefaults.backgroundColor;
  const hideRules =
    axesAndRulesProps.hideRules ?? AxesAndRulesDefaults.hideRules;
  const rulesLength = axesAndRulesProps.rulesLength;
  const rulesType =
    axesAndRulesProps.rulesType ?? AxesAndRulesDefaults.rulesType;
  const rulesThickness =
    axesAndRulesProps.rulesThickness ?? AxesAndRulesDefaults.rulesThickness;
  const rulesColor =
    axesAndRulesProps.rulesColor ?? AxesAndRulesDefaults.rulesColor;
  const rulesConfigArray =
    axesAndRulesProps.rulesConfigArray ?? AxesAndRulesDefaults.rulesConfigArray;
  const showYAxisIndices = axesAndRulesProps.showYAxisIndices ?? false;
  const yAxisIndicesHeight =
    axesAndRulesProps.yAxisIndicesHeight ??
    AxesAndRulesDefaults.yAxisIndicesHeight;
  const yAxisIndicesWidth =
    axesAndRulesProps.yAxisIndicesWidth ??
    AxesAndRulesDefaults.yAxisIndicesWidth;
  const yAxisIndicesColor =
    axesAndRulesProps.yAxisIndicesColor ??
    AxesAndRulesDefaults.yAxisIndicesColor;
  const hideYAxisText =
    axesAndRulesProps.hideYAxisText ?? AxesAndRulesDefaults.hideYAxisText;
  const yAxisTextNumberOfLines =
    axesAndRulesProps.yAxisTextNumberOfLines ??
    AxesAndRulesDefaults.yAxisTextNumberOfLines;
  const yAxisLabelPrefix = axesAndRulesProps.yAxisLabelPrefix ?? '';
  const yAxisLabelSuffix = axesAndRulesProps.yAxisLabelSuffix ?? '';
  const yAxisTextStyle = axesAndRulesProps.yAxisTextStyle;
  const secondaryYAxis = axesAndRulesProps.secondaryYAxis;
  const stepValue = axesAndRulesProps.stepValue;
  const roundToDigits = axesAndRulesProps.roundToDigits;

  const referenceLinesConfig = axesAndRulesProps.referenceLinesConfig;

  const showVerticalLines =
    axesAndRulesProps.showVerticalLines ??
    AxesAndRulesDefaults.showVerticalLines;
  const verticalLinesThickness =
    axesAndRulesProps.verticalLinesThickness ??
    AxesAndRulesDefaults.verticalLinesThickness;
  const verticalLinesHeight = axesAndRulesProps.verticalLinesHeight;
  const verticalLinesColor =
    axesAndRulesProps.verticalLinesColor ??
    AxesAndRulesDefaults.verticalLinesColor;
  const verticalLinesStrokeDashArray =
    axesAndRulesProps.verticalLinesStrokeDashArray ??
    AxesAndRulesDefaults.verticalLinesStrokeDashArray;
  const verticalLinesShift =
    axesAndRulesProps.verticalLinesShift ??
    AxesAndRulesDefaults.verticalLinesShift;
  const verticalLinesZIndex =
    axesAndRulesProps.verticalLinesZIndex ??
    AxesAndRulesDefaults.verticalLinesZIndex;
  const verticalLinesSpacing =
    axesAndRulesProps.verticalLinesSpacing ??
    AxesAndRulesDefaults.verticalLinesSpacing;
  const verticalLinesUptoDataPoint =
    axesAndRulesProps.verticalLinesUptoDataPoint ??
    AxesAndRulesDefaults.verticalLinesUptoDataPoint;
  const noOfVerticalLines = axesAndRulesProps.noOfVerticalLines;

  const verticalLinesAr = noOfVerticalLines
    ? [...Array(noOfVerticalLines).keys()]
    : [...Array(stackData ? stackData.length : data.length).keys()];

  const horizSectionProps: horizSectionPropTypes = {
    width,
    horizSections,
    noOfSectionsBelowXAxis,
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
    yAxisExtraHeight,
    trimYAxisAtTop,
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
    rulesConfigArray,
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
    rotateYAxisTexts,
    rtl,

    containerHeight,
    overflowTop,
    maxValue,

    referenceLinesConfig,

    yAxisLabelTexts,
    yAxisOffset,

    horizontal,
    yAxisAtTop,

    stepValue,
    roundToDigits,

    secondaryData,
    secondaryYAxis,
    formatYLabel: axesAndRulesProps.formatYLabel,
  };

  const lineInBarChartProps = {
    yAxisLabelWidth,
    initialSpacing,
    spacing,
    containerHeight,
    lineConfig,
    maxValue: secondaryYAxis?.maxValue ?? maxValue,
    animatedWidth,
    lineBehindBars,
    points,
    arrowPoints,
    data: lineData?.length ? lineData : stackData ?? data,
    totalWidth,
    barWidth,
    labelsExtraHeight,
    scrollEventThrottle,
    xAxisLabelsVerticalShift,
  };
  const lineInBarChartProps2 = {
    ...lineInBarChartProps,
    lineConfig: lineConfig2,
    points: points2,
    data: lineData2,
  };
  const extendedContainerHeight = containerHeight + overflowTop + 10;
  const containerHeightIncludingBelowXAxis =
    extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight;
  const verticalLinesProps = {
    verticalLinesAr,
    verticalLinesSpacing,
    spacing: lineConfig?.spacing ?? spacing,
    initialSpacing,
    verticalLinesZIndex,
    verticalLinesHeight,
    verticalLinesThickness,
    verticalLinesColor,
    verticalLinesStrokeDashArray,
    verticalLinesShift,
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
    yAxisLabelWidth,
    totalWidth,
    xAxisLabelsVerticalShift,
  };

  const actualContainerHeight =
    containerHeightIncludingBelowXAxis + labelsExtraHeight - 10;
  const actualContainerWidth = (width ?? totalWidth) + yAxisLabelWidth;

  /*******************************************************************************************************************************************/
  /***************                                 horizontal chart related calculations                                   *******************/
  /*******************************************************************************************************************************************/

  const containerHeightIncludingXaxisLabels =
    actualContainerHeight + BarDefaults.labelsWidthForHorizontal;

  const difBwWidthHeight =
    actualContainerWidth - containerHeightIncludingXaxisLabels;

  const transformForHorizontal = [
    {rotate: rtl ? '-90deg' : '90deg'},
    {
      translateY:
        -shiftX + (rtl ? -difBwWidthHeight + 14 : difBwWidthHeight) / 2 - 20,
    },
    {
      translateX:
        shiftY +
        (rtl
          ? (props.width ? -98 - endSpacing : -75 - endSpacing) -
            difBwWidthHeight
          : props.width
          ? difBwWidthHeight
          : difBwWidthHeight - 40) /
          2 +
        (yAxisAtTop ? (rtl ? (props.width ? 12 : 40) : 12) : 52),
    },
  ];

  useEffect(() => {
    if (pointerConfig && getPointerProps) {
      getPointerProps({pointerIndex, pointerX, pointerY});
    }
  }, [pointerIndex, pointerX, pointerY]);

  /*******************************************************************************************************************************************/
  /*******************************************************************************************************************************************/

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height:
        containerHeightIncludingBelowXAxis +
        labelsExtraHeight +
        xAxisLabelsVerticalShift +
        (trimYAxisAtTop ? 0 : yAxisExtraHeight) +
        50,
      marginTop: trimYAxisAtTop ? containerHeight / 20 : 0,
      marginBottom: (xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18) - 55, //This is to not let the Things that should be rendered below the chart overlap with it
    },
  });

  return (
    <View
      style={[
        styles.container,
        horizontal && {
          width: actualContainerWidth,
          transform: transformForHorizontal,
        },
      ]}>
      {hideAxesAndRules !== true
        ? renderHorizSections(horizSectionProps)
        : null}
      <ScrollView
        scrollEventThrottle={
          props.scrollEventThrottle ? props.scrollEventThrottle : 16
        }
        horizontal
        ref={scrollRef}
        style={[
          {
            marginLeft:
              horizontal && !yAxisAtTop
                ? -yAxisThickness -
                  (props.width ? 20 : 0) -
                  (data[data.length - 1]?.barWidth ?? barWidth ?? 0) / 2
                : yAxisSide === yAxisSides.RIGHT
                ? 0
                : yAxisLabelWidth + yAxisThickness,
            position: 'absolute',
            bottom:
              overflowTop +
              (chartType === chartTypes.LINE_BI_COLOR ? 0 : xAxisThickness),
          },
          !!props.width && {width: props.width},
          horizontal && {
            width:
              (props.width ?? totalWidth) + (props.width ? endSpacing : -20),
          },
        ]}
        contentContainerStyle={[
          {
            height:
              containerHeightIncludingBelowXAxis +
              labelsExtraHeight +
              stepHeight / 2 +
              (50 + xAxisLabelsVerticalShift),
            width: totalWidth - spacing + endSpacing,
            paddingLeft: initialSpacing,
            paddingBottom:
              noOfSectionsBelowXAxis * stepHeight + labelsExtraHeight,
            alignItems: 'flex-end',
          },
          !props.width && {width: totalWidth},
        ]}
        scrollEnabled={!disableScroll}
        showsHorizontalScrollIndicator={showScrollIndicator}
        indicatorStyle={indicatorColor}
        onContentSizeChange={() => {
          if (scrollRef.current && scrollToEnd) {
            scrollRef.current.scrollToEnd({animated: scrollAnimation});
          } else if (scrollRef.current && scrollToIndex) {
            scrollRef.current.scrollTo({
              x:
                initialSpacing +
                ((barWidth ?? 0) + spacing) * scrollToIndex -
                spacing,
            });
          }
        }}
        {...remainingScrollViewProps}>
        <Fragment>
          {showVerticalLines ? (
            <RenderVerticalLines {...verticalLinesProps} />
          ) : null}
          {
            // Only For Bar Charts-
            showLine ? <RenderLineInBarChart {...lineInBarChartProps} /> : null
          }
          {
            // Only For Bar Charts-
            showLine && points2?.length ? (
              <RenderLineInBarChart {...lineInBarChartProps2} />
            ) : null
          }
          {
            // Only For Line Charts-
            chartType === chartTypes.LINE &&
              data.map((item: any, index: number) => {
                return showXAxisIndices || item.showXAxisIndex ? (
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
                ) : null;
              })
          }
          {renderChartContent()}
        </Fragment>
      </ScrollView>
    </View>
  );
};

export default BarAndLineChartsWrapper;
