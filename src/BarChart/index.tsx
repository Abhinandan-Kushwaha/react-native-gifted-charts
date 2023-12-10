import React, {useCallback, useEffect, useMemo, useState, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';
import RenderBars from './RenderBars';
import RenderStackBars from './RenderStackBars';
import {
  getArrowPoints,
  getAxesAndRulesProps,
  getExtendedContainerHeightWithPadding,
  getLineConfigForBarChart,
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
  defaultPointerConfig,
  screenWidth,
} from '../utils/constants';
import BarAndLineChartsWrapper from '../Components/BarAndLineChartsWrapper';
import {BarChartPropsType, itemType} from './types';
import {BarAndLineChartsWrapperTypes} from '../utils/types';
import {StripAndLabel} from '../Components/common/StripAndLabel';
import {Pointer} from '../Components/common/Pointer';

export const BarChart = (props: BarChartPropsType) => {
  const scrollRef = props.scrollRef ?? useRef(null);
  const [points, setPoints] = useState('');
  const [points2, setPoints2] = useState('');
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

  const isAnimated = props.isAnimated ?? BarDefaults.isAnimated;
  const animationDuration =
    props.animationDuration ?? BarDefaults.animationDuration;

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
      return props.stackData ?? data;
    }
    if (props.yAxisOffset) {
      return props.lineData.map(item => {
        item.value = item.value - (props.yAxisOffset ?? 0);
        return item;
      });
    }
    return props.lineData;
  }, [props.yAxisOffset, props.lineData, data, props.stackData]);

  const lineData2 = props.lineData2;

  const lineBehindBars = props.lineBehindBars || BarDefaults.lineBehindBars;

  defaultLineConfig.initialSpacing = initialSpacing;
  defaultLineConfig.endIndex = lineData.length - 1;
  defaultLineConfig.animationDuration = animationDuration;

  const lineConfig = props.lineConfig
    ? getLineConfigForBarChart(props.lineConfig)
    : defaultLineConfig;
  const lineConfig2 = props.lineConfig2
    ? getLineConfigForBarChart(props.lineConfig2)
    : defaultLineConfig;
  const noOfSections = props.noOfSections ?? AxesAndRulesDefaults.noOfSections;
  const containerHeight =
    heightFromProps ??
    ((props.stepHeight ?? 0) * noOfSections ||
      AxesAndRulesDefaults.containerHeight);
  const horizSections = [{value: '0'}];
  const stepHeight = props.stepHeight ?? containerHeight / noOfSections;
  const labelWidth = props.labelWidth ?? AxesAndRulesDefaults.labelWidth;
  const scrollToEnd = props.scrollToEnd ?? BarDefaults.scrollToEnd;
  const scrollAnimation = props.scrollAnimation ?? BarDefaults.scrollAnimation;
  const scrollEventThrottle =
    props.scrollEventThrottle ?? BarDefaults.scrollEventThrottle;
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

  let secondaryMaxItem = 0,
    secondaryMinItem = 0;

  if (lineConfig.isSecondary) {
    lineData.forEach((item: itemType) => {
      if (item.value > secondaryMaxItem) {
        secondaryMaxItem = item.value;
      }
      if (item.value < secondaryMinItem) {
        secondaryMinItem = item.value;
      }
    });
  }

  const maxAndMin = maxAndMinUtil(
    maxItem,
    minItem,
    props.roundToDigits,
    props.showFractionalValues,
  );

  const secondaryMaxAndMin = maxAndMinUtil(
    secondaryMaxItem,
    secondaryMinItem,
    props.roundToDigits,
    props.showFractionalValues,
  );

  const maxValue = props.maxValue ?? maxAndMin.maxItem;
  const secondaryMaxValue = lineConfig.isSecondary
    ? secondaryMaxAndMin.maxItem
    : maxValue;
  const mostNegativeValue = props.mostNegativeValue ?? maxAndMin.minItem;

  const stepValue = props.stepValue ?? maxValue / noOfSections;
  const noOfSectionsBelowXAxis =
    props.noOfSectionsBelowXAxis ?? -mostNegativeValue / stepValue;
  const showScrollIndicator =
    props.showScrollIndicator ?? BarDefaults.showScrollIndicator;
  const side = props.side ?? BarDefaults.side;
  const rotateLabel = props.rotateLabel ?? AxesAndRulesDefaults.rotateLabel;
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
  const xAxisLabelsVerticalShift =
    props.xAxisLabelsVerticalShift ??
    AxesAndRulesDefaults.xAxisLabelsVerticalShift;
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

  const barWidth = props.barWidth || BarDefaults.barWidth;
  const barBorderColor = props.barBorderColor ?? BarDefaults.barBorderColor;

  const extendedContainerHeight = getExtendedContainerHeightWithPadding(
    containerHeight,
    0,
  );

  const containerHeightIncludingBelowXAxis =
    extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight;

  const [pointerIndex, setPointerIndex] = useState(-1);
  const [pointerX, setPointerX] = useState(0);
  const [pointerY, setPointerY] = useState(0);
  const [pointerItem, setPointerItem] = useState({
    pointerShiftX: 0,
    pointerShiftY: 0,
  });
  const [responderStartTime, setResponderStartTime] = useState(0);
  const [responderActive, setResponderActive] = useState(false);

  const pointerConfig = props.pointerConfig;
  const getPointerProps = props.getPointerProps || null;
  const pointerHeight = pointerConfig?.height ?? defaultPointerConfig.height;
  const pointerWidth = pointerConfig?.width ?? defaultPointerConfig.width;
  const pointerRadius = pointerConfig?.radius ?? defaultPointerConfig.radius;
  const pointerColor =
    pointerConfig?.pointerColor ?? defaultPointerConfig.pointerColor;
  const pointerComponent =
    pointerConfig?.pointerComponent ?? defaultPointerConfig.pointerComponent;

  const showPointerStrip =
    pointerConfig?.showPointerStrip === false
      ? false
      : defaultPointerConfig.showPointerStrip;
  const pointerStripHeight =
    pointerConfig?.pointerStripHeight ??
    defaultPointerConfig.pointerStripHeight;
  const pointerStripWidth =
    pointerConfig?.pointerStripWidth ?? defaultPointerConfig.pointerStripWidth;
  const pointerStripColor =
    pointerConfig?.pointerStripColor ?? defaultPointerConfig.pointerStripColor;
  const pointerStripUptoDataPoint =
    pointerConfig?.pointerStripUptoDataPoint ??
    defaultPointerConfig.pointerStripUptoDataPoint;
  const pointerLabelComponent =
    pointerConfig?.pointerLabelComponent ??
    defaultPointerConfig.pointerLabelComponent;
  const stripOverPointer =
    pointerConfig?.stripOverPointer ?? defaultPointerConfig.stripOverPointer;
  const shiftPointerLabelX =
    pointerConfig?.shiftPointerLabelX ??
    defaultPointerConfig.shiftPointerLabelX;
  const shiftPointerLabelY =
    pointerConfig?.shiftPointerLabelY ??
    defaultPointerConfig.shiftPointerLabelY;
  const pointerLabelWidth =
    pointerConfig?.pointerLabelWidth ?? defaultPointerConfig.pointerLabelWidth;
  const pointerLabelHeight =
    pointerConfig?.pointerLabelHeight ??
    defaultPointerConfig.pointerLabelHeight;
  const autoAdjustPointerLabelPosition =
    pointerConfig?.autoAdjustPointerLabelPosition ??
    defaultPointerConfig.autoAdjustPointerLabelPosition;
  const pointerVanishDelay =
    pointerConfig?.pointerVanishDelay ??
    defaultPointerConfig.pointerVanishDelay;
  const activatePointersOnLongPress =
    pointerConfig?.activatePointersOnLongPress ??
    defaultPointerConfig.activatePointersOnLongPress;
  const activatePointersDelay =
    pointerConfig?.activatePointersDelay ??
    defaultPointerConfig.activatePointersDelay;
  const initialPointerIndex =
    pointerConfig?.initialPointerIndex ??
    defaultPointerConfig.initialPointerIndex;
  const initialPointerAppearDelay =
    pointerConfig?.initialPointerAppearDelay ??
    (isAnimated
      ? animationDuration
      : defaultPointerConfig.initialPointerAppearDelay);
  const persistPointer =
    pointerConfig?.persistPointer ?? defaultPointerConfig.persistPointer;
  const hidePointer1 =
    pointerConfig?.hidePointer1 ?? defaultPointerConfig.hidePointer1;
  const pointerEvents = pointerConfig?.pointerEvents;
  const stripBehindBars =
    pointerConfig?.stripBehindBars ?? defaultPointerConfig.stripBehindBars;

  const disableScroll =
    props.disableScroll ||
    (pointerConfig
      ? activatePointersOnLongPress
        ? responderActive
          ? true
          : false
        : true
      : false);

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
      duration: lineConfig.animationDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [lineConfig.animationDuration, widthValue]);

  useEffect(() => {
    if (showLine) {
      let pp = '',
        pp2 = '';
      const firstBarWidth =
        (props.stackData ?? data)?.[0].barWidth ?? props.barWidth ?? 30;
      if (!lineConfig.curved) {
        for (let i = 0; i < lineData.length; i++) {
          if (i < lineConfig.startIndex || i > lineConfig.endIndex) continue;
          const currentBarWidth =
            data?.[i]?.barWidth ?? props.barWidth ?? BarDefaults.barWidth;
          const currentValue = props.lineData
            ? props.lineData[i].value
            : props.stackData
            ? props.stackData[i].stacks.reduce(
                (total, item) => total + item.value,
                0,
              )
            : data[i].value;
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
              currentValue,
              lineConfig.shiftY,
              containerHeight,
              lineConfig.isSecondary ? secondaryMaxValue : maxValue,
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
          const currentValue = props.lineData
            ? props.lineData[i].value
            : props.stackData
            ? props.stackData[i].stacks.reduce(
                (total, item) => total + item.value,
                0,
              )
            : data[i].value;
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
              currentValue,
              lineConfig.shiftY,
              containerHeight,
              lineConfig.isSecondary ? secondaryMaxValue : maxValue,
            ),
          ]);
          let xx = svgPath(p1Array, lineConfig.curveType, lineConfig.curvature);
          setPoints(xx);
        }
      }
      if (lineData2?.length) {
        if (!lineConfig2?.curved) {
          for (let i = 0; i < lineData2.length; i++) {
            if (i < lineConfig2.startIndex || i > lineConfig2.endIndex)
              continue;
            const currentBarWidth =
              data?.[i]?.barWidth ?? props.barWidth ?? BarDefaults.barWidth;
            const currentValue = lineData2[i].value;
            pp2 +=
              'L' +
              getXForLineInBar(
                i,
                firstBarWidth,
                currentBarWidth,
                yAxisLabelWidth,
                lineConfig2,
                spacing,
              ) +
              ' ' +
              getYForLineInBar(
                currentValue,
                lineConfig2.shiftY,
                containerHeight,
                lineConfig2.isSecondary ? secondaryMaxValue : maxValue,
              ) +
              ' ';
          }
          setPoints2(pp2.replace('L', 'M'));
        } else {
          let p2Array: Array<Array<number>> = [];
          for (let i = 0; i < lineData2.length; i++) {
            if (i < lineConfig2.startIndex || i > lineConfig2.endIndex)
              continue;
            const currentBarWidth =
              data?.[i]?.barWidth ?? props.barWidth ?? BarDefaults.barWidth;
            const currentValue = lineData2[i].value;
            p2Array.push([
              getXForLineInBar(
                i,
                firstBarWidth,
                currentBarWidth,
                yAxisLabelWidth,
                lineConfig2,
                spacing,
              ),
              getYForLineInBar(
                currentValue,
                lineConfig2.shiftY,
                containerHeight,
                lineConfig2.isSecondary ? secondaryMaxValue : maxValue,
              ),
            ]);
            let xx = svgPath(
              p2Array,
              lineConfig2.curveType,
              lineConfig2.curvature,
            );
            setPoints2(xx);
          }
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
  useEffect(() => {
    if (initialPointerIndex !== -1) {
      const item = data?.[initialPointerIndex];
      const stackItem = props.stackData?.[initialPointerIndex];
      const stackSum = stackItem?.stacks?.reduce(
        (acc, stack) => acc + (stack.value ?? 0),
        0,
      );
      const x =
        initialSpacing +
        (spacing + barWidth) * initialPointerIndex -
        (pointerRadius || pointerWidth / 2) +
        barWidth / 2;
      const y =
        containerHeight -
        ((stackSum ?? item.value) * containerHeight) / maxValue -
        (pointerRadius || pointerHeight / 2) +
        10;
      if (initialPointerAppearDelay) {
        setTimeout(() => {
          setPointerConfig(initialPointerIndex, item, x, y);
        }, initialPointerAppearDelay);
      } else {
        setPointerConfig(initialPointerIndex, item, x, y);
      }
    }
  }, []);

  const setPointerConfig = (initialPointerIndex, item, x, y) => {
    setPointerIndex(initialPointerIndex);
    setPointerItem(item);
    setPointerX(x);
    setPointerY(y);
  };

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

  const renderPointer = (lineNumber: number) => {
    if (lineNumber === 1 && hidePointer1) return;

    const pointerItemLocal = pointerItem;
    const pointerYLocal = pointerY;
    const pointerColorLocal = pointerConfig?.pointer1Color || pointerColor;

    return Pointer({
      pointerX,
      pointerYLocal,
      pointerComponent,
      pointerHeight,
      pointerRadius,
      pointerWidth,
      pointerItemLocal,
      pointerColorLocal,
    });
  };

  const renderStripAndLabel = (stripBehindBars, pointerLabelComponent) => {
    let pointerItemLocal,
      pointerYLocal = pointerY;

    pointerItemLocal = [pointerItem];
    return StripAndLabel({
      autoAdjustPointerLabelPosition,
      pointerX,
      pointerLabelWidth,
      activatePointersOnLongPress,
      yAxisLabelWidth,
      pointerRadius,
      pointerWidth,
      shiftPointerLabelX,
      pointerLabelHeight,
      pointerYLocal,
      pointerStripUptoDataPoint,
      pointerStripHeight,
      shiftPointerLabelY,
      pointerItemLocal,
      showPointerStrip,
      pointerStripWidth,
      containerHeight,
      xAxisThickness,
      pointerStripColor,
      pointerConfig,
      pointerLabelComponent,
      scrollX: 0,
      pointerEvents,
      stripBehindBars,
    });
  };

  const renderChartContent = () => {
    if (pointerConfig) {
      return (
        <View
          onStartShouldSetResponder={evt => (pointerConfig ? true : false)}
          onMoveShouldSetResponder={evt => (pointerConfig ? true : false)}
          onResponderGrant={evt => {
            if (!pointerConfig) return;
            setResponderStartTime(evt.timeStamp);
            if (activatePointersOnLongPress) {
              return;
            }
            let x = evt.nativeEvent.locationX;
            if (
              !activatePointersOnLongPress &&
              x > (props.width || screenWidth)
            )
              return;
            let factor =
              (x - initialSpacing - barWidth / 2) / (spacing + barWidth);
            factor = Math.round(factor);
            factor = Math.min(factor, data.length - 1);
            factor = Math.max(factor, 0);
            let z =
              initialSpacing +
              (spacing + barWidth) * factor -
              (pointerRadius || pointerWidth / 2) +
              barWidth / 2;
            setPointerX(z);
            setPointerIndex(factor);
            let item, y;
            item = (props.stackData ?? data)[factor];
            const stackSum = item.stacks?.reduce(
              (acc, stack) => acc + (stack.value ?? 0),
              0,
            );
            y =
              containerHeight -
              ((stackSum ?? item.value) * containerHeight) / maxValue -
              (pointerRadius || pointerHeight / 2) +
              10;
            setPointerY(y);
            setPointerItem(item);
          }}
          onResponderMove={evt => {
            if (!pointerConfig) return;
            if (
              activatePointersOnLongPress &&
              evt.timeStamp - responderStartTime < activatePointersDelay
            ) {
              return;
            } else {
              setResponderActive(true);
            }
            let x = evt.nativeEvent.locationX;
            if (
              !activatePointersOnLongPress &&
              x > (props.width || screenWidth)
            )
              return;
            let factor =
              (x - initialSpacing - barWidth / 2) / (spacing + barWidth);
            factor = Math.round(factor);
            factor = Math.min(factor, (props.stackData ?? data).length - 1);
            factor = Math.max(factor, 0);
            let z =
              initialSpacing +
              (spacing + barWidth) * factor -
              (pointerRadius || pointerWidth / 2) +
              barWidth / 2;
            let item, y;
            setPointerX(z);
            setPointerIndex(factor);
            item = (props.stackData ?? data)[factor];
            const stackSum = item.stacks?.reduce(
              (acc, stack) => acc + (stack.value ?? 0),
              0,
            );
            y =
              containerHeight -
              ((stackSum ?? item.value) * containerHeight) / maxValue -
              (pointerRadius || pointerHeight / 2) +
              10;
            setPointerY(y);
            setPointerItem(item);
          }}
          onResponderEnd={evt => {
            setResponderStartTime(0);
            setPointerIndex(-1);
            setResponderActive(false);
            if (!persistPointer)
              setTimeout(() => setPointerX(0), pointerVanishDelay);
          }}
          onResponderTerminationRequest={evt => false}
          style={{
            position: 'absolute',
            height: containerHeightIncludingBelowXAxis,
            bottom: 60,
            paddingLeft: initialSpacing,
            width: totalWidth,
            flexDirection: 'row',
          }}>
          {pointerX > 0 && stripBehindBars ? (
            <View
              pointerEvents={pointerEvents ?? 'none'}
              style={{
                position: 'absolute',
                height:
                  extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight,
                bottom: xAxisLabelsVerticalShift + labelsExtraHeight,
                width: totalWidth,
              }}>
              {renderStripAndLabel(true, null)}
            </View>
          ) : null}
          {renderChart()}
          {pointerX > 0 ? (
            <View
              pointerEvents={pointerEvents ?? 'none'}
              style={{
                position: 'absolute',
                height:
                  extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight,
                bottom: xAxisLabelsVerticalShift + labelsExtraHeight,
                width: totalWidth,
                zIndex: 20,
              }}>
              {!stripOverPointer &&
                !stripBehindBars &&
                renderStripAndLabel(false, pointerLabelComponent)}
              {renderPointer(1)}
              {stripOverPointer &&
                !stripBehindBars &&
                renderStripAndLabel(false, pointerLabelComponent)}
            </View>
          ) : null}
        </View>
      );
    } else {
      return renderChart();
    }
  };

  const renderChart = () => {
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
        showValuesAsTopLabel: props.showValuesAsTopLabel,
        topLabelContainerStyle: props.topLabelContainerStyle,
        topLabelTextStyle: props.topLabelTextStyle,
        barBorderWidth: props.barBorderWidth,
        barBorderColor: barBorderColor,
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
        xAxisLabelsHeight: props.xAxisLabelsHeight,
        xAxisLabelsVerticalShift,
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
        pointerConfig,
      };
    };
    if (props.stackData) {
      return props.stackData.map((item, index) => {
        return (
          <RenderStackBars
            stackData={props.stackData || []}
            isAnimated={isAnimated}
            animationDuration={animationDuration}
            stackBorderRadius={props.stackBorderRadius}
            stackBorderTopLeftRadius={props.stackBorderTopLeftRadius}
            stackBorderTopRightRadius={props.stackBorderTopRightRadius}
            stackBorderBottomLeftRadius={props.stackBorderBottomLeftRadius}
            stackBorderBottomRightRadius={props.stackBorderBottomRightRadius}
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
    noOfSectionsBelowXAxis,
    stepHeight,
    labelsExtraHeight,
    yAxisLabelWidth,
    horizontal,
    rtl,
    shiftX: props.shiftX ?? 0,
    shiftY: props.shiftY ?? 0,
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
    scrollEventThrottle,
    indicatorColor: props.indicatorColor,
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

    //horizSectionProps-
    width: widthFromProps,
    horizSections,
    endSpacing,
    horizontalRulesStyle,
    noOfSections,
    showFractionalValues,

    axesAndRulesProps: getAxesAndRulesProps(
      props,
      stepValue,
      secondaryMaxValue,
    ),

    yAxisLabelTexts: props.yAxisLabelTexts,
    yAxisOffset: props.yAxisOffset,
    rotateYAxisTexts: props.rotateYAxisTexts,
    hideAxesAndRules: props.hideAxesAndRules,

    showXAxisIndices,
    xAxisIndicesHeight,
    xAxisIndicesWidth,
    xAxisIndicesColor,

    // These are Not needed but passing this prop to maintain consistency (between LineChart and BarChart props)
    pointerConfig,
    getPointerProps,
    pointerIndex,
    pointerX,
    pointerY,
  };

  return <BarAndLineChartsWrapper {...barAndLineChartsWrapperProps} />;
};
