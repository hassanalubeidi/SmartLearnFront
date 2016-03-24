'use strict';

/**
 * @ngdoc function
 * @name smartLearnIoApp.controller:SubjectsCtrl
 * @description
 * # SubjectsCtrl
 * Controller of the smartLearnIoApp
 */
angular.module('smartLearnIoApp')
  .controller('ProfileCtrl', ['JsonAPI', 'Topic', 'User', 'Subject', '$scope', '$stateParams',
   function (JsonAPI, Topic, User, Subject,$scope, $stateParams) {
       console.log($stateParams.id)
       $scope.profile = {}
       User.get($stateParams.id).then(function(response) {
           console.log(response.data.data)
           $scope.profile.user = response.data.data
           Subject.getAll().then(function(subjectResponse){
               console.log(subjectResponse.data.data)
               $scope.profile.subjects = JsonAPI.pluckAttributes(subjectResponse.data.data)
               
           })
       })
       
       $scope.loadSubject = function(index) {
           $scope.selectedSubjectIndex = index
           Topic.where({'subject-id' : index} ).then(function(response) {
               $scope.topics = JsonAPI.pluckAttributes(response.data.data)
           })
       }
  }]);
