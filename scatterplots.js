var dataRanked, dataScatter, rankedClicked, allData, brushedPoints;

$("#brushedSVG").hide();
$("#brushedSVG2").hide();

if ($('#checkRanked').is(':checked')) {
    rankedClicked = true;
    $(".alert").addClass('non_disp');

} else {
    rankedClicked = false;
    $(".alert").removeClass('non_disp');
}

$('.alert').alert();


var defaultDropdown = {
    xValueA: 'comp_black_perc',
    xLabelA: "Completion Rate Black students",
    yValueA: "national_rank_rev",
    yLabelA: "National Rank",
    xValueB: 'faculty_salary_usd',
    xLabelB: "Avg Faculty Salary",
    yValueB: "national_rank_rev",
    yLabelB: "National Rank"
};
var input_drop = defaultDropdown;

input_drop.yValueA = "national_rank_rev";
input_drop.yLabelA = "National Rank";
input_drop.xValueA = "admission";
input_drop.xLabelA = "Admission Rate";

input_drop.yValueB = "minority_perc";
input_drop.yLabelB = "Minority Percentages Excluding Asians";
input_drop.xValueB = "admission";
input_drop.xLabelB = "Admission Rate";


var rankedValMap = new Map();

var margin = {
        top: 20,
        right: 0,
        bottom: 50,
        left: 70
    },
    width = 500,
    height = 400,
    plot_dx = width - margin.right - margin.left,
    plot_dy = height - margin.top - margin.bottom;

var svgScatterA = d3.select("#scatterA")
    .append("svg")
    .attr("class", "svgA")
    .attr("width", width)
    .attr("height", height);

var svgScatterB = d3.select("#scatterB")
    .append("svg")
    .attr("class", "svgB")
    .attr("width", width)
    .attr("height", height);


$(document).on('click', '#checkRanked', function (element) {
    if ($('#checkRanked').is(':checked')) {
        rankedClicked = true;
        $(".alert").addClass('non_disp');

    } else {
        rankedClicked = false;
        $(".alert").removeClass('non_disp');

    }
    removeAllActive();
    dataRanked = getDataRankedSchools(allData, rankedClicked);
    getScatterPlots(dataRanked, input_drop, svgScatterA, false);
    getScatterPlots(dataRanked, input_drop, svgScatterB, false);
});

function activeA() {
    d3.select("#brushedSVG").select("svg").remove();
    d3.select("#brushedSVG2").select("svg").remove();
    removeAllActive();
    $(".figA").addClass("active-button");

    addAllNonActive();

    $(".figAtext").removeClass("nonActiveText");

}

function activeB() {
    d3.select("#brushedSVG").select("svg").remove();
    d3.select("#brushedSVG2").select("svg").remove();
    removeAllActive();
    $(".figB").addClass("active-button");

    addAllNonActive();

    $(".figBtext").removeClass("nonActiveText");
}

function activeC() {
    d3.select("#brushedSVG").select("svg").remove();
    d3.select("#brushedSVG2").select("svg").remove();
    removeAllActive();
    $(".figC").addClass("active-button");

    addAllNonActive();

    $(".figCtext").removeClass("nonActiveText");

}

function activeD() {
    d3.select("#brushedSVG").select("svg").remove();
    d3.select("#brushedSVG2").select("svg").remove();
    removeAllActive();
    $(".figD").addClass("active-button");

    addAllNonActive();

    $(".figDtext").removeClass("nonActiveText");
}

function activeE() {
    d3.select("#brushedSVG").select("svg").remove();
    d3.select("#brushedSVG2").select("svg").remove();
    removeAllActive();
    $(".figE").addClass("active-button");

    addAllNonActive();
    $(".figEtext").removeClass("nonActiveText");
}

function removeAllActive() {
    $(".figA").removeClass("active-button");
    $(".figC").removeClass("active-button");
    $(".figD").removeClass("active-button");
    $(".figB").removeClass("active-button");
    $(".figE").removeClass("active-button");

}

function addAllNonActive() {
    $(".figBtext").addClass("nonActiveText");
    $(".figCtext").addClass("nonActiveText");
    $(".figAtext").addClass("nonActiveText");
    $(".figDtext").addClass("nonActiveText");
    $(".figEtext").addClass("nonActiveText");

}

function toggleAlert() {
    $(".alert").toggleClass('non_disp');
    return false; // Keep close.bs.alert event from removing from DOM
}

function setDropdownA() {

    var namesA = rankedValMap.keys();
    var toAppend;
    for (var i = 0; i < rankedValMap.size; i++) {
        var element = namesA.next().value;
        if (element && element != "Institution Name" && element != "undefined")
            toAppend += " <a class=\"dropdown-item a-item\"  selected>" + element + "</a>";
    }
    $(".a-menu").append(toAppend);
    $(".a-button").append(defaultDropdown.xLabelA);
    removeAllActive();
}

