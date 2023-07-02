import React from 'react';
import {Text, View} from 'react-native';
import Rule from '../Components/lineSvg';
import {styles} from './styles';

export const renderHorizSections = props => {
  const {
    horizSections,
    horizSectionsBelow,
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
    spacing,
    showXAxisIndices,
    xAxisIndicesHeight,
    xAxisIndicesWidth,
    xAxisIndicesColor,

    hideOrigin,
    hideYAxisText,
    showFractionalValues,
    yAxisTextNumberOfLines,
    yAxisLabelPrefix,
    yAxisLabelSuffix,
    yAxisTextStyle,

    containerHeight,
    maxValue,

    showReferenceLine1,
    referenceLine1Position,
    referenceLine1Config,

    showReferenceLine2,
    referenceLine2Position,
    referenceLine2Config,

    showReferenceLine3,
    referenceLine3Position,
    referenceLine3Config,

    yAxisLabelTexts,
    yAxisOffset,
    hideAxesAndRules,
  } = props;

  const getLabel = (val, index) => {
    let label = '';
    if (
      showFractionalValues ||
      (yAxisLabelTexts && yAxisLabelTexts[index] !== undefined)
    ) {
      if (val) {
        label = yAxisOffset ? (Number(val) + yAxisOffset).toString() : val;
      } else {
        label = yAxisOffset ? yAxisOffset.toString() : '0';
      }
    } else {
      if (val) {
        label = val.toString().split('.')[0];
        if (yAxisOffset) {
          label = (Number(label) + yAxisOffset).toString();
        }
      } else {
        label = yAxisOffset ? yAxisOffset.toString() : '0';
      }
    }

    return yAxisLabelPrefix + label + yAxisLabelSuffix;
  };
  return (
    <>
      {hideAxesAndRules !== true &&
        horizSections.map((sectionItems, index) => {
          return (
            <View
              key={index}
              style={[
                styles.horizBar,
                {
                  width: (props.width ? props.width : totalWidth) + endSpacing,
                },
                yAxisSide === 'right' && {transform: [{rotateY: '180deg'}]},
                horizontalRulesStyle,
              ]}>
              <View
                style={[
                  styles.leftLabel,
                  {
                    height:
                      index === noOfSections ? stepHeight / 2 : stepHeight,
                    width: yAxisLabelWidth,
                  },
                  yAxisLabelContainerStyle,
                ]}
              />
              <View
                style={[
                  index === noOfSections
                    ? styles.lastLeftPart
                    : styles.leftPart,
                  {
                    borderLeftWidth: yAxisThickness,
                    borderColor: yAxisColor,
                    backgroundColor: backgroundColor,
                  },
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
                {showXAxisIndices && index !== noOfSections ? (
                  <View
                    style={{
                      height: xAxisIndicesHeight,
                      width: xAxisIndicesWidth,
                      left: xAxisIndicesWidth / -2,
                      backgroundColor: xAxisIndicesColor,
                    }}
                  />
                ) : null}
              </View>
            </View>
          );
        })}

      {
        /***********************************************************************************************/
        /**************************      Render the y axis labels separately      **********************/
        /***********************************************************************************************/
        hideAxesAndRules !== true &&
          !hideYAxisText &&
          horizSections.map((sectionItems, index) => {
            let label = getLabel(sectionItems.value, index);
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
                  yAxisSide === 'right' && {
                    transform: [
                      {
                        translateX:
                          (props.width ? props.width : totalWidth) -
                          30 +
                          endSpacing,
                      },
                      {rotateY: '180deg'},
                    ],
                  },
                  yAxisLabelContainerStyle,
                ]}>
                <Text
                  numberOfLines={yAxisTextNumberOfLines}
                  ellipsizeMode={'clip'}
                  style={[
                    yAxisTextStyle,
                    yAxisSide === 'right' && {
                      transform: [{rotateY: '180deg'}],
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
                width: (props.width ? props.width : totalWidth) + 15,
              },
              index === 0 && {marginTop: stepHeight / 2},
              yAxisSide === 'right' && {
                transform: [
                  {rotateY: '180deg'},
                  {translateX: 14.5 - endSpacing},
                ],
              },
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
                  width: yAxisLabelWidth,
                },
                index === 0 && {marginTop: -stepHeight / 2},
              ]}
            />
            <View style={[styles.leftPart, {backgroundColor: backgroundColor}]}>
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
        hideAxesAndRules !== true &&
          !hideYAxisText &&
          horizSectionsBelow.map((sectionItems, index) => {
            let label = getLabel(
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
                    bottom: stepHeight * (index - 1),
                    width: yAxisLabelWidth,
                    height:
                      index === noOfSections ? stepHeight / 2 : stepHeight,
                  },
                  yAxisSide === 'right' && {
                    transform: [
                      {
                        translateX:
                          (props.width ? props.width : totalWidth) -
                          30 +
                          endSpacing,
                      },
                      {rotateY: '180deg'},
                    ],
                  },
                  yAxisLabelContainerStyle,
                ]}>
                <Text
                  numberOfLines={yAxisTextNumberOfLines}
                  ellipsizeMode={'clip'}
                  style={[
                    yAxisTextStyle,
                    yAxisSide === 'right' && {
                      transform: [{rotateY: '180deg'}],
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

      {
        /***********************************************************************************************/
        /*************************      Render the reference lines separately      *********************/
        /***********************************************************************************************/
        hideAxesAndRules !== true &&
          !hideYAxisText &&
          horizSections.map((sectionItems, index) => {
            let label = getLabel(sectionItems.value, index);
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
                  yAxisSide === 'right' && {
                    transform: [
                      {
                        translateX:
                          (props.width ? props.width : totalWidth) -
                          30 +
                          endSpacing,
                      },
                      {rotateY: '180deg'},
                    ],
                  },
                ]}>
                {index === noOfSections && showReferenceLine1 ? (
                  <View
                    style={{
                      position: 'absolute',
                      bottom:
                        (referenceLine1Position * containerHeight) / maxValue,
                      left:
                        yAxisSide === 'right'
                          ? yAxisLabelWidth + yAxisThickness + 5
                          : yAxisLabelWidth + yAxisThickness,
                    }}>
                    <Rule config={referenceLine1Config} />
                    {referenceLine1Config.labelText ? (
                      <Text
                        style={[
                          {position: 'absolute'},
                          yAxisSide === 'right' && {
                            transform: [{rotateY: '180deg'}],
                          },
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
                        (referenceLine2Position * containerHeight) / maxValue,
                      left:
                        yAxisSide === 'right'
                          ? yAxisLabelWidth + yAxisThickness + 5
                          : yAxisLabelWidth + yAxisThickness,
                    }}>
                    <Rule config={referenceLine2Config} />
                    {referenceLine2Config.labelText ? (
                      <Text
                        style={[
                          {position: 'absolute'},
                          yAxisSide === 'right' && {
                            transform: [{rotateY: '180deg'}],
                          },
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
                        (referenceLine3Position * containerHeight) / maxValue,
                      left:
                        yAxisSide === 'right'
                          ? yAxisLabelWidth + yAxisThickness + 5
                          : yAxisLabelWidth + yAxisThickness,
                    }}>
                    <Rule config={referenceLine3Config} />
                    {referenceLine3Config.labelText ? (
                      <Text
                        style={[
                          {position: 'absolute'},
                          yAxisSide === 'right' && {
                            transform: [{rotateY: '180deg'}],
                          },
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
    </>
  );
};
