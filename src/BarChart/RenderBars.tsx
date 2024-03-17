import React from 'react';
import {View, TouchableOpacity, Animated, Text} from 'react-native';
import AnimatedThreeDBar from '../Components/AnimatedThreeDBar';
import Animated2DWithGradient from './Animated2DWithGradient';
import Cap from '../Components/BarSpecificComponents/cap';
import BarBackgroundPattern from '../Components/BarSpecificComponents/barBackgroundPattern';
import LinearGradient from "../Components/common/LinearGradient";
import {
  getPropsForAnimated2DWithGradient,
  RenderBarsPropsType,
  barDataItem,
  AxesAndRulesDefaults,
} from 'gifted-charts-core';

const RenderBars = (props: RenderBarsPropsType) => {
  const {
    item,
    index,
    containerHeight,
    maxValue,
    minHeight,
    spacing,
    propSpacing,
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
    labelTextStyle,
    xAxisTextNumberOfLines,
    xAxisLabelsVerticalShift,
    renderTooltip,
    leftShiftForTooltip,
    leftShiftForLastIndexTooltip,
    initialSpacing,
    selectedIndex,
    setSelectedIndex,
    xAxisThickness = AxesAndRulesDefaults.xAxisThickness,
    horizontal,
    rtl,
    intactTopLabel,
    showValuesAsTopLabel,
    topLabelContainerStyle,
    topLabelTextStyle,
    pointerConfig,
    noOfSectionsBelowXAxis,
    yAxisOffset,
  } = props;

  const barHeight = Math.max(
    minHeight,
    (Math.abs(item.value) * (containerHeight || 200)) / (maxValue || 200) -
      xAxisThickness,
  );

  const {
    commonStyleForBar,
    barStyleWithBackground,
    commonPropsFor2Dand3Dbars,
    isFocused,
    focusedBarConfig,
    localFrontColor,
  } = getPropsForAnimated2DWithGradient({...props, barHeight});

  const itemOrPropsBarInnerComponent =
    item.barInnerComponent ?? props.barInnerComponent;
  const localBarInnerComponent = isFocused
    ? focusedBarConfig?.barInnerComponent ?? itemOrPropsBarInnerComponent
    : itemOrPropsBarInnerComponent;

  const barMarginBottom =
    item.barMarginBottom === 0
      ? 0
      : item.barMarginBottom || props.barMarginBottom || 0;

  const renderLabel = (label: String, labelTextStyle: any, value: number) => {
    return (
      <View
        style={[
          {
            width:
              (item.labelWidth ||
                props.labelWidth ||
                item.barWidth ||
                props.barWidth ||
                30) + spacing,
            left: spacing / -2,
            position: 'absolute',
            height: props.xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18,
            bottom:
              (rotateLabel
                ? -40
                : -6 - xAxisTextNumberOfLines * 18 - xAxisLabelsVerticalShift) -
              barMarginBottom,
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
                          : 16.5 * xAxisTextNumberOfLines + 14,
                      },
                    ],
                  }
                : {},
        ]}>
        {item.labelComponent ? (
          item.labelComponent()
        ) : (
          <Text
            style={[
              {textAlign: 'center'},
              rtl && horizontal && {transform: [{rotate: '180deg'}]},
              labelTextStyle,
            ]}
            numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </Text>
        )}
      </View>
    );
  };

  const renderAnimatedLabel = (
    label: String,
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
                props.barWidth ||
                30) + spacing,
            left: spacing / -2,
            position: 'absolute',
            height: props.xAxisLabelsHeight ?? xAxisTextNumberOfLines * 18,
            bottom:
              (rotateLabel
                ? -40
                : -6 - xAxisTextNumberOfLines * 18 - xAxisLabelsVerticalShift) -
              barMarginBottom,
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
                          : 16.5 * xAxisTextNumberOfLines + 14,
                      },
                    ],
                  }
                : {},
        ]}>
        {item.labelComponent ? (
          item.labelComponent()
        ) : (
          <Text
            style={[
              {textAlign: 'center'},
              rtl && horizontal && {transform: [{rotate: '180deg'}]},
              labelTextStyle,
            ]}
            numberOfLines={xAxisTextNumberOfLines}>
            {label || ''}
          </Text>
        )}
      </Animated.View>
    );
  };

  let leftSpacing = initialSpacing;
  for (let i = 0; i < index; i++) {
    leftSpacing +=
      (data[i].spacing ?? propSpacing) +
      (data[i].barWidth || props.barWidth || 30);
  }

  const static2DWithGradient = (item: barDataItem) => {
    const localGradientColor =
      item.gradientColor || props.gradientColor || 'white';
    return (
      <>
        <LinearGradient
          style={commonStyleForBar}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={[
            isFocused
              ? focusedBarConfig?.gradientColor ?? localGradientColor
              : localGradientColor,
            localFrontColor,
          ]}>
          {props.cappedBars && item.value ? (
            <Cap
              capThicknessFromItem={item.capThickness}
              capThicknessFromProps={props.capThickness}
              capColorFromItem={item.capColor}
              capColorFromProps={props.capColor}
              capRadiusFromItem={item.capRadius}
              capRadiusFromProps={props.capRadius}
            />
          ) : null}
        </LinearGradient>
        {(item.barBackgroundPattern || props.barBackgroundPattern) && (
          <BarBackgroundPattern
            barBackgroundPatternFromItem={item.barBackgroundPattern}
            barBackgroundPatternFromProps={props.barBackgroundPattern}
            patternIdFromItem={item.patternId}
            patternIdFromProps={props.patternId}
          />
        )}
        {(item.topLabelComponent || showValuesAsTopLabel) && (
          <View
            style={[
              {
                position: 'absolute',
                top: (item.barWidth || props.barWidth || 30) * -1,
                height: item.barWidth || props.barWidth || 30,
                width: item.barWidth || props.barWidth || 30,
                justifyContent:
                  (horizontal && !intactTopLabel) || item.value < 0
                    ? 'center'
                    : 'flex-end',
                alignItems: 'center',
              },
              item.value < 0 && {transform: [{rotate: '180deg'}]},
              horizontal &&
                !intactTopLabel && {transform: [{rotate: '270deg'}]},
              topLabelContainerStyle ?? item.topLabelContainerStyle,
            ]}>
            {showValuesAsTopLabel ? (
              <Text style={topLabelTextStyle}>{item.value + yAxisOffset}</Text>
            ) : (
              item.topLabelComponent?.()
            )}
          </View>
        )}
        {localBarInnerComponent ? (
          <View style={{height: '100%', width: '100%'}}>
            {localBarInnerComponent(item, index)}
          </View>
        ) : null}
      </>
    );
  };

  const barWrapperStyle = [
    {
      // overflow: 'visible',
      marginBottom: 60 + barMarginBottom + xAxisLabelsVerticalShift - 0.5,
      width: commonPropsFor2Dand3Dbars.barWidth,
      height: barHeight,
      marginRight: spacing,
    },
    item.value < 0
      ? {
          transform: [
            {
              translateY:
                (Math.abs(item.value) * (containerHeight || 200)) /
                (maxValue || 200),
            },
            {rotateZ: '180deg'},
          ],
        }
      : pointerConfig
        ? {
            transform: [
              {
                translateY:
                  (containerHeight || 200) -
                  (barHeight - 10 + xAxisLabelsVerticalShift),
              },
            ],
          }
        : null,
    side !== 'right' && {zIndex: data.length - index},
  ];

  const pressDisabled =
    item.disablePress ||
    props.disablePress ||
    (pointerConfig && pointerConfig.barTouchable !== true);

  const barContent = () => {
    const isBarBelowXaxisAndInvisible =
      item.value < 0 && !noOfSectionsBelowXAxis;
    const animated2DWithGradient = (noGradient, noAnimation) => (
      <Animated2DWithGradient
        {...commonPropsFor2Dand3Dbars}
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
              left:
                ((item.barWidth || props.barWidth || 30) -
                  props.xAxisIndicesWidth) /
                2,
              backgroundColor: props.xAxisIndicesColor,
            }}
          />
        )}
        {isBarBelowXaxisAndInvisible ? null : isThreeD ? (
          <AnimatedThreeDBar
            {...commonPropsFor2Dand3Dbars}
            sideWidth={
              item.sideWidth ||
              props.sideWidth ||
              (item.barWidth || props.barWidth || 30) / 2
            }
            side={side || 'left'}
            sideColor={item.sideColor || props.sideColor || ''}
            topColor={item.topColor || props.topColor || ''}
            horizontal={horizontal}
            isAnimated={isAnimated}
            animationDuration={animationDuration || 800}
            selectedIndex={selectedIndex}
          />
        ) : item.showGradient || props.showGradient ? (
          isAnimated ? (
            animated2DWithGradient(false, false)
          ) : (
            static2DWithGradient(item)
          )
        ) : isAnimated ? (
          animated2DWithGradient(true, false)
        ) : (
          animated2DWithGradient(true, true)
        )}
        {isAnimated
          ? renderAnimatedLabel(label, labelTextStyle, item.value)
          : renderLabel(label, labelTextStyle, item.value)}
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
            if (renderTooltip || props.focusBarOnPress) {
              setSelectedIndex(index);
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
      {renderTooltip && selectedIndex === index && (
        <View
          style={{
            position: 'absolute',
            bottom: barHeight + 60,
            left:
              index === data.length - 1
                ? leftSpacing - leftShiftForLastIndexTooltip
                : leftSpacing -
                  (item?.leftShiftForTooltip ?? leftShiftForTooltip ?? 0),
            zIndex: 1000,
          }}>
          {renderTooltip(item, index)}
        </View>
      )}
    </>
  );
};

export default RenderBars;