function setDropdownB() {

    var namesB = rankedValMap.keys();
    var toAppend;
    for (var i = 0; i < rankedValMap.size; i++) {
        var element = namesB.next().value;
        if (element && element != "Institution Name")
            toAppend += " <a class=\"dropdown-item b-item\"  selected>" + element + "</a>";
    }
    $(".b-menu").append(toAppend);
    $(".b-button").append(defaultDropdown.yLabelA);
    removeAllActive();
}

function setDropdownC() {

    var namesC = rankedValMap.keys();
    var toAppend;
    for (var i = 0; i < rankedValMap.size; i++) {
        var element = namesC.next().value;
        if (element && element != "Institution Name")
            toAppend += " <a class=\"dropdown-item c-item\"  selected>" + element + "</a>";
    }
    $(".c-menu").append(toAppend);
    $(".c-button").append(defaultDropdown.xLabelB);
    removeAllActive();
}

function setDropdownD() {

    var namesD = rankedValMap.keys();
    var toAppend;
    for (var i = 0; i < rankedValMap.size; i++) {
        var element = namesD.next().value;
        if (element && element != "Institution Name")
            toAppend += " <a class=\"dropdown-item d-item\" selected>" + element + "</a>";
    }
    $(".d-menu").append(toAppend);
    $(".d-button").append(defaultDropdown.yLabelB);
    removeAllActive();
}



$(document).on('click', '.a-item', function (element) {
    var clicked = element.target.text;
    var value = rankedValMap.get(clicked);
    input_drop.xValueA = value;
    input_drop.xLabelA = clicked;
    // svgScatterA.selectAll("*").remove();

    $(".a-button").html(clicked);

    getScatterPlots(dataRanked, input_drop, svgScatterA, false);
});
$(document).on('click', '.b-item', function (element) {
    var clicked = element.target.text;
    var value = rankedValMap.get(clicked);
    input_drop.yValueA = value;
    input_drop.yLabelA = clicked;

    $(".b-button").html(clicked);

    getScatterPlots(dataRanked, input_drop, svgScatterA, false);
});
$(document).on('click', '.c-item', function (element) {
    var clicked = element.target.text;
    var value = rankedValMap.get(clicked);
    input_drop.xValueB = value;
    input_drop.xLabelB = clicked;

    $(".c-button").html(clicked);

    getScatterPlots(dataRanked, input_drop, svgScatterB, false);
});
$(document).on('click', '.d-item', function (element) {
    var clicked = element.target.text;
    var value = rankedValMap.get(clicked);
    input_drop.yValueB = value;
    input_drop.yLabelB = clicked;

    $(".d-button").html(clicked);

    getScatterPlots(dataRanked, input_drop, svgScatterB, false);
});

function setClickedText() {
    $(".a-button").html(input_drop.xLabelA);
    $(".b-button").html(input_drop.yLabelA);
    $(".d-button").html(input_drop.yLabelB);
    $(".c-button").html(input_drop.xLabelB);

}

$(document).on('click', '.figA', function (element) {

    input_drop.yValueA = "national_rank_rev";
    input_drop.yLabelA = "National Rank";
    input_drop.xValueA = "admission";
    input_drop.xLabelA = "Admission Rate";

    input_drop.yValueB = "minority_perc";
    input_drop.yLabelB = "Minority Percentages Excluding Asians";
    input_drop.xValueB = "admission";
    input_drop.xLabelB = "Admission Rate";

    activeA();
    setClickedText();
    //indicates less black undgrads may need financial aid?

    getScatterPlots(dataRanked, input_drop, svgScatterA, false);
    getScatterPlots(dataRanked, input_drop, svgScatterB, false);
});

$(document).on('click', '.figB', function (element) {

    bClick();
});
$(document).on('click', '.figBspan', function (element) {

    bClick();
});

function bClick() {

    input_drop.yValueB = "endowment_usd";
    input_drop.yLabelB = "College Endowment (USD)";
    input_drop.xValueB = "faculty_salary_usd";
    input_drop.xLabelB = "Average Faculty Salary";

    input_drop.yValueA = "faculty_qual_rev";
    input_drop.yLabelA = "Quality of Faculty";
    input_drop.xValueA = "faculty_salary_usd";
    input_drop.xLabelA = "Average Faculty Salary";
    activeB();
    setClickedText();

    getScatterPlots(dataRanked, input_drop, svgScatterA, false);
    getScatterPlots(dataRanked, input_drop, svgScatterB, false);
}
$(document).on('click', '.figC', function (element) {
    cClick();

});
$(document).on('click', '.figCspan', function (element) {
    cClick();

});

