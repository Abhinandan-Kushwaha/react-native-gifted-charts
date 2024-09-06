# 🎉 1.4.33

## 🐛 Bug fixes

1. Fixed the issue- Secondary Y-axis labels misaligned for negative part (4th quadrant) and `yAxisLabelTexts` not working properly in the Secondary Y-axis. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/814#issuecomment-2330782150

2. Fixed the issue- app crashes with interpolateMissingValues=false and areaChart=true. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/805

---

---

---

# 🎉 1.4.32

## 🐛 Bug fixes

1. Fixed the issue- topLabel component not displayed for animated stacked Bar charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/813

2. Fixed the issue- Line in Bar chart not shifted downwards in case the Bar chart has negative values too. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/814

3. Fixed the issue- Secondary Y axis labels incorrect when `yAxisLabelTexts` prop is used. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/814

4. Fixed the issue- If both the first and the last pie sections are on pole, then the external labels overlap. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/806#issuecomment-2325420569

5. Fixed the issue- Pattern inside Bars not displayed. See https://github.com/software-mansion/react-native-svg/issues/2437#issuecomment-2327155553

6. Fixed the issue- animation not working for simple 2d Bar charts.

---

---

---

# 🎉 1.4.31

## ✨ Features added-

1. Pointer lines will now be displayed in both positive and negative values of the Line and Area charts (1st and 4th quadrant). See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/799

2. Added the property `avoidOverlappingOfLabels` to the prop `labelLineConfig` for Pie and donut charts. The default being true, it auto shifts overlapping external labels in Pie charts rendered using `showExternalLabels` and `externalLabelComponent`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/801
   **Note:** Only the labels overlapping near the poles (at the top and bottom) will be auto-shifted. Auto-shifting can be disabled by setting `avoidOverlappingOfLabels: false` inside the `labelLineConfig` object.

## 🐛 Bug fixes

1. Fixed the issue- Vertical lines displayed using the `showVerticalLines` prop are incomplete in Bar and Line charts when run on web (using Expo). See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/794

2. Fixed the issue- Line chart is shifted up and some data cannot be displayed (on web using Expo). See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/778

3. Fixed the issue- Focused section always getting the color of the 1st section on web (using Expo) See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/800#issuecomment-2313079219

---

---

---

# 🎉 1.4.30

## ✨ Features added-

`animateOnDataChange` now works evevn if the lehgth of data array is changed. Earlier it worked for data changes with same length and threw error on changing the length of data array.<br />
See- https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/791 <br/>
This is solved by adding dummy points to the data having lesser number of points. Dummy points are added carefully using the `pointsWithPaddedRepititions` util function from gifted-charts-core.

---

---

---

# 🎉 1.4.29

## ✨ Features added-

1. The prop `topLabelTextStyle` now works for stacked Bar charts just like it used to work for simple Bar charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/446#issuecomment-2269078504

2. Secondary Y axis with negative values in secondary data or dataSet with `isSecondary: true` sets are now supported. Independent height, stepHeight, stepValue, mostNegativeValue, noOfSectionsBelowXAxis for primary and secondary Y-axes below origin supported.

## 🐛 Bug fixes

Fixed the issue- Negative steps and values in in second y axis are incorrect position. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/775

## 🔨 Refactor

1. Removed unnecessary interpolation for animations in Line charts.

2. Passed `containerHeightIncludingBelowXAxis` to the `renderChartContent` method from the `BarAndLineChartsWrapper` component. This will ensure a consistent value of containerHeightIncludingBelowXAxis.

3. Updated the util (`maxAndMinUtil`) to compute the value of `minItem` in case of `roundToDigits:true` in gifted-charts-core.

4. Moved the computation of below variables from `getHorizSectionVals` to `useBarAndLineChartsWrapper` in gifted-charts-core.

   1. secondaryMaxItem
   2. secondaryMinItem
   3. secondaryStepValue
   4. secondaryNegativeStepValue
   5. secondaryNoOfSectionsBelowXAxis

---

---

---

# 🎉 1.4.28

## ✨ Features added-

1. Added the prop `referenceLinesOverChartContent` to Line and Area charts (earlier available for Bar charts only). See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/761

2. Added support for external Labels in Pie and Donut charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/763 <br />
   It uses the below props-
   1. `showExternalLabels` (boolean)
   2. `labelLineConfig` (object of LabelLineConfig type)
   3. `externalLabelComponent` (svg component for label, a callback function with 2 parameters- item and index)

