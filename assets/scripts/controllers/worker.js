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
    $scope.workers = Restangular.all('worker').getList().$object;

    $scope.edit = function(_target) {
      $location.path('/personal/worker-detail/'+_target.id);
    };
    $scope.destroy = function(_target) {
      _target.remove().then(function() {
        //$location.path('/personal/worker-list');
        $route.reload();
      });
    };

  })
  .controller('WorkerCreationCtrl', function ($scope, Restangular, $location) {
    var picker = $(".datepicker").pickadate({
      format: "dd/mm/yyyy",
      onClose: function(val) {

        var val = this.get();
        var modelName = this.$node.attr("ng-model");
        var scope = angular.element(this.$node).scope();

        scope.$apply(function() {
          scope[modelName] = val;
        });
      }
    });
    $scope.save = function() {
      Restangular.all('worker').post($scope._target).then(function(_target) {
        $location.path('/personal/worker-list');
      });
    }
  })
  .controller('WorkerDetailCtrl', function ($scope, Restangular, $location, _target) {
    var picker = $(".datepicker").pickadate({
      format: "dd/mm/yyyy",
      onClose: function(val) {

        var val = this.get();
        var modelName = this.$node.attr("ng-model");
        var scope = angular.element(this.$node).scope();

        scope.$apply(function() {
          scope[modelName] = val;
        });
      }
    });
    var original = _target;
    $scope._target = Restangular.copy(original);

    $scope.isClean = function() {
      return angular.equals(original, $scope._target);
    }

    $scope.destroy = function() {
      original.remove().then(function() {
        $location.path('/personal/worker-list');
      });
    };

    $scope.save = function() {
      $scope._target.put().then(function() {
        $location.path('/personal/worker-list');
      });
    };
  });
