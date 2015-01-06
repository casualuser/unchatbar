'use strict';

describe('Serivce: MessageText', function () {
    var BrokerService, rootScope, sessionStorage, MessageTextService, PhoneBookService, ConnectionService;
    beforeEach(module('unchatbar'));


    beforeEach(inject(function ($rootScope, MessageText, Broker, $sessionStorage, PhoneBook, Connection) {
        rootScope = $rootScope;
        MessageTextService = MessageText;
        BrokerService = Broker;
        sessionStorage = $sessionStorage;
        PhoneBookService = PhoneBook;
        ConnectionService = Connection;
    }));

    describe('check methode', function () {
        describe('init', function () {
            beforeEach(function () {
                spyOn(MessageTextService, '_initStorage').and.returnValue(true);
                spyOn(MessageTextService, '_sendFromQueue').and.returnValue(true);
                spyOn(MessageTextService, '_addStoStorage').and.returnValue(true);
                MessageTextService.init();
            });
            it('should call `MessageText._initStorage`', function () {
                expect(MessageTextService._initStorage).toHaveBeenCalled();
            });

            it('should call `MessageText._sendFromQueue` after event `ConnectionOpen` with eventdata `peerId`', function () {
                rootScope.$broadcast('ConnectionOpen', {peerId: 'userPeerId'});
                expect(MessageTextService._sendFromQueue).toHaveBeenCalledWith('userPeerId');
            });

            it('should call `MessageText._addStoStorage` after event `onnection:getMessage:textMessage` with eventdata `message.group.id`', function () {
                rootScope.$broadcast('ConnectionGetMessagetextMessage',
                    {
                        peerId: 'userId',
                        message: {
                            group: {
                                id: 'groupId'
                            }
                        }
                    }
                );
                expect(MessageTextService._addStoStorage).toHaveBeenCalledWith('groupId', 'userId', {
                    group: {
                        id: 'groupId'
                    }
                });
            });
            it('should call `MessageText._addStoStorage` after event `onnection:getMessage:textMessage` with eventdata `peerId`', function () {
                rootScope.$broadcast('ConnectionGetMessagetextMessage',
                    {
                        peerId: 'userId',
                        message: {group: {}}

                    }
                );
                expect(MessageTextService._addStoStorage).toHaveBeenCalledWith('userId', 'userId', {group: {}});
            });

        });

        describe('_initStorage', function () {
            var sessionStorage = {};
            beforeEach(inject(function ($sessionStorage) {
                sessionStorage = $sessionStorage;
                spyOn(sessionStorage, '$default').and.returnValue({message: {test: 'data'}});
                MessageTextService._initStorage();
            }));
            it('should call `$sessionStorage.$default` with object', function () {
                expect(sessionStorage.$default).toHaveBeenCalledWith({
                    message: {
                        messages: {},
                        queue: {}
                    }
                });
            });
            it('should set  `MessageTextService._storage` return value from `$sessionStorage.$default`', function () {
                expect(MessageTextService._storageMessages).toEqual({test: 'data'});
            });
        });

        describe('setRoom', function () {
            it('should set `MessageText._selectedRoom` type', function () {
                MessageTextService.setRoom('test', 'id');

                expect(MessageTextService._selectedRoom).toEqual({
                    type: 'test',
                    id: 'id'
                });
            });
            it('should reset  `MessageText._selectedRoom` when id is empty', function () {
                MessageTextService.setRoom('test', '');

                expect(MessageTextService._selectedRoom).toEqual({});
            });
            it('should broadcast `MessageTextSetRoom`', function () {
                spyOn(rootScope, '$broadcast').and.returnValue(true);

                MessageTextService.setRoom('test', 'id');

                expect(rootScope.$broadcast).toHaveBeenCalledWith('MessageTextSetRoom', {});

            });

        });

        describe('setRoom', function () {
            it('should return true , when room id is defined', function () {
                MessageTextService._selectedRoom.id = 'X';

                expect(MessageTextService.isRoomOpen()).toBeTruthy();
            });
            it('should return false , when no room id is defined', function () {
                MessageTextService._selectedRoom = {};

                expect(MessageTextService.isRoomOpen()).toBeFalsy();
            });


        });
        describe('getMessageList', function () {
            it('should return object from `_storageMessages.messages`', function () {
                MessageTextService._storageMessages.messages = {
                    'Id1': 'testData1',
                    'Id2': 'testData2'

                };
                MessageTextService._selectedRoom = {id: 'Id2'};

                expect(MessageTextService.getMessageList()).toBe('testData2');
            });
        });

        describe('send', function () {
            beforeEach(function () {
                spyOn(MessageTextService, '_sendToUser').and.returnValue({text: 'messageUser'});
                spyOn(MessageTextService, '_sendToGroup').and.returnValue({text: 'messageGroup'});
                spyOn(MessageTextService, '_addStoStorage').and.returnValue(true);
            });

            describe('send to user', function () {
                beforeEach(function () {
                    MessageTextService._selectedRoom = {type: 'user', id: 'xx'};
                    MessageTextService.send('messageText');
                });
                it('should call `MessageText._sendToUser`', function () {
                    expect(MessageTextService._sendToUser).toHaveBeenCalledWith('messageText');
                });
                it('should call `MessageText._sendToGroup`', function () {
                    expect(MessageTextService._addStoStorage).toHaveBeenCalledWith('xx', 'xx', {
                        text: 'messageUser',
                        own: true
                    });
                });
            });

            describe('send to group', function () {
                beforeEach(function () {
                    MessageTextService._selectedRoom = {type: 'group', id: 'xx'};
                    MessageTextService.send('messageText');

                });
                it('should call `MessageText._sendToGroup`', function () {
                    expect(MessageTextService._sendToGroup).toHaveBeenCalledWith('messageText');
                });
                it('should call `MessageText._sendToGroup`', function () {
                    expect(MessageTextService._addStoStorage).toHaveBeenCalledWith('xx', 'xx', {
                        text: 'messageGroup',
                        own: true
                    });
                });
            });


        });

        describe('sendRemoveGroup', function () {
            beforeEach(function () {
                spyOn(BrokerService, 'getPeerId').and.returnValue('userPeerId');

            });
            it('should call `PhoneBook.getGroup` with room id', function () {
                spyOn(PhoneBookService, 'getGroup').and.returnValue({owner: 'other'});
                MessageTextService.sendRemoveGroup('roomId');

                expect(PhoneBookService.getGroup).toHaveBeenCalledWith('roomId');
            });

            it('should call `PhoneBook.getGroup` with room id', function () {
                spyOn(PhoneBookService, 'getGroup').and.returnValue({owner: 'other'});

                MessageTextService.sendRemoveGroup('roomId');

                expect(BrokerService.getPeerId).toHaveBeenCalled();
            });

            describe('group owner is not actual user', function () {
                beforeEach(function () {
                    spyOn(PhoneBookService, 'getGroup').and.returnValue({
                        owner: 'otherUse',
                        users: [{id: 'user1'}, {id: 'user1'}]
                    });
                    spyOn(ConnectionService, 'send').and.returnValue(false);
                });

                it('should not call `ConnectionService.send`', function () {
                    MessageTextService.sendRemoveGroup('roomId');
                    expect(ConnectionService.send).not.toHaveBeenCalled();
                });
            });
            describe('group owner is not actual user', function () {
                describe('send to user was successful', function () {
                    beforeEach(function () {
                        spyOn(PhoneBookService, 'getGroup').and.returnValue({
                            owner: 'userPeerId',
                            users: [{id: 'user1'}]
                        });
                        spyOn(ConnectionService, 'send').and.returnValue(true);
                        spyOn(MessageTextService, '_addToQueue').and.returnValue(true);
                    });
                    it('should call `Connection.send`', function () {
                        MessageTextService.sendRemoveGroup('roomId');
                        expect(ConnectionService.send).toHaveBeenCalledWith('user1', {
                            action: 'removeGroup',
                            id: 'roomId'
                        });
                    });

                    it('should not call `MessageText._addToQueue`', function () {
                        MessageTextService.sendRemoveGroup('roomId');
                        expect(MessageTextService._addToQueue).not.toHaveBeenCalled();
                    });

                });

                describe('send to user was not successful', function () {
                    beforeEach(function () {
                        spyOn(PhoneBookService, 'getGroup').and.returnValue({
                            owner: 'userPeerId',
                            users: [{id: 'user1'}]
                        });
                        spyOn(ConnectionService, 'send').and.returnValue(false);
                        spyOn(MessageTextService, '_addToQueue').and.returnValue(true);
                    });
                    it('should call `MessageText._addToQueue`', function () {
                        MessageTextService.sendRemoveGroup('roomId');
                        expect(MessageTextService._addToQueue).toHaveBeenCalledWith('user1', {
                            action: 'removeGroup',
                            id: 'roomId'
                        });
                    });

                });

            });
        });

        describe('_addStoStorage', function () {
            beforeEach(function () {
                spyOn(PhoneBookService, 'copyGroupFromPartner').and.returnValue(true);
            });

            it('should push _storageMessages.messages[roomId] with message', function () {
                MessageTextService._storageMessages.messages = {};
                MessageTextService._addStoStorage('roomId', 'fromUser', {
                    text: 'testText',
                    group: 'testGroup',
                    own: 'ownMessage'
                });

                expect(MessageTextService._storageMessages.messages).toEqual(
                    {
                        roomId: [
                            {
                                text: 'testText',
                                user: 'fromUser',
                                group: 'testGroup',
                                own: 'ownMessage'
                            }
                        ]
                    }
                );
            });

            it('should broadcast `MessageTextGetMessage`', function () {
                spyOn(rootScope, '$broadcast').and.returnValue(true);
                MessageTextService._addStoStorage('roomId', 'fromUser', {
                    text: 'testText',
                    group: 'testGroup',
                    own: 'ownMessage'
                });

                expect(rootScope.$broadcast).toHaveBeenCalledWith('MessageTextGetMessage');
            });

            describe('owner of group is sender', function () {
                beforeEach(function () {
                    MessageTextService._addStoStorage(
                        'roomId',
                        'groupOwner',
                        {
                            text: 'testText',
                            group: {id: 'groupId', owner: 'groupOwner'},
                            own: 'ownMessage'
                        });
                });
                it('should call `phonebook.copyGroupFromPartner` ', function () {
                    expect(PhoneBookService.copyGroupFromPartner).toHaveBeenCalledWith('groupId', {
                        id: 'groupId',
                        owner: 'groupOwner'
                    });
                });
            });

            describe('owner of group is sender', function () {
                beforeEach(function () {
                    MessageTextService._addStoStorage(
                        'roomId',
                        'groupOwner',
                        {
                            text: 'testText',
                            group: {id: 'groupId', owner: 'otherOwner'},
                            own: 'ownMessage'
                        });
                });
                it('should not call `phonebook.copyGroupFromPartner` ', function () {
                    expect(PhoneBookService.copyGroupFromPartner).not.toHaveBeenCalled();
                });
            });

        });

        describe('_sendToUser', function () {
            beforeEach(function () {
                MessageTextService._selectedRoom.id = 'roomId';
                spyOn(BrokerService, 'getPeerId').and.returnValue('peerId');
                spyOn(MessageTextService, '_addToQueue').and.returnValue(true);

            });

            it('should call `Connection.send` with selcted room id and message object', function () {
                spyOn(ConnectionService, 'send').and.returnValue(true);
                MessageTextService._sendToUser('test messageText');
                expect(ConnectionService.send).toHaveBeenCalledWith('roomId', {
                    action: 'textMessage',
                    from: 'peerId',
                    group: '',
                    text: 'test messageText'
                });
            });

            it('should return message object', function () {
                spyOn(ConnectionService, 'send').and.returnValue(true);
                expect(MessageTextService._sendToUser('test')).toEqual({
                    action: 'textMessage',
                    from: 'peerId',
                    group: '',
                    text: 'test'
                });
            });

            describe('Connection.send was not succesfully', function () {
                beforeEach(function () {
                    spyOn(ConnectionService, 'send').and.returnValue(false);
                    MessageTextService._sendToUser('test messageText');
                });
                it('should call `MessageText._addToQueue` with roomId and message object', function () {
                    MessageTextService._sendToUser('test messageText');

                    expect(MessageTextService._addToQueue).toHaveBeenCalledWith('roomId', {
                        action: 'textMessage',
                        from: 'peerId',
                        group: '',
                        text: 'test messageText'
                    });
                });
                it('should return message object', function () {
                    expect(MessageTextService._sendToUser('test')).toEqual({
                        action: 'textMessage',
                        from: 'peerId',
                        group: '',
                        text: 'test'
                    });
                });
            });
        });

        describe('_sendToGroup', function () {
            beforeEach(function () {
                spyOn(BrokerService, 'getPeerId').and.returnValue('clientPeerId');
                spyOn(MessageTextService, '_addToQueue').and.returnValue(true);
            });
            it('should return message object', function () {
                spyOn(PhoneBookService, 'getGroup').and.returnValue({owner: 'clientPeerId', users: []});
                expect(MessageTextService._sendToGroup('test text')).toEqual(
                    {
                        action: 'textMessage',
                        from: 'clientPeerId',
                        group: {owner: 'clientPeerId', users: []},
                        text: 'test text'
                    }
                );
            });

            describe('sender is not owner', function () {
                beforeEach(function () {
                    spyOn(PhoneBookService, 'getGroup').and.returnValue({owner: 'otherPeerId', users: []});

                });
                it('should call `Connection.send` with owner id', function () {
                    spyOn(ConnectionService, 'send').and.returnValue(true);
                    MessageTextService._sendToGroup('test text');
                    expect(ConnectionService.send).toHaveBeenCalledWith('otherPeerId', {
                        action: 'textMessage',
                        from: 'clientPeerId',
                        group: {owner: 'otherPeerId', users: []},
                        text: 'test text'
                    });
                });
                describe('send was successful', function () {
                    it('should not call `MessageText._addToQueue`', function () {
                        spyOn(ConnectionService, 'send').and.returnValue(true);
                        MessageTextService._sendToGroup('test text');
                        expect(MessageTextService._addToQueue).not.toHaveBeenCalled();
                    });
                });

                describe('send was not successful', function () {
                    it('should not call `MessageText._addToQueue` with owner id', function () {
                        spyOn(ConnectionService, 'send').and.returnValue(false);
                        MessageTextService._sendToGroup('test text');
                        expect(MessageTextService._addToQueue).toHaveBeenCalledWith('otherPeerId', {
                            action: 'textMessage',
                            from: 'clientPeerId',
                            group: {owner: 'otherPeerId', users: []},
                            text: 'test text'
                        });
                    });
                });
            });

            describe('sender is owner', function () {
                beforeEach(function () {
                    spyOn(PhoneBookService, 'getGroup').and.returnValue({
                        owner: 'clientPeerId',
                        users: [{id: 'userId'}]
                    });

                });
                it('should call `Connection.send` with userId id', function () {
                    spyOn(ConnectionService, 'send').and.returnValue(true);
                    MessageTextService._sendToGroup('test text');
                    expect(ConnectionService.send).toHaveBeenCalledWith('userId', {
                        action: 'textMessage',
                        from: 'clientPeerId',
                        group: {owner: 'clientPeerId', users: [{id: 'userId'}]},
                        text: 'test text'
                    });
                });
                describe('send was successful', function () {
                    it('should not call `MessageText._addToQueue` ', function () {
                        spyOn(ConnectionService, 'send').and.returnValue(true);
                        MessageTextService._sendToGroup('test text');
                        expect(MessageTextService._addToQueue).not.toHaveBeenCalled();
                    });
                });

                describe('send was not successful', function () {
                    it('should not call `MessageText._addToQueue` with userId id', function () {
                        spyOn(ConnectionService, 'send').and.returnValue(false);
                        MessageTextService._sendToGroup('test text');
                        expect(MessageTextService._addToQueue).toHaveBeenCalledWith('userId', {
                            action: 'textMessage',
                            from: 'clientPeerId',
                            group: {owner: 'clientPeerId', users: [{id: 'userId'}]},
                            text: 'test text'
                        });
                    });
                });
            });

        });

        describe('_addToQueue', function () {
            it('should push `_storageMessages.queue` to peerId key', function () {
                MessageTextService._storageMessages.queue = {};
                MessageTextService._addToQueue('peerId', 'message');
                expect(MessageTextService._storageMessages.queue).toEqual({
                    'peerId': ['message']
                });
            });

        });

        describe('_sendFromQueue', function () {
            describe('peerId has no items in queue ', function () {
                beforeEach(function () {
                    MessageTextService._storageMessages.queue = {};
                    spyOn(ConnectionService, 'send').and.returnValue(true);

                });
                it('should not call `Connection.send` for message in storage queue', function () {

                    MessageTextService._sendFromQueue('peerId');

                    expect(ConnectionService.send).not.toHaveBeenCalled();
                });
            });
            describe('peerId has items in queue ', function () {
                beforeEach(function () {
                    MessageTextService._storageMessages.queue = {'peerId': ['message']};
                });
                it('should not call `Connection.send` for message in storage queue', function () {
                    spyOn(ConnectionService, 'send').and.returnValue(true);
                    MessageTextService._sendFromQueue('peerId');
                    expect(ConnectionService.send).toHaveBeenCalledWith('peerId', 'message');
                });
                describe('`Connection.send` was successful', function () {
                    beforeEach(function () {
                        spyOn(ConnectionService, 'send').and.returnValue(true);
                    });
                    it('should delete peer from queue', function () {
                        MessageTextService._sendFromQueue('peerId');
                        expect(MessageTextService._storageMessages.queue).toEqual({});
                    });
                });
                describe('`Connection.send` was not successful', function () {
                    beforeEach(function () {
                        spyOn(ConnectionService, 'send').and.returnValue(false);
                    });
                    it('should delete peer from queue', function () {
                        MessageTextService._sendFromQueue('peerId');
                        expect(MessageTextService._storageMessages.queue).toEqual({'peerId': ['message']});
                    });
                });

            });

        });
    });
})
;