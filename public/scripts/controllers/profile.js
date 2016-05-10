'use strict';

/**
 * @ngdoc function
 * @name smartLearnIoApp.controller:SubjectsCtrl
 * @description
 * # SubjectsCtrl
 * Controller of the smartLearnIoApp
 */
angular.module('smartLearnIoApp')
  .controller('ProfileCtrl', ['JsonAPI', 'Topic', 'User', 'Problem', 'Subject', '$scope', '$stateParams', '$timeout',
   function (JsonAPI, Topic, User, Problem, Subject,$scope, $stateParams, $timeout) {
       console.log($stateParams.id)
       $scope.profile = {}
       User.get($stateParams.id).then(function(response) {
           $scope.profile.user = response.data.data
           Subject.getAll().then(function(subjectResponse){
               console.log(subjectResponse.data.data)
               $scope.profile.subjects = JsonAPI.pluckAttributes(subjectResponse.data.data)
               
           })
           
           Problem.where({"user-id" : $stateParams.id}).then(function(response) {
               $scope.problems = JsonAPI.pluckAttributes(response.data.data)
           }).then(function() {
               
           
           
           var problemGroups = []
          var problemGroup = {all: [], minimized: [], loading: false}
          var lastTestPaper
          $scope.problems.map(function(problem, index) {
            if(problem['test-paper'] != undefined) {
                if (lastTestPaper != problem['test-paper'].title) {
                    if (problemGroup.all.length > 0) {
                        problemGroups.push(problemGroup)
                        console.log("Pushed Problem Group because it belongs to a tpaper, != lastTestPaper & problemGroup.all.length > 0")
                    }
                    problemGroup = {all: [problem], minimized: [problem], loading: false}
                }else {
                    problemGroup.all.push(problem)
                    if (problemGroup.minimized.length < 4) {
                        problemGroup.minimized.push(problem)
                    }
                    if (index == $scope.problems.length -1) {
                        problemGroups.push(problemGroup)
                    }
                }
            }else {
                
                if (problemGroup.all.length > 0) {
                    problemGroups.push(problemGroup)
                }
                problemGroup = {all: [], minimized: [], loading: false}
                problemGroups.push({all: [problem], minimized: [problem], loading: false})
            }
              
              
            if(problem['test-paper'] != null ) {
                lastTestPaper = problem['test-paper'].title
            }else {
                lastTestPaper = null
            }
          })
          console.log(problemGroup)
          $scope.problemGroups = problemGroups
            })
       })
       
       $scope.loadMoreProblems = function(problemGroup) {
          $timeout(function() {
              problemGroup.minimized = problemGroup.all
              problemGroup.loading = false; 
          }, 300)
          problemGroup.loading = true; 
          
      }
       
       $scope.loadSubject = function(index) {
           $scope.selectedSubjectIndex = index
           Topic.where({'subject-id' : index} ).then(function(response) {
               $scope.topics = JsonAPI.pluckAttributes(response.data.data)
           })
       }
  }]);