function cClick() {
    input_drop.yValueA = "faculty_qual_rev";
    input_drop.yLabelA = "Quality of Faculty";
    input_drop.xValueA = "education_qual_rev";
    input_drop.xLabelA = "Quality of Education";

    input_drop.yValueB = "alum_employment_rev";
    input_drop.yLabelB = "Ranking Alumni Employment";
    input_drop.xValueB = "education_qual_rev";
    input_drop.xLabelB = "Quality of Education";
    activeC();
    setClickedText();
    getScatterPlots(dataRanked, input_drop, svgScatterA, false);
    getScatterPlots(dataRanked, input_drop, svgScatterB, false);
}
$(document).on('click', '.figD', function (element) {
    dClick();

});
$(document).on('click', '.figDspan', function (element) {
    dClick();

});

function dClick() {

    input_drop.yValueA = "completion_rate_perc";
    input_drop.yLabelA = "Student College Completion Rate";
    input_drop.xValueA = "fed_grant_aid_perc";
    input_drop.xLabelA = "Percent of Undergrads Receiving Federal Grants";

    input_drop.yValueB = "alum_employment_rev";
    input_drop.yLabelB = "Ranking Alumni Employment";
    input_drop.xValueB = "fed_grant_aid_perc";
    input_drop.xLabelB = "Percent of Undergrads Receiving Federal Grants";

    activeD();
    setClickedText();

    getScatterPlots(dataRanked, input_drop, svgScatterA, false);
    getScatterPlots(dataRanked, input_drop, svgScatterB, false);
}

$(document).on('click', '.figE', function (element) {

    input_drop.yValueA = "avg_rpy_3yr_perc";
    input_drop.yLabelA = "Average 3YR Repayment Rate";
    input_drop.xValueA = "minority_perc";
    input_drop.xLabelA = "Minority Percentages Excluding Asians";

    input_drop.yValueB = "cost_school";
    input_drop.yLabelB = "Tuition Cost";
    input_drop.xValueB = "minority_perc";
    input_drop.xLabelB = "Minority Percentages Excluding Asians";

    activeE();
    setClickedText();

    getScatterPlots(dataRanked, input_drop, svgScatterA, false);
    getScatterPlots(dataRanked, input_drop, svgScatterB, false);
});

d3.csv("merged_data_v3.csv")
    .get(function (error, data) {

        //check for errors
        if (error) {
            console.log(error);
        }

        //parse rows with numbers

        var variables = data.columns;

        for (var i = 0; i < data.length; i++) {
            variables.forEach(function (d) {
                if (!isNaN(data[i][d])) {
                    data[i][d] = Number(data[i][d]);
                }

            })
        }

        //remove empty rows/rows that don't have diversity metrics
        data = data.filter(function (d) {


            if ((d.Year != 2015 && d.Year != "") || d.UgdsBlack == "") {
                return false;
            }
            return true;

        });

        //save data
        allData = data;
        if ($('#checkRanked').is(':checked')) {
            rankedClicked = true;

        } else {
            rankedClicked = false;
        }

        dataRanked = getDataRankedSchools(allData, rankedClicked);

        setDropdownA();
        setDropdownB();
        setDropdownC();
        setDropdownD();
        // console.log(allData);
        getScatterPlots(dataRanked, defaultDropdown, svgScatterA, true);
        getScatterPlots(dataRanked, defaultDropdown, svgScatterB, true);
        activeA();

    }); //end of csv reading

