'use strict';

/**
 * @ngdoc directive
 * @name planApp.directive:lettersInput
 * @description
 * # lettersInput
 * Directive of the planApp
 */
angular.module('planApp')
  .directive('lettersInput', function () {
    return {
      require: '?ngModel',
      link: function (scope, element, attrs, ngModel) {
        if (!ngModel) return;
        ngModel.$parsers.unshift(function (inputValue) {
          var digits = inputValue.split('').filter(function (s, i) { 
            return ((s >= 'A' && s <= 'Z') || (s >= 'a' && s <= 'z') || s == ' ');
          }).join('');
          
          ngModel.$viewValue = digits;
          ngModel.$render();
          return digits;
        });
      }
    };
  });