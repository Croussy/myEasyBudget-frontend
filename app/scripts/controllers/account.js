'use strict';

/**
 * @ngdoc function
 * @name myEasyBudgetFrontendApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the myEasyBudgetFrontendApp
 */
angular.module('myEasyBudgetFrontendApp')
  .controller('AccountCtrl', function ($scope, serviceAjax) {

    serviceAjax.getAllAccounts().success(function(data, status) {
      $scope.accounts = data;
    }).error(function(status) {
      console.log("error");
      console.log(status);
    });

  });
