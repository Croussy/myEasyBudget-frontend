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
    };

    // Budget
    this.getAllBudgets = function(id) {
      return $http.get('http://localhost:3000/api/accounts/'+ id + '/budgets');
    };

    this.create_budget = function(dataJson) {
      return $http.post('http://localhost:3000/api/budgets', dataJson);
    };

    this.get_budget = function(id) {
      return $http.get('http://localhost:3000/api/budgets/'+ id);
    };

    this.edit_budget = function(dataJson, id) {
      return $http.put('http://localhost:3000/api/budgets/'+ id, dataJson);
    };

    this.delete_budget = function(id) {
      return $http.delete('http://localhost:3000/api/budgets/'+ id);
    };

    this.update_budget_amount = function(dataJson) {
      return $http.post('http://localhost:3000/api/budgets/updateAmount', dataJson);
    };


    //Projects
    this.getAllProjects = function() {
      return $http.get('http://localhost:3000/api/projects');
    };

    this.create_project = function(dataJson) {
      return $http.post('http://localhost:3000/api/projects', dataJson);
    };

    this.get_project = function(id) {
      return $http.get('http://localhost:3000/api/projects/'+ id);
    };

    this.edit_project = function(dataJson, id) {
      return $http.put('http://localhost:3000/api/projects/'+ id, dataJson);
    };

    this.delete_project = function(id) {
      return $http.delete('http://localhost:3000/api/projects/'+ id);
    };

    // Category
    this.get_all_categories = function() {
      return $http.get('http://localhost:3000/api/categories');
    };

    // Goal category
    this.get_all_goals_category_budget = function(id) {
      return $http.get('http://localhost:3000/api/budgets/'+id+'/goalCategories');
    };

    this.create_goal_category_budget = function(id, dataJson) {
      return $http.post('http://localhost:3000/api/budgets/'+id+'/goalCategories', dataJson);
    };

    this.delete_goal_category = function(id) {
      return $http.delete('http://localhost:3000/api/goalCategories/'+id);
    };

    this.get_category = function(id) {
      return $http.get('http://localhost:3000/api/categories/'+ id);
    };

    this.get_goal_category = function(id) {
      return $http.get('http://localhost:3000/api/goalCategories/'+id);
    };

    this.edit_goal_category = function(dataJson, id) {
      return $http.put('http://localhost:3000/api/goalCategories/'+ id, dataJson);
    };

    this.update_other_category = function(dataJson) {
      return $http.post('http://localhost:3000/api/goalCategories/updateAmountOtherGoalCategory', dataJson);
    };

    // Purchase
    this.create_purchase = function(dataJson) {
      return $http.post('http://localhost:3000/api/purchases', dataJson)
    };

    this.get_all_purchase = function(id) {
      return $http.get('http://localhost:3000/api/budgets/'+ id +'/purchases');
    };

    this.get_purchase = function(id) {
      return $http.get('http://localhost:3000/api/purchases/'+ id);
    };

    this.update_purchase = function(dataJson, id) {
      return $http.put('http://localhost:3000/api/purchases/'+ id, dataJson);
    };

    this.delete_purchase = function(id) {
      return $http.delete('http://localhost:3000/api/purchases/'+id);
    };


  });
