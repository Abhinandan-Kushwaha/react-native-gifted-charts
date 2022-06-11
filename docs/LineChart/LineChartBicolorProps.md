## LineChartBicolor

Some Line / Area charts have different colors for their positive and negative parts. For example, this chart is colored green above the X axis and red below -

<img src='https://user-images.githubusercontent.com/13629606/172202911-920aefa7-1a78-4e5e-91d5-d3670e00fe45.png' alt=''/>

To render such charts, we can use the `<LineChartBicolor>` component. Curved lines are not yet supported in such charts. Also, we can only render a single data set (multiple lines not yet supported). However, props like `areaChart`, `isAnimated` etc are supported.

This chart supports most of the props from the `<LineChart>` component. (excluding those which might request for unsupported features, like - `curved`, `data2`, `data3`, `color2`, `color3` etc).

The props like-

1. color
2. startFillColor
3. endFillColor
4. startOpacity
5. endOpacity

represent the properties of the chart portion lying above the X axis.

The respective properties of the chart portion lying below the X axis are obtained by appending the suffix `Negative` to the prop names. Hence the prop name for the portion below the X axis become -


1. colorNegative
2. startFillColorNegative
3. endFillColorNegative
4. startOpacityNegative
5. endOpacityNegative
