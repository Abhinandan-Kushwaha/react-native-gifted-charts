import {useCallback, useEffect, useMemo, useRef} from 'react';
import {Animated, Easing, Pressable, View, ViewStyle} from 'react-native';
import RenderBars from './RenderBars';
import RenderStackBars from './RenderStackBars';
import BarAndLineChartsWrapper from '../Components/BarAndLineChartsWrapper';
import {BarChartPropsType, useBarChart} from 'gifted-charts-core';
import {StripAndLabel} from '../Components/common/StripAndLabel';
import {Pointer} from '../Components/common/Pointer';
import {screenWidth} from '../utils';

export const BarChart = (props: BarChartPropsType) => {
  const heightValue = useMemo(() => new Animated.Value(0), []);
  const opacityValue = useMemo(() => new Animated.Value(0), []);
  const widthValue = useMemo(() => new Animated.Value(0), []);

  const scrollRef = props.scrollRef ?? useRef(null);
  const remainingScrollViewProps = {
    onScroll: (ev: any) => props.onScroll?.(ev),
    onTouchStart: (evt: any) => {
      if (props.renderTooltip) {
        setSelectedIndex([-1]);
      }
    },
    bounces: props.bounces,
    overScrollMode: props.overScrollMode ?? 'auto',
  };

  const {
    lineConfig,
    hidePointer1,
    pointerItem,
    pointerY,
    pointerConfig,
    pointerColor,
    pointerX,
    pointerComponent,
    pointerHeight,
    pointerRadius,
    pointerWidth,
    autoAdjustPointerLabelPosition,
    pointerLabelWidth,
    activatePointersOnLongPress,
    yAxisLabelWidth,
    shiftPointerLabelX,
    pointerLabelHeight,
    pointerStripUptoDataPoint,
    pointerStripHeight,
    shiftPointerLabelY,
    showPointerStrip,
    pointerStripWidth,
    containerHeight,
    xAxisThickness,
    pointerStripColor,
    pointerEvents,
    setResponderStartTime,
    setPointerY,
    setPointerItem,
    initialSpacing,
    spacing,
    data,
    barWidth,
    setPointerX,
    pointerIndex,
    setPointerIndex,
    maxValue,
    responderStartTime,
    setResponderActive,
    activatePointersDelay,
    persistPointer,
    pointerVanishDelay,
    containerHeightIncludingBelowXAxis,
    extendedContainerHeight,
    totalWidth,
    stripBehindBars,
    noOfSectionsBelowXAxis,
    stepHeight,
    xAxisLabelsVerticalShift,
    labelsExtraHeight,
    stripOverPointer,
    pointerLabelComponent,
    selectedIndex,
    setSelectedIndex,
    selectedStackIndex,
    setSelectedStackIndex,
    isAnimated,
    animationDuration,
    side,
    labelWidth,
    isThreeD,
    animatedHeight,
    appearingOpacity,
    autoShiftLabels,
    getPropsCommonForBarAndStack,
    barAndLineChartsWrapperProps,
    autoShiftLabelsForNegativeStacks,
  } = useBarChart({
    ...props,
    heightValue,
    widthValue,
    opacityValue,
    parentWidth: props.parentWidth ?? screenWidth,
  });

  const {stackData} = barAndLineChartsWrapperProps;

  const labelsAppear = useCallback(() => {
    opacityValue.setValue(0);
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [opacityValue]);

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
    if (lineConfig.isAnimated) {
      setTimeout(() => decreaseWidth(), lineConfig.delay || 0);
    }
    setTimeout(() => labelsAppear(), animationDuration);
  }, [decreaseWidth, labelsAppear, animationDuration]);

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

  const renderStripAndLabel = (pointerLabelComponent: any) => {
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
      isBarChart: true,
      pointerIndex,
      width: totalWidth,
      screenWidth,
      containsNegative: false,
    });
  };

  const contentContainerStyle: ViewStyle = {
    position: 'absolute',
    height: containerHeightIncludingBelowXAxis,
    bottom: 60 + labelsExtraHeight,
    paddingLeft: initialSpacing,
    width: totalWidth,
    flexDirection: 'row',
  };

  const activatePointer = (x: number) => {
    let factor = (x - initialSpacing - barWidth / 2) / (spacing + barWidth);
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
    item = (stackData ?? data)[factor];
    let stackSum = 0;
    if ('stacks' in item) {
      stackSum = item.stacks.reduce(
        (acc: number, stack: any) => acc + (stack.value ?? 0),
        0,
      );
    }
    y =
      containerHeight -
      ((stackSum ?? item.value) * containerHeight) / maxValue -
      (pointerRadius || pointerHeight / 2) +
      10;
    setPointerY(y);
    setPointerItem(item);
    pointerConfig?.onResponderGrant?.();
  };

  const renderChartContent = () => {
    if (pointerConfig) {
      return (
        <View
          onPointerEnter={() => pointerConfig?.onPointerEnter?.()}
          onPointerLeave={() => pointerConfig?.onPointerLeave?.()}
          onTouchStart={() => pointerConfig?.onTouchStart?.()}
          onTouchEnd={() => pointerConfig?.onTouchEnd?.()}
          onStartShouldSetResponder={() => !!pointerConfig}
          onMoveShouldSetResponder={() => !!pointerConfig}
          onResponderGrant={evt => {
            setResponderStartTime(evt.timeStamp);
            if (
              activatePointersOnLongPress ||
              !pointerConfig?.activatePointersInstantlyOnTouch
            ) {
              return;
            }
            let x = evt.nativeEvent.locationX;
            if (
              !activatePointersOnLongPress &&
              x > (props.width || screenWidth)
            )
              return;
            setResponderActive(true);
            activatePointer(x);
          }}
          onResponderMove={evt => {
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
            activatePointer(x);
          }}
          onResponderEnd={evt => {
            setResponderStartTime(0);
            setPointerIndex(-1);
            setResponderActive(false);
            if (!persistPointer)
              setTimeout(() => setPointerX(0), pointerVanishDelay);
            pointerConfig?.onResponderEnd?.();
          }}
          onResponderTerminationRequest={evt => false}
          style={contentContainerStyle}>
          {pointerX > 0 && stripBehindBars ? (
            <View
              pointerEvents={pointerEvents ?? 'none'}
              style={{
                position: 'absolute',
                height:
                  extendedContainerHeight + noOfSectionsBelowXAxis * stepHeight,
                bottom: xAxisLabelsVerticalShift,
                width: totalWidth,
              }}>
              {renderStripAndLabel(null)}
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
                bottom: xAxisLabelsVerticalShift,
                width: totalWidth,
                zIndex: 20,
              }}>
              {!stripOverPointer &&
                !stripBehindBars &&
                renderStripAndLabel(null)}
              {renderPointer(1)}
              {stripOverPointer &&
                !stripBehindBars &&
                renderStripAndLabel(null)}
              {
                pointerLabelComponent &&
                  renderStripAndLabel(pointerLabelComponent) // no matter what, pointerLabelComponent will be rendered at last -> over the chart content
              }
            </View>
          ) : null}
        </View>
      );
    } else {
      return (
        <Pressable
          style={contentContainerStyle}
          onPress={() => {
            if (props.highlightEnabled && !selectedIndex.includes(-1))
              setSelectedIndex([-1]);
            if (props.stackHighlightEnabled && selectedStackIndex !== -1) {
              setSelectedStackIndex(-1);
              // props.setHighlightedStackIndex?.(-1)
            }
            props.onBackgroundPress?.();
          }}>
          {renderChart()}
        </Pressable>
      );
    }
  };

  const renderChart = () => {
    if (stackData) {
      return stackData.map((item, index) => {
        const {selectedIndex,...stackRestProps} = getPropsCommonForBarAndStack(item,index)
        return (
          <RenderStackBars
            key={index}
            stackData={props.stackData || []}
            isAnimated={isAnimated}
            animationDuration={animationDuration}
            stackBorderRadius={props.stackBorderRadius}
            stackBorderTopLeftRadius={props.stackBorderTopLeftRadius}
            stackBorderTopRightRadius={props.stackBorderTopRightRadius}
            stackBorderBottomLeftRadius={props.stackBorderBottomLeftRadius}
            stackBorderBottomRightRadius={props.stackBorderBottomRightRadius}
            autoShiftLabelsForNegativeStacks={autoShiftLabelsForNegativeStacks}
            selectedStackIndex={selectedStackIndex}
            setSelectedStackIndex={setSelectedStackIndex}
            // highlightedStackIndex={props.highlightedStackIndex??-1}
            selectedIndex={selectedIndex[0]}
            {...stackRestProps}
          />
        );
      });
    } else {
      return data.map((item, index) => (
        <RenderBars
          key={index}
          data={data}
          side={side}
          minHeight={props.minHeight ?? (isAnimated && !isThreeD ? 0.1 : 0)}
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
          barStyle={props.barStyle}
          {...getPropsCommonForBarAndStack(item, index)}
        />
      ));
    }
  };

  return (
    <BarAndLineChartsWrapper
      {...barAndLineChartsWrapperProps}
      scrollRef={scrollRef}
      renderChartContent={renderChartContent}
      remainingScrollViewProps={remainingScrollViewProps}
      nestedScrollEnabled={props.nestedScrollEnabled}
      onScrollEndDrag={props.onScrollEndDrag}
    />
  );
};
