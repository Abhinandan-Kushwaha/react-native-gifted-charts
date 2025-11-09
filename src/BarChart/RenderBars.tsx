import {View, TouchableOpacity, Animated, Text} from 'react-native';
import AnimatedThreeDBar from '../Components/AnimatedThreeDBar';
import Animated2DWithGradient from './Animated2DWithGradient';
import {
  getPropsForAnimated2DWithGradient,
  RenderBarsPropsType,
  useRenderBars,
} from 'gifted-charts-core';
import Tooltip from '../Components/BarSpecificComponents/tooltip';

const isIndexSelected = (values: number | number[], idx: number) => {
  if (Array.isArray(values)) return values.includes(idx);
  return values === idx;
};

const RenderBars = (props: RenderBarsPropsType) => {
  const {
    item,
    index,
    containerHeight,
    maxValue,
    minHeight,
    spacing,
    side,
    data,
    barBorderWidth,
    barBorderColor,
    isThreeD,
    isAnimated,
    rotateLabel,
    appearingOpacity,
    animationDuration,
    autoShiftLabels,
    label,
    secondaryLabel,
    labelTextStyle,
    secondaryLabelTextStyle,
    xAxisTextNumberOfLines,
    xAxisLabelsVerticalShift,
    renderTooltip,
    selectedIndex,
    setSelectedIndex,
    horizontal,
    rtl,
    pointerConfig,
    noOfSectionsBelowXAxis,
    barWidth,
    labelsDistanceFromXaxis = 0,
    secondaryXAxis,
    secondaryNoOfSectionsBelowXAxis,
    barMarginBottom = 0,
    highlightEnabled,
    highlightedBarIndex,
    lowlightOpacity,
  } = props;

  const {heightFactor, barHeight, tooltipProps} = useRenderBars(props);

  const {
    commonStyleForBar,
    barStyleWithBackground,
    commonPropsFor2dAnd3dBars,
    isFocused,
    focusedBarConfig,
    localFrontColor,
  } = getPropsForAnimated2DWithGradient({...props, barHeight});

  const itemOrPropsBarInnerComponent =
    item.barInnerComponent ?? props.barInnerComponent;
  const localBarInnerComponent = isFocused
    ? (focusedBarConfig?.barInnerComponent ?? itemOrPropsBarInnerComponent)
    : itemOrPropsBarInnerComponent;

  const renderLabel = (
    top: boolean,
    label: string,
    labelTextStyle: any,
    value: number,
  ) => {
    return (
      <View
        style={[
          {
            width:
              (item.labelWidth ||
                props.labelWidth ||
                item.barWidth ||
                barWidth) + spacing,
            left: spacing / -2,
            position: 'absolute',
            height: props.xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18,
            bottom: top
              ? (containerHeight || 200) +
                (secondaryXAxis?.labelsDistanceFromXaxis ?? 15)
              : (rotateLabel
                  ? -40
                  : -6 -
                    xAxisTextNumberOfLines * 18 -
                    (value < 0
                      ? -xAxisLabelsVerticalShift
                      : xAxisLabelsVerticalShift)) -
                barMarginBottom -
                (value < 0 && !autoShiftLabels
                  ? -labelsDistanceFromXaxis
                  : labelsDistanceFromXaxis),
          },
          rotateLabel
            ? horizontal
              ? {transform: [{rotate: '330deg'}]}
              : {
                  transform: [
                    {rotate: value < 0 ? '240deg' : '60deg'},
                    {translateX: value < 0 ? 56 : 0},
                    {translateY: value < 0 ? 32 : 0},
                  ],
                }
            : horizontal
              ? {transform: [{rotate: '-90deg'}]}
              : value < 0
                ? {
                    transform: [
                      {rotate: '180deg'},
                      {
                        translateY: autoShiftLabels
                          ? 0
                          : 16.5 * xAxisTextNumberOfLines + 12,
                      },
                    ],
                  }
                : {},
        ]}>
        {top ? (
          item.secondaryLabelComponent ? (
            item.secondaryLabelComponent()
          ) : (
            <Text
              style={[
                {textAlign: 'center'},
                rtl && horizontal && {transform: [{rotate: '180deg'}]},
                labelTextStyle,
              ]}
              numberOfLines={xAxisTextNumberOfLines}>
              {label}
            </Text>
          )
        ) : item.labelComponent ? (
          item.labelComponent()
        ) : (
          <Text
            style={[
              {textAlign: 'center'},
              rtl && horizontal && {transform: [{rotate: '180deg'}]},
              labelTextStyle,
            ]}
            numberOfLines={xAxisTextNumberOfLines}>
            {label}
          </Text>
        )}
      </View>
    );
  };

  const renderAnimatedLabel = (
    top: boolean,
    label: string,
    labelTextStyle: any,
    value: number,
  ) => {
    return (
      <Animated.View
        style={[
          {
            width:
              (item.labelWidth ||
                props.labelWidth ||
                item.barWidth ||
                barWidth) + spacing,
            left: spacing / -2,
            position: 'absolute',
            height:
              props.xAxisLabelsHeight ??
              xAxisTextNumberOfLines * 18 -
                (value < 0
                  ? -xAxisLabelsVerticalShift
                  : xAxisLabelsVerticalShift),
            bottom: top
              ? (containerHeight || 200) +
                (secondaryXAxis?.labelsDistanceFromXaxis ?? 15)
              : (rotateLabel
                  ? -40
                  : -6 -
                    xAxisTextNumberOfLines * 18 -
                    xAxisLabelsVerticalShift) - barMarginBottom,
            opacity: appearingOpacity,
          },
          value < 0 && {transform: [{rotate: '180deg'}]},
          rotateLabel
            ? horizontal
              ? {transform: [{rotate: '330deg'}]}
              : {transform: [{rotate: '60deg'}]}
            : horizontal
              ? {transform: [{rotate: '-90deg'}]}
              : value < 0
                ? {
                    transform: [
                      {rotate: '180deg'},
                      {
                        translateY: autoShiftLabels
                          ? 0
                          : 16.5 * xAxisTextNumberOfLines + 12,
                      },
                    ],
                  }
                : {},
        ]}>
        {top ? (
          item.secondaryLabelComponent ? (
            item.secondaryLabelComponent()
          ) : (
            <Text
              style={[
                {textAlign: 'center'},
                rtl && horizontal && {transform: [{rotate: '180deg'}]},
                labelTextStyle,
              ]}
              numberOfLines={xAxisTextNumberOfLines}>
              {label}
            </Text>
          )
        ) : item.labelComponent ? (
          item.labelComponent()
        ) : (
          <Text
            style={[
              {textAlign: 'center'},
              rtl && horizontal && {transform: [{rotate: '180deg'}]},
              labelTextStyle,
            ]}
            numberOfLines={xAxisTextNumberOfLines}>
            {label}
          </Text>
        )}
      </Animated.View>
    );
  };

  const barWrapperStyle = [
    {
      // overflow: 'visible',
      opacity: highlightEnabled
        ? isIndexSelected(highlightedBarIndex, -1)
          ? 1
          : isIndexSelected(highlightedBarIndex, index)
            ? 1
            : lowlightOpacity
        : 1,
      marginBottom: 60 + barMarginBottom + xAxisLabelsVerticalShift - 0.5,
      width: commonPropsFor2dAnd3dBars.barWidth,
      height: barHeight,
      marginRight: spacing,
      transform: [
        {
          translateY:
            (containerHeight || 200) -
            (barHeight - 10 + xAxisLabelsVerticalShift) +
            (item.value < 0 ? Math.abs(item.value) * heightFactor : 0),
        },
        {rotateZ: item.value < 0 ? '180deg' : '0deg'},
      ],
    },
    side !== 'right' && {zIndex: data.length - index},
  ];

  const pressDisabled =
    item.disablePress ||
    props.disablePress ||
    (pointerConfig && pointerConfig.barTouchable !== true);

  const barContent = () => {
    const isBarBelowXaxisAndInvisible =
      item.value < 0 &&
      !(noOfSectionsBelowXAxis || secondaryNoOfSectionsBelowXAxis);
    const animated2DWithGradient = (
      noGradient: boolean,
      noAnimation: boolean,
    ) => (
      <Animated2DWithGradient
        {...commonPropsFor2dAnd3dBars}
        animationDuration={animationDuration || 800}
        roundedBottom={props.roundedBottom || false}
        roundedTop={props.roundedTop || false}
        noGradient={noGradient}
        noAnimation={noAnimation}
        containerHeight={containerHeight}
        maxValue={maxValue}
        minHeight={minHeight ?? 0}
        barMarginBottom={barMarginBottom}
        cappedBars={props.cappedBars}
        capThickness={props.capThickness}
        capColor={props.capColor}
        capRadius={props.capRadius}
        horizontal={horizontal}
        barBorderWidth={barBorderWidth}
        barBorderColor={barBorderColor}
        commonStyleForBar={commonStyleForBar}
        barStyleWithBackground={barStyleWithBackground}
      />
    );
    return (
      <>
        {(props.showXAxisIndices || item.showXAxisIndex) && (
          <View
            style={{
              zIndex: 2,
              position: 'absolute',
              height: props.xAxisIndicesHeight,
              width: props.xAxisIndicesWidth,
              bottom: props.xAxisIndicesHeight / -2,
              left: ((item.barWidth || barWidth) - props.xAxisIndicesWidth) / 2,
              backgroundColor: props.xAxisIndicesColor,
            }}
          />
        )}
        {isBarBelowXaxisAndInvisible ? null : isThreeD ? (
          <AnimatedThreeDBar
            {...commonPropsFor2dAnd3dBars}
            sideWidth={
              item.sideWidth ||
              props.sideWidth ||
              (item.barWidth || barWidth) / 2
            }
            side={side || 'left'}
            sideColor={item.sideColor || props.sideColor || ''}
            topColor={item.topColor || props.topColor || ''}
            horizontal={horizontal}
            isAnimated={isAnimated}
            animationDuration={animationDuration || 800}
            selectedIndex={selectedIndex}
            containerHeight={containerHeight || 200}
          />
        ) : item.showGradient || props.showGradient ? (
          isAnimated ? (
            animated2DWithGradient(false, false)
          ) : (
            animated2DWithGradient(false, true)
          )
        ) : isAnimated ? (
          animated2DWithGradient(true, false)
        ) : (
          animated2DWithGradient(true, true)
        )}
        {isAnimated
          ? renderAnimatedLabel(false, label, labelTextStyle, item.value)
          : renderLabel(false, label, labelTextStyle, item.value)}
        {secondaryXAxis
          ? isAnimated
            ? renderAnimatedLabel(
                true,
                secondaryLabel,
                secondaryLabelTextStyle,
                item.value,
              )
            : renderLabel(
                true,
                secondaryLabel,
                secondaryLabelTextStyle,
                item.value,
              )
          : null}
      </>
    );
  };

  return (
    <>
      {pressDisabled ? (
        <View pointerEvents="none" style={barWrapperStyle}>
          {barContent()}
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={props.activeOpacity || 0.2}
          onPress={() => {
            if (renderTooltip || props.focusBarOnPress || highlightEnabled) {
              if (props.focusedBarIndex === undefined || !props.onPress) {
                setSelectedIndex([index]);
              }
            }
            item.onPress
              ? item.onPress()
              : props.onPress
                ? props.onPress(item, index)
                : null;
          }}
          onLongPress={() => {
            item.onLongPress
              ? item.onLongPress()
              : props.onLongPress
                ? props.onLongPress(item, index)
                : null;
          }}
          onPressOut={() => {
            item.onPressOut
              ? item.onPressOut()
              : props.onPressOut
                ? props.onPressOut(item, index)
                : null;
          }}
          style={barWrapperStyle}>
          {barContent()}
        </TouchableOpacity>
      )}
      {renderTooltip && selectedIndex.includes?.(index) && (
        <Tooltip {...tooltipProps} />
      )}
    </>
  );
};

export default RenderBars;
