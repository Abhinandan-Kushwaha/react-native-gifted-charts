# 🎉 1.3.24

## ✨ Features added-

1. Added `pointerConfig` support to Stacked Bar charts.

2. Added `barBorderWidth` and `barBorderColor` to Bar charts.

3. Added separate `spacing` for Line charts inside BarCharts. The line rendered in a Bar chart can have its own `spacing` value independent from the spacing of the bars. It can be set using the `spacing` property in the `lineConfig` object.

4. Added these props to apply border radius to Stacked Bar charts- 
<ul>
   <li> stackBorderRadius </li>
   <li> stackBorderTopLeftRadius </li>
   <li> stackBorderTopRightRadius </li>
   <li> stackBorderBottomLeftRadius </li>
   <li> stackBorderBottomRightRadius </li>
</ul>

## 🐛 Bug fixes

1. Fixed the issue - initial pointer appearing at top for the second data line. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/453


## 🔨 Refactor

Merged `ThreeDBar` and `AnimatedBar` codes to make a single file named `AnimatedThreeDBar`

---

---

---

# 🎉 1.3.23

## ✨ Features added-

1. Added the props- `showValuesAsTopLabel`, `topLabelContainerStyle` and `topLabelTextStyle` to **Bar** charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/99#issuecomment-1824418965

2. Added the prop `highlightedRange` to render the parts of lines lying in a given data range with a different style (color, thickness,type). See https://stackoverflow.com/questions/70406903/different-colors-line-chart-with-react-native-chart-kit

```ts
type HighlightedRange = {
  from: number;
  to: number;
  color?: string | ColorValue;
  thickness?: number;
  strokeDashArray?: Array<number>;
};
```

3. Added the property `pointerEvents` to the `pointerConfig` object. If you have a Pressable / Touchable item in your `pointerLabelComponent`, then you should set `pointerEvents` to **'auto'** inside the pointerConfig object. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/447

## 🐛 Bug fixes

1. Fixed the issue - Unwanted Spacing below the charts.See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/448

---

---

---

### Versions `1.3.20` and `1.3.21` and `1.3.22` were mistakes and reverts...

---

---

---

# 🎉 1.3.19

## ✨ Features added-

1. Added support for dynamic number of lines with the help of the `dataSet` prop. We can now pass an array of data instead of using `data`, `data2`, `data3` etc.
2. Added property `formatYLabel` to the `secondaryYAxis`, so we can now format the labels of the secondary Y-Axis using `formatYLabel`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/442

## 🐛 Bug fixes

1. Fixed issue with Pie charts having all zero values. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/443

---

---

---

# 🎉 1.3.18

## ✨ Features added-

1. Added support for line segments in Line and Area charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/432#issuecomment-1818308273
2. Added support for 2 line charts inside Bar chart using the `lineData2` and `lineConfig2` props. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/440

## 🐛 Bug fixes

1. Fixed issue with step chart edge position. Added a prop named `edgePosition`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/438

---

---

---

# 🎉 1.3.17

## ✨ Features added-

1. Added support for Step charts. To render a step chart, just pass the prop `stepChart` to the `<LineChart>` component. <br />
   See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/438 <br/>

2. Added the properties- `initialPointerIndex`, `initialPointerAppearDelay`, and `persistPointer` to the `pointerConfig` object. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/427

3. Added support for customizing individual / specific rules in charts using the prop `rulesConfigArray`.
   See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/432#issuecomment-1817965308

4. Added 2 new props- `xAxisLabelsHeight` and `xAxisLabelsVerticalShift`. Here's a brief description of the use case of these props-
<p>
The height of X axis labels container is computed automatically. Sometimes you may need to explicitly provide the height of X-axis labels container. An example case is when the font size of label texts is large. Use the `xAxisLabelsHeight`` prop if the labels appear cropped from bottom.

_Note- Using the `xAxisLabelsHeight` prop may shift the X axis labels up or down, making the label text overlap with the chart content. In such a case you can use the `xAxisLabelsVerticalShift`` prop to adjust the vertical position of X axis labels._

See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/433
</b>

## 🐛 Bug fixes

1. Fixed issue- Pie charts get distorted when one value is non-zero and rest values are zero. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/436

2. Fixed issue with programmatically changing focus does in Pie and Donut charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/428

---

---

---

# 🎉 1.3.16

🐛 A minor bug fix. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/422#issuecomment-1788316137

---

---

---

# 🎉 1.3.15

🐛 A minor bug fix. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/424

---

---

---

# 🎉 1.3.14

## ✨ Features added-

1. Added support for Multicolor Line charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/251 <br/>
   These props will help to render multicolor line-

```js
lineGradient?: boolean;
lineGradientComponent?: () => any;
lineGradientId?: string;
lineGradientDirection?: string;
lineGradientStartColor?: string;
lineGradientEndColor?: string;
```

See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/blob/master/docs/LineChart/LineChartProps.md#line-related-props

2. Added support for custom gradient in area charts using the props `areaGradientComponent` and `areaGradientId`

## 🐛 Bug fixes

1. Fixed issue- pointerConfig on Bar chart was jaggy

---

---

---

# 🎉 1.3.13

## ✨ Features added-

1. Added the `formatYLabel` prop. The user can now pass a callback function that takes the label generated by the library and modifies it. The modified label returned by the callback function will be finally rendered along the Y-axis. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/22

