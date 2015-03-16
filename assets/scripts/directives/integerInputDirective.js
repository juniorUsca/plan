'use strict';

/**
 * @ngdoc directive
 * @name planApp.directive:integerInput
 * @description
 * # integerInput
 * Directive of the planApp
 */
angular.module('planApp')
  .directive('integerInput', function () {
    return {
      require: '?ngModel',
      scope: {
        minNum :'@',
        maxNum :'@',
        lengthNum: '@'
      },
      link: function (scope, element, attrs, ngModel) {
        if (!ngModel) return;
        ngModel.$parsers.unshift(function (inputValue) {
          var digits = inputValue.split('').filter(function (s, i) { 
            return (!isNaN(s) && s != ' '); 
          }).join('');
          if (attrs.maxNum && !isNaN(attrs.maxNum) && parseFloat(digits) > parseFloat(attrs.maxNum)) {
            digits = attrs.maxNum;
          }
          if (attrs.minNum && !isNaN(attrs.minNum) && parseFloat(digits) < parseFloat(attrs.minNum)) {
            digits = attrs.minNum;
          }
          if (attrs.lengthNum && !isNaN(attrs.lengthNum) && digits.length < parseInt(attrs.lengthNum)) {
            var str = new Array(parseInt(attrs.lengthNum)+1-digits.length).join('0');
            digits = str+digits;
          }
          if (attrs.lengthNum && !isNaN(attrs.lengthNum) && digits.length > parseInt(attrs.lengthNum)) {
            digits = digits.substring(digits.length-parseInt(attrs.lengthNum),digits.length);
          }
          ngModel.$viewValue = digits;
          ngModel.$render();
          return digits;
        });

        /*(element.closest('tr').bind('mouseenter', function () {
          element.show();
        });
        element.closest('tr').bind('mouseleave', function () {
          element.hide();
        });*/
      }
    };
  });