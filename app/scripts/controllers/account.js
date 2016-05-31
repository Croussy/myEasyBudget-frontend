'use strict';

/**
 * @ngdoc function
 * @name myEasyBudgetFrontendApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the myEasyBudgetFrontendApp
 */
angular.module('myEasyBudgetFrontendApp')
  .controller('AccountCtrl', function ($scope, serviceAjax, $location, $routeParams) {

    $scope.index = function() {
      serviceAjax.getAllAccounts().success(function(data, status) {
        $scope.accounts = data;
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });
    };

    $scope.createAccount = function() {
      var accountJson = {
        'nameAccount': $scope.registerForm.name_account.$modelValue,
        'description': $scope.registerForm.description.$modelValue,
        'amount': $scope.registerForm.amount.$modelValue,
        'nameBank': $scope.registerForm.name_bank.$modelValue
      };

      return serviceAjax.createAccount(accountJson).success(function(data, status) {
        return $location.path('/accounts');
      }).error(function(status) {
        return console.log(status);
      });
    };

    $scope.getAccount = function() {
      return serviceAjax.getAccount($routeParams.accountId).success(function(data, status) {
        $scope.account = data;
      }).error(function(status) {
        return console.log(status);
      });
    };

    $scope.editAccount = function() {
      var id = $scope.registerForm.id.$modelValue;
      var accountJson = {
        'nameAccount': $scope.registerForm.nameAccount.$modelValue,
        'description': $scope.registerForm.description.$modelValue,
        'amount': $scope.registerForm.amount.$modelValue,
        'nameBank': $scope.registerForm.nameBank.$modelValue
      };

      return serviceAjax.editAccount(accountJson, id).success(function(data, status) {
        return $location.path('/account/'+ id);
      }).error(function(status) {
        return console.log(status);
      });

    };

    $scope.delete = function(event) {
      var id = $(event.currentTarget).attr("data-id");
      return serviceAjax.deleteAccount(id).success(function(data, status) {
        return $location.path('/accounts')
      }).error(function(status) {
        return console.log(status);
      });
    }

  });
