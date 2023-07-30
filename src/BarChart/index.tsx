import React, {useCallback, useEffect, useMemo, useState, useRef} from 'react';
import {Animated, Easing} from 'react-native';
import RenderBars from './RenderBars';
import RenderStackBars from './RenderStackBars';
import {bezierCommand, chartTypes, getArrowPoints, getAxesAndRulesProps, svgPath} from '../utils';
import BarAndLineChartsWrapper from '../Components/BarAndLineChartsWrapper';
import {BarChartPropsType, defaultLineConfigType, itemType} from './types';

export const BarChart = (props: BarChartPropsType) => {
  const scrollRef = useRef(null);
  const [points, setPoints] = useState('');
  const [arrowPoints, setArrowPoints] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const showLine = props.showLine || false;
  const spacing = props.spacing ?? 20;
  const initialSpacing = props.initialSpacing ?? spacing;
  const endSpacing = props.endSpacing ?? spacing;
  const showFractionalValues = props.showFractionalValues || false;

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
  const lineData = props.lineData || data;
  const lineBehindBars = props.lineBehindBars || false;
  const defaultLineConfig: defaultLineConfigType = {
    initialSpacing: initialSpacing,
    curved: false,
    isAnimated: false,
    thickness: 1,
    color: 'black',
    hideDataPoints: false,
    dataPointsShape: 'circular',
    dataPointsWidth: 4,
    dataPointsHeight: 4,
    dataPointsColor: 'black',
    dataPointsRadius: 3,
    textColor: 'gray',
    textFontSize: 10,
    textShiftX: 0,
    textShiftY: 0,
    shiftY: 0,
    delay: 0,
    startIndex: 0,
    endIndex: lineData.length - 1,
    showArrow: false,
    arrowConfig: {
      length: 10,
      width: 10,
      strokeWidth: 1,
      strokeColor: 'black',
      fillColor: 'none',
      showArrowBase: true,
    },
  };
  const lineConfig = props.lineConfig
    ? {
        initialSpacing:
          props.lineConfig.initialSpacing ??
              defaultLineConfig.initialSpacing,
        curved: props.lineConfig.curved || defaultLineConfig.curved,
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
  const noOfSections = props.noOfSections || 10;
  const containerHeight =
    props.height ?? ((props.stepHeight ?? 0) * noOfSections || 200);
  const horizSections = [{value: '0'}];
  const horizSectionsBelow: Array<Object> = [];
  const stepHeight = props.stepHeight || containerHeight / noOfSections;
  const labelWidth = props.labelWidth || 0;
  const scrollToEnd = props.scrollToEnd || false;
  const scrollAnimation = props.scrollAnimation === false ? false : true;
  const labelsExtraHeight = props.labelsExtraHeight || 0;

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
        (stackItem.stacks[0].barWidth ?? props.barWidth ?? 0) + spacing;
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
        (item.barWidth ?? props.barWidth ?? 30) + (item.spacing ?? spacing);
    });
  }
  if (showFractionalValues || props.roundToDigits) {
    maxItem *= 10 * (props.roundToDigits || 1);
    maxItem = maxItem + (10 - (maxItem % 10));
    maxItem /= 10 * (props.roundToDigits || 1);
    maxItem = parseFloat(maxItem.toFixed(props.roundToDigits || 1));
    if (minItem !== 0) {
      minItem *= 10 * (props.roundToDigits || 1);
      minItem = minItem - (10 + (minItem % 10));
      minItem /= 10 * (props.roundToDigits || 1);
      minItem = parseFloat(minItem.toFixed(props.roundToDigits || 1));
    }
  } else {
    maxItem = maxItem + (10 - (maxItem % 10));
    if (minItem !== 0) {
      minItem = minItem - (10 + (minItem % 10));
    }
  }

  const maxValue = props.maxValue || maxItem;
  const minValue = props.minValue || minItem;

  const stepValue = props.stepValue || maxValue / noOfSections;
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis || -minValue / stepValue;
  const disableScroll = props.disableScroll || false;
  const showScrollIndicator = props.showScrollIndicator || false;
  const side = props.side || '';
  const rotateLabel = props.rotateLabel || false;
  const isAnimated = props.isAnimated || false;
  const animationDuration = props.animationDuration || 800;
  const opacity = props.opacity || 1;
  const isThreeD = props.isThreeD || false;

  const showVerticalLines = props.showVerticalLines || false;
  const verticalLinesThickness =
    props.verticalLinesThickness ?? 1;
  const verticalLinesHeight = props.verticalLinesHeight;
  const verticalLinesColor = props.verticalLinesColor || 'lightgray';
  const verticalLinesZIndex = props.verticalLinesZIndex || -1;
  let verticalLinesAr: Array<number> = [];
  props.noOfVerticalLines
    ? (verticalLinesAr = [...Array(props.noOfVerticalLines).keys()])
    : (verticalLinesAr = [
        ...Array(props.stackData ? props.stackData.length : data.length).keys(),
      ]);
  const verticalLinesSpacing = props.verticalLinesSpacing || 0;

  const showXAxisIndices = props.showXAxisIndices || false;
  const xAxisIndicesHeight = props.xAxisIndicesHeight || 2;
  const xAxisIndicesWidth = props.xAxisIndicesWidth || 4;
  const xAxisIndicesColor = props.xAxisIndicesColor || 'black';



  const xAxisThickness = props.xAxisThickness ?? 1;


  const yAxisThickness = props.yAxisThickness ?? 1;
  const xAxisTextNumberOfLines = props.xAxisTextNumberOfLines || 1;
  const horizontalRulesStyle = props.horizontalRulesStyle;
  const yAxisLabelWidth = props.yAxisLabelWidth || 35;

  const horizontal = props.horizontal || false;
  const yAxisAtTop = props.yAxisAtTop || false;
  const intactTopLabel = props.intactTopLabel || false;


  const heightValue = useMemo(() => new Animated.Value(0), []);
  const opacValue = useMemo(() => new Animated.Value(0), []);
  const widthValue = useMemo(() => new Animated.Value(0), []);
  const autoShiftLabels = props.autoShiftLabels || false;

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
      if (!lineConfig.curved) {
        for (let i = 0; i < lineData.length; i++) {
          if (i < lineConfig.startIndex || i > lineConfig.endIndex) continue;
          const currentBarWidth = data?.[i]?.barWidth ?? props.barWidth ?? 30;
          pp +=
            'L' +
            (yAxisLabelWidth +
              lineConfig.initialSpacing +
              6 -
              (initialSpacing - currentBarWidth / 2) +
              
              (currentBarWidth + spacing) * i) +
            ' ' +
            (containerHeight -
              lineConfig.shiftY -
              (lineData[i].value * containerHeight) / maxValue) +
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
          const currentBarWidth = data?.[i]?.barWidth ?? props.barWidth ?? 30;
          p1Array.push([
            yAxisLabelWidth +
              lineConfig.initialSpacing +
              6 -
              (initialSpacing - currentBarWidth / 2) -
              lineConfig.dataPointsWidth / 2 +
              (currentBarWidth + spacing) * i,
            containerHeight -
              lineConfig.shiftY -
              (lineData[i].value * containerHeight) / maxValue,
          ]);
          let xx = svgPath(p1Array, bezierCommand);
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

  horizSections.pop();
  for (let i = 0; i <= noOfSections; i++) {
    let value = maxValue - stepValue * i;
    if (showFractionalValues || props.roundToDigits) {
      value = parseFloat(value.toFixed(props.roundToDigits || 1));
    }
    horizSections.push({
      value: props.yAxisLabelTexts
        ? props.yAxisLabelTexts[noOfSections - i] ?? value.toString()
        : value.toString(),
    });
  }
  if (noOfSectionsBelowXAxis) {
    for (let i = 1; i <= noOfSectionsBelowXAxis; i++) {
      let value = stepValue * -i;
      if (showFractionalValues || props.roundToDigits) {
        value = parseFloat(value.toFixed(props.roundToDigits || 1));
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
        intactTopLabel: intactTopLabel,
        barBorderRadius: props.barBorderRadius,
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

  const barAndLineChartsWrapperProps = {
    chartType: chartTypes.BAR,
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
    stackData: props.stackData,
    barWidth: props.barWidth,
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
    verticalLinesUptoDataPoint: false, // Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
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
    width: props.width,
    horizSections,
    endSpacing,
    horizontalRulesStyle,
    noOfSections,
    showFractionalValues,

    axesAndRulesProps: getAxesAndRulesProps(props),

    referenceLinesConfig: {
      showReferenceLine1: props.showReferenceLine1,
      referenceLine1Position: props.referenceLine1Position,
      referenceLine1Config: props.referenceLine1Config,
      showReferenceLine2: props.showReferenceLine2,
      referenceLine2Position: props.referenceLine2Position,
      referenceLine2Config: props.referenceLine2Config,
      showReferenceLine3: props.showReferenceLine3,
      referenceLine3Position: props.referenceLine3Position,
      referenceLine3Config: props.referenceLine3Config,
    },
    yAxisLabelTexts: props.yAxisLabelTexts,
    yAxisOffset: props.yAxisOffset,
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