//returns an array of objects with selected data for nationally ranked schools
function getDataRankedSchools(dataAll, ranked) {

    //get only nationally ranked schools
    var data = dataAll;
    if (ranked) { //filter only if user indicates to filter
        data = data.filter(function (d) {

            if ((d.NationalRank) == "" || d.Year != "2015") {

                return false;
            }

            return true;

        });
    }
    //get only values that matter
    var dataScatter = [];

    rankedValMap.set("National Rank", "national_rank_rev");
    rankedValMap.set("Institution Name", "name");
    rankedValMap.set("Minority Percentages", "minorityWithAsian_perc");
    rankedValMap.set("Minority Percentages Excluding Asians", "minority_perc");
    rankedValMap.set("Men Percentages", "men_perc");
    rankedValMap.set("Women Percentages", "women_perc");
    rankedValMap.set("Black Percentages", "black_perc");
    rankedValMap.set("Hispanic Percentages", "hisp_perc");
    rankedValMap.set("White Percentages", "white_perc");
    rankedValMap.set("Asian Percentages", "asian_perc");
    rankedValMap.set("College Endowment (USD)", "endowment_usd");
    rankedValMap.set("College Completion Rate - Black Students", "comp_black_perc");
    rankedValMap.set("College Completion Rate - White Students", "comp_white_perc");
    rankedValMap.set("College Completion Rate - Hispanic Students", "comp_Hisp_perc");
    rankedValMap.set("College Completion Rate - Asian Students", "comp_Asian_perc");
    rankedValMap.set("Student College Completion Rate", "completion_rate_perc");
    rankedValMap.set("Median Student Debt", "debt_mdn_usd");
    rankedValMap.set("Average Faculty Salary", "faculty_salary_usd");
    rankedValMap.set("Quality of Education", "education_qual_rev");
    rankedValMap.set("Quality of Faculty", "faculty_qual_rev");
    rankedValMap.set("Ranking Alumni Employment", "alum_employment_rev");
    rankedValMap.set("Percent of Undergrads Receiving Financial Aid", "finanacial_aid_perc");
    rankedValMap.set("Percent of Undergrads Receiving Federal Grants", "fed_grant_aid_perc");
    rankedValMap.set("Median Debt", "med_debt_usd");
    rankedValMap.set("Percent First Generation", "first_gen_perc");
    rankedValMap.set("First Generation Debt Median", "first_gen_debt_usd");
    rankedValMap.set("Middle-Income Debt Median", "mdn_inc_debt_usd");
    rankedValMap.set("Low-Income Debt Median", "lo_inc_debt_usd");
    rankedValMap.set("High-Income Debt Median", "hi_inc_debt_usd");
    rankedValMap.set("Average Completion Rate Minorities", "avg_comp_rate_minoritiesNoAsian_perc");
    rankedValMap.set("Admission Rate", "admission");
    rankedValMap.set("Tuition Cost", "cost_school");
    rankedValMap.set("Low Income 3YR Repayment Rate", "lo_inc_rpy_3yr_perc");
    rankedValMap.set("Med Income 3YR Repayment Rate", "md_inc_rpy_3yr_perc");
    rankedValMap.set("High Income 3YR Repayment Rate", "hi_inc_rpy_3yr_perc");
    rankedValMap.set("Median Familty Income", "med_fam_inc_usd");
    rankedValMap.set("Average 3YR Repayment Rate", "avg_rpy_3yr_perc");


    data.forEach(function (d) {


        var percBlack = d.UgdsBlack,
            percAsian = d.UgdsAsian,
            percHisp = d.UgdsHisp,
            percWhite = d.UgdsWhite,
            percMen = d.UgdsMen,
            percWomen = d.UgdsWomen,
            endow = d.Endowmentfiscalyear,
            percMinRaceWAsian = percBlack + percAsian + percHisp, //calculate minority percentages with Asians included
            percMinRace = percBlack + percHisp; //calculate minority percentages excluding asians

        //MUST INCLUDE THE FOLLOWING AFFIXES
        // percents: _perc
        //USD: _usd
        //labels: _lbl



        var row = {
            national_rank_rev: d.NationalRank,
            name: d.InstitutionName,
            minorityWithAsian_perc: percMinRaceWAsian,
            minority_perc: percMinRace,
            men_perc: percMen,
            women_perc: percWomen,
            black_perc: percBlack,
            hisp_perc: percHisp,
            white_perc: percWhite,
            asian_perc: percAsian,
            endowment_usd: endow,
            comp_black_perc: d.C1504Black,
            comp_white_perc: d.C1504White,
            comp_Hisp_perc: d.C1504Hisp,
            comp_Asian_perc: d.C1504Asian,
            completion_rate_perc: d.C1504,
            debt_mdn_usd: d.DebtMdn,
            faculty_salary_usd: d.Avgfacsal,
            education_qual_rev: d.QualityOfEducation,
            faculty_qual_rev: d.QualityOfFaculty,
            alum_employment_rev: d.AlumniEmployment,
            finanacial_aid_perc: (d.percAwardedFinAid / 100),
            fed_grant_aid_perc: (d.percentAwardedFederalGrantAid / 100),
            med_debt_usd: d.DebtMdn,
            irst_gen_perc_rev: d.FirstGen,
            first_gen_debt_usd: d.FirstgenDebtMdn,
            mdn_inc_debt_usd: d.MdIncDebtMdn,
            lo_inc_debt_usd: d.LoIncDebtMdn,
            hi_inc_debt_usd: d.HiIncDebtMdn,
            avg_comp_rate_minoritiesNoAsian_perc: ((d.C1504Black + d.C1504Hisp) / 2),
            admission: d.AdmRate,
            cost_school: d.Costt4A,
            lo_inc_rpy_3yr_perc: d.LoIncRpy3YrRt,
            md_inc_rpy_3yr_perc: d.MdIncRpy3YrRt,
            hi_inc_rpy_3yr_perc: d.HiIncRpy3YrRt,
            med_fam_inc_usd: d.MdFaminc,
            avg_rpy_3yr_perc: d.ComplRpy3YrRt
        };

        //comp_[race] school completion rate for first-time full time students of a given race
        dataScatter.push(row);

    }); //end of for each

    return dataScatter;
} // end of getDataRankedSchools



