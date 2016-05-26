'use strict';

/**
 * @ngdoc service
 * @name myEasyBudgetFrontendApp.serviceAjax
 * @description
 * # serviceAjax
 * Service in the myEasyBudgetFrontendApp.
 */
angular.module('myEasyBudgetFrontendApp')
  .service('serviceAjax', function ($http, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getAllAccounts = function(){
      return $http.get('http://localhost:3000/api/accounts');
    }

    this.getAllBudgetAccount = function(){
      return $http.get('http://localhost:3000/api/accounts');
    }
  });
