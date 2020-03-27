// define width and height
var width = $(window).width(),
    height = $(window).height();
// create SVG
var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

// set the scale of map
var sc = Math.min(width,height) * 0.5

// define projection
var projection = d3.geo.equirectangular()
        .scale(2000) // scales your map
        .translate([width-7000 , -1000]); // centers in SVG

// translate to screen coordinates
var path = d3.geo.path()
    .projection(projection);

// path generater
svg.append("path")
.datum(topojson.object(worldtopo, worldtopo.objects.land))
.attr("class", "land")
.attr("d", path);
svg.append("path")
.datum(topojson.mesh(worldtopo, worldtopo.objects.countries, function(a, b) { return a.id !== b.id; }))
.attr("class", "boundary")
.attr("d", path);

// add graticule
var graticule = d3.geo.graticule();

  svg.append("g")
    .selectAll("path")
    .data(graticule.lines)
    .enter().append("path")
    .attr("d", path)
    .attr("class", "graticule");