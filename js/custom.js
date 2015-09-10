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
		
		var Name = getStockData.query.results.quote.Name;
		var Symbol = getStockData.query.results.quote.Symbol;
		var LastTradePriceOnly = getStockData.query.results.quote.LastTradePriceOnly;
		var LastTradeTime = getStockData.query.results.quote.LastTradeTime;
		var Change = getStockData.query.results.quote.Change;
		var ChangeinPercent = getStockData.query.results.quote.ChangeinPercent;
		var PreviousClose = getStockData.query.results.quote.PreviousClose;
		var Open = getStockData.query.results.quote.Open;
		var Bid = getStockData.query.results.quote.Bid;
		var Ask = getStockData.query.results.quote.Ask;
		var OneyrTargetPrice = getStockData.query.results.quote.OneyrTargetPrice;
		var DaysRange = getStockData.query.results.quote.DaysRange;
		var YearRange = getStockData.query.results.quote.YearRange;
		var Volume = getStockData.query.results.quote.Volume;
		var AverageDailyVolume = getStockData.query.results.quote.AverageDailyVolume;
		var MarketCapitalization = getStockData.query.results.quote.MarketCapitalization;


		document.getElementById("Name").innerHTML = Name;
		document.getElementById("Symbol").innerHTML = Symbol;
		document.getElementById("LastTradePriceOnly").innerHTML = LastTradePriceOnly;
		document.getElementById("LastTradeTime").innerHTML = LastTradeTime;
		document.getElementById("Change").innerHTML = Change;
		document.getElementById("ChangeinPercent").innerHTML = ChangeinPercent;
		document.getElementById("PreviousClose").innerHTML = PreviousClose;
		document.getElementById("Open").innerHTML = Open;
		document.getElementById("Bid").innerHTML = Bid;
		document.getElementById("Ask").innerHTML = Ask;
		document.getElementById("OneyrTargetPrice").innerHTML = OneyrTargetPrice;
		document.getElementById("DaysRange").innerHTML = DaysRange;
		document.getElementById("YearRange").innerHTML = YearRange;
		document.getElementById("Volume").innerHTML = Volume;
		document.getElementById("AverageDailyVolume").innerHTML = AverageDailyVolume;
		document.getElementById("MarketCapitalization").innerHTML = MarketCapitalization;

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
		yql_query = 'select * from yahoo.finance.historicaldata where symbol = "'+x+'" and startDate = "2014-09-10" and endDate = "2015-09-09"';
	}else if (dataRange === "halfyear"){
		yql_query = 'select * from yahoo.finance.historicaldata where symbol = "'+x+'" and startDate = "2015-03-10" and endDate = "2015-09-09"';
	}else if (dataRange === "month"){
		yql_query = 'select * from yahoo.finance.historicaldata where symbol = "'+x+'" and startDate = "2015-08-10" and endDate = "2015-09-09"';	
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

};

		  
