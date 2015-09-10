// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);



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
	var chart = new google.visualization.PieChart(document.getElementById('piechart_div3'));
	chart.draw(data, options);

};
