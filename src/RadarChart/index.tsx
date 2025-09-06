import {Fragment, useEffect} from 'react';
import {Animated, View} from 'react-native';
import Svg, {
  Line,
  Polygon,
  Circle,
  Text as SvgText,
  Defs,
  RadialGradient,
  Stop,
  TextAnchor,
  AlignmentBaseline,
  TSpan,
} from 'react-native-svg';

import {RadarChartProps, useRadarChart} from 'gifted-charts-core';

export const RadarChart = (props: RadarChartProps) => {
  const {
    data,
    dataSet,
    center,
    radius,
    chartSize,
    polarToCartesian,
    labels,
    labelConfigArray,
    labelsPositionOffset,
    dataLabelsConfigArray,
    maxValue,
    dataLabels,
    dataLabelsArray,
    gridSections,
    gridFill,
    fontSize,
    stroke,
    textAnchor,
    alignmentBaseline,
    fontWeight,
    fontFamily,
    dataLabelsPositionOffset,
    polygonStroke,
    polygonStrokeWidth,
    polygonStrokeDashArray,
    polygonFill,
    polygonGradientColor,
    polygonShowGradient,
    polygonOpacity,
    polygonGradientOpacity,
    polygonIsAnimated,
    polygonAnimationDuration,
    asterLinesStroke,
    asterLinesStrokeWidth,
    asterLinesStrokeDashArray,
    polygonPoints,
    initialPolygonPoints,
    polygonPointsArray,
    initialPolygonPointsArray,
    polygonConfigArray,
    angleStep,
    circular,
    hideGrid,
    hideLabels,
    hideAsterLines,
    getGridLevelProps,
    animateTogether,
  } = useRadarChart(props);

  const initialPolygonPointsAr = initialPolygonPoints.split(' ');
  const finalPolygonPointsAr = polygonPoints.split(' ');

  const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

  const animatedValues = data.map(_ => new Animated.Value(0));
  const animatedPaths = data.map((_, index) =>
    animatedValues[index]?.interpolate({
      inputRange: [0, 1],
      outputRange: [initialPolygonPointsAr[index], finalPolygonPointsAr[index]],
    }),
  );

  useEffect(() => {
    if (dataSet?.length) return;
    animatedValues.forEach(animatedValue =>
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: polygonAnimationDuration,
        useNativeDriver: false,
      }).start(),
    );
  }, [data]);

  /******************************************************************************************/
  /*********************        Animation handling for dataSet         *********************/

  let animatedValuesForSet: Animated.Value[][] = [];
  let animatedPathsForSet: any[] = [];

  if (dataSet?.length) {
    polygonConfigArray?.forEach((_, index) => {
      const set = dataSet[index];
      const initialPolygonPointsAr =
        initialPolygonPointsArray[index].split(' ');
      const finalPolygonPointsAr = polygonPointsArray[index].split(' ');

      const animatedValues = set.map((_: any) => new Animated.Value(0));
      animatedValuesForSet.push(animatedValues);
      const animatedPaths = set.map((i: any, ind: number) =>
        animatedValues[ind].interpolate({
          inputRange: [0, 1],
          outputRange: [initialPolygonPointsAr[ind], finalPolygonPointsAr[ind]],
        }),
      );
      animatedPathsForSet.push(animatedPaths);
    });
  }

  useEffect(() => {
    if (!dataSet?.length) return;
    animatedValuesForSet?.forEach((animatedValues, index) => {
      setTimeout(
        () => {
          animatedValues?.forEach(animatedValue =>
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: polygonAnimationDuration,
              useNativeDriver: false,
            }).start(),
          );
        },
        animateTogether ? 0 : index * polygonAnimationDuration,
      );
    });
  });

  /******************************************************************************************/
  /******************************************************************************************/

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Svg height={chartSize} width={chartSize}>
        {polygonConfigArray?.length ? (
          polygonConfigArray.map((polygonConfigItem, index) => {
            const {fill, gradientColor, opacity, gradientOpacity} =
              polygonConfigItem;
            return (
              <Defs key={`defs-${index}`}>
                <RadialGradient
                  key={`polygon-${index}`}
                  id={`polygon-${index}`}
                  cx={center}
                  cy={center}
                  rx={radius}
                  ry={radius}
                  fx="50%"
                  fy="50%"
                  gradientUnits="userSpaceOnUse">
                  <Stop
                    offset="0%"
                    stopColor={gradientColor}
                    stopOpacity={gradientOpacity}
                  />
                  <Stop offset="100%" stopColor={fill} stopOpacity={opacity} />
                </RadialGradient>
              </Defs>
            );
          })
        ) : polygonShowGradient ? (
          <Defs>
            <RadialGradient
              key={'polygon'}
              id={'polygon'}
              cx={center}
              cy={center}
              rx={radius}
              ry={radius}
              fx="50%"
              fy="50%"
              gradientUnits="userSpaceOnUse">
              <Stop
                offset="0%"
                stopColor={polygonGradientColor}
                stopOpacity={polygonGradientOpacity}
              />
              <Stop
                offset="100%"
                stopColor={polygonFill}
                stopOpacity={polygonOpacity}
              />
            </RadialGradient>
          </Defs>
        ) : null}

        {hideGrid
          ? null
          : gridSections.map((l, ind) => {
              const {
                level,
                gridGradientColorLocal,
                gridFillColorLocal,
                gridOpacityLocal,
                gridGradientOpacityLocal,
                gridStrokeLocal,
                gridStrokeWidthLocal,
                gridShowGradientLocal,
                gridStrokeDashArrayLocal,
                levelPolygonPoints,
                r,
              } = getGridLevelProps(l, ind);

              return (
                <Fragment key={`fragment-${level}`}>
                  <Defs>
                    <RadialGradient
                      key={level + ''}
                      id={'grad' + level}
                      cx={center}
                      cy={center}
                      rx={r}
                      ry={r}
                      fx="50%"
                      fy="50%"
                      gradientUnits="userSpaceOnUse">
                      <Stop
                        offset={`${100 - 100 / level}%`}
                        stopColor={gridGradientColorLocal}
                        stopOpacity={gridGradientOpacityLocal}
                      />
                      <Stop
                        offset="100%"
                        stopColor={gridFillColorLocal}
                        stopOpacity={gridOpacityLocal}
                      />
                    </RadialGradient>
                  </Defs>
                  {circular ? (
                    <Circle
                      key={`grid-${level}`}
                      cx={center}
                      cy={center}
                      r={r}
                      stroke={gridStrokeLocal}
                      strokeWidth={gridStrokeWidthLocal}
                      strokeDasharray={gridStrokeDashArrayLocal}
                      fill={
                        gridShowGradientLocal ? `url(#grad${level})` : gridFill
                      }
                    />
                  ) : (
                    <Polygon
                      key={`grid-${level}`}
                      points={levelPolygonPoints}
                      stroke={gridStrokeLocal}
                      strokeWidth={gridStrokeWidthLocal}
                      strokeDasharray={gridStrokeDashArrayLocal}
                      fill={
                        gridShowGradientLocal ? `url(#grad${level})` : gridFill
                      }
                    />
                  )}
                </Fragment>
              );
            })}

        {/* Draw the data polygon */}
        {dataSet ? (
          polygonConfigArray?.map((item, index) => {
            const polygonPoints = polygonPointsArray[index];
            const animatedPolygonPoints = animatedPathsForSet[index];
            const {
              stroke,
              strokeWidth,
              strokeDashArray,
              fill,
              showGradient,
              opacity,
              isAnimated = polygonIsAnimated,
            } = item;

            return (
              <AnimatedPolygon
                key={`polygon-${index}`}
                points={isAnimated ? animatedPolygonPoints : polygonPoints}
                fill={showGradient ? 'url(#polygon)' : fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDashArray}
                opacity={opacity}
              />
            );
          })
        ) : (
          <AnimatedPolygon
            points={polygonIsAnimated ? animatedPaths : polygonPoints}
            fill={polygonShowGradient ? 'url(#polygon)' : polygonFill}
            stroke={polygonStroke}
            strokeWidth={polygonStrokeWidth}
            strokeDasharray={polygonStrokeDashArray}
            opacity={polygonOpacity}
          />
        )}

        {dataSet?.length && dataLabelsArray?.length ? (
          dataLabelsArray?.map((labels, index) => {
            const dataItem = dataSet[index];
            return labels?.map((label, labelIndex) => {
              const {x, y} = polarToCartesian(
                labelIndex * angleStep,
                dataItem[labelIndex] + dataLabelsPositionOffset,
              );
              const {
                fontSize: dataLabelsFontSize,
                stroke: dataLabelsColor,
                textAnchor: dataLabelsTextAnchor,
                alignmentBaseline: dataLabelsAlignmentBaseline,
                fontWeight: dataLabelsFontWeight,
                fontFamily: dataLabelsFontFamily,
              } = dataLabelsConfigArray?.[labelIndex] ?? {};
              return (
                <SvgText
                  key={`data-label-${index}-${labelIndex}`}
                  x={x}
                  y={y}
                  fontSize={dataLabelsFontSize}
                  fill={dataLabelsColor}
                  fontWeight={dataLabelsFontWeight}
                  fontFamily={dataLabelsFontFamily}
                  textAnchor={(dataLabelsTextAnchor as TextAnchor) ?? 'middle'}
                  alignmentBaseline={
                    (dataLabelsAlignmentBaseline as AlignmentBaseline) ??
                    'middle'
                  }>
                  {label}
                </SvgText>
              );
            });
          })
        ) : dataLabels?.length ? (
          <SvgText>
            {dataLabels.map((label, index) => {
              const {x, y} = polarToCartesian(
                index * angleStep,
                data[index] + dataLabelsPositionOffset,
              );
              const {
                fontSize: dataLabelsFontSize,
                stroke: dataLabelsColor,
                textAnchor: dataLabelsTextAnchor,
                alignmentBaseline: dataLabelsAlignmentBaseline,
                fontWeight: dataLabelsFontWeight,
                fontFamily: dataLabelsFontFamily,
              } = dataLabelsConfigArray?.[index] ?? {};
              return (
                <SvgText
                  key={`data-label-${index}`}
                  x={x}
                  y={y}
                  fontSize={dataLabelsFontSize}
                  fill={dataLabelsColor}
                  fontWeight={dataLabelsFontWeight}
                  fontFamily={dataLabelsFontFamily}
                  textAnchor={(dataLabelsTextAnchor as TextAnchor) ?? 'middle'}
                  alignmentBaseline={
                    (dataLabelsAlignmentBaseline as AlignmentBaseline) ??
                    'middle'
                  }>
                  {label}
                </SvgText>
              );
            })}
          </SvgText>
        ) : null}

        {/* Draw lines from center to the points (axes) */}
        {hideAsterLines
          ? null
          : labels.map((_, index) => {
              const angle = index * angleStep;
              const {x, y} = polarToCartesian(angle, maxValue);
              return (
                <Line
                  key={`axis-${index}`}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke={asterLinesStroke}
                  strokeWidth={asterLinesStrokeWidth}
                  strokeDasharray={asterLinesStrokeDashArray}
                />
              );
            })}

        {/* Draw category labels */}
        {hideLabels
          ? null
          : labels.map((category, index) => {
              const angle = index * angleStep;
              const {x, y} = polarToCartesian(
                angle,
                maxValue + labelsPositionOffset,
              ); // Offset for label position
              const fontSizeLocal =
                labelConfigArray?.[index]?.fontSize ?? fontSize;
              const fontWeightLocal =
                labelConfigArray?.[index]?.fontWeight ?? fontWeight;
              const fontFamilyLocal =
                labelConfigArray?.[index]?.fontFamily ?? fontFamily;
              const colorLocal = labelConfigArray?.[index]?.stroke ?? stroke;
              const textAnchorLocal =
                labelConfigArray?.[index]?.textAnchor ?? textAnchor;
              const alignmentBaselineLocal =
                labelConfigArray?.[index]?.alignmentBaseline ??
                alignmentBaseline;
              return (
                <SvgText
                  key={`label-${index}`}
                  x={x}
                  y={y}
                  fontSize={fontSizeLocal}
                  fontWeight={fontWeightLocal}
                  fontFamily={fontFamilyLocal}
                  fill={colorLocal}
                  textAnchor={(textAnchorLocal as TextAnchor) ?? 'middle'}
                  alignmentBaseline={
                    (alignmentBaselineLocal as AlignmentBaseline) ?? 'middle'
                  }>
                  {category.split('\n').map((line, idx) => (
                    <TSpan key={idx} x={x} dy={idx === 0 ? 0 : fontSizeLocal}>
                      {line}
                    </TSpan>
                  ))}
                </SvgText>
              );
            })}
      </Svg>
    </View>
  );
};
