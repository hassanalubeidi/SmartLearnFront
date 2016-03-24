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
        
        function createSpecific(newInterim, index) {
            var isLast = false
            if (index == undefined) {
                index = 0
            }
            
            if (index == newInterim.length - 1){
                isLast = true
            }
            var newAnswer = {
                "marks": newInterim[index].marks,
                "question-id" : newInterim[index].question_id,
                "user-id": newInterim[index].user_id
            }
            var newProblem = {
                "what-went-wrong":newInterim[index].problem['what-went-wrong'],
                "topic-id":newInterim[index]['topic-id'],
                "user-id": newInterim[index].user_id
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
            
            if( isLast == false ) {
                createSpecific(newInterim, index + 1) 
            } 
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
            createSpecific: {
               interimTest: createSpecific
            },
            delete: function(id) {
                $http({
                        url: baseURL + id,
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/vnd.api+json' }
                });
            } 
        };
    });
