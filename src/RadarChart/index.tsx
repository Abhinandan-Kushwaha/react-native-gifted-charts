import React from 'react';
import {View} from 'react-native';
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
} from 'react-native-svg';

import {RadarChartProps, useRadarChart} from 'gifted-charts-core';

export const RadarChart = (props: RadarChartProps) => {
  const {
    data,
    center,
    radius,
    chartSize,
    polarToCartesian,
    labels,
    labelConfigArray,
    labelsPositionOffset,
    dataLabelConfigArray,
    maxValue,
    dataLabels,
    gridSections,
    gridFill,
    fontSize,
    stroke,
    textAnchor,
    alignmentBaseline,
    fontWeight,
    fontFamily,
    dataLabelsFontSize,
    dataLabelsColor,
    dataLabelsTextAnchor,
    dataLabelsAlignmentBaseline,
    dataLabelsPositionOffset,
    dataLabelsFontWeight,
    dataLabelsFontFamily,
    polygonStroke,
    polygonStrokeWidth,
    polygonStrokeDashArray,
    polygonFill,
    polygonGradientColor,
    polygonShowGradient,
    polygonOpacity,
    polygonGradientOpacity,
    asterLinesStroke,
    asterLinesStrokeWidth,
    asterLinesStrokeDashArray,
    points,
    polygonPoints,
    angleStep,
    circular,
    hideGrid,
    hideAsterLines,
    getGridLevelProps,
  } = useRadarChart(props);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Svg height={chartSize} width={chartSize}>
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
                <>
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
                </>
              );
            })}

        {/* Draw the data polygon */}
        <Polygon
          points={polygonPoints}
          fill={polygonShowGradient ? 'url(#polygon)' : polygonFill}
          stroke={polygonStroke}
          strokeWidth={polygonStrokeWidth}
          strokeDasharray={polygonStrokeDashArray}
          opacity={polygonOpacity}
        />

        {dataLabels?.length ? (
          <SvgText>
            {dataLabels.map((label, index) => {
              const {x, y} = polarToCartesian(
                index * angleStep,
                data[index] + dataLabelsPositionOffset,
              );
              const dataLabelsFontSizeLocal =
                dataLabelConfigArray?.[index]?.fontSize ?? dataLabelsFontSize;
              const dataLabelsFontWeightLocal =
                dataLabelConfigArray?.[index]?.fontWeight ??
                dataLabelsFontWeight;
              const dataLabelsFontFamilyLocal =
                dataLabelConfigArray?.[index]?.fontFamily ??
                dataLabelsFontFamily;
              const dataLabelsColorLocal =
                dataLabelConfigArray?.[index]?.stroke ?? dataLabelsColor;
              const dataLabelsTextAnchorLocal =
                dataLabelConfigArray?.[index]?.textAnchor ??
                dataLabelsTextAnchor;
              const dataLabelsAlignmentBaselineLocal =
                dataLabelConfigArray?.[index]?.alignmentBaseline ??
                dataLabelsAlignmentBaseline;
              return (
                <SvgText
                  key={`data-label-${index}`}
                  x={x}
                  y={y}
                  fontSize={dataLabelsFontSizeLocal}
                  fill={dataLabelsColorLocal}
                  fontWeight={dataLabelsFontWeightLocal}
                  fontFamily={dataLabelsFontFamilyLocal}
                  textAnchor={
                    (dataLabelsTextAnchorLocal as TextAnchor) ?? 'middle'
                  }
                  alignmentBaseline={
                    (dataLabelsAlignmentBaselineLocal as AlignmentBaseline) ??
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
        {labels.map((category, index) => {
          const angle = index * angleStep;
          const {x, y} = polarToCartesian(
            angle,
            maxValue + labelsPositionOffset,
          ); // Offset for label position
          const fontSizeLocal = labelConfigArray?.[index]?.fontSize ?? fontSize;
          const fontWeightLocal =
            labelConfigArray?.[index]?.fontWeight ?? fontWeight;
          const fontFamilyLocal =
            labelConfigArray?.[index]?.fontFamily ?? fontFamily;
          const colorLocal = labelConfigArray?.[index]?.stroke ?? stroke;
          const textAnchorLocal =
            labelConfigArray?.[index]?.textAnchor ?? textAnchor;
          const alignmentBaselineLocal =
            labelConfigArray?.[index]?.alignmentBaseline ?? alignmentBaseline;
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
              {category}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
};
