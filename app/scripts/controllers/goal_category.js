'use strict';

/**
 * @ngdoc function
 * @name myEasyBudgetFrontendApp.controller:GoalCategoryCtrl
 * @description
 * # GoalCategoryCtrl
 * Controller of the myEasyBudgetFrontendApp
 */
angular.module('myEasyBudgetFrontendApp')
  .controller('GoalCategoryCtrl', function ($scope, serviceAjax, $location, $routeParams) {
    $scope.id = $routeParams.budget_id;
    $scope.account_id = $routeParams.account_id;

    $scope.form = function() {
      serviceAjax.get_all_goals_category_budget($scope.id).success(function(data, status) {
        $scope.goals_category = data;
        serviceAjax.get_all_categories().success(function(data, status) {
          $scope.categories = [];
          var find = false;
          angular.forEach(data, function(category) {
            angular.forEach($scope.goals_category, function(goal) {
              if(goal.categoryId == category.id) {
                find = true;
              }
            });
            if(find == false) {
              $scope.categories.push(category);
            } else {
              find = false;
            }
          });
        }).error(function(status) {
          console.log("error");
          console.log(status);
        });
      }).error(function(status) {
        console.log("error");
        console.log(status);
      });


      $scope.add_goal = function() {
        serviceAjax.get_category($scope.new_goal.category_id).success(function(data, status) {
          var goalJson = {
            "targetAmountCateg": $scope.new_goal.target_amount,
            "amountCateg": 0,
            "nameCategory": data.nameCategory,
            "categoryId": data.id
          };
          serviceAjax.create_goal_category_budget($scope.id, goalJson).success(function(data,status) {
            deleteJson($scope.categories, $scope.new_goal.category_id);
            goalJson.id = data.id;
            $scope.new_goal.target_amount = null;
            return $scope.goals_category.push(goalJson);
          }).error(function(status) {
            console.log("error");
            console.log(status);
          });
        }).error(function(status) {
          console.log("error");
          console.log(status);
        });
      };

      $scope.delete = function(event) {
        var id = $(event.currentTarget).attr("data-id");

        angular.forEach($scope.goals_category, function(goal) {
          if(goal.id == id) {
            serviceAjax.get_category(goal.categoryId).success(function(data) {
              $scope.categories.push(data);
            });
          }
        });

        serviceAjax.delete_goal_category(id).success(function() {
          deleteJson($scope.goals_category, id);
        }).error(function(status) {
          return console.log(status);
        });
      };

      var deleteJson = function(dataJson, id) {
        for (var i = 0; i < dataJson.length; i++) {
          if(dataJson[i].id == id) {
            dataJson.splice(i,1);
          }
        }
      };

    };
  });
