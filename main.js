(function( $ ) {
  'use strict'

  var app = angular.module('audioCodes', [])

  app.controller('HomeController', HomeController);

  function HomeController( $scope, $http ) {
    $http.get('data.json').then(function( res ) {
      console.log(res.data);
      $scope.data = res.data;
    });

    $scope.getIPDownCount = function( dataLen ) {
      return dataLen - 6;
    }

  }

  app.directive('drawLines', [

    function() {
      return {
        restrict: 'A',
        scope   : {
          data: '='
        },
        link    : function( scope, el, attr ) {

          var connectFrom,
              connectTo,
              height,
              width,
              top,
              top2,
              left,
              left2,
              type    = attr.type,
              reverse = Boolean(attr.reverse),
              color   = '#63A9E3',
              lineStyle,
              data    = scope.data;

          setTimeout(function() {

            for( var i = 0; i < data.connectedTo.length; i++ ) {

              connectFrom = $(el[0]);
              connectTo = $('#' + data.connectedTo[i].id);

              if( attr.group && type === 'ip' ) {
                connectFrom = $('#moreIPS');
              }

              //TODO
              //if( attr.group && type === 'SIP' ) {
              //  connectFrom = $('#SIPINTERFACES');
              //}

              $(el[0]).on('click', function() {
                $('.selected').removeClass('selected');
                $(this).toggleClass('selected');
                var menu = $(this).find('.' + type + 'Menu');
                if( menu.hasClass('show') ) {
                  $('.selected').removeClass('selected');
                  menu.removeClass('show');
                  return;
                }
                $('.menu').removeClass('show');
                menu.addClass('show');
              });

              height = connectFrom.height() - 2;
              width = connectFrom.width();

              if( connectTo.length ) {
                if( !reverse ) {
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

                lineStyle = 'solid';

                if( data.connectedTo[i].type === 'dashed' ) {
                  lineStyle = 'dashed';
                }

                DrawLine(left, top, left2, top2, color, lineStyle);
              }

            }

          }, 500);
        }
      };
    }
  ]);

  app.directive('showMore', function() {
    return {
      link: function( scope, el ) {

        $('.group').on("click", function( e ) {
          e.stopPropagation();
        });

        el.on("click", function() {
          $(this).find('p').toggleClass('selected');
          $(this).find('.ipGroupsArrow').toggle();
          $(this).find('.group').toggle();

        });
      }
    }
  });

})($);