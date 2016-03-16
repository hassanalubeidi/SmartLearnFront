'use strict';

/**
 * @ngdoc service
 * @name smartLearnIoApp.topic
 * @description
 * # topic
 * Factory in the smartLearnIoApp.
 */
angular.module('smartLearnIoApp')
    .factory('User', function($http, apiBaseUrl) {
        var baseURL = apiBaseUrl + '/users/';
        //
        return {
            getAll: function() {
                return $http.get(baseURL);
            },
            get: function(id, includes) {
                var includesURI
                if(includes != undefined) {
                    includesURI = "?include="
                    includes.map(function(include){
                        includesURI += include + "&"
                    })
                }else{
                    includesURI = ""
                }
                return $http.get(baseURL + id + includesURI);
            }
        };
    });