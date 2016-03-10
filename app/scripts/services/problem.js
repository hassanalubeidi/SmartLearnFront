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
    .factory('Problem', function($http, Answer, $timeout) {
        var baseURL = 'http://127.0.0.1:3000/problems/';
        
        return {
            getAll: function() {
                return $http.get(baseURL);
            },
            get: function(id) {
                return $http.get(baseURL + id);
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
               interimTest: function(newInterim) {
                   console.log(newInterim)
                var i
                for (i = 0; i < newInterim.length; i++) {
                    var newAnswer = {
                        "marks": newInterim[i].marks,
                        "question-id" : newInterim[i].question_id
                    }
                    var newProblem = {
                        "what-went-wrong":newInterim[i].problem['what-went-wrong'],
                        "topic-id":newInterim[i]['topic-id']
                    }
                    $http({
                        url: "http://127.0.0.1:3000/answers",
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
               }
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