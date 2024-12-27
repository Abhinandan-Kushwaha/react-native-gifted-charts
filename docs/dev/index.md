## Introduction

```
Simplicity is the key to elegance.
```

Gifted-charts is popular mainly because it offers great charting power in a **simple** and **intuitive** manner. The components exposed by the library are just like any React-native element accepting props for customisation.<br />

It has a refined fusion of native UI elements and SVG, harnessing seamless animations and interactions from native components while employing SVG for chart rendering.
Complex charts with enormous features and interactions can be built using this library with great ease.

## [Gifted charts core](https://github.com/Abhinandan-Kushwaha/gifted-charts-core)

It contains mathematical logic and type definitions for gifted-charts.

### Why a separate library to handle maths and types?

To answer this, let me walk through the origin and evolution of react-native-gifted-charts. <br /> <br />
Gifted Charts originated as an experimental proof of concept (POC) aimed at crafting charts for React Native with specific features that were not viable using contemporary libraries. The library garnered praise from the developer community for its simplicity and extensive customization capabilities. The influx of feature requests and suggestions from enthusiastic developers contributed to the library's evolution into one of the most robust charting tools in React Native. <br />

Soon, the community expressed a clear desire to extend the library's compatibility to ReactJS for web applications, marking the inception of the next chapter: [react-gifted-charts](https://github.com/Abhinandan-Kushwaha/react-gifted-charts).

To leverage the existing infrastructure and logic from _react-native-gifted-charts_, I abstracted the mathematical and logical components into a separate library named [gifted-charts-core](https://www.npmjs.com/package/gifted-charts-core). This core functionality could now serve both React and React Native environments. Additionally, I ensured that the code for rendering charts on the web should be the same as that of mobile applications.

!['Gifted-charts architecture'](gifted-charts-architecture.drawio.svg)

### Design docs of different chart components- 

1. **[Bar Chart](BarChart/index.md)**
2. **[Line Chart](LineChart/index.md)**
2. **[Pie Chart](PieChart/index.md)**
