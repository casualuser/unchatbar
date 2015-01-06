'use strict';

describe('Serivce: Connection', function () {
    var ConnectionService, rootScope;
    beforeEach(module('unchatbar'));


    beforeEach(inject(function ($rootScope, Connection) {
        ConnectionService = Connection;
        rootScope = $rootScope;
    }));

    describe('check methode', function () {
        describe('init' , function(){
           it('should call Connection.add with connection' , function(){
               spyOn(ConnectionService,'_add').and.returnValue(true);
               ConnectionService.init();
               rootScope.$broadcast('client:connect',{connection: 'connection'});

               expect(ConnectionService._add).toHaveBeenCalledWith('connection');
           });
        });

        describe('_add', function () {
            var connection = {}, peerCallBack = {};
            beforeEach(function () {
                connection.peer = 'peerId';
                connection.on = function () {
                };
                spyOn(connection, 'on').and.callFake(function (eventName, callBack) {
                    peerCallBack[eventName] = callBack;
                });
                spyOn(rootScope,'$broadcast').and.returnValue(true);
                ConnectionService._add(connection);
            });

            it('should store connection in _connectionMap' , function(){
                expect(ConnectionService._connectionMap).toEqual(
                    {peerId: {
                        peer : 'peerId',
                        on : jasmine.any(Function)
                    }}
                );
            });

            describe('listener `open`', function () {
                it('should call ConnectionService.on with param `open`', function () {
                    expect(connection.on).toHaveBeenCalledWith('open', jasmine.any(Function));
                });
                it('should broadcast connection open', function () {
                    peerCallBack.open('newPeerId');
                    expect(rootScope.$broadcast).toHaveBeenCalledWith('connection:open', {peerId: 'peerId'});
                });
            });

            describe('listener `close`', function () {
                it('should call ConnectionService.close with param `open`', function () {
                    expect(connection.on).toHaveBeenCalledWith('close', jasmine.any(Function));
                });
                it('should remove connection from storage', function () {
                    peerCallBack.close();
                    expect(ConnectionService._connectionMap).toEqual({});
                });
            });

            describe('listener `data`', function () {
                it('should call ConnectionService.data ', function () {
                    expect(connection.on).toHaveBeenCalledWith('data', jasmine.any(Function));
                });
                it('should broadcast message', function () {
                    peerCallBack.data({action : 'myAction' , message: 'daten'});
                    expect(rootScope.$broadcast).toHaveBeenCalledWith(
                        'connection:getMessage:myAction',  {
                            peerId: 'peerId',
                            message: {action : 'myAction' , message: 'daten'}
                        });
                });
            });
        });

        describe('send' , function(){
            describe('connectionid exists' , function(){
                beforeEach(function(){
                    ConnectionService._connectionMap = {
                      'peerId' : {
                          open: true,
                          send : function(message){
                            return message;
                          }
                      }
                    };
                    spyOn(ConnectionService._connectionMap.peerId,'send').and.returnValue(true);
                });
                it('should call send with message' , function(){
                    ConnectionService.send('peerId','myMessage');
                    expect(ConnectionService._connectionMap.peerId.send).toHaveBeenCalledWith('myMessage');
                });
                it('should return true' , function(){
                    expect(ConnectionService.send('peerId','myMessage')).toBeTruthy();
                });
            });

            describe('connectionid exists' , function(){
                beforeEach(function(){
                    ConnectionService._connectionMap = {};
                });

                it('should return true' , function(){
                    expect(ConnectionService.send('peerId','myMessage')).toBeFalsy();
                });
            });
        });

        describe('getMap' , function(){
            it('should return _connectionMap' , function(){
                ConnectionService._connectionMap = 'test';
                expect(ConnectionService.getMap()).toBe('test');
            });
        });
    });
});