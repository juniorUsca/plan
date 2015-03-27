'use strict';

/**
 * @ngdoc function
 * @name planApp.controller:ResourceCtrl
 * @description
 * # ResourceCtrl
 * Controller of the planApp
 */
angular.module('planApp')
  .controller('ResourceListCtrl', function ($scope, Restangular, $location, $route) {
    $scope._targets = Restangular.all('resource').getList().$object;

    $scope.edit = function(_target) {
      $location.path('/administration/resource-edit/'+_target.id);
    };
    $scope.destroy = function(_target) {
      _target.remove().then(function() {
        //$location.path('/administration/worker-list');
        $route.reload();
      });
    };

  })
  .controller('ResourceCreationCtrl', function ($scope, Restangular, $location) {
    $scope.save = function() {
      Restangular.all('resource').post($scope._target).then(function(_target) {
        $location.path('/administration/resource-list');
      });
    }
  })
  .controller('PayroolEditCtrl', function ($scope, Restangular, $location, _target) {
    var original = _target;
    $scope._target = Restangular.copy(original);

    $scope.isClean = function() {
      return angular.equals(original, $scope._target);
    }

    $scope.destroy = function() {
      original.remove().then(function() {
        $location.path('/administration/resource-list');
      });
    };

    $scope.save = function() {
      $scope._target.put().then(function() {
        $location.path('/administration/resource-list');
      });
    };
  });
