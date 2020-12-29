import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

// Create chart instance
let map = am4core.create("chartdiv", am4maps.MapChart);

map.geodata = am4geodata_worldLow;

map.projection = new am4maps.projections.Miller();

// Defining polygon series
let polygonSeries = new am4maps.MapPolygonSeries();
polygonSeries.useGeodata = true;
map.series.push(polygonSeries);
// Excluding Antarctica from Map
polygonSeries.exclude = ["AQ"];

// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.fill = am4core.color("#F28A48");

// Create hover state and set alternative fill color
let hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#cc743d");

// Create image series
var imageSeries = map.series.push(new am4maps.MapImageSeries());
// Create a circle image in image series template so it gets replicated to all new images
var imageSeriesTemplate = imageSeries.mapImages.template;
var circle = imageSeriesTemplate.createChild(am4core.Circle);
circle.radius = 8;
circle.fill = am4core.color("#e03e96");
circle.stroke = am4core.color("#FFFFFF");
circle.strokeWidth = 3;
circle.nonScaling = true;
circle.tooltipText = "{title}";

// Creating lines
let lineSeries = map.series.push(new am4maps.MapLineSeries());
lineSeries.mapLines.template.strokeWidth = 4;

// Retrieving flights data for current user
let flightsRaw = document.getElementById('flights');
let flightsJSON = JSON.parse(flightsRaw.dataset.travels);
console.log('%c My flights :','color:orange;')
console.table(flightsJSON);

lineSeries.data = [{
  "multiGeoLine": [
    [
      { "latitude": 48.856614, "longitude": 2.352222 },
      { "latitude": 40.712775, "longitude": -74.005973 },
      { "latitude": 49.282729, "longitude": -123.120738 }
    ]
  ]
}];
lineSeries.mapLines.template.stroke = am4core.color("#e03e96");
