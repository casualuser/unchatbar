'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar.directive:textMessageList
 * @restrict E
 * @description
 *
 * single client connection
 *
 */
angular.module('unchatbar').directive('notificationStreamCall', [
    function() {
        return {
            restrict: 'E', //E = element, A = attribute, C = class, M = comment
            templateUrl: 'views/peer/notification/stream-call.html',
            controller: 'notify'

        };
    }
]);