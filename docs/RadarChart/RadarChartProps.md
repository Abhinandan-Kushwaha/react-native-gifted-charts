# Radar Chart Props

| Prop                     | Type             | Description | Default value |
| ------------------------ | ---------------- | ----------- | ------------- |
| circular                 | boolean          |             | false         |
| gridConfig               | GridConfig       |             |               |
| data                     | number[]         |             | []            |
| maxValue                 | number           |             | 4             |
| noOfSections             | number           |             |               |
| chartSize                | number           |             |               |
| labelConfig              | LabelConfig      |             |               |
| labelConfigArray         | LabelConfig[]    |             |               |
| labels                   | string[]         |             |               |
| dataLabels               | string[]         |             |               |
| dataLabelConfig          | LabelConfig      |             |               |
| dataLabelConfigArray     | LabelConfig[]    |             |               |
| showdataValuesAsLabels   | boolean          |             |               |
| polygonConfig            | PolygonConfig    |             |               |
| asterLinesConfig         | AsterLinesConfig |             |               |
| hideAsterLines           | boolean          |             |               |
| hideGrid                 | boolean          |             |               |
| hideLabels               | boolean          |             |               |
| dataLabelsConfig         | LabelConfig      |             |               |
| labelsPositionOffset     | number           |             | 5             |
| dataLabelsPositionOffset | number           |             | 5             |

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
