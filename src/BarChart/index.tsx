import React, {useCallback, useEffect, useMemo, useState, useRef} from 'react';
import {Animated, Easing} from 'react-native';
import RenderBars from './RenderBars';
import RenderStackBars from './RenderStackBars';
import {
  getArrowPoints,
  getAxesAndRulesProps,
  getSecondaryDataWithOffsetIncluded,
  getXForLineInBar,
  getYForLineInBar,
  maxAndMinUtil,
  svgPath,
} from '../utils';
import {
  AxesAndRulesDefaults,
  BarDefaults,
  chartTypes,
  defaultLineConfig,
} from '../utils/constants';
import BarAndLineChartsWrapper from '../Components/BarAndLineChartsWrapper';
import {BarChartPropsType, itemType} from './types';
import {BarAndLineChartsWrapperTypes, HorizSectionsType} from '../utils/types';

export const BarChart = (props: BarChartPropsType) => {
  const scrollRef = props.scrollRef ?? useRef(null);
  const [points, setPoints] = useState('');
  const [arrowPoints, setArrowPoints] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const showLine = props.showLine || BarDefaults.showLine;
  const spacing = props.spacing ?? BarDefaults.spacing;
  const initialSpacing = props.initialSpacing ?? spacing;
  const endSpacing = props.endSpacing ?? spacing;
  const showFractionalValues =
    props.showFractionalValues || AxesAndRulesDefaults.showFractionalValues;

  const horizontal = props.horizontal ?? BarDefaults.horizontal;
  const rtl = props.rtl ?? BarDefaults.rtl;
  const yAxisAtTop = props.yAxisAtTop ?? BarDefaults.yAxisAtTop;
  const intactTopLabel = props.intactTopLabel ?? BarDefaults.intactTopLabel;

  const heightFromProps = horizontal ? props.width : props.height;
  const widthFromProps = horizontal ? props.height : props.width;

  const data = useMemo(() => {
    if (!props.data) {
      return [];
    }
    if (props.yAxisOffset) {
      return props.data.map(item => {
        item.value = item.value - (props.yAxisOffset ?? 0);
        return item;
      });
    }
    return props.data;
  }, [props.yAxisOffset, props.data]);

  const secondaryData = getSecondaryDataWithOffsetIncluded(
    props.secondaryData,
    props.secondaryYAxis,
  );

  const lineData = useMemo(() => {
    if (!props.lineData) {
      return data;
    }
    if (props.yAxisOffset) {
      return props.lineData.map(item => {
        item.value = item.value - (props.yAxisOffset ?? 0);
        return item;
      });
    }
    return props.lineData;
  }, [props.yAxisOffset, props.lineData, data]);

  const lineBehindBars = props.lineBehindBars || BarDefaults.lineBehindBars;

  defaultLineConfig.initialSpacing = initialSpacing;
  defaultLineConfig.endIndex = lineData.length - 1;

  const lineConfig = props.lineConfig
    ? {
        initialSpacing:
          props.lineConfig.initialSpacing ?? defaultLineConfig.initialSpacing,
        curved: props.lineConfig.curved || defaultLineConfig.curved,
        curvature: props.lineConfig.curvature ?? defaultLineConfig.curvature,
        curveType: props.lineConfig.curveType ?? defaultLineConfig.curveType,
        isAnimated: props.lineConfig.isAnimated || defaultLineConfig.isAnimated,
        thickness: props.lineConfig.thickness || defaultLineConfig.thickness,
        color: props.lineConfig.color || defaultLineConfig.color,
        hideDataPoints:
          props.lineConfig.hideDataPoints || defaultLineConfig.hideDataPoints,
        dataPointsShape:
          props.lineConfig.dataPointsShape || defaultLineConfig.dataPointsShape,
        dataPointsHeight:
          props.lineConfig.dataPointsHeight ||
          defaultLineConfig.dataPointsHeight,
        dataPointsWidth:
          props.lineConfig.dataPointsWidth || defaultLineConfig.dataPointsWidth,
        dataPointsColor:
          props.lineConfig.dataPointsColor || defaultLineConfig.dataPointsColor,
        dataPointsRadius:
          props.lineConfig.dataPointsRadius ||
          defaultLineConfig.dataPointsRadius,
        textColor: props.lineConfig.textColor || defaultLineConfig.textColor,
        textFontSize:
          props.lineConfig.textFontSize || defaultLineConfig.textFontSize,
        textShiftX: props.lineConfig.textShiftX || defaultLineConfig.textShiftX,
        textShiftY: props.lineConfig.textShiftY || defaultLineConfig.textShiftY,
        shiftX: props.lineConfig.shiftX || defaultLineConfig.shiftX,
        shiftY: props.lineConfig.shiftY || defaultLineConfig.shiftY,
        delay: props.lineConfig.delay || defaultLineConfig.delay,
        startIndex: props.lineConfig.startIndex || defaultLineConfig.startIndex,
        endIndex:
          props.lineConfig.endIndex === 0
            ? 0
            : props.lineConfig.endIndex || defaultLineConfig.endIndex,

        showArrow: props.lineConfig.showArrow ?? defaultLineConfig.showArrow,
        arrowConfig: {
          length:
            props.lineConfig.arrowConfig?.length ??
            defaultLineConfig.arrowConfig?.length,
          width:
            props.lineConfig.arrowConfig?.width ??
            defaultLineConfig.arrowConfig?.width,

          strokeWidth:
            props.lineConfig.arrowConfig?.strokeWidth ??
            defaultLineConfig.arrowConfig?.strokeWidth,

          strokeColor:
            props.lineConfig.arrowConfig?.strokeColor ??
            defaultLineConfig.arrowConfig?.strokeColor,

          fillColor:
            props.lineConfig.arrowConfig?.fillColor ??
            defaultLineConfig.arrowConfig?.fillColor,

          showArrowBase:
            props.lineConfig.arrowConfig?.showArrowBase ??
            defaultLineConfig.arrowConfig?.showArrowBase,
        },
        customDataPoint: props.lineConfig.customDataPoint,
      }
    : defaultLineConfig;
  const noOfSections = props.noOfSections ?? AxesAndRulesDefaults.noOfSections;
  const containerHeight =
    heightFromProps ??
    ((props.stepHeight ?? 0) * noOfSections ||
      AxesAndRulesDefaults.containerHeight);
  const horizSections = [{value: '0'}];
  const horizSectionsBelow: HorizSectionsType = [];
  const stepHeight = props.stepHeight ?? containerHeight / noOfSections;
  const labelWidth = props.labelWidth ?? AxesAndRulesDefaults.labelWidth;
  const scrollToEnd = props.scrollToEnd ?? BarDefaults.scrollToEnd;
  const scrollAnimation = props.scrollAnimation ?? BarDefaults.scrollAnimation;
  const labelsExtraHeight =
    props.labelsExtraHeight ?? AxesAndRulesDefaults.labelsExtraHeight;

  let totalWidth = initialSpacing;
  let maxItem = 0,
    minItem = 0;
  if (props.stackData) {
    props.stackData.forEach(stackItem => {
      let stackSum = stackItem.stacks.reduce(
        (acc, stack) => acc + (stack.value ?? 0),
        0,
      );
      if (stackSum > maxItem) {
        maxItem = stackSum;
      }
      if (stackSum < minItem) {
        minItem = stackSum;
      }
      totalWidth +=
        (stackItem.stacks[0].barWidth ??
          props.barWidth ??
          BarDefaults.barWidth) + spacing;
    });
  } else {
    data.forEach((item: itemType) => {
      if (item.value > maxItem) {
        maxItem = item.value;
      }
      if (item.value < minItem) {
        minItem = item.value;
      }
      totalWidth +=
        (item.barWidth ?? props.barWidth ?? BarDefaults.barWidth) +
        (item.spacing ?? spacing);
    });
  }

  const maxAndMin = maxAndMinUtil(
    maxItem,
    minItem,
    props.roundToDigits,
    props.showFractionalValues,
  );

  const maxValue = props.maxValue ?? maxAndMin.maxItem;
  const minValue = props.minValue ?? maxAndMin.minItem;

  const stepValue = props.stepValue ?? maxValue / noOfSections;
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis ?? -minValue / stepValue;
  const disableScroll = props.disableScroll ?? BarDefaults.disableScroll;
  const showScrollIndicator =
    props.showScrollIndicator ?? BarDefaults.showScrollIndicator;
  const side = props.side ?? BarDefaults.side;
  const rotateLabel = props.rotateLabel ?? AxesAndRulesDefaults.rotateLabel;
  const isAnimated = props.isAnimated ?? BarDefaults.isAnimated;
  const animationDuration =
    props.animationDuration ?? BarDefaults.animationDuration;
  const opacity = props.opacity ?? BarDefaults.opacity;
  const isThreeD = props.isThreeD ?? BarDefaults.isThreeD;

  const showXAxisIndices =
    props.showXAxisIndices ?? AxesAndRulesDefaults.showXAxisIndices;
  const xAxisIndicesHeight =
    props.xAxisIndicesHeight ?? AxesAndRulesDefaults.xAxisIndicesHeight;
  const xAxisIndicesWidth =
    props.xAxisIndicesWidth ?? AxesAndRulesDefaults.xAxisIndicesWidth;
  const xAxisIndicesColor =
    props.xAxisIndicesColor ?? AxesAndRulesDefaults.xAxisIndicesColor;

  const xAxisThickness =
    props.xAxisThickness ?? AxesAndRulesDefaults.xAxisThickness;

  const xAxisTextNumberOfLines =
    props.xAxisTextNumberOfLines ?? AxesAndRulesDefaults.xAxisTextNumberOfLines;
  const horizontalRulesStyle = props.horizontalRulesStyle;
  const yAxisLabelWidth =
    props.yAxisLabelWidth ??
    (props.hideYAxisText
      ? AxesAndRulesDefaults.yAxisEmptyLabelWidth
      : AxesAndRulesDefaults.yAxisLabelWidth);

  const heightValue = useMemo(() => new Animated.Value(0), []);
  const opacValue = useMemo(() => new Animated.Value(0), []);
  const widthValue = useMemo(() => new Animated.Value(0), []);
  const autoShiftLabels = props.autoShiftLabels ?? false;

  const labelsAppear = useCallback(() => {
    opacValue.setValue(0);
    Animated.timing(opacValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [opacValue]);

  const decreaseWidth = useCallback(() => {
    widthValue.setValue(0);
    Animated.timing(widthValue, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animationDuration, widthValue]);

  useEffect(() => {
    if (showLine) {
      let pp = '';
      const firstBarWidth = data[0].barWidth ?? props.barWidth ?? 30;
      if (!lineConfig.curved) {
        for (let i = 0; i < lineData.length; i++) {
          if (i < lineConfig.startIndex || i > lineConfig.endIndex) continue;
          const currentBarWidth =
            data?.[i]?.barWidth ?? props.barWidth ?? BarDefaults.barWidth;
          pp +=
            'L' +
            getXForLineInBar(
              i,
              firstBarWidth,
              currentBarWidth,
              yAxisLabelWidth,
              lineConfig,
              spacing,
            ) +
            ' ' +
            getYForLineInBar(
              lineData[i].value,
              lineConfig.shiftY,
              containerHeight,
              maxValue,
            ) +
            ' ';
        }
        setPoints(pp.replace('L', 'M'));
        if (lineData.length > 1 && lineConfig.showArrow) {
          let ppArray = pp.trim().split(' ');
          let arrowTipY = parseInt(ppArray[ppArray.length - 1]);
          let arrowTipX = parseInt(
            ppArray[ppArray.length - 2].replace('L', ''),
          );
          let y1 = parseInt(ppArray[ppArray.length - 3]);
          let x1 = parseInt(ppArray[ppArray.length - 4].replace('L', ''));

          let arrowPoints = getArrowPoints(
            arrowTipX,
            arrowTipY,
            x1,
            y1,
            lineConfig.arrowConfig.length,
            lineConfig.arrowConfig.width,
            lineConfig.arrowConfig.showArrowBase,
          );

          setArrowPoints(arrowPoints);
        }
      } else {
        let p1Array: Array<Array<number>> = [];
        for (let i = 0; i < lineData.length; i++) {
          if (i < lineConfig.startIndex || i > lineConfig.endIndex) continue;
          const currentBarWidth =
            data?.[i]?.barWidth ?? props.barWidth ?? BarDefaults.barWidth;
          p1Array.push([
            getXForLineInBar(
              i,
              firstBarWidth,
              currentBarWidth,
              yAxisLabelWidth,
              lineConfig,
              spacing,
            ),
            getYForLineInBar(
              lineData[i].value,
              lineConfig.shiftY,
              containerHeight,
              maxValue,
            ),
          ]);
          let xx = svgPath(p1Array, lineConfig.curveType, lineConfig.curvature);
          setPoints(xx);
        }
      }
      if (lineConfig.isAnimated) {
        setTimeout(() => decreaseWidth(), lineConfig.delay || 0);
      }
    }
    setTimeout(() => labelsAppear(), animationDuration);
  }, [
    animationDuration,
    containerHeight,
    data,
    lineData,
    decreaseWidth,
    initialSpacing,
    labelsAppear,
    lineConfig.initialSpacing,
    lineConfig.curved,
    lineConfig.dataPointsWidth,
    lineConfig.shiftY,
    lineConfig.isAnimated,
    lineConfig.delay,
    lineConfig.startIndex,
    lineConfig.endIndex,
    maxValue,
    props.barWidth,
    showLine,
    spacing,
    yAxisLabelWidth,
    lineConfig.showArrow,
    lineConfig.arrowConfig.length,
    lineConfig.arrowConfig.width,
    lineConfig.arrowConfig.showArrowBase,
  ]);

  // horizSections.pop();
  // for (let i = 0; i <= noOfSections; i++) {
  //   let value = maxValue - stepValue * i;
  //   if (showFractionalValues || props.roundToDigits) {
  //     value = parseFloat(
  //       value.toFixed(
  //         props.roundToDigits ?? AxesAndRulesDefaults.roundToDigits,
  //       ),
  //     );
  //   }
  //   horizSections.push({
  //     value: props.yAxisLabelTexts
  //       ? props.yAxisLabelTexts[noOfSections - i] ?? value.toString()
  //       : value.toString(),
  //   });
  // }
  if (noOfSectionsBelowXAxis) {
    for (let i = 1; i <= noOfSectionsBelowXAxis; i++) {
      let value = stepValue * -i;
      if (showFractionalValues || props.roundToDigits) {
        value = parseFloat(
          value.toFixed(
            props.roundToDigits ?? AxesAndRulesDefaults.roundToDigits,
          ),
        );
      }
      horizSectionsBelow.push({
        value: props.yAxisLabelTexts
          ? props.yAxisLabelTexts[noOfSectionsBelowXAxis - i] ??
            value.toString()
          : value.toString(),
      });
    }
  }

  const animatedHeight = heightValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const appearingOpacity = opacValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animatedWidth = widthValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, totalWidth],
  });

  const renderChartContent = () => {
    const getPropsCommonForBarAndStack = (item, index) => {
      return {
        key: index,
        item: item,
        index: index,
        containerHeight: containerHeight,
        maxValue: maxValue,
        spacing: item.spacing ?? spacing,
        propSpacing: spacing,
        xAxisThickness: xAxisThickness,
        barWidth: props.barWidth,
        opacity: opacity,
        disablePress: item.disablePress || props.disablePress,
        rotateLabel: rotateLabel,
        showXAxisIndices: showXAxisIndices,
        xAxisIndicesHeight: xAxisIndicesHeight,
        xAxisIndicesWidth: xAxisIndicesWidth,
        xAxisIndicesColor: xAxisIndicesColor,
        horizontal: horizontal,
        rtl: rtl,
        intactTopLabel: intactTopLabel,
        barBorderRadius: props.barBorderRadius,
        barBorderTopLeftRadius: props.barBorderTopLeftRadius,
        barBorderTopRightRadius: props.barBorderTopRightRadius,
        barBorderBottomLeftRadius: props.barBorderBottomLeftRadius,
        barBorderBottomRightRadius: props.barBorderBottomRightRadius,
        color: props.color,
        showGradient: props.showGradient,
        gradientColor: props.gradientColor,
        barBackgroundPattern: props.barBackgroundPattern,
        patternId: props.patternId,
        onPress: props.onPress,
        xAxisTextNumberOfLines: xAxisTextNumberOfLines,
        renderTooltip: props.renderTooltip,
        leftShiftForTooltip: props.leftShiftForTooltip || 0,
        initialSpacing: initialSpacing,
        selectedIndex: selectedIndex,
        setSelectedIndex: setSelectedIndex,
        activeOpacity: props.activeOpacity || 0.2,

        leftShiftForLastIndexTooltip: props.leftShiftForLastIndexTooltip || 0,
        label:
          item.label ||
          (props.xAxisLabelTexts && props.xAxisLabelTexts[index]
            ? props.xAxisLabelTexts[index]
            : ''),
        labelTextStyle: item.labelTextStyle || props.xAxisLabelTextStyle,
      };
    };
    if (props.stackData) {
      return props.stackData.map((item, index) => {
        return (
          <RenderStackBars
            stackData={props.stackData || []}
            isAnimated={isAnimated}
            animationDuration={animationDuration}
            {...getPropsCommonForBarAndStack(item, index)}
          />
        );
      });
    } else {
      return data.map((item, index) => (
        <RenderBars
          data={data}
          side={side}
          minHeight={props.minHeight || 0}
          sideWidth={props.sideWidth}
          labelWidth={labelWidth}
          isThreeD={isThreeD}
          isAnimated={isAnimated}
          animationDuration={animationDuration}
          animatedHeight={animatedHeight}
          appearingOpacity={appearingOpacity}
          roundedTop={props.roundedTop}
          roundedBottom={props.roundedBottom}
          frontColor={props.frontColor}
          sideColor={props.sideColor}
          topColor={props.topColor}
          cappedBars={props.cappedBars}
          capThickness={props.capThickness}
          capColor={props.capColor}
          capRadius={props.capRadius}
          autoShiftLabels={autoShiftLabels}
          barMarginBottom={props.barMarginBottom}
          barStyle={props.barStyle}
          {...getPropsCommonForBarAndStack(item, index)}
        />
      ));
    }
  };

  const remainingScrollViewProps = {
    onTouchStart: evt => {
      if (props.renderTooltip) {
        setSelectedIndex(-1);
      }
    },
  };

  const barAndLineChartsWrapperProps: BarAndLineChartsWrapperTypes = {
    chartType: chartTypes.BAR,
    containerHeight,
    horizSectionsBelow,
    stepHeight,
    labelsExtraHeight,
    yAxisLabelWidth,
    horizontal,
    rtl,
    labelsWidthForHorizontal:
      props.labelsWidthForHorizontal ?? BarDefaults.labelsWidthForHorizontal,
    scrollRef,
    yAxisAtTop,
    initialSpacing,
    data,
    stackData: props.stackData,
    secondaryData: secondaryData,
    barWidth: props.barWidth || BarDefaults.barWidth,
    xAxisThickness,
    totalWidth,
    disableScroll,
    showScrollIndicator,
    scrollToEnd,
    scrollToIndex: props.scrollToIndex,
    scrollAnimation,
    indicatorColor: props.indicatorColor,
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

    //horizSectionProps-
    width: widthFromProps,
    horizSections,
    endSpacing,
    horizontalRulesStyle,
    noOfSections,
    showFractionalValues,

    axesAndRulesProps: getAxesAndRulesProps(props, stepValue),

    yAxisLabelTexts: props.yAxisLabelTexts,
    yAxisOffset: props.yAxisOffset,
    rotateYAxisTexts: props.rotateYAxisTexts,
    hideAxesAndRules: props.hideAxesAndRules,

    showXAxisIndices,
    xAxisIndicesHeight,
    xAxisIndicesWidth,
    xAxisIndicesColor,

    // These are Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    pointerConfig: null,
    getPointerProps: null,
    pointerIndex: 0,
    pointerX: 0,
    pointerY: 0,
  };

  return <BarAndLineChartsWrapper {...barAndLineChartsWrapperProps} />;
};
