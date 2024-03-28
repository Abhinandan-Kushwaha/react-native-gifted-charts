import React, {useEffect} from 'react';
import {
  PieChartPropsType,
  pieColors,
  usePiePro,
} from 'gifted-charts-core';
import {
  Defs,
  Path,
  Stop,
  Svg,
  Text as SvgText,
  RadialGradient,
} from 'react-native-svg';
import {Animated, View} from 'react-native';

export const PieChartPro = (props: PieChartPropsType) => {
  const {
    radius,
    total,
    donut,
    strokeWidth,
    maxStrokeWidth,
    animationDuration,
    initial,
    dInitial,
    dFinal,
    getStartCaps,
    getEndCaps,
    getTextCoordinates,
    height,
    heightFactor,
    svgProps,
  } = usePiePro(props);

  const {
    data,
    curvedStartEdges,
    curvedEndEdges,
    edgesRadius = 0,
    showGradient,
    ring,
    pieInnerComponent,
    strokeDashArray,
    semiCircle,
  } = props;

  let {isAnimated} = props;

  if (!props.semiCircle && data.some(dataItem => dataItem.value > total / 2)) {
    // if we have an obtuse arc, we cant animate
    isAnimated = false;
  }

  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const AnimatedText = Animated.createAnimatedComponent(SvgText);

  const animatedValues = data.map(i => new Animated.Value(0));
  const animatedOpacityValue = new Animated.Value(0);
  const animatedPaths = data.map((item, index) =>
    animatedValues[index]?.interpolate({
      inputRange: [0, 1],
      outputRange: [dInitial[index], dFinal[index]],
    }),
  );

  const animatedOpacity = animatedOpacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    Animated.timing(animatedOpacityValue, {
      toValue: 1,
      duration: 10,
      useNativeDriver: true,
      delay: animationDuration,
    }).start();
    animatedValues.forEach(animatedValue =>
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start(),
    );
  }, [data]);

  const adjustHeight = height * heightFactor;
  const rnSvgProps = semiCircle ? {} : svgProps;

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: adjustHeight,
        width: height * 2,
      }}>
      <View
        style={
          semiCircle
            ? {position: 'absolute', bottom: 0}
            : {position: 'absolute'}
        }>
        {pieInnerComponent ? pieInnerComponent() : null}
      </View>
      <Svg
        {...rnSvgProps}
        viewBox={
          semiCircle
            ? ``
            : `${-maxStrokeWidth * 1.5} ${
                -maxStrokeWidth - (semiCircle ? height / 2 : 0)
              } ${adjustHeight} ${adjustHeight}`
        }
        transform={
          semiCircle
            ? []
            : [{scaleY: maxStrokeWidth ? 1 + maxStrokeWidth / (radius * 2) : 1}]
        }>
        {total ? (
          <>
            <Defs>
              {data.map((item, index) => {
                return (
                  <RadialGradient
                    key={index + ''}
                    id={'grad' + index}
                    cx="50%"
                    cy="50%"
                    rx="50%"
                    ry="50%"
                    fx="50%"
                    fy="50%"
                    gradientUnits="userSpaceOnUse">
                    <Stop
                      offset="0%"
                      stopColor={item.gradientCenterColor}
                      stopOpacity="1"
                    />
                    <Stop
                      offset="100%"
                      stopColor={item.color || pieColors[index % 9]}
                      stopOpacity="1"
                    />
                  </RadialGradient>
                );
              })}
            </Defs>
            {data.map((item, index) => {
              const borderWidth = item.strokeWidth ?? strokeWidth;
              const borderColor =
                item.strokeColor ??
                props.strokeColor ??
                (borderWidth ? 'black' : 'transparent');
              const strokeDashArrayLocal =
                item.strokeDashArray ?? strokeDashArray;
              return (
                <AnimatedPath
                  key={`path${index}`}
                  id="renderPath"
                  d={isAnimated ? animatedPaths[index] : dFinal[index]}
                  fill={
                    ring
                      ? 'transparent'
                      : showGradient
                        ? `url(#grad${index})`
                        : data[index].color || pieColors[index % 9]
                  }
                  strokeWidth={borderWidth}
                  strokeDasharray={strokeDashArrayLocal}
                  stroke={borderColor}
                />
              );
            })}

            {donut
              ? data.map((item, index) => {
                  if (
                    curvedStartEdges ||
                    edgesRadius ||
                    item.isStartEdgeCurved ||
                    item.startEdgeRadius
                  )
                    return (
                      <AnimatedPath
                        key={`cap${index}`}
                        d={`${initial} ${getStartCaps(index, item)}`}
                        opacity={isAnimated ? animatedOpacity : 1}
                        fill={
                          showGradient
                            ? `url(#grad${index})`
                            : data[index].color || pieColors[index % 9]
                        }
                      />
                    );
                  return null;
                })
              : null}

            {donut
              ? data.map((item, index) => {
                  if (
                    curvedEndEdges ||
                    edgesRadius ||
                    item.isEndEdgeCurved ||
                    item.endEdgeRadius
                  )
                    return (
                      <Path
                        key={`cap${index}`}
                        d={`${initial} ${getEndCaps(index, item)}`}
                        fill={
                          showGradient
                            ? `url(#grad${index})`
                            : data[index].color || pieColors[index % 9]
                        }
                      />
                    );
                  return null;
                })
              : null}

            {data.map((item, index) => {
              const {x, y} = getTextCoordinates(index, item.labelPosition);

              return (
                <AnimatedText
                  key={`label${index}`}
                  // style={{ pointerEvents: 'all' }}
                  fill={
                    item.textColor ||
                    props.textColor ||
                    pieColors[(index + 2) % 9]
                  }
                  opacity={isAnimated ? animatedOpacity : 1}
                  fontSize={item.textSize || props.textSize}
                  fontFamily={item.font || props.font}
                  fontWeight={item.fontWeight || props.fontWeight}
                  fontStyle={item.fontStyle || props.fontStyle || 'normal'}
                  x={
                    x +
                    (item.shiftTextX || 0) -
                    (item.textSize ?? props.textSize ?? 0) / 1.8
                  }
                  y={y + (item.shiftTextY || 0)}
                  onPress={() => {
                    item.onLabelPress
                      ? item.onLabelPress()
                      : props.onLabelPress
                        ? props.onLabelPress(item, index)
                        : item.onPress
                          ? item.onPress()
                          : props.onPress?.(item, index);
                  }}>
                  {item.text ||
                    (props.showValuesAsLabels ? item.value + '' : '')}
                </AnimatedText>
              );
            })}
          </>
        ) : null}
      </Svg>
    </View>
  );
};
