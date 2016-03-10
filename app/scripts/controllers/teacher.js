'use strict';

/**
 * @ngdoc function
 * @name smartLearnIoApp.controller:SubjectsCtrl
 * @description
 * # SubjectsCtrl
 * Controller of the smartLearnIoApp
 */
angular.module('smartLearnIoApp')
  .controller('TeacherCtrl', ['Parse', 'Subject', 'TestPaper',  'JsonAPI',  '$scope',
    function (Parse, Subject, TestPaper, JsonAPI, $scope) {
        $scope.createQuestions = function(url) {
            Parse.Paper(url).then(function(response) {
                alert("Done!")
            })
        }
        $scope.createTestPaper = function(newTestPaper) {
            TestPaper.createAndParse({
                "title":newTestPaper.title,
                "subject-id": newTestPaper.subject_id
            }, newTestPaper.url)
        }
        Subject.getAll().then(function(response) {
            $scope.subjects = JsonAPI.pluckAttributes(response.data.data)
        })
    }]);
