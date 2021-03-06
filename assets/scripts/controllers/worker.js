'use strict';

/**
 * @ngdoc function
 * @name planApp.controller:WorkerCtrl
 * @description
 * # WorkerCtrl
 * Controller of the planApp
 */
angular.module('planApp')
  .controller('WorkerListCtrl', function ($scope, Restangular, $location, $route) {
    $scope._targets = Restangular.all('worker').getList().$object;

    $scope.edit = function(_target) {
      $location.path('/administration/worker-edit/'+_target.id);
    };
    $scope.destroy = function(_target) {
      _target.remove().then(function() {
        //$location.path('/administration/worker-list');
        $route.reload();
      });
    };

  })
  .controller('WorkerCreationCtrl', function ($scope, Restangular, $location) {
    //$scope._target={dni:'00000000'};
    $scope.save = function() {
      Restangular.all('worker').post($scope._target).then(function(_target) {
        $location.path('/administration/worker-list');
      });
    }
  })
  .controller('WorkerEditCtrl', function ($scope, Restangular, $location, _target) {
    var original = _target;
    $scope._target = Restangular.copy(original);

    $scope.isClean = function() {
      return angular.equals(original, $scope._target);
    }

    $scope.destroy = function() {
      original.remove().then(function() {
        $location.path('/administration/worker-list');
      });
    };

    $scope.save = function() {
      $scope._target.put().then(function() {
        $location.path('/administration/worker-list');
      });
    };
  });
