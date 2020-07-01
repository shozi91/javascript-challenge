// from data.js
var tableData = data;
var filterBtn = d3.select("#filter-btn");

// YOUR CODE HERE!
var tbody = d3.select("tbody");
function createTable(tableData){
    tbody.html("")
    tableData.forEach((point) => {
        var row = tbody.append("tr");
        Object.entries(point).forEach(([key, value])=>{
            var cell = row.append("td");
            cell.text(value)
        });
    });
};


createTable(tableData)

filterBtn.on("click", filter);

function filter(){
    var inputDate = d3.select(".form-control").property("value");
    var filteredData = tableData.filter(observation => observation.datetime === inputDate);
    createTable(filteredData)
};


