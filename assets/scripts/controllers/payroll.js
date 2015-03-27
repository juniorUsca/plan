'use strict';

/**
 * @ngdoc function
 * @name planApp.controller:PayrollCtrl
 * @description
 * # PayrollCtrl
 * Controller of the planApp
 */
angular.module('planApp')
  .controller('PayrollListCtrl', function ($scope, Restangular, $location, $route) {
    $scope._targets = Restangular.all('payroll').getList().$object;

    $scope.edit = function(_target) {
      $location.path('/administration/payroll-edit/'+_target.id);
    };
    $scope.destroy = function(_target) {
      _target.remove().then(function() {
        //$location.path('/administration/worker-list');
        $route.reload();
      });
    };

  })
  .controller('PayrollCreationCtrl', function ($scope, Restangular, $location) {
    $scope.save = function() {
      Restangular.all('payroll').post($scope._target).then(function(_target) {
        $location.path('/administration/payroll-list');
      });
    }

    // inicio busquedas
    $scope.resources = [];
    var functionToObservable = function(scope, name) {
      var datas;
      scope[name] = function(value) {
        datas = Restangular.all('resource').customGET('', {'where[name]':'%'+value+'%'})
        .then(function(_targets) {
          $scope.resources = _targets;
        });
      };
      return [];
    }
    functionToObservable($scope, 'searchTarget');

    $scope.selectTarget = function(item) {
      //console.log('selected!', item);
      if(!$scope._target) $scope._target = {};
      $scope._target.resource = {
        _id: item.id,
        name: item.name
      };
      $scope._target.amounts = {
        budget: item.budget,
        totalNet: item.totalNet
      };
      $scope.term = item.name;
    };
    $scope.hasTarget = function() {
      return $scope.resources.length > 0;
    };
    // fin busquedas

  })
  .controller('PayrollEditCtrl', function ($scope, Restangular, $location, _target) {
    var original = _target;
    $scope._target = Restangular.copy(original);
    $scope.term = $scope._target.resource.name;

    $scope.isClean = function() {
      return angular.equals(original, $scope._target);
    }

    $scope.destroy = function() {
      original.remove().then(function() {
        $location.path('/administration/payroll-list');
      });
    };

    $scope.save = function() {
      $scope._target.put().then(function() {
        $location.path('/administration/payroll-list');
      });
    };

    // inicio busquedas
    $scope.resources = [];
    var functionToObservable = function(scope, name) {
      var datas;
      scope[name] = function(value) {
        datas = Restangular.all('resource').customGET('', {'where[name]':'%'+value+'%'})
        .then(function(_targets) {
          $scope.resources = _targets;
        });
      };
      return [];
    }
    functionToObservable($scope, 'searchTarget');

    $scope.selectTarget = function(item) {
      if(!$scope._target) $scope._target = {};
      $scope._target.resource = {
        _id: item.id,
        name: item.name
      };
      $scope._target.amounts = {
        budget: item.budget,
        totalNet: item.totalNet
      };
      $scope.term = item.name;
    };
    $scope.hasTarget = function() {
      return $scope.resources.length > 0;
    };
    // fin busquedas
  });
