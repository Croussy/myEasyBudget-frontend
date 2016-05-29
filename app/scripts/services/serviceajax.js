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

    // ACCOUNT
    this.getAllAccounts = function(){
      return $http.get('http://localhost:3000/api/accounts');
    };

    this.getAllBudgetAccount = function(){
      return $http.get('http://localhost:3000/api/accounts');
    };

    this.createAccount = function(dataJson) {
      return $http.post('http://localhost:3000/api/accounts', dataJson);
    };

    this.getAccount = function(id) {
      return $http.get('http://localhost:3000/api/accounts/'+ id);
    };

    this.editAccount = function(dataJson, id) {
      return $http.put('http://localhost:3000/api/accounts/'+ id, dataJson);
    };

    this.deleteAccount = function(id) {
      return $http.delete('http://localhost:3000/api/accounts/'+ id);
    }
  });
