# Radar Chart Props

| Prop                     | Type             | Description                                                                      | Default value |
| ------------------------ | ---------------- | -------------------------------------------------------------------------------- | ------------- |
| circular                 | boolean          |                                                                                  | false         |
| gridConfig               | GridConfig       |                                                                                  |               |
| data                     | number[]         |                                                                                  | []            |
| maxValue                 | number           | maximum data value that the radar chart can render                               | max(...data)  |
| noOfSections             | number           | number of cocentric polygons/circle that depict the number of levels in the grid | 4             |
| chartSize                | number           | size of the chart                                                                | 300           |
| labelConfig              | LabelConfig      |                                                                                  |               |
| labelConfigArray         | LabelConfig[]    |                                                                                  |               |
| labels                   | string[]         |                                                                                  |               |
| dataLabels               | string[]         | label texts at the polygon vertices                                              |               |
| dataLabelsConfigArray    | LabelConfig[]    |                                                                                  |               |
| showdataValuesAsLabels   | boolean          |                                                                                  |               |
| polygonConfig            | PolygonConfig    |                                                                                  |               |
| asterLinesConfig         | AsterLinesConfig |                                                                                  |               |
| hideAsterLines           | boolean          |                                                                                  |               |
| hideGrid                 | boolean          |                                                                                  |               |
| hideLabels               | boolean          |                                                                                  |               |
| dataLabelsConfig         | LabelConfig      |                                                                                  |               |
| labelsPositionOffset     | number           |                                                                                  | 5             |
| dataLabelsPositionOffset | number           |                                                                                  | 5             |
| isAnimated               | boolean          |                                                                                  | false         |
| animationDuration        | number           |                                                                                  | 800           |
| animateTogether          | boolean          |                                                                                  | false         |
| startAngle               | number           | Angle in degrees from the horizontal (X-axis) for the first item                 | 0             |
| isClockWise              | boolean          | Whether the angles move in clockwise direction (default is anti-clock)           | false         | 

### GridConfig

```ts
type GridConfig = {
  stroke?: string;
  strokeWidth?: number;
  strokeDashArray?: number[];
  fill?: string;
  gradientColor?: string;
  showGradient?: boolean;
  opacity?: number;
  gradientOpacity?: number;
  gridSections?: GridSectionConfig[]; // GridSectionConfig is defined below
};
```

#### GridSectionConfig

```ts
type GridSectionConfig = {
  stroke?: string;
  strokeWidth?: number;
  strokeDashArray?: number[];
  fill?: string;
  gradientColor?: string;
  showGradient?: boolean;
  opacity?: number;
  gradientOpacity?: number;
};
```

### LabelConfig

```ts
type LabelConfig = {
  fontSize?: number;
  stroke?: string;
  textAnchor?: string;
  alignmentBaseline?: string;
  fontWeight?: string;
  fontFamily?: string;
};
```

### PolygonConfig

```ts
type PolygonConfig = {
  stroke?: string;
  strokeWidth?: number;
  strokeDashArray?: number[];
  fill?: string;
  gradientColor?: string;
  showGradient?: boolean;
  opacity?: number;
  gradientOpacity?: number;
  showDataValuesAsLabels?: boolean;
  isAnimated?: boolean;
  animationDuration?: number;
};
```

### AsterLinesConfig

```ts
type AsterLinesConfig = {
  stroke?: string;
  strokeWidth?: number;
  strokeDashArray?: number[];
};
```