The `labelLineConfig` prop is an object of `LabelLineConfig` type described below-

```ts
type LabelLineConfig = {
  length?: number; // default 10
  tailLength?: number; // default 8
  color?: ColorValue; // default 'black'
  thickness?: number; // default 1
  labelComponentWidth?: number; // default 20
  labelComponentHeight?: number; // default 10
  labelComponentMargin?: number; // default 4
};
```

## 🔨 Refactor

Renamed the `extraRadiusForFocused` to `extraRadius` in Pie and Donut charts.

---

---

---

# 🎉 1.4.27

Accidentally pushed with a minor bug. Don't use this version!! Use `1.4.28` or newer versions.

---

---

---

# 🎉 1.4.26

## ✨ Features added-

Added the property `hidePointers` to the objects of the `dataSet` array. This will let us hide the pointers for individual sets.<br />
Also, we can now add the property `hidePointer` inside individual data items of any dataSet.<br />
See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/755

## 🐛 Bug fixes

1. Fixed the issue- `areaChart` given in dataSet array of line chart doesn't work. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/758
2. Fixed the issue- Crash when I click to datapoint doesn't have any value. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/757

---

---

---

# 🎉 1.4.25

## ✨ Features added-

Added the prop `intersectionAreaConfig` that defines properties for intersection area of data and data2 (1st & 2nd areas). See https://stackoverflow.com/questions/78435388/react-native-area-chart

## 🐛 Bug fixes

Fixed the issue- `pointerLabelComponent`'s second parameter (representing secondaryItem) is undefined. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/752

## 🔨 Refactor

Reused `activatePointers` function, thus removing many lines of repetitive code in the LineChart component.

---

---

---

# 🎉 1.4.24

## ✨ Features added-

1. Line charts can now have data arrays of different lengths. This means that data, data2, data3 don't need to be of same length. Same applies to the sets of dataSet.

2. Added the prop `labelWidth` to stacked Bar charts. Thanks to **Nathan Karmer** for his PR- https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/pull/748

## 🐛 Bug fixes

1. Fixed the issue- Datapoint in secondary lines are incorrect position in pointerConfig. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/749

2. Fixed the issue- Data points visible even if an area chart is hidded under some other area chart.

3. Fixed the issue- Crash due to replacing `findLastIndex` with `slice().reverse().findIndex` in gifted-charts-core. I was reversing only the array and forgot to reverse the index. Thanks to **dumihi313** for his PR- https://github.com/Abhinandan-Kushwaha/gifted-charts-core/pull/37

---

---

---

# 🎉 1.4.23

## ✨ Features added-

1. Added `pointerIndex` to the parameter list of `pointerLabelComponent`. This will help conditionally format the pointerLabelComponent based on pointerIndex.<br />
   `pointerLabelComponent` now accepts 3 parameters- `items`, `secondaryDataItem` and `pointerIndex`.
   One use case would be to position the first and last pointerLabelComponents such that they don't overflow the chart area.<br />
   See https://stackoverflow.com/questions/78472182/changer-pointerlable-style-on-a-certain-index-in-react-native-gifted-chart-linec

2. Refactored the `animateOnDataChange` for Line and Area charts to make the animation smooth. `animateOnDataChange` is now suppported for curved charts as well! See https://stackoverflow.com/questions/78546970/react-native-gifted-charts-not-animating-on-data-change

## 🔨 Refactor