## 🐛 Bug fixes

1. Fixed the issue where tooltip was not rendered in Bar charts that use `showLine` prop. Also, bars were not clickable with `showLine` and `lineBehindBars={false}`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/411

---

---

---

# 🎉 1.3.12

## ✨ Features added-

1. Added **pointerConfig** behaviour to Bar charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/410

## 🐛 Bug fixes

1. Fixed issue with `pointerConfig`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/177
2. Added types to util functions. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/379

---

---

---

# 🎉 1.3.11

## 🐛 Bug fixes

1. Fixed some typescript issues. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/269#issuecomment-1753162473
2. Fixed issue with the 4th curve of curved area charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/discussions/402
3. Fixed https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/406

---

---

---

# 🎉 1.3.10

## 🐛 Bug fixes

Fixed issue where a zero value was omitted in Pie chart. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/401

---

---

---

# 🎉 1.3.9

## 🐛 Bug fixes

1. `focusedDataPointLabelComponent` now appears above other UI elements, as it is now given a zIndex of 1000. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/396
2. Fixed issue with the position of verticalLines when `hideYAxisText` is set to true.

## 🔨 Refactor

1. replaced `JSON.parse(JSON.stringify())` with custom deepClone method (added in utils). It fixed this issue- https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/397

---

---

---

# 🎉 1.3.8

## ✨ Features added-

1. Added the property named `isSecondary` in the `lineConfig` object see https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/392
2. Replaced the prop `verticalLinesType` with `verticalLinesStrokeDashArray`

## 🐛 Bug fixes

Fixed issue with secondary Y axis position (it was shifting towards right earlier)

---

---

---

# 🎉 1.3.7

## ✨ Features added-

1. Added the prop `scrollEventThrottle` (only for iOS) see https://reactnative.dev/docs/scrollview#scrolleventthrottle-ios - default value is 0
2. exposed secondaryDataItem in pointerLabelComponent see https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/388

## 🐛 Bug fixes

Fixed issue with `adjustToWidth` (Now if you pass the `adjustToWidth` prop, your chart will take the screen width automatically)

---

---

---

# 🎉 1.3.6

## ✨ Features added-

1. secondary Y axis for charts with negative values
2. Line chart inside stacked bar chart

## 🔨 Refactor

`minValue` is now renamed to `mostNegativeValue` to avoid confusion

## 🐛 Bug fixes

1. Fixed issue with `roundToDigits` for Y axis labels. Now we add trailing 0s after decimal point if needed. So if the Y axis label is 1.5 and we have `roundToDigits={2}`, then the label rendered will be 1.50
2. Fixed Y axis label issue which displayed NaN as a label when we used `yAxisOffset` and `yAxisLabelTexts` props together.

---

---

---

# 🎉 1.3.5

🐛 Minor bug fixes

---

---

---

# 🎉 1.3.4 Major release

## ✨ Features added-

### 1. Y axis on both sides

Added the `secondaryYAxis` prop to render a secondary Y axis on the right side of the chart. Earliear we were able to render the Y axis either on the left or on the right side, not both.

### 2. secondaryData and secondaryLineConfig (in Line and Area charts)

In addition to data2, data3, etc, now we have the `secondaryData` prop. This is done to reference the second line to the secondary Y axis.

### 3. scrollRef

In Bar, Line and Area charts, we can access the ScrollView using the `scrollRef` prop. You just need to create a ref using React.useRef() and pass it into the scrollRef prop. The most common use of scrollRef is to scroll to a given position, and to fire the scroll on an event like a button press.

### 4. scrollToIndex

In Bar, Line and Area charts, we can scroll to any given index using the `scrollToIndex` prop.

### 5. RTL horizontal charts

To render a horizontal Bar chart from right to left, pass the `rtl` prop along with the `horizontal` prop.

### 6. curveType and curvature

Now, we support 2 types of curves-

1. Cubic bezier curve
2. Quadratic bezier curve

The default curveType is cubiz bezier curve. To change it to quadratic, pass the prop `curveType={CurveType.QUADRATIC}`<br />
<br/>
`curvature` takes a value between 0 and 1. The default curvature value is `0.2`<br/>
curvature works only for cubic bezier curves. When curvature value is 0, the curve becomes straight line.

### 7. showValuesAsDataPointsText

In Line and area charts, we can pass the `showValuesAsDataPointsText` prop to display the value of the data points.

### 8. Animation in stacked Bar chart

The `isAnimated` prop is now supported in stacked bar charts.

### 9. endSpacing

Similar to the `initialSpacing` we now have a prop named `endSpacing` as well.

### 10. overflowBottom

Similar to the `overflowTop` we now have a prop named `overflowBottom` as well, but it makes sense only for line and area charts. It gives extra space at the bottom of the chart to make room for dataPoints or dataPointText.

## 🐛 Fixes

### 1. Support for expo ❤️

The library used to break when used in an expo project. This was perhaps due to version conflicts in react-native-svg. We have now moved both `react-native-svg` and `react-native-linear-gradient` to peer dependencies. This should hopefully fix the issues with expo.

### 2. Fixed the issue with pointerConfig being jaggy on Android

`autoAdjustPointerLabelPosition` is now false by default. This should make the Area and Line charts with pointerConfig smooth on Android.
