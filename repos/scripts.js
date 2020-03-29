// define width and height
var width = 900,
    height = 500;


// create SVG
var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

// set the scale of map
var sc = Math.min(width, height) 
console.log(width, height,sc);
console.log([sc,0])
// define projection
var projection = d3.geo.equirectangular()
.scale(sc*2)
    .translate([width-500,height-900])
    .rotate([-180,0])
    .precision(100);

// translate to screen coordinates
var path = d3.geo.path()
    .projection(projection);

// path generater
svg.append("path")
    .datum(topojson.object(worldtopo, worldtopo.objects.land))
    .attr("class", "land")
    .attr("d", path);
svg.append("path")
    .datum(topojson.mesh(worldtopo, worldtopo.objects.countries, function (a, b) { return a.id !== b.id; }))
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

// add states from topojson
console.log(topojson.objects)
states = topojson.feature(topojson, topojson.objects.states).features
svg.selectAll("path")
    .data(states).enter()
    .append("path")
    .attr("class", "feature")
    .style("fill", "steelblue")
    .attr("d", path);

// put boarder around states 
svg.append("path")
    .datum(topojson.mesh(topojson, topojson.objects.states, function (a, b) { return a !== b; }))
    .attr("class", "mesh")
    .attr("d", path);

// add circles to svg
svg.selectAll("circle")
    .data([aa, bb]).enter()
    .append("circle")
    .attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
    .attr("cy", function (d) { return projection(d)[1]; })
    .attr("r", "8px")
    .attr("fill", "red")