import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

if (document.getElementById("chartdiv")) {
  am4core.useTheme(am4themes_animated);

  // Retrieving flights data for current user
  let flightsRaw = document.getElementById("flights");

  let flightsJSON = JSON.parse(flightsRaw.dataset.travels);

  let flightsLines = Object.values(
    flightsJSON.reduce((a, { flight_id, latitude, longitude, city }) => {
      if (!a[flight_id]) {
        a[flight_id] = { flight_id: flight_id, multiGeoLine: [] };
      }
      a[flight_id].multiGeoLine.push({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        city: city,
      });
      return a;
    }, {})
  );

  // Create map instance
  var chart = am4core.create("chartdiv", am4maps.MapChart);
  chart.geodata = am4geodata_worldLow;
  chart.projection = new am4maps.projections.Miller();

  // Create map polygon series
  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.useGeodata = true;
  polygonSeries.mapPolygons.template.fill = chart.colors
    .getIndex(0)
    .lighten(0.5);
  polygonSeries.mapPolygons.template.nonScalingStroke = true;
  polygonSeries.exclude = ["AQ"];

  // Add line bullets
  var cities = chart.series.push(new am4maps.MapImageSeries());
  cities.mapImages.template.nonScaling = true;

  var city = cities.mapImages.template.createChild(am4core.Circle);
  city.radius = 6;
  city.fill = chart.colors.getIndex(0).brighten(-0.2);
  city.strokeWidth = 2;
  city.stroke = am4core.color("#fff");

  function addCity(coords, title) {
    var city = cities.mapImages.create();
    city.latitude = coords.latitude;
    city.longitude = coords.longitude;
    city.tooltipText = title;
    return city;
  }

  // Add lines
  var lineSeries = chart.series.push(new am4maps.MapArcSeries());
  lineSeries.mapLines.template.line.strokeWidth = 2;
  lineSeries.mapLines.template.line.strokeOpacity = 0.5;
  lineSeries.mapLines.template.line.stroke = city.fill;
  lineSeries.mapLines.template.line.nonScalingStroke = true;
  lineSeries.mapLines.template.line.strokeDasharray = "1,1";
  lineSeries.zIndex = 10;

  var shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
  shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
  shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
  shadowLineSeries.mapLines.template.shortestDistance = false;
  shadowLineSeries.zIndex = 5;

  function addLine(from, to) {
    var line = lineSeries.mapLines.create();
    line.imagesToConnect = [from, to];
    line.line.controlPointDistance = -0.3;

    var shadowLine = shadowLineSeries.mapLines.create();
    shadowLine.imagesToConnect = [from, to];

    return line;
  }

  for (let flight of flightsLines) {
    addLine(
      addCity(flight.multiGeoLine[0], flight.multiGeoLine[0].city),
      addCity(flight.multiGeoLine[1], flight.multiGeoLine[1].city)
    );
  }

  // Add plane
  var plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
  plane.position = 0;
  plane.width = 48;
  plane.height = 48;

  plane.adapter.add("scale", function (scale, target) {
    return 0.5 * (1 - Math.abs(0.5 - target.position));
  });

  var planeImage = plane.createChild(am4core.Sprite);
  planeImage.scale = 0.18;
  planeImage.horizontalCenter = "middle";
  planeImage.verticalCenter = "middle";
  planeImage.path =
    "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
  planeImage.fill = chart.colors.getIndex(2).brighten(-0.2);
  planeImage.strokeOpacity = 0;

  var shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
  shadowPlane.position = 0;
  shadowPlane.width = 48;
  shadowPlane.height = 48;

  var shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
  shadowPlaneImage.scale = 0.12;
  shadowPlaneImage.horizontalCenter = "middle";
  shadowPlaneImage.verticalCenter = "middle";
  shadowPlaneImage.path =
    "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
  shadowPlaneImage.fill = am4core.color("#000");
  shadowPlaneImage.strokeOpacity = 0;

  shadowPlane.adapter.add("scale", function (scale, target) {
    target.opacity = 0.6 - Math.abs(0.5 - target.position);
    return 0.5 - 0.3 * (1 - Math.abs(0.5 - target.position));
  });

  // Plane animation
  var currentLine = 0;
  var direction = 1;
  function flyPlane() {
    // Get current line to attach plane to
    plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
    plane.parent = lineSeries;
    shadowPlane.mapLine = shadowLineSeries.mapLines.getIndex(currentLine);
    shadowPlane.parent = shadowLineSeries;
    shadowPlaneImage.rotation = planeImage.rotation;

    // Set up animation
    var from, to;
    var numLines = lineSeries.mapLines.length;
    if (direction == 1) {
      from = 0;
      to = 1;
      if (planeImage.rotation != 0) {
        planeImage
          .animate({ to: 0, property: "rotation" }, 1000)
          .events.on("animationended", flyPlane);
        return;
      }
    } else {
      from = 1;
      to = 0;
      if (planeImage.rotation != 180) {
        planeImage
          .animate({ to: 180, property: "rotation" }, 1000)
          .events.on("animationended", flyPlane);
        return;
      }
    }

    // Start the animation
    var animation = plane.animate(
      {
        from: from,
        to: to,
        property: "position",
      },
      5000,
      am4core.ease.sinInOut
    );
    animation.events.on("animationended", flyPlane);
    /*animation.events.on("animationprogress", function(ev) {
      var progress = Math.abs(ev.progress - 0.5);
      //console.log(progress);
      //planeImage.scale += 0.2;
    });*/

    shadowPlane.animate(
      {
        from: from,
        to: to,
        property: "position",
      },
      5000,
      am4core.ease.sinInOut
    );

    // Increment line, or reverse the direction
    currentLine += direction;
    if (currentLine < 0) {
      currentLine = 0;
      direction = 1;
    } else if (currentLine + 1 > numLines) {
      currentLine = numLines - 1;
      direction = -1;
    }
  }

  $(function () {
    // We make the plane fly when window is loaded
    flyPlane();
    
    $("#dropdownBtn").on("click", function () {
      $("#collapseIcon").toggleClass("fa-arrow-up-animated");
    });
  });
}
