'use strict';

angular.module('statusTodayApp')
.controller('DashboardCtrl', function ($scope) {
  $scope.message = 'Hello';


  function toggleArrayItem(a, v) {
    var i = a.indexOf(v);
    if (i === -1) a.push(v);
    else a.splice(i, 1);
  }

  function createFilter(filters) {
    return function (d) {
      for (var i = 0, len = filters.length; i < len; i++) {
        if ($.inArray(filters[i], d) == -1) return false;
      }
      return true;
    }
  }

  $scope.tag1 = function() {
    toggleArrayItem(filter_list, 'tag2');

    tags.filterAll();
    tags.filterFunction(createFilter(filter_list));

    dc.redrawAll();
  };


  $scope.tag2 = function() {
    toggleArrayItem(filter_list, 'tag3');

    tags.filterAll();
    tags.filterFunction(createFilter(filter_list));

    dc.redrawAll();
  };

  $scope.tag3 = function() {
    alert('Hello');
    toggleArrayItem(filter_list, 'tag1');

    tags.filterAll();
    tags.filterFunction(createFilter(filter_list));

    dc.redrawAll();
  };


  var yearRingChart = dc.pieChart("#chart-ring-year"),
  spenderRowChart = dc.rowChart("#chart-row-spenders"),
  filter_list = [],
  spendData = [{
    Name: 'Mr A',
    Spent: 40,
    Year: 2011,
    "tags": ["tag1", "tag2"]
  }, {
    Name: 'Mr B',
    Spent: 10,
    Year: 2011,
    "tags": ["tag1", "tag2"]
  }, {
    Name: 'Mr C',
    Spent: 40,
    Year: 2011,
    "tags": ["tag2"]
  }, {
    Name: 'Mr A',
    Spent: 70,
    Year: 2012,
    "tags": ["tag1", "tag3"]
  }, {
    Name: 'Mr B',
    Spent: 20,
    Year: 2012,
    "tags": ["tag3"]
  }, {
    Name: 'Mr B',
    Spent: 50,
    Year: 2013,
    "tags": ["tag2", "tag3"]
  }, {
    Name: 'Mr C',
    Spent: 30,
    Year: 2013,
    "tags": ["tag1", "tag3"]
  }, {
    Name: 'Mr A',
    Spent: 40,
    Year: 2011,
    "tags": ["tag1", "tag2", "tag3"]
  }, {
    Name: 'Mr B',
    Spent: 10,
    Year: 2011,
    "tags": ["tag1", "tag2", "tag3"]
  }, {
    Name: 'Mr C',
    Spent: 40,
    Year: 2011,
    "tags": ["tag2"]
  }, {
    Name: 'Mr A',
    Spent: 70,
    Year: 2012,
    "tags": ["tag1", "tag3"]
  }, {
    Name: 'Mr B',
    Spent: 20,
    Year: 2012,
    "tags": ["tag3"]
  }, {
    Name: 'Mr B',
    Spent: 50,
    Year: 2013,
    "tags": ["tag2"]
  }, {
    Name: 'Mr C',
    Spent: 30,
    Year: 2013,
    "tags": ["tag3"]
  }, {
    Name: 'Mr A',
    Spent: 40,
    Year: 2011,
    "tags": ["tag1", "tag2"]
  }, {
    Name: 'Mr B',
    Spent: 10,
    Year: 2011,
    "tags": ["tag1", "tag2"]
  }, {
    Name: 'Mr C',
    Spent: 40,
    Year: 2011,
    "tags": ["tag2"]
  }, {
    Name: 'Mr A',
    Spent: 70,
    Year: 2012,
    "tags": ["tag1", "tag3"]
  }, {
    Name: 'Mr B',
    Spent: 20,
    Year: 2012,
    "tags": ["tag3"]
  }, {
    Name: 'Mr B',
    Spent: 50,
    Year: 2013,
    "tags": ["tag2", "tag3"]
  }, {
    Name: 'Mr C',
    Spent: 30,
    Year: 2013,
    "tags": ["tag1", "tag3"]
  }];

  var ndx = crossfilter(spendData),
  yearDim = ndx.dimension(function (d) {
    return +d.Year;
  }),
  spendDim = ndx.dimension(function (d) {
    return d.Spent;
  }),
  nameDim = ndx.dimension(function (d) {
    return d.Name;
  }),
  tags = ndx.dimension(function (d) {
    return d.tags;
  }),
  spendPerYear = yearDim.group().reduceSum(function (d) {
    return +d.Spent;
  }),
  spendPerName = nameDim.group().reduceSum(function (d) {
    return +d.Spent;
  });

  yearRingChart.width(200).height(200)
  .dimension(yearDim)
  .group(spendPerYear)
  .innerRadius(50);

  spenderRowChart.width(350).height(200)
  .dimension(nameDim)
  .group(spendPerName)
  .elasticX(true);

  dc.renderAll();

  $scope.options_donuts = {
    chart: {
      type: 'pieChart',
      height: 500,
      x: function(d){return d.key;},
      y: function(d){return d.y;},
      showLabels: true,
      transitionDuration: 500,
      labelThreshold: 0.01,
      legend: {
        margin: {
          top: 5,
          right: 35,
          bottom: 5,
          left: 0
        }
      }
    }
  };

  $scope.data_donuts = [
    {
      key: "One",
      y: 5
    },
    {
      key: "Two",
      y: 2
    },
    {
      key: "Three",
      y: 9
    },
    {
      key: "Four",
      y: 7
    },
    {
      key: "Five",
      y: 4
    },
    {
      key: "Six",
      y: 3
    },
    {
      key: "Seven",
      y: .5
    }
  ];

  $scope.options_area = {
    chart: {
      type: 'multiBarHorizontalChart',
      height: 450,
      x: function(d){return d.label;},
      y: function(d){return d.value;},
      showControls: true,
      showValues: true,
      transitionDuration: 500,
      xAxis: {
        showMaxMin: false
      },
      yAxis: {
        axisLabel: 'Values',
        tickFormat: function(d){
          return d3.format(',.2f')(d);
        }
      }
    }
  };

  $scope.data_area = [
    {
      "key": "Series1",
      "color": "#d62728",
      "values": [
        {
          "label" : "Group A" ,
          "value" : -1.8746444827653
        } ,
        {
          "label" : "Group B" ,
          "value" : -8.0961543492239
        } ,
        {
          "label" : "Group C" ,
          "value" : -0.57072943117674
        } ,
        {
          "label" : "Group D" ,
          "value" : -2.4174010336624
        } ,
        {
          "label" : "Group E" ,
          "value" : -0.72009071426284
        } ,
        {
          "label" : "Group F" ,
          "value" : -0.77154485523777
        } ,
        {
          "label" : "Group G" ,
          "value" : -0.90152097798131
        } ,
        {
          "label" : "Group H" ,
          "value" : -0.91445417330854
        } ,
        {
          "label" : "Group I" ,
          "value" : -0.055746319141851
        }
      ]
    },
    {
      "key": "Series2",
      "color": "#1f77b4",
      "values": [
        {
          "label" : "Group A" ,
          "value" : 25.307646510375
        } ,
        {
          "label" : "Group B" ,
          "value" : 16.756779544553
        } ,
        {
          "label" : "Group C" ,
          "value" : 18.451534877007
        } ,
        {
          "label" : "Group D" ,
          "value" : 8.6142352811805
        } ,
        {
          "label" : "Group E" ,
          "value" : 7.8082472075876
        } ,
        {
          "label" : "Group F" ,
          "value" : 5.259101026956
        } ,
        {
          "label" : "Group G" ,
          "value" : 0.30947953487127
        } ,
        {
          "label" : "Group H" ,
          "value" : 0
        } ,
        {
          "label" : "Group I" ,
          "value" : 0
        }
      ]
    }
  ]


});