var brushA, brushB, brushAcont, brushBcont;
var x = d3.scaleLinear().range([margin.left, plot_dx]),
    y = d3.scaleLinear().range([plot_dy, margin.top]);

var formatPerc = d3.format(".0%");
var formatDec = d3.format(".3n");
var formatUSD = d3.format(".2s");

var formatNumber = d3.format(".0f"),
    formatBillion = function (x) {
        return formatNumber(x / 1e9) + "B";
    },
    formatMillion = function (x) {
        return formatNumber(x / 1e6) + "M";
    },
    formatThousand = function (x) {
        return formatNumber(x / 1e3) + "k";
    };

function formatAbbreviation(x) {
    var v = Math.abs(x);
    return (v >= .9995e9 ? formatBillion : v >= .9995e6 ? formatMillion : formatThousand)(x);
} //end of formatAbbreviation

function moveIn() {
    //    console.log(this.getAttribute("data-class"));


    addName(this.getAttribute("data-class"));

}

function moveOut() {
    removeName();
}

var g;

function getScatterPlots(dataScatter, dropInput, scatterPlot, init) {


    var xValA = dropInput.xValueA;
    var xLblA = dropInput.xLabelA;
    var yValA = dropInput.yValueA;
    var yLblA = dropInput.yLabelA;

    var xValB = dropInput.xValueB;
    var xLblB = dropInput.xLabelB;
    var yValB = dropInput.yValueB;
    var yLblB = dropInput.yLabelB;

    if (yValA.includes("_rev"))
        var reverseYA = true;
    if (yValB.includes("_rev"))
        var reverseYB = true;

    if (xValA.includes("_rev"))
        var reverseXA = true;
    if (xValB.includes("_rev"))
        var reverseXB = true;


    if (scatterPlot == svgScatterA)
        showScatter(dataScatter, xValA, xLblA, yValA, yLblA, scatterPlot, reverseYA, reverseXA);
    else
        showScatter(dataScatter, xValB, xLblB, yValB, yLblB, scatterPlot, reverseYB, reverseXB);

    //needed for setup

    // scatterplot + brushing example followed: http://bl.ocks.org/feyderm/6bdbc74236c27a843db633981ad22c1b
    //reverse determines if the y axis should be flipped



    function showScatter(data, xValue, xlabel, yValue, ylabel, svgName, reverseY, reverseX) {
        var circles, textA, textB, extent_x, extent_y, xAxis, yAxis, line, circlesTemp;



        g = svgName.append("g");
        // circles = svgName.append("g").selectAll(".circle");
        // textA = svgName.append("g").selectAll(".textA");
        // textA = svgName.append("g").selectAll(".textB");

        extent_x = d3.extent(dataScatter, d => +d[xValue]);
        extent_y = d3.extent(dataScatter, d => +d[yValue]);

        var className;
        if (svgName == svgScatterA)
            className = "brushA";
        else
            className = "brushB";

        //get domain of scatter

        // x.domain(extent_x);

        if (reverseX)
            x.domain([d3.max(data, function (d) {
                return d[xValue];
            }), d3.min(data, function (d) {
                return d[xValue];
            })]);
        else
            x.domain([d3.min(data, function (d) {
                return d[xValue];
            }), d3.max(data, function (d) {
                return d[xValue];
            })]);


        if (reverseY)
            y.domain([d3.max(data, function (d) {
                return d[yValue];
            }), d3.min(data, function (d) {
                return d[yValue];
            })]);
        else
            y.domain([d3.min(data, function (d) {
                return d[yValue];
            }), d3.max(data, function (d) {
                return d[yValue];
            })]);


        var formatX, formatY;

        if (xValue.includes("_perc"))
            formatX = formatPerc;
        else if (xValue.includes("_usd"))
            formatX = formatAbbreviation;
        else
            formatX = null;



        if (yValue.includes("_perc"))
            formatY = formatPerc;
        else if (yValue.includes("_usd"))
            formatY = formatAbbreviation;
        else
            formatY = null;

        //  $( ".circle").unbind( "mouseover" );
        //  $( ".circle").unbind( "mouseout" );




        xAxis = d3.axisBottom(x).tickFormat(formatX),
            yAxis = d3.axisLeft(y).tickFormat(formatY);

        if (init) {

            svgName.append("g")
                .attr("id", "axis_x")
                .attr("transform", "translate(0," + (plot_dy + margin.bottom / 2) + ")")
                .call(xAxis);

            svgName.append("g")
                .attr("id", "axis_y")
                .attr("transform", "translate(" + ((margin.left / 2) + 20) + ", 0)")
                .call(yAxis);
        } else {
            svgName.select("#axis_x")
                .transition()
                .call(xAxis);

            svgName.select("#axis_y")
                .transition()
                .call(yAxis);

        }


        brushA = d3.brush()
            .on("brush", highlightBrushedCircles)
            .on("end", getBrushedA);

        brushB = d3.brush()
            .on("brush", highlightBrushedCircles)
            .on("end", getBrushedB);

        if (svgName == svgScatterA) {

            brushAcont = svgName.append("g")
                .attr("class", "brushA")
                .attr("id", "contA")
                .call(brushA);
        } else {
            brushBcont = svgName.append("g")
                .attr("class", "brushB")
                .attr("id", "contB")
                .call(brushB);
        }



        updateBrush(svgName, data, null, className);


        function updateBrush(svgUpdate, dataum1, selected, className) {
            var dataum = dataum1;
            var textData = [{
                x: xlabel,
                y: ylabel
            }];

            svgUpdate.selectAll("circle")
                .on('mouseover', function (d) {
                    //                    console.log("moused");

                    addName(d.name);
                })
                .on('mouseout', function () {
                    removeName();

                });
            // g = svgName.append("g");
            textA = svgUpdate.selectAll(".textA").data(textData);
            textB = svgUpdate.selectAll(".textB").data(textData);
            circles = svgUpdate.selectAll(".circle").data(dataum);
            // line = svgUpdate.selectAll(".line");


            circles.exit()
                .transition()
                .duration(500)
                .attr("r", 0)
                .remove();

            var enter = circles.enter().append("circle")
                .attr("class", "non_brushed circle " + className)
                .merge(circles)
                .attr("data-class", function (d) {
                    return d.name;
                })
                .attr("r", 5);

            // event = svgUpdate.selectAll(".circle").removeEventListener("mouseover", moveIn, false).removeEventListener("mouseout", moveOut, false);
            // $( ".circle" ).bind( "mouseover", moveIn );
            // $( ".circle" ).bind( "mouseout", moveOut );

            //  $( ".circle").unbind( "mouseover" );
            //  $( ".circle").unbind( "mouseout" );


            enter.on('mouseover', moveIn)
                .on('mouseout', moveOut);

            enter.transition()
                .duration(500)
                .attr("cx", function (d) {
                    return x(+d[xValue]);
                })
                .attr("cy", function (d) {
                    return y(+d[yValue]);
                });




            // svgUpdate.selectAll("circle")




            textA = textA
                .enter()
                .append("text")
                .attr("class", "textA")
                .attr("transform",
                    "translate(" + (width / 2) + " ," +
                    (height - 10) + ")")
                .style("text-anchor", "middle")
                .style("font", "14px times")
                .merge(textA)
                .text(function (d) {
                    return d.x
                });



            textB = textB
                .enter()
                .append("text")
                .attr("class", "textB")

            .style("font", "14px times")
                .attr("transform", "rotate(-90) translate(" + (-(height / 2)) + " ," +
                    (10) + ")")
                .merge(textB)
                .text(function (d) {
                    return d.y
                });


            textA.exit().remove();
            textB.exit().remove();


            //regression line
            //least squares functions adjusted from http://bl.ocks.org/benvandyke/8459843
            var xValues = [],
                yValues = [];

            dataum.forEach(function (arrayItem) {
                var x = arrayItem[xValue];
                var y = arrayItem[yValue];
                xValues.push(x);
                yValues.push(y);
            });

            var max = d3.max(dataum, function (d) {
                return d[xValue];
            });

            var linReg = linearRegression(yValues, xValues);

            var trendline = svgUpdate.selectAll("line").data(linReg);

            trendline.exit()
                .transition()
                .duration(10)
                .remove();


            trendline = svgUpdate
                // .enter()
                .append('line')
                .attr("class", "trendlineA regression " + className);
            // .merge(trendline);

            trendline.transition()
                .duration(40)
                .attr("x1", x(0))
                .attr("y1", y(linReg.intercept))
                .attr("x2", x(max))
                .attr("y2", y((max * linReg.slope) + linReg.intercept))
                .style("stroke", "rgb(6,120,155)");


        } //end of updatebrush


        function linearRegression(y, x) {
            /*Code taken from Trent Richardson's blog - Compute Linear Regressions in Javascript
            http://trentrichardson.com/2010/04/06/compute-linear-regressions-in-javascript/
            */
            var lr = {};
            var n = y.length;
            var sum_x = 0;
            var sum_y = 0;
            var sum_xy = 0;
            var sum_xx = 0;
            var sum_yy = 0;

            for (var i = 0; i < y.length; i++) {
                sum_x += x[i];
                sum_y += y[i];
                sum_xy += (x[i] * y[i]);
                sum_xx += (x[i] * x[i]);
                sum_yy += (y[i] * y[i]);
            }

            lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
            lr['intercept'] = (sum_y - lr.slope * sum_x) / n;
            lr['r2'] = Math.pow((n * sum_xy - sum_x * sum_y) /
                Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)), 2);

            return lr;
        }


        function highlightBrushedCircles() {
            var className = this.getAttribute("class");
            var cirlces2;
            if (className == "brushA") {
                cirlces2 = svgScatterA.selectAll(".circle");

            } else {
                cirlces2 = svgScatterB.selectAll(".circle");


            }
            if (d3.event.selection != null) {
                var className = this.getAttribute("class");
                // revert circles to initial style
                cirlces2 = cirlces2.attr("class", "non_brushed circle " + className);
                svgScatterB.selectAll(".circle").attr("class", "non_brushed circle brushB");
                svgScatterA.selectAll(".circle").attr("class", "non_brushed circle brushA");

                var brush_coords = d3.brushSelection(this);

                // style brushed circles
                cirlces2.filter(function () {

                    var cx = d3.select(this).attr("cx"),
                        cy = d3.select(this).attr("cy");

                    return isBrushed(brush_coords, cx, cy);
                })

                .attr("class", "brushed circle " + className);

            }

        } //end of highlightBrushedCircles

        var brushedVars = [];

        function getBrushedA() {
            if (!d3.event.selection) return;

            document.getElementById('showData').style.visibility = 'visible';
            document.getElementById('brushed-svg-detail').style.visibility = 'visible';

            var thisThing = d3.select(this).call(brushA.move, null);

            var thatThing = d3.select("#contB").call(brushB.move, null);



            var d_brushed = d3.selectAll(".brushed").data();

            if (d_brushed.length > 0) {
                // d_brushed.forEach(d_row => console.log(d_row.name))

                var className = this.getAttribute("class");
                if (className == "brushA") {

                    brushedPoints = d_brushed;
                    d3.selectAll(".brushedText").remove();
                    graphBrushed(brushedPoints);
                    graphTotalResults(brushedPoints);

                    brushBcont.call(brushB.move, null);

                    var arrName = d_brushed.map(a => a.name);

                    var toFilter = svgScatterB.selectAll(".brushB");
                    var filter = toFilter.filter(function (d) {
                            if (d)
                                return containsName(d.name, arrName);
                            else
                                return false;


                        })
                        .attr("class", "brushed circle brushB");


                }

            }

            // highlightOtherCircles(d_brushed);

        } //end of getBrushedA


        function containsName(name, list) {
            var i;
            for (i = 0; i < list.length; i++) {
                if (list[i] === name) {
                    return true;
                }
            }

            return false;
        } //end of containsName

        function getBrushedB() {
            if (!d3.event.selection) return;

            d3.select(this).call(brushB.move, null);

            var d_brushed = d3.selectAll(".brushed").data();

            document.getElementById('showData').style.visibility = 'visible';
            document.getElementById('brushed-svg-detail').style.visibility = 'visible';

            if (d_brushed.length > 0) {
                // d_brushed.forEach(d_row => console.log(d_row.name))

                var className = this.getAttribute("class");
                if (className == "brushB") {

                    brushedPoints = d_brushed;
                    graphBrushed(brushedPoints);
                    graphTotalResults(brushedPoints);

                    brushAcont.call(brushA.move, null);

                    var arrName = d_brushed.map(a => a.name);

                    var toFilter = svgScatterA.selectAll(".brushA");
                    toFilter.filter(function (d) {
                            if (d)
                                return containsName(d.name, arrName);
                            else
                                return false;


                        })
                        .attr("class", "brushed circle brushA");



                }
            }
            // highlightOtherCircles(d_brushed);

        } //end of getBrushedB



    } //end of function showScatter

} //end of function getScatterPlots

