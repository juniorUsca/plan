'use strict';

/**
 * @ngdoc directive
 * @name planApp.directive:showOnRowHover
 * @description
 * # showOnRowHover
 * Directive of the planApp
 */
angular.module('planApp')
  .directive('showOnRowHover', function () {
    return {
      link: function (scope, element, attrs) {
        element.closest('tr').bind('mouseenter', function () {
          element.show();
        });
        element.closest('tr').bind('mouseleave', function () {
          element.hide();
        });
      }
    };
  });