// filter buttons
const filterButtons = Array.from(document.querySelectorAll(".button"));
var activeButtonIndex = 0;
//console.log(filterButtons);

//svg
var margin2 = {top: 20, right: 10, bottom: 30, left: 20},
    width2 = 1100 - margin2.left - margin2.right,
    height = 600 - margin2.top - margin2.bottom;

// add the graph canvas to the body of the webpage
var svg = d3.select("#bubble-chart").append("svg")
    .attr("width", width2 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// load data
d3.csv("merged_data_v2.csv", function(error, data) {
  filterButtons.forEach(function(button) {
    button.addEventListener('click', filter.bind(button));
  })
    var processed_data = [];

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d.Control = +d.Control;
    if (d.Control == 3) {
      d.Control = 2;
    }
    d['C1004'] = (+d['C1004'] * 100).toFixed(2);
    d['C1504White'] = (+d['C1504White'] * 100).toFixed(2);
    d['C1504Black'] = (+d['C1504Black'] * 100).toFixed(2);
    d['C1504Hisp'] = (+d['C1504Hisp'] * 100).toFixed(2);
    d['C1504Asian'] = (+d['C1504Asian'] * 100).toFixed(2);
    d['C1504Aian'] = (+d['C1504Aian'] * 100).toFixed(2);
    d['C1504Nhpi'] = (+d['C1504Nhpi'] * 100).toFixed(2);
    d['Faminc'] = +d['Faminc'];
    // filter out null data
    if (d['Control'] != 0 && d['Faminc'] != 0)  {
      // binned Income
      var inc = d['Faminc'];
      if (inc >= 0 && inc < 30001)  { d['Binned inc'] = 1; }
      else if (inc >= 30001 && inc < 75001)  { d['Binned inc'] = 2.5; }
      else if (inc >= 75001)  { d['Binned inc'] = 4; }
      processed_data.push(d);
    }
  });

  data = processed_data;

  function filter(button) {
      const filterBy = button.target.id;
      const buttonClicked = button.target
      filterButtons[activeButtonIndex].classList.remove("active");
      activeButtonIndex = filterButtons.indexOf(buttonClicked);
      buttonClicked.classList.add("active");

      switch(filterBy) {
          case "all":
              console.log("all");
              removeData();
              loadData('C1004');
              break;
          case "white":
              console.log("white");
              removeData();
              loadData('C1504White');
              break;
          case "black":
              console.log("black");
              removeData();
              loadData('C1504Black');
              break;
          case "hispanic":
              console.log("hispanic");
              removeData();
              loadData('C1504Hisp');
              break;
          case "asian":
              console.log("asian");
              removeData();
              loadData('C1504Asian');
              break;
          case "aian":
              console.log("Aian");
              removeData();
              loadData('C1504Aian');
              break;
          case "nhpi":
              console.log("Nhpi");
              removeData();
              loadData('C1504Nhpi');
              break;
      }
  }

    function removeData() {
        // svg.selectAll(".dot").remove();
    }

    function loadData(variable) {

        var xMap = function(d) { return xScale(d[variable]);}
        var yMap = function(d) { return yScale(d['Binned inc'] + Math.random());}

        svg.selectAll(".dot")
            .transition()
            .duration(1000)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", function(d) {
              if (d[variable] == 0) { return ('#808080');}
              return color(cValue(d));
            })
    }

  // setup fill color
  var cValue = function(d) { return d['Control'];},
      color = d3.scaleOrdinal()
                    .domain([1,2])
                    .range(['#FF8264','#7647a2']);

  // setup x
  var xValue = function(d) { return d['C1004'];}, // data -> value
      xScale = d3.scaleLinear().range([0, width2]), // value -> display
      xMap = function(d) { return xScale(d['C1004']);}, // data -> display
      xAxis = d3.axisBottom(xScale).tickFormat(function(d) {
          if (d > 0) { return (d+ "%");}
          return ("N/A")
      });

  // setup y
  var yValue = function(d) { return d['Binned inc'];}, // data -> value
      yScale = d3.scaleLinear().range([height, 0]), // value -> display
      yMap = function(d) { return yScale(d['Binned inc'] + Math.random());}, // data -> display
      yAxis = d3.axisLeft(yScale).tickFormat(function(d) {
          if (d == 1.5) { return "0k - 30k";}
          else if (d == 3) { return "30k - 75k";}
          else if (d == 4.5) { return "75k+";}
      });

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1, 100+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
      svg.append("text")
      .attr("class", "label")
      .attr("transform", "translate(0," + height + ")")
      .attr("x", width2)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("First Year Completion Rate");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
      svg.append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", -70)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Avg. Family Income of Students");

      // draw dots
      svg.selectAll(".dot")
          .data(processed_data)
          .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", xMap)
          .attr("cy", yMap)
          .style("fill", function(d) {
            if (d['C1004'] == 0) { return ('#808080');}
            return color(cValue(d));
          })
          .on("mouseover", function(d) {
              tooltip.transition()
                   .duration(200)
                   .style("opacity", 1);
              tooltip.html("<b>" + d["InstitutionName"] + "</b><br>" +
              "Average family income: $" + d['Faminc']
              )
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
          })
          .on("mouseout", function(d) {
              tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
          });

  // draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 50 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width2 - 20)
      .attr("width", 14)
      .attr("height", 14)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width2)
      .attr("y", 24)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {
        if (d == 1) {
          return "Public";
        }
        else if (d == 2) {
          return "Private";
        }
      })
});
