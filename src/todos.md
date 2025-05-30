## Features

1. Single tooltip (or focusedDataPointLabelComponent to be precise) displaying values of all lines- https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/discussions/1091#discussioncomment-13175298
2. Scatter Chart - https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/518
4. Split Bar chart - https://stackoverflow.com/questions/78027876/how-can-i-draw-the-split-the-chart-in-rn-project
5. Range Line chart - https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/652

## Known Issues

1. When using `adjustToWidth` along with `showLine` in Bar charts, the line gets shifted on adding a second chart on the screen.

## To-dos in documentation-

1. Prepare a doc for Line chart with negative values
2. Prepare a doc for gaps in data values https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/405 and https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/353
3. Prepare a doc for Line chart with y axis on right side
4. Prepare a doc for Line chart with gaps in the line https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/100
5. Prepare a doc for Bar chart combined with Line chart having a separate data for the Line chart
6. Prepare a doc for Line chart with smoothly scrolling data pointer and strip (along with pointerShiftX)
7. Prepare a doc for labelsPosition in Pie and Donut charts
8. Prepare a doc for adjustToWidth in Line and Area charts
9. Prepare a doc for xAxisLabelTexts and xAxisLabelTextStyle in Bar, Line And Area Charts
10. Prepare a doc for vertical lines to explain noOfVerticalLines and verticalLinesSpacing props. https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/205
11. Prepare a doc for negative marginBottom instead of marginTop for x axis labels. https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/190
12. Add about endSpacing in docs

## Architecture Enhancement

1. ~~Make it compliant with React js~~ **DONE**
2. ~~Write Screenshott tests for more example charts (snapshot tests for some charts are already written)~~ **DONE**
