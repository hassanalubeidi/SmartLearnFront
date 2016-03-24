'use strict';

/**
 * @ngdoc service
 * @name smartLearnIoApp.jsonApi
 * @description
 * # jsonApi
 * Service in the smartLearnIoApp.
 */
angular.module('smartLearnIoApp')
    .factory('JsonAPI', [function () {
        return {
            pluckAttributes: function(array) {
                var pluckedAttributesArray = [];
                array.map(function(thing) {
                    thing.attributes.id = thing.id;
                    pluckedAttributesArray.push(thing.attributes);
                });
                return pluckedAttributesArray;
            }
        };
    }]);