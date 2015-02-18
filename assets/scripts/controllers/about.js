'use strict';

/**
 * @ngdoc function
 * @name planApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the planApp
 */
angular.module('planApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
