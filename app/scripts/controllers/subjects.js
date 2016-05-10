'use strict';

/**
 * @ngdoc function
 * @name smartLearnIoApp.controller:SubjectsCtrl
 * @description
 * # SubjectsCtrl
 * Controller of the smartLearnIoApp
 */
angular.module('smartLearnIoApp')
  .controller('SubjectsCtrl', ['Subject', 'Objective', 'Topic',  'JsonAPI','$scope', '$stateParams', 'Problem', '$rootScope',
   function (Subject, Objective, Topic, JsonAPI, $scope, $stateParams, Problem, $rootScope) {
    $scope.$parent.wide = true
    $scope.currentUser = $scope.$parent.user
    var currentUser = $scope.currentUser
    console.log(currentUser)
    $scope.$on("$destroy", function(){
        $scope.$parent.wide = false;
    });
    console.log($scope.currentUser.id)
    
    
    Subject.get($stateParams.id, ["units"]).then(function(response) {
        
        
        $scope.subject = JsonAPI.pluckAttributes([response.data.data])[0]
        $scope.units = []
        response.data.included.map(function(unit) {
            var temp_unit = unit.attributes
            temp_unit.id = unit.id
            $scope.units.push(unit.attributes)
        })
        $scope.loadUnit = function(id) {
            $scope.selectedUnitIndex = id
            Topic.where({"unit-id": $scope.selectedUnitIndex}).then(function(response) {
                $scope.topics = JsonAPI.pluckAttributes(response.data.data)
            })
            Problem.where({
            'user-id': $scope.currentUser.id
            }).then(function(response) {
                $scope.problems = JsonAPI.pluckAttributes(response.data.data)
            })
        }
        $scope.loadTopic = function(id) {
            
            $scope.selectedTopicIndex = id
            Topic.get(id).then(function(response) {
                $scope.topic = JsonAPI.pluckAttributes([response.data.data])[0]
            })
        }
        $scope.getProgress = function(index) {
            Objective.get($scope.topic.objectives[index].id).then(function(response) {
                $scope.topic.objectives[index].progress = JsonAPI.pluckAttributes([response.data.data])[0].progress
            })
        }
    })
  }]);
