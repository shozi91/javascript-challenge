// from data.js
var tableData = data; // y change the variabe name?
// YOUR CODE HERE!





function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

//splitting the data to individual lists

var dt = ['']
var city = ['']
var state = ['']
var country = ['']
var shape = ['']

tableData.forEach((point) => {
    dt.push(point.datetime)
    city.push(point.city)
    state.push(point.state)
    country.push(point.country)
    shape.push(point.shape)
});

// filtering the data to unique values to append to the table filters
var uniqueDt = dt.filter(onlyUnique)
var uniqueCity = city.filter(onlyUnique)
var uniqueState = state.filter(onlyUnique)
var uniqueCountry = country.filter(onlyUnique)
var uniqueShape = shape.filter(onlyUnique)


var filterDate = d3.select("#date")
var filterCity = d3.select("#city")
var filterState = d3.select("#state")
var filterCountry = d3.select("#country")
var filterShape = d3.select("#shape")

var filterData = [uniqueDt, uniqueCity, uniqueState, uniqueCountry, uniqueShape]
var formLocations = [filterDate, filterCity, filterState, filterCountry, filterShape]

function createFilters(filterData, locations) {
    for (var i = 0; i < locations.length; i++) {
        filterData[i].forEach((point) => {
            locations[i].append("option")
                .text(point)
                .attr("value", point)
        });
    };

};

createFilters(filterData, formLocations)

var tbody = d3.select("tbody");


function createTable(tableData) {
    tbody.html("")
    tableData.forEach((point) => {
        var row = tbody.append("tr");
        Object.values(point).forEach(value => {
            var cell = row.append("td");
            cell.text(value);
        });
        //Object.values(point).forEach(function(value) {
        //    var cell = row.append("td");
        //    return cell.text(value);
        //});
    });
};

createTable(tableData);

var button = document.getElementById("filter-btn").addEventListener("click", function(event){
    // only to stop the form from reloading the page
    // event.preventDefault();
    customFilter(formLocations);
});

// var button = d3.select("#filter-btn").on("click", function(){
//     d3.event.preventDefault()
//     customFilter(formLocations);
// });

// var btn = d3.select("#filter-btn")
// var form = d3.select("form");


//button.on("click", filter(formLocations));
//btn.on("click", filter(formLocations));
//button.on("click", filter(formLocations));
//form.on("submit", customFilter(formLocations));


function customFilter(formLocations) {
    
    //d3.event.preventDefault()
    
    var filterform = {
        datetime: formLocations[0].property("value"),
        city: formLocations[1].property("value"),
        state: formLocations[2].property("value"),
        country: formLocations[3].property("value"),
        shape: formLocations[4].property("value")
    };

    Object.keys(filterform).forEach(key => {
        if (filterform[key] === '') delete filterform[key];
    });

    var filteredData

    filteredData = tableData.filter(function (item) {
        for (var key in filterform) {
            if (item[key] === undefined || item[key] != filterform[key])
                return false;
        }
        return true;
        //for (var key in filterform) {
        //    if (item[key] === filterform[key])
        //        return true;
        //}
        //return false;
    });
    //console.log(filteredData)
    createTable(filteredData)
};