function isBrushed(brush_coords, cx, cy) {

    var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];

    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
}


function addName(name) {

    $(".details_Name").append(name);
    $(".details_Name").append(" ");

}

function removeName() {

    $(".details_Name").empty();
}

function sumAll(arr) {
    // Sums/averages the data of the brushed points
    console.log(arr);
    // Create variables for the columns we're tracking
    var admission = 0;
    var women = 0;
    var men = 0;
    var minority = 0;
    var cost = 0;
    var income = 0;
    var endowment = 0;

    arr.forEach(function (elem) {
        // At each iteration of our loop, increase the appropriate variables by their appropriate values
        if (elem.hasOwnProperty('admission')) {
            admission += elem.admission;
        }
        if (elem.hasOwnProperty('women_perc')) {
            women += elem.women_perc;
        }
        if (elem.hasOwnProperty('men_perc')) {
            men += elem.men_perc;
        }
        if (elem.hasOwnProperty('minority_perc')) {
            minority += elem.minority_perc;
        }
        if (elem.hasOwnProperty('cost_school')) {
            cost += elem.cost_school;
        }
        if (elem.hasOwnProperty('med_fam_inc_usd')) {
            income += elem.med_fam_inc_usd;
        }
        if (elem.hasOwnProperty('endowment_usd')) {
            endowment += elem.endowment_usd;
        }


    });

    // Return an object with the information we'd like to have
    // Dividing by the array length to average by the number of points

    result = {
        name: 'total',
        admission: admission / arr.length,
        women: women / arr.length,
        men: men / arr.length,
        minority: minority / arr.length,
        cost: cost / arr.length,
        income: income / arr.length,
        endowment: endowment / arr.length,
        length: arr.length
    }

    console.log(result);
    return result;
}

