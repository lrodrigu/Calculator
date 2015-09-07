      // Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.

      var data = getData("year");
      var options = {'title':'Stock Prices',
                       'width':400,
                       'height':300,
                       'titleTextStyyle': {color:'white', fontName:'GillSans'},
                       'legendTextStyle': {color:'white', fontName:'GillSans'},
                       'chartArea.width':200,
        };



      function drawChart() {

        // Create the data table.
        var chartData = google.visualization.arrayToDataTable(data);


      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(chartData, options);
      };

      function getData(dataRange){

        var dataArray = [
            ['Date', 'Stock Value'],
        ];

        var BASE_URL = 'http://query.yahooapis.com/v1/public/yql?q=';
        var yql_query;        

        if(dataRange === "year"){
            yql_query = 'select * from yahoo.finance.historicaldata where symbol = "YHOO" and startDate = "2013-09-29" and endDate = "2014-09-29"';
        }else if (dataRange === "halfyear"){
            yql_query = 'select * from yahoo.finance.historicaldata where symbol = "YHOO" and startDate = "2014-03-29" and endDate = "2014-09-29"';
        };

        var query_str_final = yql_query_str + "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
        var yql_query_str = encodeURI(BASE_URL+yql_query);

        $.getJSON(query_str_final, function(data){
            var stockArray = data.query.results.quote
    
            for (var i = 0; i < stockArray.length; i++) {
                var currentObject = stockArray[i];
                console.log(currentObject.Close);
                //Push values of currentObject.date and currentObject.close into DataArray
                var pushedArray = [currentObject.Date, parseFloat(currentObject.close)];
                dataArray[i+1] = pushedArray;

            }
            console.log(DataArray)
            return dataArray;

        });
    
        };

            
      function buttonPressed(buttonTitle){
            
            data = getData(buttonTitle);

        // Create the data table.
        var chartData = google.visualization.arrayToDataTable(data);


      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(chartData, options);
      };

      google.setOnLoadCallback(drawTable);

      function drawTable() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('number', 'Salary');
        data.addColumn('boolean', 'Full Time Employee');
        data.addRows([
          ['Mike',  {v: 10000, f: '$10,000'}, true],
          ['Jim',   {v:8000,   f: '$8,000'},  false],
          ['Alice', {v: 12500, f: '$12,500'}, true],
          ['Bob',   {v: 7000,  f: '$7,000'},  true]
        ]);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
      }