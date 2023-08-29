import React, {Fragment} from 'react';
import {View, ScrollView} from 'react-native';
import {renderHorizSections} from './renderHorizSections';
import RenderLineInBarChart from './renderLineInBarChart';
import RenderVerticalLines from './renderVerticalLines';
import {
  AxesAndRulesDefaults,
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
    horizSectionsBelow,
    stepHeight,
    labelsExtraHeight,
    yAxisLabelWidth,
    horizontal,
    scrollRef,
    yAxisAtTop,
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

  const hideOrigin =
    axesAndRulesProps.hideOrigin ?? AxesAndRulesDefaults.hideOrigin;

  const yAxisSide =
    axesAndRulesProps.yAxisSide ?? AxesAndRulesDefaults.yAxisSide;
  const yAxisLabelContainerStyle = axesAndRulesProps.yAxisLabelContainerStyle;
  const yAxisColor =
    axesAndRulesProps.yAxisColor ?? AxesAndRulesDefaults.yAxisColor;
  const yAxisThickness =
    axesAndRulesProps.yAxisThickness ?? AxesAndRulesDefaults.yAxisThickness;
  const xAxisColor =
    axesAndRulesProps.xAxisColor ?? AxesAndRulesDefaults.xAxisColor;
  const xAxisLength = axesAndRulesProps.xAxisLength;
  const xAxisType =
    axesAndRulesProps.xAxisType ?? AxesAndRulesDefaults.xAxisType;
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
  const verticalLinesType =
    axesAndRulesProps.verticalLinesType ??
    AxesAndRulesDefaults.verticalLinesType;
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

  // const

  const horizSectionProps: horizSectionPropTypes = {
    chartType,
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

    horizontal,
    yAxisAtTop,

    stepValue,
    roundToDigits,

    secondaryData,
    secondaryYAxis,
  };

  const lineInBarChartProps = {
    yAxisLabelWidth,
    initialSpacing,
    spacing,
    containerHeight,
    lineConfig,
    maxValue,
    animatedWidth,
    lineBehindBars,
    points,
    arrowPoints,
    data: lineData ?? data,
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
    verticalLinesType,
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
                  (data[data.length - 1].barWidth ?? barWidth ?? 0) / 2
                : yAxisSide === yAxisSides.RIGHT
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
          {showVerticalLines && <RenderVerticalLines {...verticalLinesProps} />}
          {
            // Only For Bar Charts-
            showLine ? <RenderLineInBarChart {...lineInBarChartProps} /> : null
          }
          {
            // Only For Line Charts-
            chartType === chartTypes.LINE &&
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
