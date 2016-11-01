var dashboard1 = (function () {

    "use strict";

    // Currently selected dashboard values
    var chart1,
        chart2,
        selectedContinent = "Africa";
	var cont;
   
 
	
	//Pie render
	function createContinentChart(selector, dataset) {
	
        var width = 490,
            height = 260,
            radius = Math.min(width, height) / 2,

            color = d3.scale.category10(),

            pie = d3.layout.pie()
                .value(function (d) {
					//console.log(d.y);
                    return d.y;
                })
                .sort(null),

            arc = d3.svg.arc()
                .innerRadius(radius - 80)
                .outerRadius(radius - 20),

            svg = d3.select(selector + " .graph").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),

            path = svg.datum(dataset['data']).selectAll("path")
                .data(pie)
                .enter().append("path")
                .attr("fill", function (d, i) {
                    return color(i);
                })
                .attr("d", arc)
                .each(function (d) {
					console.log(d);
                    this._selected = d['data'].x;
                }).on("click", countrySelectionHandler), 

            legend = d3.select(selector).append("svg")
                .attr("class", "vertical-legend")
                .attr("width", radius*2)
                .attr("height", radius*2)
                .selectAll("g")
                .data(color.domain().slice().reverse())
                .enter().append("g")
                .attr("transform", function (d, i) {
                    return "translate(20,"+(i+1)*20+")";
                });

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        legend.append("text")
            .attr("x", 40)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function (d) {
                return dataset['data'][d].x + ' (' + dataset['data'][d].y + ')';
            });

        function change(dataset) {
            svg.datum(dataset['data']);
            path = path.data(pie); // compute the new angles
            path.transition().duration(500).attrTween("d", arcTween); // redraw the arcs
            legend.select('text').text(function (d) {
                return dataset['data'][d].x+ ' (' + dataset['data'][d].y + ')';
            });
        }

        function arcTween(a) {
            var i = d3.interpolate(this._selected, a);
            this._selected = i(0);
            return function (t) {
                return arc(i(t));
            };
        }

        return {
            change: change
        };

    }
	function countrySelectionHandler(d){
		var selectedContinent = d['data'].x;
		console.log(selectedContinent);
		//console.log(cont['countries']);
		
		var data = {
            "xScale": "ordinal",
            "yScale": "linear",
            "type": "bar",
            "main": getCountryPopulation(selectedContinent)
        };
        $('#chart2>.title').html('Population by Country in ' + selectedContinent);
        chart2.setData(data);
	}
	
	

    /* Functions to transform/format the data as required by specific charts */

    function getCountryPopulation(continent) {
        var result = [];
		var z=0;
		console.log('-----------------start-------------------------');
		for(var i=0;i<cont['countries'].length&&z<4;i++){
			if(cont['countries'][i].Continent===continent){				
				console.log(z+" "+cont['countries'][i].Name+"    "+cont['countries'][i].Population);
				result.push({x: cont['countries'][i].Name, y: cont['countries'][i].Population});
				z++;
			}
		}
        console.log('-------------------FIN-----------------------');
            
        return [
            {
                "className": ".country",
                "data": result
            }
        ]
    }
	
	function createCountryChart(selector, dataset) {

        var data = {
                "xScale": "ordinal",
                "yScale": "linear",
                "type": "bar",
                "main": dataset
            },

            options = {
                "axisPaddingLeft": 0,
                "axisPaddingTop": 5,
                "paddingLeft": 20,
                "yMin": 6,
                "yMax": 1277559000
            };

        return new xChart('bar', data, selector + " .graph", options);

    }
    /* Render the dashboard */

    function render() {

        var html ='<div id="chart1" class="chart chart2">' +
                '<div class="title">Continent Population</div>' +
                '<div class="graph"></div>' +
                '</div>'+
		'<div id="chart2" class="chart">' +
                '<div class="title">Country Population</div>' +
                '<div class="graph"></div>' +
                '</div>' ;

        $("#content").html(html);
		
		$.ajax({
					url: 'http://localhost:8081/population-dashboard/api/continent',
					type : 'GET',
					data: null,
					dataType : "json",
					success : function(data,response) {
							cont = data;
							console.log(cont);
							
							chart1 = createContinentChart('#chart1', cont);
							chart2 = createCountryChart('#chart2', getCountryPopulation(selectedContinent));
    
					}, 
					error : function(jqXHR, textStatus, errorThrown) {
							console.log(errorThrown+'   :: '+textStatus);
							return cont;
					}
			});
        
		
    }
	
    return {
        render: render
    }

}());