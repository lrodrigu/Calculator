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

        var dataArray;
    
            if(dataRange === "year"){
                dataArray = [
                    ['Year', 'Stock Price'],
                    ['Jan', 1000],
                    ['Feb', 1170],
                    ['Mar', 660],
                    ['Apr', 1130],
                    ['May', 1430],
                    ['Jun', 1340],
                    ['Jul', 1030],
                    ['Aug', 1340],
                    ['Sep', 1660],
                    ['Oct', 1541],
                    ['Nov', 2030],
                    ['Dec', 1220],                                                                                                                        
                ];
            }else if (dataRange === "halfyear"){
                dataArray = [
                    ['Year', 'Stock Price'],
                    ['Jan 1', 1000],
                    ['Jan 15', 1100],
                    ['Feb 1', 1170],
                    ['Feb 15', 1270],
                    ['Mar 1', 660],
                    ['Mar 15', 650],
                    ['Apr 1', 1030],
                    ['Apr 15', 1130],
                    ['May 1', 1230],
                    ['May 15', 1420],
                    ['Jun 1', 1340],
                    ['Jun 15', 1240],
                    ['Jul 1', 1000],
                    ['Jul 15', 1130],
                    ['Aug 1', 1340],
                    ['Aug 15', 1540],
                    ['Sep 1', 1600],
                    ['Sep 15', 1660],
                    ['Oct 1', 1511],
                    ['Oct 15', 1141],
                    ['Nov 1', 2000],
                    ['Nov 15', 2430],
                    ['Dec 1', 1250],
                    ['Dec 15', 1220],                                                                                                                        
                     ];

                };

        return dataArray;

            };

            
      function buttonPressed(buttonTitle){
            
            console.log("here");

            data = getData(buttonTitle);

        // Create the data table.
        var chartData = google.visualization.arrayToDataTable(data);


      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(chartData, options);
      };

