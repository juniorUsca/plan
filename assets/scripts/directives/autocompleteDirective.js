'use strict';

/**
 * @ngdoc directive
 * @name planApp.directive:autocomplete
 * @description
 * # autocomplete
 * Directive of the planApp
 */
angular.module('planApp')
  .directive('autocomplete', function (Restangular, $timeout) {
    return {
      restrict: 'E',
      replace: true,
      template: '<input type="text" autocomplete="off"/>',
      require: '?ngModel',
      scope: {
        url :'@',
        dataactivates :'@'
      },
      compile: function(tElem, tAttrs) {
        tElem.dropdown({
          inDuration: 300,
          outDuration: 225,
          constrain_width: true, // Does not change width of dropdown to that of the activator
          hover: true, // Activate on click
          alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
          gutter: 0, // Spacing from edge
          belowOrigin: true // Displays dropdown below the button
        });
        return {
          pre: function(scope, iElem, iAttrs){
          },
          post: function(scope, iElem, iAttrs, ngModel){
            if (!ngModel) return;
            var currentTimeout = null;
            var DELAY_TIME_BEFORE_POSTING = 1000;
            ngModel.$parsers.unshift(function (inputValue) {
              console.log('presione');
              
              /// mostrar una de carga
              angular.element( document.querySelector( '#'+String(scope.dataactivates) ) )
                .html(
                  '<li>...Cargando...</li>'
                )
                .fadeTo( 300, 1);



              //$(iElem).fadeIn(speed,easing,callback)

              if(currentTimeout) {
                $timeout.cancel(currentTimeout);
                currentTimeout = null;
              }
              currentTimeout = $timeout(function(){
                console.log('ok');
                /// realizar busqueda
                Restangular.all( scope.url ).getList().then(function(_targets) {
                  var _targetsPar = "";
                  _targets.forEach(function(_target){
                    console.log(_target);
                    _targetsPar = _targetsPar + '<li><a>'+_target.name+'</a></li>';
                  });
                  console.log(_targetsPar);
                  angular.element( document.querySelector( '#'+String(scope.dataactivates) ) )
                    .css('max-height','none')
                    .html(_targetsPar);
                });

              }, DELAY_TIME_BEFORE_POSTING);

              return inputValue;
            });
          }
        }
      }/*,
      link: function (scope, element, attrs, ngModel) {
        if (!ngModel) return;
        var currentTimeout = null;
        var DELAY_TIME_BEFORE_POSTING = 1000;
        ngModel.$parsers.unshift(function (inputValue) {
          console.log('presione');
          
          /// mmostrar una de carga
          console.log(element);

          if(currentTimeout) {
            $timeout.cancel(currentTimeout);
            currentTimeout = null;
          }
          currentTimeout = $timeout(function(){
            console.log('ok');
            /// ocultar carga
            /// mostrar informacion
          }, DELAY_TIME_BEFORE_POSTING);

          return inputValue;

          //return digits;
        });
      }*/
    };
  });