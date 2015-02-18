'use strict';

/**
 * @ngdoc function
 * @name planApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the planApp
 */
angular.module('planApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
