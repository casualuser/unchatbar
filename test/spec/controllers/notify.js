'use strict';

describe('Controller: notify', function () {

    beforeEach(module('unchatbar'));

    var notifyCTRL, scope, messageTextService, StreamService, PhoneBookService;

    beforeEach(inject(function ($controller, $rootScope, MessageText, PhoneBook, Stream) {
        messageTextService = MessageText;
        scope = $rootScope.$new();
        PhoneBookService = PhoneBook;
        StreamService = Stream;
        notifyCTRL = function () {
            $controller('notify', {
                $scope: scope,
                MessageText: messageTextService
            });
        };
    }));

    describe('check init', function () {
        it('should set `$scope.unreadMessages` to emty object', function () {
            notifyCTRL();

            expect(scope.unreadMessages).toEqual({});
        });
        it('should set `$scope.countNewMessages` to be 0', function () {
            notifyCTRL();

            expect(scope.countUnreadMessages).toBe(0);
        });
    });

    describe('check methode', function () {
        describe('getClient', function () {
            beforeEach(function () {
                notifyCTRL();
                spyOn(PhoneBookService, 'getClient').and.returnValue({label: 'test'});
            });
            it('should call `PhoneBook.getClient` with `peerId` ', function () {
                scope.getClient('peerId');

                expect(PhoneBookService.getClient).toHaveBeenCalledWith('peerId');
            });

            it('should return object from `PhoneBook.getClient` ', function () {
                expect(scope.getClient('peerId')).toEqual({label: 'test'});
            });
        });

        describe('getGroup', function () {
            beforeEach(function () {
                notifyCTRL();
                spyOn(PhoneBookService, 'getGroup').and.returnValue({label: 'testGroup'});
            });
            it('should call `PhoneBook.getClient` with `peerId` ', function () {
                scope.getGroup('groupId');

                expect(PhoneBookService.getGroup).toHaveBeenCalledWith('groupId');
            });

            it('should return object from `PhoneBook.getClient` ', function () {
                expect(scope.getGroup('groupId')).toEqual({label: 'testGroup'});
            });
        });

        describe('getUnreadMessages', function () {
            beforeEach(function () {
                notifyCTRL();
                spyOn(messageTextService, 'getMessageInbox').and.returnValue(
                    {
                        roomA: ['mesageA', 'messageB'],
                        roomB: ['mesageC', 'messageD']
                    }
                );
            });
            it('should set `$scope.countNewMessages` to 4', function () {
                scope.getUnreadMessages();

                expect(scope.countUnreadMessages).toBe(4);
            });

            it('should set `$scope.unreadMessages` to rooms with messages', function () {
                scope.getUnreadMessages();

                expect(scope.unreadMessages).toEqual(
                    {
                        roomA: ['mesageA', 'messageB'],
                        roomB: ['mesageC', 'messageD']
                    }
                );
            });
        });
    });

    describe('check events', function () {
        beforeEach(function () {
            notifyCTRL();
            spyOn(scope, 'getUnreadMessages').and.returnValue(true);
        });
        describe('addStreamCall', function () {
            it('should set return value from `Stream.getCallsForAnswerList` to `$scope.waitingCallsForAnswer`', function () {
                spyOn(StreamService, 'getCallsForAnswerList').and.returnValue(['call']);
                scope.$broadcast('StreamAddClient');

                expect(scope.waitingCallsForAnswer).toEqual(['call']);
            });
        });

        describe('StreamRemoveClient', function () {
            it('should set return value from `Stream.getClientStreamMap` to `$scope.streamMap`', function () {
                spyOn(StreamService, 'getCallsForAnswerList').and.returnValue(['call']);
                scope.$broadcast('StreamRemoveClient', {});

                expect(scope.waitingCallsForAnswer).toEqual(['call']);
            });
        });

        describe('MessageTextGetMessage', function () {
            it('should call `scope.getUnreadMessages`', function () {
                scope.$broadcast('MessageTextGetMessage');
                expect(scope.getUnreadMessages).toHaveBeenCalled();
            });
        });

        describe('MessageTextMoveToStorage', function () {
            it('should call `scope.getUnreadMessages`', function () {
                scope.$broadcast('MessageTextMoveToStorage');
                expect(scope.getUnreadMessages).toHaveBeenCalled();
            });
        });

    });
});
