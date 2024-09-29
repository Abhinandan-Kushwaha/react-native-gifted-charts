# Screenshot tests

### Axes related 
[See the Props](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/blob/master/docs/BarChart/BarChartProps.md#axes-and-rules-related-props)

#### All axes related props should be tested on below types of charts-

1. Bar
2. Stacked Bar
3. Line
4. Line Bicolor (secondary Y axis not supported)

This means that each of the below tests will be written 3 times (1 for each of the above charts)

1. A chart with only +ve values should have y Axis labels and the Y-axis line at the proper position
2. A chart with both +ve and -ve values should have y Axis labels and the Y-axis line at the proper positions both in the 1st and the 4th quadrant
3. A chart with only +ve values, all values less than 1 should show fractional labels on the y Axis
4. A chart with only +ve values, with values range less than 1 should show fractional labels on the y Axis (given apt `yAxisOffset`)
5. A chart with only +ve values and `yAxisSide = {yAxisSides.RIGHT}` should have y Axis labels and the Y-axis line at the proper position
6. A chart with both +ve and -ve values and `yAxisSide = {yAxisSides.RIGHT}` should have y Axis labels and the Y-axis line at the proper position
7. A chart with `secondaryYaxis` should have the secondary y Axis labels and the Y-axis line at the proper position (given secondary data)
8. A chart with `secondaryYaxis` and both +ve and -ve values should have the secondary y Axis labels and the Y-axis line at the proper positions both in the 1st and the 4th quadrant
9. `yAxisExtraHeight` should add extra height to the chart when `height` is NOT given
10. `yAxisExtraHeight` should add extra height to the chart when `height` is given
11. `yAxisLabelWidth` prop should change the width of the y-Axis label and should horizontally shift the chart gracefully
12. Check alignment of the right side y-Axis line and labels when using the `yAxisLabelWidth` prop along with `yAxisSide = {yAxisSides.RIGHT}`
13. `trimYAxisAtTop` should shorten the Y axis from top without shifting the labels, chart or rules
14. `trimYAxisAtTop` should shorten the Y axis from top for the right side Y-axis when used with `yAxisSide = {yAxisSides.RIGHT}`
15. `trimYAxisAtTop` should shorten both sides Y-axis when using the secondary Y axis
16. `yAxisLabelPrefix` should add the prefix to Y-axis labels
17. `yAxisLabelSuffix` should add the suffix to Y-axis labels
18. Both `yAxisLabelPrefix` and `yAxisLabelSuffix` should work together
19. Both `yAxisLabelPrefix` and `yAxisLabelSuffix` should work together for chart with both +ve & -ve values
20. Both `yAxisLabelPrefix` and `yAxisLabelSuffix` should work together for chart with fractional values
21. `formatYLabel` should format the Y-axis labels
22. `formatYLabel` should work on top of `yAxisLabelPrefix` and `yAxisLabelSuffix`
23. `rulesLength` prop should work for a chart with +ve values only
24. `rulesLength` prop should work for a chart with both +ve and -ve values
25. Reference line 1 should work for a chart with +ve values only
26. Reference line 1 should work for a chart with both +ve and -ve values
27. Reference line 2 should work for a chart with +ve values only
28. Reference line 2 should work for a chart with both +ve and -ve values
29. `referenceLinesOverChartContent` should render reference lines over chart content
30. `showVerticalLines` should work
31. `verticalLinesHeight` should work
32. `verticalLinesShift` should work
33. `noOfVerticalLines` should work
34. `verticalLinesSpacing` should work
35. `rotateLabel` should work for a chart with +ve values only
36. `rotateLabel` should work for a chart with both +ve and -ve values
37. `labelsDistanceFromXaxis` should work for a chart with +ve values only
38. `labelsDistanceFromXaxis` should work for a chart with both +ve and -ve values
39. `xAxisTextNumberOfLines` should work
40. `xAxisLabelsHeight` should work
41. `xAxisLabelsVerticalShift` should work should work for a chart with +ve values only
42. `xAxisLabelsVerticalShift` should work for a chart with both +ve and -ve values
43. `labelsDistanceFromXaxis` and `xAxisLabelsVerticalShift` should work together for a chart with both +ve and -ve values
44. `labelsExtraHeight` should work for a chart with +ve values only
45. `noOfSections` should work
46. `noOfSectionsBelowXAxis` should work
47. `maxValue` should work
48. `stepValue` should work
49. `noOfSections` and `maxValue` should work together
50. `noOfSections` and `stepValue` should work together
51. `maxValue` and `stepValue` should work together
52. `mostNegativeValue` should work
53. `negativeStepValue` should work
54. `noOfSectionsBelowXAxis` and `mostNegativeValue` should work together
55. `negativeStepValue` and `noOfSectionsBelowXAxis` should work together
56. `mostNegativeValue` and `noOfSectionsBelowXAxis` should work together


### Pie chart tests

1. A Pie chart with only 1 item in data array should work
2. A Donut chart with only 1 item in data array should work
3. `radius` should work for Pie chart
4. `radius` should work for Donut chart
5. `initialAngle` should work for Pie chart
6. `initialAngle` should work for Donut chart
7. `sectionAutoFocus` should work for Pie chart
8. `sectionAutoFocus` should work for Donut chart
9. `extraRadius` should work with `sectionAutoFocus` for Pie chart
10. `extraRadius` should work with `sectionAutoFocus` for Donut chart
11. `inwardExtraLengthForFocused` should work for Donut chart
12. `inwardExtraLengthForFocused` and `extraRadius` should work together for Donut chart
13. `semiCircle` should work for Pie chart
14. `semiCircle` should work for Donut chart
15. `pieInnerComponent` should work
16. `labelsPosition: inward` should work
17. `labelsPosition: mid` should work
18. `labelsPosition: onBorder` should work
19. `labelsPosition: outward` should work
20. `showExternalLabels` should work

<br />

___
___

<br />

# Unit tests

1. `onPress` should work
2. `onLongPress` should work
3. `onPress` for individual data items should work


<br />

___
___

<br />


# Manual tests

1. Line and area charts with the use of the `animateOnDataChange` prop should not blink on moving the pointer. https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/849
