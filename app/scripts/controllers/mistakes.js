'use strict';

/**
 * @ngdoc function
 * @name smartLearnIoApp.controller:MainCtrl
 * @description; 
 * # MainCtrl
 * Controller of the smartLearnIoApp
 */
angular.module('smartLearnIoApp')
    .controller('mistakesController', ['$scope','$stateParams', 'JsonAPI', 'Problem', 'Topic',
     function ($scope, $stateParams, JsonAPI, Problem, Topic) {
        $scope.id = $stateParams.id;
        Problem.get($scope.id).then(function(promise) {
            $scope.problem = JsonAPI.pluckAttributes([promise.data.data])[0];
            Topic.get($scope.problem['topic-id']).then(function(response) { //This should be included in Problem factory
                $scope.problem.topic = JsonAPI.pluckAttributes([response.data.data])[0];
            });
        });
       
    }]);