// TOGGLE BUTTON OF THE BRUSHED DIV
$('#showData').click(function () {
    if ($('#brushedSVG').css('display') == 'none') {
        $("#brushedSVG").show();
        $("#brushedSVG2").show();
        $("#brushed-svg-detail").show();
    } else {
        $("#brushedSVG").hide();
        $("#brushedSVG2").hide();
        $("#brushed-svg-detail").hide();
    }

});



function graphBrushed(arr) {

    d3.select("#brushedSVG").select("svg").remove();
    d3.select(".svgDonut").remove();

    //    var len = sumAll(arr).length;
    //
    //    var svgBrushedData = d3.select("#brushedSVG")
    //        .append("svg")
    //        .attr("class", "svgBrushedData")
    //        .attr("width", 1000)
    //        .attr("height", len * 30); //scaling it to the number of text elements

    //    var brushText = svgBrushedData.selectAll("text")
    //        .data(arr);
    //
    //    brushText.enter()
    //        .append("text")
    //        .attr("class", "brushedText")
    //        .text(function (d) {
    //            return d.name;
    //        })
    //        .attr("x", function (d) {
    //            return 20;
    //        })
    //        .attr("y", function (d, i) {
    //            return 30 * i + 20;
    //        })

    var donut = donutChart()
        .width(800)
        .height(500)
        .cornerRadius(3) // sets how rounded the corners are on each slice
        .padAngle(0.015) // effectively dictates the gap between slices
        .variable('women_perc')
        .category('men_perc');

    d3.select('#brushedSVG')
        .datum(arr) // bind data to the div
        .call(donut); // draw chart in div

    sumAll(arr);

}

