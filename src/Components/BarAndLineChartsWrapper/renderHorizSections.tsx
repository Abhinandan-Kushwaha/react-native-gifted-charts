import React from 'react';
import {Text, View} from 'react-native';
import Rule from '../lineSvg';
import {styles} from '../../LineChart/styles';
import {AxesAndRulesDefaults, yAxisSides} from '../../utils/constants';
import {
  HorizSectionsType,
  horizSectionPropTypes,
  secondaryYAxisType,
} from '../../utils/types';
import {computeMaxAndMinItems, getLabelTextUtil} from '../../utils';

export const renderHorizSections = (props: horizSectionPropTypes) => {
  const {
    width,
    horizSections: h,
    noOfSectionsBelowXAxis,
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
    rulesConfigArray,
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
    rotateYAxisTexts,
    rtl,

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
    formatYLabel,
  } = props;

  /***********************************************************************************************************************************
   *                                                                                                                                  *
   *****************************               secondary Y Axis related props computations               ******************************
   *                                                                                                                                  *
   ***********************************************************************************************************************************/

  const secondaryYAxisConfig: secondaryYAxisType = {
    noOfSections: secondaryYAxis?.noOfSections ?? noOfSections,
    maxValue: secondaryYAxis?.maxValue,
    mostNegativeValue: secondaryYAxis?.mostNegativeValue,
    stepValue: secondaryYAxis?.stepValue,
    stepHeight: secondaryYAxis?.stepHeight,

    showFractionalValues:
      secondaryYAxis?.showFractionalValues ?? showFractionalValues,
    roundToDigits: secondaryYAxis?.roundToDigits ?? roundToDigits,
    noOfSectionsBelowXAxis:
      secondaryYAxis?.noOfSectionsBelowXAxis ?? noOfSectionsBelowXAxis,

    showYAxisIndices: secondaryYAxis?.showYAxisIndices ?? showYAxisIndices,
    yAxisIndicesHeight:
      secondaryYAxis?.yAxisIndicesHeight ?? yAxisIndicesHeight,
    yAxisIndicesWidth: secondaryYAxis?.yAxisIndicesWidth ?? yAxisIndicesWidth,
    yAxisIndicesColor: secondaryYAxis?.yAxisIndicesColor ?? yAxisIndicesColor,

    yAxisSide: secondaryYAxis?.yAxisSide ?? yAxisSide,
    yAxisOffset: secondaryYAxis?.yAxisOffset,
    yAxisThickness: secondaryYAxis?.yAxisThickness ?? yAxisThickness,
    yAxisColor: secondaryYAxis?.yAxisColor ?? yAxisColor,
    yAxisLabelContainerStyle:
      secondaryYAxis?.yAxisLabelContainerStyle ?? yAxisLabelContainerStyle,
    yAxisLabelTexts: secondaryYAxis?.yAxisLabelTexts ?? yAxisLabelTexts,
    yAxisTextStyle: secondaryYAxis?.yAxisTextStyle ?? yAxisTextStyle,
    yAxisTextNumberOfLines:
      secondaryYAxis?.yAxisTextNumberOfLines ?? yAxisTextNumberOfLines,
    yAxisLabelWidth: secondaryYAxis?.yAxisLabelWidth ?? yAxisLabelWidth,
    hideYAxisText: secondaryYAxis?.hideYAxisText ?? hideYAxisText,
    yAxisLabelPrefix: secondaryYAxis?.yAxisLabelPrefix ?? yAxisLabelPrefix,
    yAxisLabelSuffix: secondaryYAxis?.yAxisLabelSuffix ?? yAxisLabelSuffix,
    hideOrigin: secondaryYAxis?.hideOrigin ?? hideOrigin,
  };

  const {maxItem, minItem} = computeMaxAndMinItems(
    secondaryData,
    secondaryYAxisConfig.roundToDigits,
    secondaryYAxisConfig.showFractionalValues,
  );
  secondaryYAxisConfig.maxValue =
    secondaryYAxisConfig.maxValue ?? (maxItem || maxValue);
  secondaryYAxisConfig.mostNegativeValue =
    secondaryYAxisConfig.mostNegativeValue ?? minItem;
  secondaryYAxisConfig.stepValue =
    secondaryYAxisConfig.stepValue ??
    secondaryYAxisConfig.maxValue /
      (secondaryYAxisConfig.noOfSections ?? noOfSections);
  secondaryYAxisConfig.stepHeight =
    secondaryYAxisConfig.stepHeight ||
    containerHeight / (secondaryYAxisConfig.noOfSections ?? noOfSections);

  const horizSections: HorizSectionsType = [];
  for (let i = 0; i <= noOfSections; i++) {
    let value = maxValue - stepValue * i;
    if (showFractionalValues || roundToDigits) {
      value = parseFloat(
        value.toFixed(roundToDigits ?? AxesAndRulesDefaults.roundToDigits),
      );
    }

    horizSections.push({
      value: yAxisLabelTexts?.length
        ? yAxisLabelTexts[noOfSections + noOfSectionsBelowXAxis - i] ??
          value.toString()
        : value.toString(),
    });
  }

  const horizSectionsBelow: HorizSectionsType = [];
  if (noOfSectionsBelowXAxis) {
    for (let i = 1; i <= noOfSectionsBelowXAxis; i++) {
      let value = stepValue * -i;
      if (showFractionalValues || roundToDigits) {
        value = parseFloat(
          value.toFixed(roundToDigits ?? AxesAndRulesDefaults.roundToDigits),
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

  const secondaryHorizSections: HorizSectionsType = [];
  if (secondaryYAxis) {
    for (
      let i = 0;
      i <= (secondaryYAxisConfig.noOfSections ?? noOfSections);
      i++
    ) {
      let value = secondaryYAxisConfig.stepValue * i;
      if (
        secondaryYAxisConfig.showFractionalValues ||
        secondaryYAxisConfig.roundToDigits
      ) {
        value = parseFloat(
          value.toFixed(
            secondaryYAxisConfig.roundToDigits ??
              AxesAndRulesDefaults.roundToDigits,
          ),
        );
      }
      secondaryHorizSections.push({
        value: secondaryYAxisConfig.yAxisLabelTexts?.length
          ? secondaryYAxisConfig.yAxisLabelTexts[
              i - noOfSectionsBelowXAxis - 1
            ] ?? value.toString()
          : value.toString(),
      });
    }
  }

  const secondaryHorizSectionsBelow: HorizSectionsType = [];
  if (secondaryYAxisConfig.noOfSectionsBelowXAxis) {
    for (let i = 1; i <= secondaryYAxisConfig.noOfSectionsBelowXAxis; i++) {
      let value =
        secondaryYAxisConfig.stepValue *
        (i - secondaryYAxisConfig.noOfSectionsBelowXAxis - 1);
      if (
        secondaryYAxisConfig.showFractionalValues ||
        secondaryYAxisConfig.roundToDigits
      ) {
        value = parseFloat(
          value.toFixed(
            secondaryYAxisConfig.roundToDigits ??
              AxesAndRulesDefaults.roundToDigits,
          ),
        );
      }
      secondaryHorizSectionsBelow.push({
        value: secondaryYAxisConfig.yAxisLabelTexts?.length
          ? secondaryYAxisConfig.yAxisLabelTexts[i - 1] ?? value.toString()
          : value.toString(),
      });
    }
  }

  /***********************************************************************************************************************************
   ***********************************************************************************************************************************/

  let {
    showReferenceLine1,
    referenceLine1Position,
    referenceLine1Config,

    showReferenceLine2,
    referenceLine2Position,
    referenceLine2Config,

    showReferenceLine3,
    referenceLine3Position,
    referenceLine3Config,
  } = referenceLinesConfig;

  const defaultReferenceConfig = {
    thickness: rulesThickness,
    width: (width || totalWidth - spacing) + endSpacing,
    color: 'black',
    type: rulesType,
    dashWidth: dashWidth,
    dashGap: dashGap,
    labelText: '',
    labelTextStyle: null,
  };

  showReferenceLine1 = referenceLinesConfig.showReferenceLine1 || false;
  referenceLine1Position =
    referenceLinesConfig.referenceLine1Position ??
    (referenceLinesConfig.referenceLine1Position || containerHeight / 2);
  referenceLine1Config = referenceLinesConfig.referenceLine1Config
    ? {
        thickness:
          referenceLinesConfig.referenceLine1Config.thickness ||
          defaultReferenceConfig.thickness,
        width:
          referenceLinesConfig.referenceLine1Config.width ??
          defaultReferenceConfig.width,
        color:
          referenceLinesConfig.referenceLine1Config.color ||
          defaultReferenceConfig.color,
        type:
          referenceLinesConfig.referenceLine1Config.type ||
          defaultReferenceConfig.type,
        dashWidth:
          referenceLinesConfig.referenceLine1Config.dashWidth ||
          defaultReferenceConfig.dashWidth,
        dashGap:
          referenceLinesConfig.referenceLine1Config.dashGap ||
          defaultReferenceConfig.dashGap,
        labelText:
          referenceLinesConfig.referenceLine1Config.labelText ||
          defaultReferenceConfig.labelText,
        labelTextStyle:
          referenceLinesConfig.referenceLine1Config.labelTextStyle ||
          defaultReferenceConfig.labelTextStyle,
      }
    : defaultReferenceConfig;

  showReferenceLine2 = referenceLinesConfig.showReferenceLine2 || false;
  referenceLine2Position =
    referenceLinesConfig.referenceLine2Position ??
    (referenceLinesConfig.referenceLine2Position || (3 * containerHeight) / 2);
  referenceLine2Config = referenceLinesConfig.referenceLine2Config
    ? {
        thickness:
          referenceLinesConfig.referenceLine2Config.thickness ||
          defaultReferenceConfig.thickness,
        width:
          referenceLinesConfig.referenceLine2Config.width ??
          defaultReferenceConfig.width,
        color:
          referenceLinesConfig.referenceLine2Config.color ||
          defaultReferenceConfig.color,
        type:
          referenceLinesConfig.referenceLine2Config.type ||
          defaultReferenceConfig.type,
        dashWidth:
          referenceLinesConfig.referenceLine2Config.dashWidth ||
          defaultReferenceConfig.dashWidth,
        dashGap:
          referenceLinesConfig.referenceLine2Config.dashGap ||
          defaultReferenceConfig.dashGap,
        labelText:
          referenceLinesConfig.referenceLine2Config.labelText ||
          defaultReferenceConfig.labelText,
        labelTextStyle:
          referenceLinesConfig.referenceLine2Config.labelTextStyle ||
          defaultReferenceConfig.labelTextStyle,
      }
    : defaultReferenceConfig;

  showReferenceLine3 = referenceLinesConfig.showReferenceLine3 || false;
  referenceLine3Position =
    referenceLinesConfig.referenceLine3Position ??
    (referenceLinesConfig.referenceLine3Position || containerHeight / 3);
  referenceLine3Config = referenceLinesConfig.referenceLine3Config
    ? {
        thickness:
          referenceLinesConfig.referenceLine3Config.thickness ||
          defaultReferenceConfig.thickness,
        width:
          referenceLinesConfig.referenceLine3Config.width ??
          defaultReferenceConfig.width,
        color:
          referenceLinesConfig.referenceLine3Config.color ||
          defaultReferenceConfig.color,
        type:
          referenceLinesConfig.referenceLine3Config.type ||
          defaultReferenceConfig.type,
        dashWidth:
          referenceLinesConfig.referenceLine3Config.dashWidth ||
          defaultReferenceConfig.dashWidth,
        dashGap:
          referenceLinesConfig.referenceLine3Config.dashGap ||
          defaultReferenceConfig.dashGap,
        labelText:
          referenceLinesConfig.referenceLine3Config.labelText ||
          defaultReferenceConfig.labelText,
        labelTextStyle:
          referenceLinesConfig.referenceLine3Config.labelTextStyle ||
          defaultReferenceConfig.labelTextStyle,
      }
    : defaultReferenceConfig;

  const getLabelTexts = (val, index) => {
    return getLabelTextUtil(
      val,
      index,
      showFractionalValues,
      yAxisLabelTexts,
      yAxisOffset,
      yAxisLabelPrefix,
      yAxisLabelSuffix,
      roundToDigits ?? AxesAndRulesDefaults.roundToDigits,
      formatYLabel,
    );
  };

  const getLabelTextsForSecondaryYAxis = (val, index) => {
    const {
      showFractionalValues,
      yAxisLabelTexts,
      yAxisOffset,
      yAxisLabelPrefix,
      yAxisLabelSuffix,
      roundToDigits,
    } = secondaryYAxisConfig;
    return getLabelTextUtil(
      val,
      index,
      showFractionalValues,
      yAxisLabelTexts,
      yAxisOffset,
      yAxisLabelPrefix,
      yAxisLabelSuffix,
      roundToDigits ?? AxesAndRulesDefaults.roundToDigits,
    );
  };

  const renderAxesAndRules = (index: number) => {
    const invertedIndex = horizSections.length - index - 1;
    return (
      <View
        style={[
          index === noOfSections ? styles.lastLeftPart : styles.leftPart,
          {
            borderColor: yAxisColor,
            backgroundColor: backgroundColor,
            width: (props.width || totalWidth - spacing) + endSpacing,
          },
          yAxisSide === yAxisSides.RIGHT
            ? {borderRightWidth: yAxisThickness}
            : {borderLeftWidth: yAxisThickness},
        ]}>
        {index === noOfSections ? (
          <Rule
            config={{
              thickness: xAxisThickness,
              color: xAxisColor,
              width:
                xAxisLength ||
                (props.width || totalWidth - spacing) + endSpacing,
              dashWidth: dashWidth,
              dashGap: dashGap,
              type: xAxisType,
            }}
          />
        ) : hideRules ? null : (
          <Rule
            config={{
              thickness:
                rulesConfigArray[invertedIndex]?.rulesThickness ??
                rulesThickness,
              color: rulesConfigArray[invertedIndex]?.rulesColor ?? rulesColor,
              width:
                rulesConfigArray[invertedIndex]?.rulesLength ??
                rulesLength ??
                (props.width || totalWidth - spacing) + endSpacing,
              dashWidth:
                rulesConfigArray[invertedIndex]?.dashWidth ?? dashWidth,
              dashGap: rulesConfigArray[invertedIndex]?.dashGap ?? dashGap,
              type: rulesConfigArray[invertedIndex]?.rulesType ?? rulesType,
            }}
          />
        )}
        {showYAxisIndices && index !== noOfSections ? (
          <View
            style={{
              height: yAxisIndicesHeight,
              width: yAxisIndicesWidth,
              left:
                yAxisIndicesWidth / -2 +
                (yAxisSide === yAxisSides.RIGHT
                  ? (width ?? totalWidth) +
                    yAxisLabelWidth / 2 +
                    yAxisIndicesWidth / 4
                  : 0),
              backgroundColor: yAxisIndicesColor,
            }}
          />
        ) : null}
      </View>
    );
  };

  const renderSecondaryYaxisLabels = (
    horizSections: HorizSectionsType,
    isBelow: boolean,
  ) =>
    horizSections.map((sectionItems, index) => {
      let label = getLabelTextsForSecondaryYAxis(sectionItems.value, index);
      if (
        secondaryYAxisConfig.hideOrigin &&
        index === secondaryHorizSections.length - 1
      ) {
        label = '';
      }
      return (
        <View
          key={index}
          style={[
            styles.horizBar,
            styles.leftLabel,
            {
              position: 'absolute',
              zIndex: 1,
              bottom:
                (secondaryYAxisConfig.stepHeight ?? 0) *
                ((isBelow ? 0 : noOfSectionsBelowXAxis) +
                  index -
                  (noOfSectionsBelowXAxis ? 0 : 0.5)),
              width: secondaryYAxisConfig.yAxisLabelWidth,
              height: secondaryYAxisConfig.stepHeight ?? 0,
            },
            yAxisLabelContainerStyle,
          ]}>
          {secondaryYAxisConfig.showYAxisIndices && index !== 0 ? (
            <View
              style={{
                height: secondaryYAxisConfig.yAxisIndicesHeight,
                width: secondaryYAxisConfig.yAxisIndicesWidth,
                position: 'absolute',
                left: (secondaryYAxisConfig.yAxisIndicesWidth ?? 0) / -2,
                backgroundColor: secondaryYAxisConfig.yAxisIndicesColor,
              }}
            />
          ) : null}
          <Text
            numberOfLines={secondaryYAxisConfig.yAxisTextNumberOfLines}
            ellipsizeMode={'clip'}
            style={[secondaryYAxisConfig.yAxisTextStyle]}>
            {label}
          </Text>
        </View>
      );
    });

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{width: (width ?? totalWidth) + endSpacing}}>
        {horizSections.map((sectionItems, index) => {
          return (
            <View
              key={index}
              style={[
                styles.horizBar,
                {
                  width: (width ?? totalWidth) + endSpacing,
                },
                horizontal &&
                  !yAxisAtTop && {
                    transform: [{rotateY: '180deg'}],
                  },
                horizontalRulesStyle,
              ]}>
              <View
                style={[
                  styles.leftLabel,
                  {
                    height:
                      index === noOfSections ? stepHeight / 2 : stepHeight,
                    width: yAxisSide === yAxisSides.RIGHT ? 0 : yAxisLabelWidth,
                  },
                  yAxisLabelContainerStyle,
                ]}
              />
              {renderAxesAndRules(index)}
            </View>
          );
        })}

        {
          /***********************************************************************************************/
          /**************************      Render the y axis labels separately      **********************/
          /***********************************************************************************************/

          !hideYAxisText &&
            horizSections.map((sectionItems, index) => {
              let label = getLabelTexts(sectionItems.value, index);
              if (hideOrigin && index === horizSections.length - 1) {
                label = '';
              }
              return (
                <View
                  key={index}
                  style={[
                    styles.horizBar,
                    styles.leftLabel,
                    {
                      position: 'absolute',
                      zIndex: 1,
                      top: stepHeight * index,
                      width: yAxisLabelWidth,
                      height:
                        index === noOfSections ? stepHeight / 2 : stepHeight,
                    },
                    yAxisSide === yAxisSides.RIGHT && {
                      left: (width ?? totalWidth) + yAxisLabelWidth / 2,
                    },
                    horizontal &&
                      !yAxisAtTop && {
                        transform: [
                          {
                            translateX: (width ?? totalWidth) - 30 + endSpacing,
                          },
                        ],
                      },
                    yAxisLabelContainerStyle,
                  ]}>
                  <Text
                    numberOfLines={yAxisTextNumberOfLines}
                    ellipsizeMode={'clip'}
                    style={[
                      yAxisTextStyle,
                      horizontal && {
                        transform: [
                          {
                            rotate: `${
                              rotateYAxisTexts ?? (rtl ? 90 : -90)
                            }deg`,
                          },
                        ],
                      },
                      index === noOfSections && {
                        marginBottom: stepHeight / -2,
                      },
                    ]}>
                    {label}
                  </Text>
                </View>
              );
            })
          /***********************************************************************************************/
          /***********************************************************************************************/
        }

        {horizSectionsBelow.map((sectionItems, index) => {
          return (
            <View
              key={index}
              style={[
                styles.horizBar,
                {
                  width: (width ?? totalWidth) + 15,
                },
                index === 0 && {marginTop: stepHeight / 2},
              ]}>
              <View
                style={[
                  styles.leftLabel,
                  {
                    borderRightWidth: yAxisThickness,
                    borderColor: yAxisColor,
                    marginLeft: yAxisThickness,
                  },
                  {
                    height: index === 0 ? stepHeight * 1.5 : stepHeight,
                    width: yAxisSide === yAxisSides.RIGHT ? 0 : yAxisLabelWidth,
                  },
                  index === 0 && {marginTop: -stepHeight / 2},
                ]}
              />
              <View
                style={[styles.leftPart, {backgroundColor: backgroundColor}]}>
                {hideRules ? null : (
                  <Rule
                    config={{
                      thickness: rulesThickness,
                      color: rulesColor,
                      width:
                        rulesLength ||
                        (props.width || totalWidth - spacing) + endSpacing,
                      dashWidth: dashWidth,
                      dashGap: dashGap,
                      type: rulesType,
                    }}
                  />
                )}
              </View>
            </View>
          );
        })}

        {
          /***********************************************************************************************/
          /*************************      Render the y axis labels below origin      *********************/
          /***********************************************************************************************/

          !hideYAxisText &&
            horizSectionsBelow.map((sectionItems, index) => {
              let label = getLabelTexts(
                horizSectionsBelow[horizSectionsBelow.length - 1 - index].value,
                index,
              );
              return (
                <View
                  key={index}
                  style={[
                    styles.horizBar,
                    styles.leftLabel,
                    {
                      position: 'absolute',
                      zIndex: 1,
                      bottom: stepHeight * index,
                      width: yAxisLabelWidth,
                      height:
                        index === noOfSections ? stepHeight / 2 : stepHeight,
                    },
                    yAxisSide === yAxisSides.RIGHT && {
                      left: (width ?? totalWidth) + yAxisLabelWidth,
                    },
                    yAxisLabelContainerStyle,
                  ]}>
                  <Text
                    numberOfLines={yAxisTextNumberOfLines}
                    ellipsizeMode={'clip'}
                    style={[
                      yAxisTextStyle,
                      index === noOfSections && {
                        marginBottom: stepHeight / -2,
                      },
                    ]}>
                    {label}
                  </Text>
                </View>
              );
            })
          /***********************************************************************************************/
          /***********************************************************************************************/
        }

        {
          /***********************************************************************************************/
          /*************************      Render the reference lines separately      *********************/
          /***********************************************************************************************/

          !hideYAxisText &&
            horizSections.map((sectionItems, index) => {
              // let label = getLabelTexts(sectionItems.value, index);
              // if (hideOrigin && index === horizSections.length - 1) {
              //   label = '';
              // }
              return (
                <View
                  key={index}
                  style={[
                    styles.horizBar,
                    styles.leftLabel,
                    {
                      position: 'absolute',
                      zIndex: 1,
                      top: stepHeight * index,
                      width: yAxisLabelWidth,
                      height:
                        index === noOfSections ? stepHeight / 2 : stepHeight,
                    },
                  ]}>
                  {index === noOfSections && showReferenceLine1 ? (
                    <View
                      style={{
                        position: 'absolute',
                        bottom:
                          ((referenceLine1Position - (yAxisOffset ?? 0)) *
                            containerHeight) /
                          maxValue,
                        left:
                          yAxisSide === yAxisSides.RIGHT
                            ? 0
                            : yAxisLabelWidth + yAxisThickness,
                      }}>
                      <Rule config={referenceLine1Config} />
                      {referenceLine1Config.labelText ? (
                        <Text
                          style={[
                            {position: 'absolute'},
                            referenceLine1Config.labelTextStyle,
                          ]}>
                          {referenceLine1Config.labelText}
                        </Text>
                      ) : null}
                    </View>
                  ) : null}
                  {index === noOfSections && showReferenceLine2 ? (
                    <View
                      style={{
                        position: 'absolute',
                        bottom:
                          ((referenceLine2Position - (yAxisOffset ?? 0)) *
                            containerHeight) /
                          maxValue,
                        left:
                          yAxisSide === yAxisSides.RIGHT
                            ? 0
                            : yAxisLabelWidth + yAxisThickness,
                      }}>
                      <Rule config={referenceLine2Config} />
                      {referenceLine2Config.labelText ? (
                        <Text
                          style={[
                            {position: 'absolute'},
                            referenceLine2Config.labelTextStyle,
                          ]}>
                          {referenceLine2Config.labelText}
                        </Text>
                      ) : null}
                    </View>
                  ) : null}
                  {index === noOfSections && showReferenceLine3 ? (
                    <View
                      style={{
                        position: 'absolute',
                        bottom:
                          ((referenceLine3Position - (yAxisOffset ?? 0)) *
                            containerHeight) /
                          maxValue,
                        left:
                          yAxisSide === yAxisSides.RIGHT
                            ? 0
                            : yAxisLabelWidth + yAxisThickness,
                      }}>
                      <Rule config={referenceLine3Config} />
                      {referenceLine3Config.labelText ? (
                        <Text
                          style={[
                            {position: 'absolute'},
                            referenceLine3Config.labelTextStyle,
                          ]}>
                          {referenceLine3Config.labelText}
                        </Text>
                      ) : null}
                    </View>
                  ) : null}
                </View>
              );
            })
          /***********************************************************************************************/
          /***********************************************************************************************/
        }
      </View>
      {
        /***********************************************************************************************/
        /*************************      Render the secondary Y Axis                *********************/
        /***********************************************************************************************/
        secondaryYAxis ? (
          <View
            style={{
              width: secondaryYAxisConfig.yAxisLabelWidth,
              left: width ? yAxisLabelWidth : yAxisLabelWidth - spacing,
              borderColor: secondaryYAxisConfig.yAxisColor,
              borderLeftWidth: secondaryYAxisConfig.yAxisThickness,
            }}>
            {!secondaryYAxisConfig.hideYAxisText
              ? renderSecondaryYaxisLabels(secondaryHorizSections, false)
              : null}
            {noOfSectionsBelowXAxis && !secondaryYAxisConfig.hideYAxisText
              ? renderSecondaryYaxisLabels(secondaryHorizSectionsBelow, true)
              : null}
          </View>
        ) : null
      }
    </View>
  );
};
