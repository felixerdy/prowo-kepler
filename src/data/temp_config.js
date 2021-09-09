export default {
  visState: {
    filters: [],
    layers: [
      {
        id: "a5wrylf",
        type: "grid",
        config: {
          dataId: "temp_map",
          label: "Grid Layer",
          color: [183, 136, 94],
          highlightColor: [252, 242, 26, 255],
          columns: {
            lat: "lat",
            lng: "lng",
          },
          isVisible: true,
          visConfig: {
            opacity: 0.5,
            worldUnitSize: 0.5,
            colorRange: {
              name: "ColorBrewer OrRd-6",
              type: "sequential",
              category: "ColorBrewer",
              colors: [
                "#fef0d9",
                "#fdd49e",
                "#fdbb84",
                "#fc8d59",
                "#e34a33",
                "#b30000",
              ],
            },
            coverage: 1,
            sizeRange: [0, 500],
            percentile: [0, 100],
            elevationPercentile: [0, 100],
            elevationScale: 5,
            enableElevationZoomFactor: true,
            colorAggregation: "average",
            sizeAggregation: "count",
            enable3d: true,
          },
          hidden: false,
          textLabel: [
            {
              field: null,
              color: [255, 255, 255],
              size: 18,
              offset: [0, 0],
              anchor: "start",
              alignment: "center",
            },
          ],
        },
        visualChannels: {
          colorField: {
            name: "value",
            type: "real",
          },
          colorScale: "quantile",
          sizeField: null,
          sizeScale: "linear",
        },
      },
      {
        id: "yh2no6p",
        type: "point",
        config: {
          dataId: "temp_map",
          label: "Point",
          color: [246, 209, 138],
          highlightColor: [252, 242, 26, 255],
          columns: {
            lat: "lat",
            lng: "lng",
            altitude: null,
          },
          isVisible: true,
          visConfig: {
            radius: 10,
            fixedRadius: false,
            opacity: 0.8,
            outline: false,
            thickness: 2,
            strokeColor: null,
            colorRange: {
              name: "ColorBrewer OrRd-6",
              type: "sequential",
              category: "ColorBrewer",
              colors: [
                "#fef0d9",
                "#fdd49e",
                "#fdbb84",
                "#fc8d59",
                "#e34a33",
                "#b30000",
              ],
            },
            strokeColorRange: {
              name: "Global Warming",
              type: "sequential",
              category: "Uber",
              colors: [
                "#5A1846",
                "#900C3F",
                "#C70039",
                "#E3611C",
                "#F1920E",
                "#FFC300",
              ],
            },
            radiusRange: [0, 50],
            filled: true,
          },
          hidden: false,
          textLabel: [
            {
              field: null,
              color: [255, 255, 255],
              size: 18,
              offset: [0, 0],
              anchor: "start",
              alignment: "center",
            },
          ],
        },
        visualChannels: {
          colorField: {
            name: "value",
            type: "real",
          },
          colorScale: "quantile",
          strokeColorField: null,
          strokeColorScale: "quantile",
          sizeField: null,
          sizeScale: "linear",
        },
      },
    ],
    interactionConfig: {
      tooltip: {
        fieldsToShow: {
          temp_map: [
            {
              name: "name",
              format: null,
            },
            {
              name: "timestamp",
              format: null,
            },
            {
              name: "value",
              format: null,
            },
          ],
        },
        compareMode: false,
        compareType: "absolute",
        enabled: true,
      },
      brush: {
        size: 0.5,
        enabled: false,
      },
      geocoder: {
        enabled: false,
      },
      coordinate: {
        enabled: false,
      },
    },
    layerBlending: "normal",
    splitMaps: [],
    animationConfig: {
      currentTime: null,
      speed: 1,
    },
  },
  mapState: {
    bearing: -40.678456591639865,
    dragRotate: true,
    latitude: 51.96571186316258,
    longitude: 7.604809704350621,
    pitch: 42.919000002012815,
    zoom: 10,
    isSplit: false,
  },
  mapStyle: {
    styleType: "light",
    topLayerGroups: {},
    visibleLayerGroups: {
      label: true,
      road: true,
      border: false,
      building: true,
      water: true,
      land: true,
      "3d building": false,
    },
    threeDBuildingColor: [
      218.82023004728686, 223.47597962276103, 223.47597962276103,
    ],
    mapStyles: {},
  },
};
