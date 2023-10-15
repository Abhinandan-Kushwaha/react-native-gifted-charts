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
