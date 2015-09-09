// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);


//Stock info:



function getStockData(){

	var x = document.getElementById("ticketinput").value;

	var BASE_URL = 'http://query.yahooapis.com/v1/public/yql?q=';
	var yql_query = 'select * from yahoo.finance.quotes where symbol in ("'+x+'")';
	var yql_query_str = encodeURI(BASE_URL+yql_query);
	var query_str_final = yql_query_str + "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

	$.getJSON(query_str_final, function(getStockData){
		
		var EBITDA = getStockData.query.results.quote.EBITDA;
		var PriceBook = getStockData.query.results.quote.PriceBook;
		var PriceSales = getStockData.query.results.quote.PriceSales;

		// console.log(getStockData);
		// console.log(EBITDA);
		// console.log(PriceBook);
		// console.log(PriceSales);
	
		document.getElementById("EBITDA").innerHTML = "EBITDA: " +EBITDA;
		document.getElementById("PriceBook").innerHTML = "P/B ratio: " +PriceBook;
		document.getElementById("PriceSales").innerHTML = "P/S ratio: " +PriceSales;


	});
};

//Variabales required to build the stock price graph:

var data = getData("year");

var options = {'width':1100,
			'height':500,
			'titleTextStyle': {color:'navy', fontName:'Arial'},
			'chartArea':{width: '80%', height: '80%'},
			'fontSize':11,
			'reverseCategories': true,	
			'legend': {position: 'top', textStyle: {color: 'navy', fontSize: 16}},
			'vAxis': {format: '$##'},
			'hAxis': {gridlines:{count:20}, showTextEvery: 20},
};

function getData(dataRange){

	var x = document.getElementById("ticketinput").value;

	var dataArray = [
        ['Date', 'Stock Price'],
    ];

	var BASE_URL = 'http://query.yahooapis.com/v1/public/yql?q=';
	var yql_query;        

	if(dataRange === "year"){
		yql_query = 'select * from yahoo.finance.historicaldata where symbol = "'+x+'" and startDate = "2014-09-05" and endDate = "2015-09-05"';
	}else if (dataRange === "halfyear"){
		yql_query = 'select * from yahoo.finance.historicaldata where symbol = "'+x+'" and startDate = "2015-03-05" and endDate = "2015-09-05"';
	};

	var yql_query_str = encodeURI(BASE_URL+yql_query);
	var query_str_final = yql_query_str + "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";


	$.getJSON(query_str_final, function(data){
		
		var stockArray = data.query.results.quote;

		console.log(stockArray);

		for (var i = 0; i < stockArray.length; i++) {
			var currentObject = stockArray[i];
			console.log(currentObject.Close);

			//Push values of currentObject.date and currentObject.close into DataArray
			var pushedArray = [currentObject.Date, parseFloat(currentObject.Close)];
			dataArray[i+1] = pushedArray;
		}

		console.log(dataArray);

		// Create the data table.
		var chartData = google.visualization.arrayToDataTable(dataArray);

		// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
		chart.draw(chartData, options);

	});

};

function buttonPressed(buttonTitle){
	data = getData(buttonTitle);
	};


function drawChart() {

	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Account');
	data.addColumn('number', 'Amount');
	data.addRows([
	  ['Total Liabilities', 105664000],
	  ['Stockholders Equity', 11868000],
	]);

	// Set chart options
	var options = {

		'width':300,
		'height':200,
        'chartArea':{width: '80%', height: '80%'},
        'pieHole': 0.4,
        'fontSize':11,
        'legend': {
			position: 'top',
			textStyle:{
				color: 'black',
				fontSize: 11,
				},
		},
	};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('piechart_div'));
	chart.draw(data, options);

}