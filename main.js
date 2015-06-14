(function($) {
  'use strict'

  var app = angular.module('audioCodes', [])

  app.service('AudioCodesService', function() {
    //http://www.w3schools.com/browsers/browsers_display.asp
    // based on high screen resulation 1366x768
    this.getPaginateNum = function() {
      if ($(document).width() > 1366) {
        return 8;
      } else {
        return 6;
      }
    }
  });
  app.controller('HomeController', HomeController);
  app.controller('IPNetworkController', IPNetworkController);

 function IPNetworkController($scope, $http) {
  $http.get('ipnetwork.json').then(function(res) {
      console.log(res.data);
      $scope.ipnetwork = res.data;
    });
 }


  function HomeController($scope, $http, AudioCodesService) {
    $scope.AudioCodesService = AudioCodesService;

    $http.get('data.json').then(function(res) {
      console.log(res.data);
      $scope.data = res.data;
    });

    $scope.getIPDownCount = function(dataLen) {
      return dataLen - $scope.AudioCodesService.getPaginateNum();
    }

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
            type = attr.type,
            reverse = Boolean(attr.reverse),
            color = '#63A9E3',
            lineStyle,
            data = scope.data;

          setTimeout(function() {
            if (data.connectedTo) {
              for (var i = 0; i < data.connectedTo.length; i++) {

                connectFrom = $(el[0]);
                connectTo = $('#' + data.connectedTo[i].id);

                if (attr.group && type === 'ip') {
                  connectFrom = $('#moreIPS');
                }

                //TODO
                //if( attr.group && type === 'SIP' ) {
                //  connectFrom = $('#SIPINTERFACES');
                //}

                $(el[0]).on('click', function() {
                  $('.selected').removeClass('selected');
                  $(this).toggleClass('selected');
                  $('.group').hide();
                  var menu = $(this).find('.menu');
                  if (menu.hasClass('show')) {
                    $('.selected').removeClass('selected');
                    menu.removeClass('show');
                    return;
                  }
                  $('.menu').removeClass('show');
                  menu.addClass('show');
                });

                height = connectFrom.height();
                width = connectFrom.width();

                if (connectTo.length) {
                  if (!reverse) {
                    top = connectFrom.offset().top + 6 + height;
                    left = connectFrom.offset().left + (width / 2);

                    top2 = connectTo.offset().top;
                    left2 = connectTo.offset().left + (connectTo.width() / 2);
                  } else {
                    top = connectFrom.offset().top;
                    left = connectFrom.offset().left + (width / 2);

                    top2 = connectTo.offset().top + 4 + connectTo.height();
                    left2 = connectTo.offset().left + (connectTo.width() / 2);
                  }

                  lineStyle = 'solid';

                  if (data.connectedTo[i].type === 'dashed') {
                    lineStyle = 'dashed';
                  }

                  DrawLine(left, top, left2, top2, color, lineStyle);
                }

              }
            }


            try {
              var className = scope.data.srd.type;
              var content = '<span class="' + className + '">' + scope.data.srd.name + ' </span>';
              var contentWithLabel = '<span class="' + className + '">' + scope.data.srd.name + ' <p>' + scope.data.srd.label + '</p></span>';
              $(el).tooltipster('content', scope.data.srd.label ? contentWithLabel : content);

            } catch (err) {}


          }, 600);
        }
      };
    }
  ]);

  app.directive('showMore', function() {
    return {
      link: function(scope, el) {

        $('.group').on("click", function(e) {
          e.stopPropagation();
        });

        el.on("click", function() {
          $('.menu').removeClass('show');
          $(this).find('p').toggleClass('selected');
          $(this).find('.ipGroupsArrow').toggle();
          $(this).find('.group').toggle();

        });
      }
    }
  });

  app.directive('tooltipContent', [

    function() {
      return {
        restrict: 'A',
        scope: {
          content: '='
        },
        link: function(scope, el, attr) {
          console.log(scope.content)
          setTimeout(function() {

            $(el).tooltipster('content', 'dsddssd');

          }, 600)

        }
      };
    }
  ])
  app.directive('initTooltips', function() {
    return {
      link: function(scope, el) {
        setTimeout(function() {
          $('.tooltipInvalid').tooltipster({
            animation: 'fade',
            theme: 'tooltipster-Invalid',
            position: 'right',
            arrowColor: '#FDE6F3',
            multiple: true,
            contentAsHTML: true,
            trigger: 'hover'
          });

          $('.tooltipInfo').tooltipster({
            animation: 'fade',
            multiple: true,
            theme: 'tooltipster-info',
            contentAsHTML: true,
            position: 'bottom',
            arrowColor: '#FFFBC9',
            trigger: 'hover'
          });

          $('.tooltipSrd').tooltipster({
            animation: 'fade',
            multiple: true,
            theme: 'tooltipster-srd',
            contentAsHTML: true,
            position: 'top',
            arrowColor: '#475561',
            trigger: 'hover'
          });
        }, 500)

      }
    }
  })

})($);