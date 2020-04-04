// define width and height
var width = 1000,
    height = 800;



// create SVG
var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);


d3.json("data/nzmap.json", function (error, nz) {
    console.log(topojson.feature(nz, nz.objects.nzdistricts));
    if (error) return console.error(error);

    // project nz map into large scale
    var projection = d3.geo.mercator()
        .scale(2600)
        .translate([-width * 7.5, -height * 2]);

    var path = d3.geo.path()
        .projection(projection);

    
    
    var subunits = topojson.feature(nz, nz.objects.nzdistricts);
   
    svg.append("path").datum(subunits).attr("d", path);

    svg.selectAll(".subunit")
        .data(subunits.features)
        .enter().append("path")
        .attr("class", function (d) {
            //console.log("subunit " +d)
            return "subunit " + d.properties.id;
        })
        .attr("d", path);

    svg.selectAll(".subunit-label")
        .data(subunits.features)
        .enter().append("text")
        .attr("class", function (d) { return "subunit-label " + d.id; })
        .attr("transform", function (d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function (d) { return d.properties.name; });

});

