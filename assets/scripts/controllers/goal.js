'use strict';

/**
 * @ngdoc function
 * @name planApp.controller:GoalCtrl
 * @description
 * # GoalCtrl
 * Controller of the planApp
 */
angular.module('planApp')
  .controller('GoalListCtrl', function ($scope, Restangular, $location, $route) {
    $scope._targets = Restangular.all('goal').getList().$object;

    $scope.edit = function(_target) {
      $location.path('/administration/goal-edit/'+_target.id);
    };
    $scope.destroy = function(_target) {
      _target.remove().then(function() {
        $route.reload();
      });
    };

  })
  .controller('GoalCreationCtrl', function ($scope, Restangular, $location) {
    $scope.save = function() {
      Restangular.all('goal').post($scope._target).then(function(_target) {
        $location.path('/administration/goal-list');
      });
    }
  })
  .controller('GoalEditCtrl', function ($scope, Restangular, $location, _target) {
    var original = _target;
    $scope._target = Restangular.copy(original);

    $scope.isClean = function() {
      return angular.equals(original, $scope._target);
    }

    $scope.destroy = function() {
      original.remove().then(function() {
        $location.path('/administration/goal-list');
      });
    };

    $scope.save = function() {
      $scope._target.put().then(function() {
        $location.path('/administration/goal-list');
      });
    };
  });
