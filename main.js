(function($) {
  'use strict'

  var app = angular.module('audioCodes', [])


  app.controller('HomeController', HomeController);


  function HomeController($scope, $http) {
    $http.get('data.json').then(function(res) {
      console.log(res.data);
      $scope.data = res.data;
    });
  }


  app.directive('drawLines', [

    function() {
      return {
        restrict: 'A',
        scope: {
          data: '='
        },
        link: function(scope, el, attr) {

          var connectFrom,
            connectTo,
            height,
            width,
            top,
            top2,
            left,
            left2,
            reverse = Boolean(attr.reverse),
            data = scope.data;

          setTimeout(function() {

            for (var i = 0; i < data.connectedTo.length; i++) {

              height = $(el[0]).height() - 2;
              width = $(el[0]).width();

              connectTo = $('#' + data.connectedTo[i].id);
              connectFrom = $(el[0]);
              if (!reverse) {
                top = connectFrom.offset().top + height;
                left = connectFrom.offset().left + (width / 2);

                top2 = connectTo.offset().top;
                left2 = connectTo.offset().left + (connectTo.width() / 2);
              } else {
                top = connectFrom.offset().top;
                left = connectFrom.offset().left + (width / 2);

                top2 = connectTo.offset().top + connectTo.height();
                left2 = connectTo.offset().left + (connectTo.width() / 2);
              }


              DrawLine(left, top, left2, top2, '#63A9E3');

            };
          }, 500);
        }
      };
    }
  ]);

})($);