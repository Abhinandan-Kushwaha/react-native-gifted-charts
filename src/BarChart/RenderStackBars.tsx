import React, { Component, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Text, ColorValue } from 'react-native';
import Animated2DWithGradient from './Animated2DWithGradient';
import { Style } from 'util';

type Props = {
    style?: any;
    width?: number;
    height?: number;
    color?: ColorValue;
    showGradient?: Boolean;
    gradientColor?: any;
    frontColor?: ColorValue;
    sideColor?: ColorValue;
    topColor?: ColorValue;
    topLabelComponent?: Component;
    topLabelContainerStyle?: Style;
    opacity?: number;
    side?: String;
    labelTextStyle?: any;

    item: itemType;
    index: number;
    containerHeight?: number;
    maxValue: number;
    spacing?: number;
    data?: any;
    barWidth?: number;

    isThreeD?: Boolean;
    isAnimated?: Boolean;
    rotateLabel?: Boolean;
    animatedHeight?: any;
    appearingOpacity?: any;
    animationDuration?: number;
    roundedTop?: Boolean;
    roundedBottom?: Boolean;
    disablePress?: Boolean;
    activeOpacity?: number;
    cappedBars?: Boolean;
    capThickness?: number;
    capColor?: ColorValue;
    capRadius?: number;
    showVerticalLines: Boolean;
    verticalLinesThickness: number;
    verticalLinesColor: ColorValue;
    verticalLinesZIndex: number;
    showXAxisIndices: Boolean;
    xAxisIndicesHeight: number;
    xAxisIndicesWidth: number;
    xAxisIndicesColor: ColorValue;
    horizontal: Boolean;
    intactTopLabel: Boolean;
    barBorderRadius?: number
};
type itemType = {
    value?: number;
    onPress?: any;
    frontColor?: ColorValue;
    sideColor?: ColorValue;
    topColor?: ColorValue;
    showGradient?: Boolean;
    gradientColor?: any;
    label?: String;
    barWidth?: number;
    labelTextStyle?: any;
    topLabelComponent?: Function;
    topLabelContainerStyle?: any;
    disablePress?: any;
    capThickness?: number;
    capColor?: ColorValue;
    capRadius?: number;
    labelComponent?: Function;
    barBorderRadius?: number;
    stacks?: Array<any>
};
const RenderStackBars = (props: Props) => {
    const {
        item,
        index,
        containerHeight,
        maxValue,
        spacing,
        side,
        data,
        // oldValue,

        isThreeD,
        isAnimated,
        rotateLabel,
        appearingOpacity,
        opacity,
        animationDuration,
    } = props;
    // const renderLabel = (label: String, labelTextStyle: any) => {
    //     return (
    //         <View
    //             style={[
    //                 {
    //                     width: rotateLabel ? '150%' : '120%',
    //                     position: 'absolute',
    //                     bottom: rotateLabel ? -40 : -25,
    //                 },
    //                 rotateLabel
    //                     ? props.horizontal
    //                         ? { transform: [{ rotate: '330deg' }] }
    //                         : { transform: [{ rotate: '60deg' }] }
    //                     : props.horizontal
    //                         ? { transform: [{ rotate: '-90deg' }] }
    //                         : {},
    //             ]}>
    //             {item.labelComponent ? (
    //                 item.labelComponent()
    //             ) : (
    //                     <Text
    //                         style={[labelTextStyle, { textAlign: 'center' }]}
    //                         numberOfLines={1}>
    //                         {label || ''}
    //                     </Text>
    //                 )}
    //         </View>
    //     );
    // };

    // const renderAnimatedLabel = (label: String, labelTextStyle: any) => {
    //     return (
    //         <Animated.View
    //             style={[
    //                 {
    //                     width: rotateLabel ? '150%' : '120%',
    //                     position: 'absolute',
    //                     bottom: rotateLabel ? -40 : -25,
    //                     opacity: appearingOpacity,
    //                 },
    //                 rotateLabel
    //                     ? props.horizontal
    //                         ? { transform: [{ rotate: '330deg' }] }
    //                         : { transform: [{ rotate: '60deg' }] }
    //                     : props.horizontal
    //                         ? { transform: [{ rotate: '-90deg' }] }
    //                         : {},
    //             ]}>
    //             {item.labelComponent ? (
    //                 item.labelComponent()
    //             ) : (
    //                     <Text
    //                         style={[labelTextStyle, { textAlign: 'center' }]}
    //                         numberOfLines={1}>
    //                         {label || ''}
    //                     </Text>
    //                 )}
    //         </Animated.View>
    //     );
    // };

    const getPosition = (index: number) => {
        let position = 0;
        for (let i = 0; i < index - 1; i++) {
            position += (props.item.stacks[index].value * (containerHeight || 200)) / (maxValue || 200)
        }
        return position;
    }

    const getTotalHeight = () => {
        return props.item.stacks.reduce((acc, stack) => {
            // console.log('stack-->', stack)
            return acc + stack.value
        }, 0)
    }

    // useEffect(() => {
    //     const he = props.item.stacks.reduce((acc, stack) => {
    //         console.log('stack-->', stack)
    //         console.log('acc-->', acc)
    //         return acc + stack.value
    //     }, 0)
    //     console.log('he', he);
    // }, [])


    const static2DSimple = (item: itemType) => {
        // console.log('comes to static2DSimple', item);
        return (
            <>
                <View
                    style={[
                        {
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundColor: item.frontColor || props.frontColor || 'black',
                            borderRadius: props.barBorderRadius || item.barBorderRadius || 0
                        },
                        props.roundedBottom && {
                            borderBottomLeftRadius:
                                (item.barWidth || props.barWidth || 30) / 2,
                            borderBottomRightRadius:
                                (item.barWidth || props.barWidth || 30) / 2,
                        },
                        props.cappedBars && {
                            borderTopLeftRadius:
                                item.capRadius === 0
                                    ? 0
                                    : item.capRadius || props.capRadius || 0,
                            borderTopRightRadius:
                                item.capRadius === 0
                                    ? 0
                                    : item.capRadius || props.capRadius || 0,
                        },
                        props.roundedTop && {
                            borderTopLeftRadius: (item.barWidth || props.barWidth || 30) / 2,
                            borderTopRightRadius: (item.barWidth || props.barWidth || 30) / 2,
                        },
                    ]}>
                    {
                        item.stacks.map((stackItem, index) => {
                            return (
                                <View
                                    style={[
                                        {
                                            position: 'absolute',
                                            bottom: getPosition(index),
                                            width: '100%',
                                            height: (stackItem.value * (containerHeight || 200)) / (maxValue || 200),
                                            backgroundColor: stackItem.color || 'black',
                                            borderRadius: stackItem.borderRadius || 0
                                        },]} />
                            )
                        })
                    }
                    {props.cappedBars && (
                        <View
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height:
                                    item.capThickness === 0
                                        ? 0
                                        : item.capThickness || props.capThickness || 6,
                                backgroundColor: item.capColor || props.capColor || 'gray',
                                borderTopLeftRadius:
                                    item.capRadius === 0
                                        ? 0
                                        : item.capRadius || props.capRadius || 0,
                                borderTopRightRadius:
                                    item.capRadius === 0
                                        ? 0
                                        : item.capRadius || props.capRadius || 0,
                            }}
                        />
                    )}
                </View>
                {item.topLabelComponent && (
                    <View
                        style={[
                            {
                                position: 'absolute',
                                top: (item.barWidth || props.barWidth || 30) * -1,
                                height: item.barWidth || props.barWidth || 30,
                                width: item.barWidth || props.barWidth || 30,
                                justifyContent:
                                    props.horizontal && !props.intactTopLabel
                                        ? 'center'
                                        : 'flex-end',
                                alignItems: 'center',
                            },
                            props.horizontal &&
                            !props.intactTopLabel && { transform: [{ rotate: '270deg' }] },
                            item.topLabelContainerStyle,
                        ]}>
                        {item.topLabelComponent()}
                    </View>
                )}
            </>
        );
    };

    return (
        <View
            style={[
                {
                    // overflow: 'visible',
                    marginBottom: 60,
                    width: item.stacks[0].barWidth || props.barWidth || 30,
                    height: getTotalHeight(),
                    marginRight: spacing,
                },
                // !isThreeD && !item.showGradient && !props.showGradient &&
                // { backgroundColor: item.frontColor || props.frontColor || 'black' },
                side !== 'right' && data && { zIndex: data.length - index },
            ]}
        >
            {props.showVerticalLines && (
                <View
                    style={{
                        zIndex: props.verticalLinesZIndex,
                        position: 'absolute',
                        height: (containerHeight || 200) + 15,
                        width: props.verticalLinesThickness,
                        bottom: 0,
                        left: (item.barWidth || props.barWidth || 30) / 2,
                        backgroundColor: props.verticalLinesColor,
                    }}
                />
            )}
            {props.showXAxisIndices && (
                <View
                    style={{
                        zIndex: 2,
                        position: 'absolute',
                        height: props.xAxisIndicesHeight,
                        width: props.xAxisIndicesWidth,
                        bottom: 0,
                        left: (item.barWidth || props.barWidth || 30) / 2,
                        backgroundColor: props.xAxisIndicesColor,
                    }}
                />
            )}
            {
                static2DSimple(item)
            }
            {/* {isAnimated
                ? renderAnimatedLabel(item.label || '', item.labelTextStyle)
                : renderLabel(item.label || '', item.labelTextStyle)} */}
        </View>
    );
};

export default RenderStackBars;
