'use strict';

/**
 * @ngdoc function
 * @name smartLearnIoApp.controller:MainCtrl
 * @description; 
 * # MainCtrl
 * Controller of the smartLearnIoApp
 */
angular.module('smartLearnIoApp')
    .controller('InterimTestMistakesController', ['TestPaper', 'Question', 'Problem', '$scope', '$rootScope', 'JsonAPI', '$stateParams', 
        function(TestPaper, Question, Problem, $scope, $rootScope, JsonAPI, $stateParams) {
            $scope.currentUser = $rootScope.user
            // Load testpaper
            TestPaper.get($stateParams.id).then(function(response){
                $scope.testPaper = JsonAPI.pluckAttributes([response.data.data])[0];
            });
               
            // Load selected Question
            $scope.getQuestion = function() {
                Question.get($scope.selectQuestionPosition).then(function(response) {
                    $scope.selectedQuestion = JsonAPI.pluckAttributes([response.data.data])[0];
                    $scope.selectedQuestion['objectives'] = response.data.data.attributes['objectives'];
                    $scope.selectedQuestion['topic-id'] = response.data.data.attributes['objectives'][0].topic_id;
                });
            };
            
            // Checks if question is selected
            $scope.checkPosition = function() {
                if($scope.selectQuestionPosition !== undefined) {
                    $scope.getQuestion();
                    $scope.attachMarksVisible = true;
                }
            };
            
            // Checks if Marks have been inputted
            $scope.checkMarks = function() {
                if($scope.newAnswer.marks > -1 && $scope.newAnswer.marks < $scope.selectedQuestion['out-of']) {
                    $scope.attachMistakesVisible = true;
                }else {
                    $scope.attachMistakesVisible = false;
                }
            };
            
            // Adds answer to newAnswers array, ready to be sent to API
            $scope.addAnswer = function(answer) {
                answer['question_id'] = $scope.selectedQuestion.id;
                answer['topic-id'] = $scope.selectedQuestion['topic-id'];
                answer['user_id'] = $scope.currentUser.id
                answer['user-id'] = $scope.currentUser.id
                answer.position = $scope.selectedQuestion.position
                answer.out_of = $scope.selectedQuestion['out-of']
                $scope.newAnswers.push(answer)
                Problem.createAnswerProblem(answer)
                $scope.resetView();
            };
            
            // Instantiate newAnswers array. Should contain newAnswer objects
            $scope.newAnswers = [];
            
            // Reset view. Usually after answer is added
            $scope.resetView = function() {
                $scope.attachMarksVisible = false;
                $scope.attachMistakesVisible = false;
                $scope.newAnswer = undefined;
            };
    }]);
