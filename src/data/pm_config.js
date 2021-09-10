export default {
  visState: {
    filters: [
      {
        dataId: ["pm_map"],
        id: "0abli7ypl",
        name: ["value"],
        type: "range",
        value: [6, 70.28],
        enlarged: false,
        plotType: "histogram",
        animationWindow: "free",
        yAxis: null,
        speed: 1,
      },
    ],
    layers: [
      {
        id: "liudcw",
        type: "point",
        config: {
          dataId: "pm_map",
          label: "Point",
          color: [23, 184, 190],
          highlightColor: [252, 242, 26, 255],
          columns: {
            lat: "lat",
            lng: "lng",
            altitude: null,
          },
          isVisible: true,
          visConfig: {
            radius: 8,
            fixedRadius: false,
            opacity: 0.8,
            outline: false,
            thickness: 2,
            strokeColor: null,
            colorRange: {
              name: "ColorBrewer Greys-6",
              type: "singlehue",
              category: "ColorBrewer",
              colors: [
                "#f7f7f7",
                "#d9d9d9",
                "#bdbdbd",
                "#969696",
                "#636363",
                "#252525",
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
      {
        id: "r0spgd",
        type: "heatmap",
        config: {
          dataId: "pm_map",
          label: "Heatmap",
          color: [246, 209, 138],
          highlightColor: [252, 242, 26, 255],
          columns: {
            lat: "lat",
            lng: "lng",
          },
          isVisible: true,
          visConfig: {
            opacity: 0.8,
            colorRange: {
              name: "ColorBrewer Greys-6",
              type: "singlehue",
              category: "ColorBrewer",
              colors: [
                "#f7f7f7",
                "#d9d9d9",
                "#bdbdbd",
                "#969696",
                "#636363",
                "#252525",
              ],
            },
            radius: 40.9,
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
          weightField: {
            name: "value",
            type: "real",
          },
          weightScale: "linear",
        },
      },
    ],
    interactionConfig: {
      tooltip: {
        fieldsToShow: {
          pm_map: [
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
    bearing: 0,
    dragRotate: false,
    latitude: 51.96237230299253,
    longitude: 7.607026888854025,
    pitch: 0,
    zoom: 14,
    isSplit: false,
  },
  mapStyle: {
    styleType: "dark",
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
      9.665468314072013, 17.18305478057247, 31.1442867897876,
    ],
    mapStyles: {},
  },
};
