/* global i */
'use strict';

/**
 * @ngdoc service
 * @name smartLearnIoApp.problem
 * @description
 * # problem
 * Service in the smartLearnIoApp.
 */
angular.module('smartLearnIoApp')
    .factory('Problem', function($http, Answer, $timeout, apiBaseUrl) {
        var baseURL = apiBaseUrl + '/problems/';
        
        function createAnswerProblem(newAnswerProblem) {
            var newAnswer = {
                "marks": newAnswerProblem.marks,
                "question-id" : newAnswerProblem.question_id,
                "user-id": newAnswerProblem.user_id
            }
            var newProblem = {
                "what-went-wrong":newAnswerProblem.problem['what-went-wrong'],
                "topic-id":newAnswerProblem['topic-id'],
                "user-id": newAnswerProblem.user_id
            }
            
            $http({
                url: apiBaseUrl + "/answers",
                method:'POST',
                headers: { 'Content-Type': 'application/vnd.api+json' },
                data: {"data": {"type":"answers", "attributes": newAnswer}}
            }).then(function(response) {
                newProblem["answer-id"] = response.data.data.id
                $http({
                    url: baseURL, 
                    method: "POST",
                    headers: { 'Content-Type': 'application/vnd.api+json' },
                    data: {"data": {"type":"problems", "attributes": newProblem } }
                })
            })
        }
        
        function createfindByQuery(clauses) {
            var query = '?';
            for(var clause in clauses) {
                query += '&filter[' + clause + ']=' + clauses[clause];
            }
            return query;
        }
        
        return {
            getAll: function() {
                return $http.get(baseURL);
            },
            get: function(id) {
                return $http.get(baseURL + id);
            },
            where: function(clauses) {
                return $http.get(baseURL + createfindByQuery(clauses));
            },
            create: function(newProblem) {
                $http({
                        url: baseURL,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/vnd.api+json' },
                        data: newProblem
                });
            },
            createAnswerProblem: createAnswerProblem,
            delete: function(id) {
                return $http({
                        url: baseURL + id,
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/vnd.api+json' }
                });
            } 
        };
    });