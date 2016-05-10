'use strict';

/**
 * @ngdoc function
 * @name smartLearnIoApp.controller:SubjectsCtrl
 * @description
 * # SubjectsCtrl
 * Controller of the smartLearnIoApp
 */
angular.module('smartLearnIoApp')
  .controller('TeacherCtrl', ['Parse', 'Classroom', 'User', 'Subject', 'TestPaper',  'JsonAPI',  '$scope',
    function (Parse, Classroom, User, Subject, TestPaper, JsonAPI, $scope) {
        $scope.$parent.wide = true
        $scope.$on("$destroy", function(){
            $scope.$parent.wide = false;
        });
        
        
        $scope.createClassroom = function(newClassroom) {
            $scope.classrooms.push(newClassroom)
            console.log(newClassroom)
            Classroom.create(newClassroom) 
            $scope.newClassroom = {}
        }
        $scope.openNewClassroomDialog = function() {
            User.getAll().then(function(response) {
                $scope.users = JsonAPI.pluckAttributes(response.data.data)
            })
        }
        Classroom.getAll().then(function(response) {
            $scope.classrooms = JsonAPI.pluckAttributes(response.data.data)
        })
        
        
        $scope.createTestPaper = function(newTestPaper) {
            $scope.creatingPaper = true
            TestPaper.createAndParse({
                "title":newTestPaper.title,
                "subject-id": newTestPaper.subject_id
            }, newTestPaper.url).then(function(response) {
                $scope.creatingPaper = false
                $scope.testPaper = response.data.data.attributes
            }, function(response) {
                $scope.creatingPaper = false
                $scope.error = response
            })
        }
        Subject.getAll().then(function(response) {
            $scope.subjects = JsonAPI.pluckAttributes(response.data.data)
        })
        
        TestPaper.getAll().then(function(response) {
            $scope.testpapers = JsonAPI.pluckAttributes(response.data.data)
        })
        
        User.getAll().then(function(response) {
            $scope.users = JsonAPI.pluckAttributes(response.data.data)
        })
    }]);
