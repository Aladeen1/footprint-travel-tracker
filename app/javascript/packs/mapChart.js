import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

if(document.getElementById("chartdiv")) {


  // Retrieving flights data for current user
  let flightsRaw = document.getElementById('flights');

  let flightsJSON = JSON.parse(flightsRaw.dataset.travels);

  console.log(flightsJSON);

  let flightsPoints = flightsJSON.map(e => {
    return {longitude: parseInt(e.longitude), latitude: parseInt(e.latitude), city: e.city }
  });

  let flightsLines = Object.values(flightsJSON.reduce((a, {flight_id, latitude, longitude}) => {
    if(!a[flight_id]) {
      a[flight_id] = {flight_id: flight_id, multiGeoLine: [[]]}
    }
    a[flight_id].multiGeoLine[0].push({latitude: latitude, longitude: longitude});
    return a;
  },{}));

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
  circle.tooltipText = "{city}";


  // Set property fields
  imageSeriesTemplate.propertyFields.latitude = "latitude";
  imageSeriesTemplate.propertyFields.longitude = "longitude";
  imageSeriesTemplate.tooltipText = "{city}";


  imageSeries.data = flightsPoints;

  // Creating lines
  let lineSeries = map.series.push(new am4maps.MapLineSeries());
  lineSeries.mapLines.template.strokeWidth = 4;

  lineSeries.data = flightsLines;

  lineSeries.mapLines.template.stroke = am4core.color("#e03e96");
}