function kFormatter(num) {
    return num > 999 ? (num / 1000).toFixed(1) + 'k' : num
}

function moneyFormat(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

        ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
        // Six Zeroes for Millions
        : Math.abs(Number(labelValue)) >= 1.0e+6

        ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3

        ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

    : Math.abs(Number(labelValue));

}

function graphTotalResults(arr) {

    d3.select("#brushedSVG2").select("svg").remove();

    obj = sumAll(arr);

    var svgContainer = d3.select("#brushedSVG2")
        .append("svg")
        .attr("width", "500")
        .attr("height", "500");

    svgContainer.append("text")
        .text("Average Statistics for Brushed Data (" + obj.length + " schools)" + ":")
        .attr("dx", 50)
        .attr("dy", 50);

    svgContainer.append("text")
        .text("Acceptance Rate: " + obj.admission.toFixed(2) * 100 + "%")
        .attr("id", "texty")
        .attr("dx", 50)
        .attr("dy", 120);

    svgContainer.append("text")
        .text("Minority: " + obj.minority.toFixed(2) * 100 + "%")
        .attr("id", "texty")
        .attr("dx", 50)
        .attr("dy", 180);

    svgContainer.append("text")
        .text("Tuition: " + "$" + kFormatter(obj.cost))
        .attr("id", "texty")
        .attr("dx", 50)
        .attr("dy", 240);

    svgContainer.append("text")
        .text("Median Family Income: " + "$" + kFormatter(obj.income))
        .attr("id", "texty")
        .attr("dx", 50)
        .attr("dy", 300);

    svgContainer.append("text")
        .text("Endowment: " + "$" + moneyFormat(Math.floor(obj.endowment)))
        .attr("id", "texty")
        .attr("dx", 50)
        .attr("dy", 360);


}
