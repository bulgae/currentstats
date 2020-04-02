// define width and height
var width = 1000,
    height = 800;



// create SVG
var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);


d3.json("data/nz.json", function (error, nz) {
    if (error) return console.error(error);

    // project nz map into large scale
    var projection = d3.geo.mercator()
        .scale(2600)
        .translate([-width * 7.5, -height * 2]);

    var path = d3.geo.path()
        .projection(projection);

    var subunits = topojson.feature(nz, nz.objects.subunits);
    //svg.append("path")
    //    .datum(subunits)
    //   .attr("d", path);

    console.log('objects');
    console.log(nz.objects);

    svg.selectAll(".subunit")
        .data(subunits.features)
        .enter().append("path")
        .attr("class", function (d) {
            //console.log("subunit " +d)
            return "subunit " + d.properties.SU_A3;
        })
        .attr("d", path);

    var places = topojson.feature(nz, nz.objects.places);

    svg.append("path")
        .datum(places)
        .attr("d", path)
        .attr("class", "place");

    //console.log(places)

    svg.selectAll(".place-label")
        .data(places.features)
        .enter().append("text").attr('font-size', '10')
        .attr("class", "place-label")
        .attr("transform", function (d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
        .attr("dy", ".20em")
        .text(function (d) { //console.log(d.properties)
            return d.properties.NAME;
        });

    svg.selectAll(".place-label")
        .attr("x", function (d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
        .style("text-anchor", function (d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; });

    svg.selectAll(".subunit-label")
        .data(subunits.features)
        .enter().append("text")
        .attr("class", function (d) { return "subunit-label " + d.id; })
        .attr("transform", function (d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function (d) { return d.properties.NAME_LONG; });

});



/*
// set the scale of map
var sc = Math.min(width, height)
console.log(width, height, sc);
console.log([sc, 0])
// define projection
var projection = d3.geo.equirectangular()
    .scale(sc * 2)
    .translate([width - 500, height - 900])
    .rotate([-180, 0])
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
    .attr("fill", "red")*/