In [gifted-charts-core](https://github.com/Abhinandan-Kushwaha/gifted-charts-core), replaced `findLastIndex()` with `slice().reverse().findIndex()`.<br />
See the issue- https://github.com/Abhinandan-Kushwaha/gifted-charts-core/issues/31 and its fix PR- https://github.com/Abhinandan-Kushwaha/gifted-charts-core/pull/33

---

---

---

# 🎉 1.4.22 Mega Release ⭐️

## ✨ Features added-

1. Added the prop `verticalLinesStrokeLinecap` to Bar and Line charts that takes the values `'butt'`, `'round'` and `'square'` (`'butt'` being the default). See the `stroke-linecap` property in svg.

## 🔨 Refactor

The library now ships js binary obtained after compiling using babel. This should fix all `typescript` issues like these-

1. https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/722
2. https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/691
3. https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/651
4. https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/625
5. https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/546
6. https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/473

**Note:** Since we are now shipping compiled js, you may need to install the **[gifted-charts-core](https://www.npmjs.com/package/gifted-charts-core)** dependency.

### PR- https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/pull/736 and https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/pull/737

---

---

---

# 🎉 1.4.21

Accidentally pushed the build folder (dist) without type declarations. Don't use this version!! Use `1.4.22` or newer versions.

---

---

---

# 🎉 1.4.20

## ✨ Features added-

Added the following properties in the `lineConfig` prop for Bar charts (to control the line rendered inside Bar charts using the `showLine` prop) -

```ts
focusEnabled?: boolean;
focusedDataPointColor?: ColorValue;
focusedDataPointRadius?: number;
focusedDataPointIndex?: number;
```

See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/729

---

---

---

# 🎉 1.4.19

## ✨ Features added-

1. Added the prop `stripStrokeDashArray` to support dotted and dashed vertical strips in Line and Area charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/611
2. Added the properties `barBorderWidth` and `barBorderColor` to data items in Bar charts. Earlier these properties could only be passed directly as props. But now, they can be passed to individual data items as well. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/580

## 🐛 Bug fixes

1. Fixed the issue- Y-axis indices are not properly aligned with rule lines. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/577

---

---

---

# 🎉 1.4.18

## ✨ Features added-

1. Added the prop `secondaryXAxis` to render an additional X axis at the top of the chart.

The labels to be displayed along the secondary X-axis can be passed in these 2 ways-

1.  Through the property named `secondaryLabel` in the data array
2.  Through the property named `labelTexts` in the `secondaryXAxis` prop.

The `secondaryXAxis` props accepts an object of the following type-

```ts
XAxisConfig {
  thickness?: number
  color?: ColorValue
  labelsDistanceFromXaxis?: number
  labelsHeight?: number
  labelsTextStyle?: any
  labelTexts?: string[]
}
```

See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/642

2. Added the properties `secondaryLabel`, `secondaryLabelComponent` and `secondaryLabelTextStyle` to the data items of Bar and Line charts.

## 🐛 Bug fixes

1. Fixed the issue- Bar chart does not update on changing data values. (Only animated Bar charts used to update). See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/643

---

---

---

# 🎉 1.4.17

## ✨ Features added-

1. Added the prop `autoCenterTooltip` to auto-center the tooltip for Bar charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/713 <br />

2. Added the prop `nestedScrollEnabled` to Bar and Line charts. It is useful when the chart is used inside a horizontal ScrollView as without this, the chart's scrolling is compromised. Thanks to **Guilherme Pellegrini Coelho** for his PR https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/pull/640

3. Added the props `onChartAreaPress` and `onBackgroundPress` for Line and Area charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/634

## 🐛 Bug fixes

1. Fixed the issue- Line chart crashing when using `dataSet` and `pointerConfig` together. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/708

2. Fixed the issue- Values in `pointerLabelComponent` are wrong when using `yAxisOffset`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/645

3. Fixed the issue "A props object containing a "key" prop is being spread into JSX" (in react 18.3 onwards) See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/646

4. Fixed the issue- Horizontal bar tooltip not rotated. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/672

5. Fixed the issue- In secoundry Y-axis, hideOrigin doesn't work correctly (hides the top Y-label instead of bottom) See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/704

6. Fixed the issue- LineChart does not recognize sectionColors parameter. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/715

---

---

---

# 🎉 1.4.16

## ✨ Features added-

1. Added the prop `focusedPieIndex` to Pie charts used to set initially focused pie and to override the focus behaviour on `onPress`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/702

## 🐛 Bug fixes

1. Fixed the issue- Line inside Bar chart with secondary y-axis is misaligned. Fix taken from [this patch-package](https://github.com/Abhinandan-Kushwaha/gifted-charts-core/issues/4). See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/543

2. Fixed the issue- When using LineChart with specifying both dataSet and pointerConfig, "Cannot read property 'value' of undefined" error occurs. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/673

3. Fixed the issue- y-axis labels misaligned for right-side y-axis when passing an `endSpacing` value. Fixed this by rectifying the calculation of `totalWidth` in gifted-charts-core.

---

---

---

# 🎉 1.4.15

## ✨ Features added-

1. Added the props `negativeStepValue` and `negativeStepHeight` to control the value and height of 1 step/section in the Y axis for negative values (in the 4th quadrant). See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/686 (Supported in both- Bar and Line charts, but currently functional in Bar charts only)

2. Added the prop `sectionColors` to set the background color of the horizontal sections of the chart. It is an array of ColorValues (or strings denoting colors). So, each section can have a different background color now. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/547

## 🐛 Bug fixes

1. Fixed the issue- y-axis gets distorted for large negative values. Y-axis below origin will now have adequate number of sections instead of the default 10 sections. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/685
2. Fixed the issue- Bars slightly below the rules. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/670#issuecomment-2183338829 (Issue was there only in non-gradient Bar chart)

---

---

---

# 🎉 1.4.14

## ✨ Features added-

1. Added the prop `focusedBarIndex` to Bar charts used to set initially focused bar and to override the focus behaviour on `onPress`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/675
2. Added the prop `labelsDistanceFromXaxis` to shift the X-axis labels vertically up or down from their original position (that is just below the x axis). This prop will be very useful in case of Stacked Bar charts having both +ve and -ve values in the same stack. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/678
3. Added the prop `autoShiftLabelsForNegativeStacks` to stacked Bar charts and its default value is `true`. It is used to decide whether the X-axis labels should appear just under the negative bar (in case of Stacked Bar charts having both +ve and -ve values in the same stack), or whether they all should appear in one single line. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/678

## 🐛 Bug fixes

1. Fixed the issue- Y-axis under the X-axis has one less section than expected. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/676

---

---

---

# 🎉 1.4.13

## ✨ Features added-

1. Added the prop `focusedDataPointIndex` to Line charts used to set initially focused data point and to override the focus behaviour on `onFocus`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/680

## 🐛 Bug fixes

1. Fixed the issue- data points getting cropped in non-scrollable fixed width Line and Area charts. See- https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/623 and https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/681
2. Fixed the issue- yAxisLabelTexts not working (showing NaN as labels) See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/22#issuecomment-2192243599

---

---

---

# 1.4.12

Accidental release, please don't use this version.

---

---

---

# 🎉 1.4.11

## ✨ Features added-

1. Added the props `adjustToWidth` and `parentWidth` to Bar chart. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/660
2. Added the prop `showDataPointLabelOnFocus` to Line / Area charts to show dataPointLabel (tooltip) on the focused data point. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/664

## 🐛 Bug fixes

1. Fixed the issue- Bar chart with pointerConfig breaks with negative values. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/654
2. Fixed the issue- When using dataSet, only one pointer is displayed on the line chart. Also added the prop `pointerColorsForDataSet`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/610
3. Fixed issue with pointers on secondary data line not displaying at proper position (earlier they were all displayed at x-axis)
4. Removed the wrong prop name `pieInnerComponent` in PieChartPro and replaced it with the correct name- `centerLabelComponent`

---

---

---

# 🎉 1.4.10

## ✨ Features added-

Added the prop `onMomentumScrollEnd` to Bar and Line charts. It can be used to fire an event when scroll is completed. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/601

---

---

---

# 🎉 1.4.9

## ✨ Features added-

1. Added support for multiple lines corresponding to secondary y-axis. Now we can add the property `isSecondary` inside the objects of the `dataSet` array. When using isSecondary, make sure to pass the `secondaryYAxis` prop. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/586

2. Added support for <b>`ring`</b> Pie charts. Just pass the prop `ring` in the `<PieChartPro>` component to make a ring like Pie chart. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/584

3. Added support for `pieInnerComponent` to `<PieChartPro>`

---

---

---

# 🎉 1.4.8 Mega Release ⭐️

## ✨ Features added-

### Animation in Pie and donut charts using the **`<PieChartPro>`** component. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/555

### Curved paths (border-radius) in donut sections supported using the **`<PieChartPro>`** component. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/554

### Support for expo gradient, thanks to onyx-flame for his PR https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/pull/571

## 🐛 Bug fixes

1. refactors and adjustments related to xAxisThickness and yAxisOffset. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/574

---

---

---

# 🎉 1.4.7

## 🐛 Bug fixes

1. Fixed the issue - `animateOnDataChange` skipping the initial render, thus rendering an empty chart. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/537
2. Fixed the issue - `yAxisOffset` not working with `dataSet` in Line (and Area) charts.

---

---

---

# 🎉 1.4.6

## ✨ Features added-

1. Added the properties `shiftTextBackgroundX` and `shiftTextBackgroundY` to data items of Pie (and donut) charts. If we pass `shiftTextX`, the background will also shift (because the library assigns a default value of shiftTextBackgroundX = shiftTextX). This can be _overridden_ by manually passing **shiftTextBackgroundX**. Same applies to `shiftTextBackgroundY`

## 🐛 Bug fixes

1. Fixed the issue- _"shiftTextX not working to focused section of the Pie (and donut) charts"_ Thanks to **YASH-TRONX** for his PR https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/pull/534
2. Fixed the issue- **line inside Bar (combined chart) getting cropped from right side in case of _secondary_** See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/532
   This actually got fixed in the core library (version 0.0.16). Here I just had to use the latest version of _gifted-charts-core_

---

---

---

# 🎉 1.4.5

## ✨ Features added-

1. Added the prop `onScroll` to Bar, Stacked Bar, Line and Area charts. It is a callback function that takes _event_ as a parameter.
2. Added the props `paddingHorizontal` and `paddingVertical` to Pie (and Donut) charts. This will be useful to accomodate _"onBorder"_ labels. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/discussions/528

## 🐛 Bug fixes

Fixed issue with `barInnerComponent` for Bar charts that don't have gradient. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/500#issuecomment-1920895288

---

---

---

# 🎉 1.4.4

## ✨ Features added-

Added the prop `onPressOut` to Bar and Stacked Bar charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/523

## 🐛 Bug fixes

Fixed issue with `noOfSectionsBelowXAxis` not taking the value 0 for Line charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/526

---

---

---

# 🎉 1.4.3

## ✨ Features added-

1. Added `interpolation` to Line charts. These props can be used to control interpolation- `interpolateMissingValues`, `showDataPointsForMissingValues` and `onlyPositive`. See **[Interpolation in Line chart docs](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/blob/master/docs/LineChart/LineChartProps.md#interpolation)**
2. Added `BEFORE_DATA_POINT` to `EdgePosition` enum for step charts, and renamed the `AT_DATA_POINT` EdgePosition to `AFTER_DATA_POINT`. The default EdgePosition is `AFTER_DATA_POINT`.

## 🐛 Bug fixes

1. Fixed the issue- _"topLabelComponent not visible for bar charts"_. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/519
2. Fixed RTL issue in pagination. Thanks to Houssem-Eddine Kellou for his PR https://github.com/Abhinandan-Kushwaha/gifted-charts-core/pull/3

---

---

---

# 🎉 1.4.2

## ✨ Features added-

Added the props `focusBarOnPress` and `focusedBarConfig` to Bar charts. Using these, we can focus or highlight a bar on press. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/512

## 🐛 Bug fixes

1. Fixed issues with `stepValue`, `noOfSections` and `maxValue`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/511
2. Fixed issue with pagination, (isCloseToStart not returning true) PR https://github.com/Abhinandan-Kushwaha/gifted-charts-core/pull/2 by **Houssem-Eddine Kellou**

## 🔨 Refactor

Moved `gifted-charts-core` to dependency and put the 3rd party libraries into devDependency. PR https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/pull/514 by **Armon Raphiel**

---

---

---

## 🎉 1.4.1

Exported `ruleTypes` which was missed in version `1.4.0`

---

# 🎉 1.4.0 Mega Release ⭐️

## 📣 This release contains a huge refactor. 🔨 We have now moved most of the logic and maths (including utils, constatnts and types) to our newly launched library named [gifted-charts-core](https://www.npmjs.com/package/gifted-charts-core)

This helped in-

1. Segragating UI and logic
2. Modularity and code re-usability
3. We are very soon going to launch a library for **web** named `react-gifted-charts`❤️ With this we will be able to render charts in **react** using exactly the same code we use in react-native-gifted-charts!
<p>
This huge refactor might have introduced some bugs. Please bear with us.🙏<br/>
To avoid this in future mega releases, I am going to add thorough tests in the next release.
<br /><br/>
We will soon release version 2.0 after adding all types and unit tests for each component!!
</p>

## ✨ Features added-

1. Added support for **Pagination** using the props `onEndReached`, `onStartReached` and `endReachedOffset`. Thanks to Houssem-Eddine Kellou who added this feature through his PR- https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/pull/504. Pagination is now supported for Bar, Stack, Line and Area charts!

2. Added the prop `onLongPress` to Bar and Stacked Bar charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/506

---

---

---

# 🎉 1.3.33

## ✨ Features added-

1. Added the prop `barInnerComponent` to Bar and Stacked Bar charts. `barInnerComponent` can also be passed as a property inside the data items. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/500

2. Added the prop `pieInnerComponent` to Pie and Donut charts. `pieInnerComponent` can also be passed as a property inside the data items. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/500

3. Exported the following types from `react-native-gifted-charts`-
<ul>
   <li>barDataItem</li>
   <li>stackDataItem</li>
   <li>BarChartPropsType</li>
   <li>StackedBarChartPropsType</li>
   <li>pieDataItem</li>
   <li>PieChartPropsType</li>
   <li>lineDataItem</li>
   <li>bicolorLineDataItem</li>
   <li>LineChartPropsType</li>
   <li>LineChartBicolorPropsType</li>
   <li>popnPyramidDataItem</li>
   <li>PopulationPyramidPropsType</li>
</ul>

## 🔨 Refactor

1. Moved types to `'.\types.ts` files for each type of chart and gave proper names to types.

---

---

---

# 🎉 1.3.32

🐛 Minor bug fixes with `initialSpacing` for Line inside Bar charts (combined Bar and Line charts).

---

---

---

# 🎉 1.3.31

## 🐛 Bug fixes

1. Fixed issue with onPress not working on elements just above the chart. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/497 <br/>
   It was an issue with the <ScrollView> of the chart overflowing and overlapping in case stepHeight was large.

2. Fixed the issue- `showStripOnFocus`: height of strip becomes smaller when using `overflowTop`.

---

---

---

# 🎉 1.3.30

## 🐛 Bug fixes

1. Fixed issue with `pointerEvent value: box-none` in Pie charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/491 and https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/472
2. Fixed issue with `data3` and `data4` in Line charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/490
3. Fixed issue- strip not visible for Line and Area charts having `pointerConfig` with `pointerLabelComponent`.

---

---

---

# 🎉 1.3.29 Major release

## ✨ Features added-

1. Added support for **Population Pyramid** charts!! See **[Population Pyramid props](../docs/PopulationPyramid/PopulationPyramid.md)**
2. Pointer labels will now be rendered on top of the rest of the chart content. Earlier, reference lines sometimes used to appear over the pointer lables, this has been fixed now.
3. Added the prop `referenceLinesOverChartContent` for Bar charts.

## 🐛 Bug fixes

1. Fixed the issue- LineChart having a single data item and using the prop `adjustToWidth` caused crashes. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/484
2. Fixed issue with data point label getting cropperd. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/486
3. Fixed the issue- Reference line overlapping the tooltip. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/476

---

---

---

# 🎉 1.3.28

🐛 Minor bug fixes with `pointerEvents` in Pie charts and `yAxisExtraHeight` with `pointerLabelComponent` in Bar and Line charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/472 and https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/467#issuecomment-1860907963

---

---

---

# 🎉 1.3.27

## ✨ Features added-

1. Added support for mix of positive + negative values in Stacked Bar charts. Thanks to Christoph who added this feature through his PR- https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/pull/470
2. Added the prop `yAxisExtraHeight` for extra length of Y axis at the top. Default value is 1/20th of the chart height.
3. Added the prop `inwardExtraLengthForFocused`. This allows us to render donut charts whose focused section grows inwards. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/325

## 🐛 Bug fixes

1. Earlier, charts used to have an extra length of Y axis equal to `sectionHeight/2` at the top. Due to this, charts' height used to change along with `sectionHeight`. Fixed this by making the default value of `yAxisExtraHeight` to a constant value which equals 1/20th of the chart height. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/467
2. Fixed the issue with `getPointerProps` which threw a warning - `Cannot update a component (xxx) while rendering a different component (yyy)`. See https://github.com/facebook/react/issues/22633

---

---

---

# 🎉 1.3.26

🐛 Minor bug fixes with `stripΒehindBars` and `initialPointerIndex` for Bar charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/410#issuecomment-1849747263 and https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/410#issuecomment-1849757216

---

---

---

# 🎉 1.3.25

## ✨ Features added-

1. Added the property `zIndex` to `referenceLine1Config`, `referenceLine2Config` and `referenceLine3Config`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/310

2. Added `stripBehindBars` property to `pointerConfig` for Bar charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/410#issuecomment-1833514034

3. Added the `trimYAxisAtTop` prop for Bar and Line charts. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/461

4. `showValuesAsTopLabel` now shows the sum of stack item values at top of each stack. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/446

5. Added the property `resetPointerOnDataChange` to `pointerConfig` for Line charts. The default value of `resetPointerOnDataChange` is true. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/456

## 🐛 Bug fixes

1. Fixed issue with `overflowTop`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/453#issuecomment-1847832747

2. Fixed issue with `stackBorderRadius`. See https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/354#issuecomment-1829504196 and https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/354#issuecomment-1849032349

---

---

---

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
