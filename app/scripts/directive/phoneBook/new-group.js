'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar.directive:phoneBook
 * @restrict E
 * @description
 *
 * save client connections , for recall
 *
 */
angular.module('unchatbar').directive('phoneBookNewGroup', [
    function () {
        return {
            restrict: 'E', //E = element, A = attribute, C = class, M = comment
            replace: true,
            templateUrl:'views/peer/phoneBook/addNewGroup.html',
            controller: 'phoneBookAdmin'
        };
    }
]);
