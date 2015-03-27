'use strict';

/**
 * @ngdoc directive
 * @name planApp.directive:datepicker
 * @description
 * # datepicker
 * Directive of the planApp
 */
angular.module('planApp')
  .directive('datepicker', function () {
    return {
      compile: function(tElem, tAttrs) {
        tElem.pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15 // Creates a dropdown of 15 years to control year
          //format: "dd/mm/yyyy",
          /*onClose: function(val) {
            var val = this.get();
            var modelName = this.$node.attr("ng-model");
            var scope = angular.element(this.$node).scope();

            scope.$apply(function() {
              scope[modelName] = val;
            });
          }*/
        });
        return {
             pre: function(scope, element, attributes, controller, transcludeFn){
 
             },
             post: function(scope, element, attributes, controller, transcludeFn){
 
             }
         }
      }
    };
  });