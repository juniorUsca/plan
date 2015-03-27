'use strict';

/**
 * @ngdoc directive
 * @name planApp.directive:drowpdownButton
 * @description
 * # drowpdownButton
 * Directive of the planApp
 */
angular.module('planApp')
  .directive('dropdownButton', function () {
    return {
      compile: function(scope, element, attrs) {
        //console.log(element);
        element.$$element.dropdown({
        //$('.dropdown-button').dropdown({
          inDuration: 300,
          outDuration: 225,
          constrain_width: false, // Does not change width of dropdown to that of the activator
          hover: false, // Activate on click
          alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
          gutter: 0, // Spacing from edge
          belowOrigin: false // Displays dropdown below the button
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