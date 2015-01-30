'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc service
 * @name unchatbar.Notify
 * @description
 *
 * output notification
 *
 */
angular.module('unchatbar')
    .service('Notify', ['$window',
        function ($window) {
            var api = {
                /**
                 * @ngdoc methode
                 * @name _textMessageAudioFile
                 * @propertyOf unchatbar.Notify
                 * @private
                 * @returns {String} path to soundfile for client text message
                 *
                 */
                _textMessageAudioFile: 'sounds/ping.mp3',

                /**
                 * @ngdoc methode
                 * @name _textMessageSound
                 * @propertyOf unchatbar.Notify
                 * @private
                 * @returns {Object} sound object for text message
                 *
                 */
                _textMessageSound: null,

                /**
                 * @ngdoc methode
                 * @name _streamCallSound
                 * @propertyOf unchatbar.Notify
                 * @private
                 * @returns {Object} sound object for stream call
                 *
                 */
                _streamCallSound : null,

                /**
                 * @ngdoc methode
                 * @name _streamCallAudioFile
                 * @propertyOf unchatbar.Notify
                 * @private
                 * @returns {String} path to soundfile for stream call
                 *
                 */
                _streamCallAudioFile: 'sounds/streamSound.mp3',

                /**
                 * @ngdoc methode
                 * @name textMessage
                 * @methodOf unchatbar.Notify
                 * @params {String} message text message
                 * @description
                 *
                 * notification for textMessage
                 *
                 */
                textMessage: function (message) {
                    if (this._isPageHidden() === true) {
                        api._sendNotify('unchatbar - new Text Messages', message, 'newTextMessage');
                        this._textMessageSound.play();
                    }
                },

                /**
                 * @ngdoc methode
                 * @name streamCallStart
                 * @methodOf unchatbar.Notify
                 * @description
                 *
                 * stop play sound for stream call
                 *
                 */
                streamCallStart: function () {
                    this._streamCallSound.play();

                },
                /**
                 * @ngdoc methode
                 * @name streamCallStop
                 * @methodOf unchatbar.Notify
                 * @description
                 *
                 * stop play sound for stream call
                 *
                 */
                streamCallStop: function () {
                    this._streamCallSound.pause();
                },


                /**
                 * @ngdoc methode
                 * @name _getNotificationPermission
                 * @methodOf unchatbar.Notify
                 * @description
                 *
                 * get permission for Notification
                 *
                 */
                _getNotificationPermission: function () {
                    if ($window.Notification && !this._hasNotificationPermission()) {
                        $window.Notification.requestPermission(function (status) {
                            if ($window.Notification.permission !== status) {
                                $window.Notification.permission = status;
                            }
                        });
                    }
                },

                /**
                 * @ngdoc methode
                 * @name _initStreamSound
                 * @methodOf unchatbar.Notify
                 * @description
                 *
                 * init sound for stream call
                 *
                 */
                _initStreamSound : function (){
                    this._streamCallSound = new $window.Audio(this._streamCallAudioFile);
                    this._streamCallSound.volume = 1.0;
                    this._streamCallSound.loop = true;
                },
                /**
                 * @ngdoc methode
                 * @name _initMessageSound
                 * @methodOf unchatbar.Notify
                 * @description
                 *
                 * init sound for client message
                 *
                 */
                _initMessageSound: function () {
                    this._textMessageSound = new $window.Audio(this._textMessageAudioFile);
                    this._textMessageSound.volume = 1.0;
                },

                /**
                 * @ngdoc methode
                 * @name _hasNotificationPermission
                 * @methodOf unchatbar.Notify
                 * @returns {Boolean} is notification allowed
                 * @description
                 *
                 * is notification allowed
                 *
                 */
                _hasNotificationPermission: function () {
                    return $window.Notification && $window.Notification.permission === 'granted';
                },

                /**
                 * @ngdoc methode
                 * @name _isPageHidden
                 * @methodOf unchatbar.Notify
                 * @returns {Boolean} is page hidden
                 * @description
                 *
                 * is page hidden
                 *
                 */
                _isPageHidden: function () {
                    var hidden = document.hidden || document.webkitHidden || document.mozHidden || document.msHidden;
                    return hidden || false;
                },

                /**
                 * @ngdoc methode
                 * @name _sendNotify
                 * @methodOf unchatbar.Notify
                 * @params {String} headline headline of notification
                 * @params {String} message body of notification
                 * @params {String} tag tag of notification
                 * @description
                 *
                 * send browser notification
                 *
                 */
                _sendNotify: function (headline, message, tag) {
                    if (this._hasNotificationPermission()) {

                        new $window.Notification(headline,
                            {
                                body: message,
                                tag: tag
                            });
                    }
                }
            };
            api._getNotificationPermission();
            api._initMessageSound();
            api._initStreamSound();
            return api;
        }
    ]
);
