# react-native-gifted-charts

The most complete library for Bar, Line, Area, Pie, and Donut charts in React Native. Allows 2D, 3D, gradient, animations and live data updates.

![alt text](/demos/line.gif)
![alt text](/demos/area.gif)
![alt text](/demos/movingBars.gif)

## Installation

```sh
npm install react-native-gifted-charts
```

## Usage

The simplest usage of various types of charts can be done as below-

```js
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

// ...
const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

<BarChart data = {data} />
<LineChart data = {data} />
<PieChart data = {PieChart} />

// For Horizontal Bar chart, just add the prop horizontal to the <BarChart/> component
<BarChart data = {data} horizontal />

// For Area chart, just add the prop areaChart to the <LineChart/> component
<LineChart data = {data} areaChart />

// For Donut chart, just add the prop donut to the <PieChart/> component
<PieChart data = {data} donut />
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
