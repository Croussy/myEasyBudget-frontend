'use strict';

/**
 * @ngdoc function
 * @name myEasyBudgetFrontendApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the myEasyBudgetFrontendApp
 */
angular.module('myEasyBudgetFrontendApp')
  .controller('ProjectCtrl', function ($scope, $routeParams, $location, serviceAjax) {
    $scope.index = function() {
      serviceAjax.getAllProjects().success(function(data, status) {
        $scope.projects = data;
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });
    };

    $scope.edit = function() {
      serviceAjax.get_project($routeParams.project_id).success(function(data, status) {
        $scope.project = data;
        $scope.project.date_deb = new Date(data.dateDeb);
        $scope.project.date_end = new Date(data.dateEnd);
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });
    };

    $scope.editProject = function() {
      var projectJson = {
        'name': $scope.registerForm.name_project.$modelValue,
        "target_amount": $scope.registerForm.target_amount.$modelValue,
        "description": $scope.registerForm.description.$modelValue,
        "dateDeb": $scope.registerForm.date_deb.$modelValue
      };

      if($scope.registerForm.date_end) {
        projectJson.dateEnd = $scope.registerForm.date_end.$modelValue;
      }

      return serviceAjax.edit_project(projectJson, $routeParams.project_id).success(function() {
        return $location.path('/projects/');
      }).error(function(status) {
        return console.log(status);
      });
    };

    $scope.createProject = function() {
      var projectJson = {
        'name': $scope.registerForm.name_project.$modelValue,
        "target_amount": $scope.registerForm.target_amount.$modelValue,
        "amount": 0,
        "description": $scope.registerForm.description.$modelValue,
        "dateDeb": $scope.registerForm.date_deb.$modelValue
      };

      if($scope.registerForm.date_end) {
        projectJson.dateEnd = $scope.registerForm.date_end.$modelValue;
      }

      serviceAjax.create_project(projectJson).success(function() {
        return $location.path('/projects');
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });
    }

    $scope.delete = function(event) {
      var id = $(event.currentTarget).attr("data-id");
      return serviceAjax.delete_project(id).success(function() {
        return $location.path('/projects/')
      }).error(function(status) {
        return console.log(status);
      });
    };
  });
