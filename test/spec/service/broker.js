'use strict';

describe('Serivce: Broker', function () {
    var brokerService, brokerProvider,peerService,rootScope, BrokerHeartbeatService;
    beforeEach(module('unchatbar', ['BrokerProvider', function (_brokerProvider) {
        brokerProvider = _brokerProvider;
        brokerProvider.setHost('host.de');
        brokerProvider.setPort(12345);
        brokerProvider.setPath('test/');

    }]));


    beforeEach(inject(function (Broker, Peer, BrokerHeartbeat,$rootScope) {
        rootScope = $rootScope;
        brokerService = Broker;
        peerService = Peer;
        BrokerHeartbeatService = BrokerHeartbeat;
    }));

    describe('check methode', function () {
        describe('_initStorage', function () {
            var sessionStorage ={};
            beforeEach(inject(function($sessionStorage){
                sessionStorage = $sessionStorage;
                spyOn(sessionStorage,'$default').and.returnValue({broker : {test: 'data'}});
                brokerService._initStorage();
            }));
            it('should call `$sessionStorage.$default` with object' , function(){
                expect(sessionStorage.$default).toHaveBeenCalledWith({
                    broker: {
                        peerId: ''
                    }
                });
            });
            it('should set  `brokerService._storage` return value from `$sessionStorage.$default`' , function(){
                expect(brokerService._storage).toEqual({test: 'data'});
            });
        });

        describe('connectServer', function () {
            beforeEach(function () {
               spyOn(brokerService,'_initStorage').and.returnValue(true);
                spyOn(peerService, 'init').and.returnValue('peer');
                spyOn(brokerService, '_peerListener').and.returnValue(true);
                spyOn(BrokerHeartbeatService, 'start').and.returnValue(true);
            });
            it('should call `brokerService._initStorage`', function () {
                brokerService.connectServer();

                expect(brokerService._initStorage).toHaveBeenCalled();
            });
            it('should call Peer.init with peerId and provider options', function () {
                brokerService._storage.peerId = 'peerTest';
                brokerService.connectServer();

                expect(peerService.init).toHaveBeenCalledWith('peerTest', {host: 'host.de', port: 12345, path: 'test/'});
            });
            it('should call _peerListener', function () {
                brokerService.connectServer();

                expect(brokerService._peerListener).toHaveBeenCalled();
            });
            it('should call BrokerHeartbeat', function () {
                brokerService.connectServer();

                expect(BrokerHeartbeatService.start).toHaveBeenCalled();
            });


        });

        describe('_peerListener', function () {
            var peer = {}, peerCallBack = {}, rootScope;
            beforeEach(inject(function ($rootScope) {
                rootScope = $rootScope;
                peer.on = function () {
                };
                spyOn(peerService, 'get').and.returnValue(peer);
                spyOn(peer, 'on').and.callFake(function (eventName, callBack) {
                    peerCallBack[eventName] = callBack;
                });
                brokerService._peerListener();
            }));
            describe('peer.open' , function() {
                beforeEach(function(){
                    spyOn(brokerService,'_onOpen').and.returnValue(true);
                });

                it('should call peer.on with param `open`', function () {
                    expect(peer.on).toHaveBeenCalledWith('open', jasmine.any(Function));
                });
                it('should call `brokerService._onOpen` with `peer`and peerId' , function(){
                    peerCallBack.open('peerId');
                    expect(brokerService._onOpen).toHaveBeenCalledWith('peerId');
                });

            });
            describe('peer.call' , function() {
                beforeEach(function(){
                    spyOn(brokerService,'_onCall').and.returnValue(true);
                });

                it('should call peer.call with param `call`', function () {
                    expect(peer.on).toHaveBeenCalledWith('call', jasmine.any(Function));
                });
                it('should call `brokerService._onCall` with `peer`and peerId' , function(){
                    peerCallBack.call('call');
                    expect(brokerService._onCall).toHaveBeenCalledWith('call');
                });
            });

            describe('peer.connection' , function() {
                beforeEach(function(){
                    spyOn(brokerService,'_onConnection').and.returnValue(true);
                });

                it('should call peer.on with param `connection`', function () {
                    expect(peer.on).toHaveBeenCalledWith('connection', jasmine.any(Function));
                });
                it('should call `brokerService._onConnection` with `peer`and peerId' , function(){
                    peerCallBack.connection('connection');
                    expect(brokerService._onConnection).toHaveBeenCalledWith('connection');
                });
            });

            describe('peer.error' , function() {
                beforeEach(function(){
                    spyOn(brokerService,'_onError').and.returnValue(true);
                });

                it('should call peer.on with param `error`', function () {
                    expect(peer.on).toHaveBeenCalledWith('error', jasmine.any(Function));
                });
                it('should call `brokerService._onError` with `peer`and peerId' , function(){
                    peerCallBack.error('error');
                    expect(brokerService._onError).toHaveBeenCalledWith('error');
                });
            });


        });

        describe('_onOpen' , function(){
            beforeEach(function(){
                spyOn(rootScope, '$broadcast').and.returnValue(true);
                brokerService._onOpen('newPeerId');
            });
            it('should set peerid from callback storage peerId', function () {
                 expect(brokerService._storage.peerId).toBe('newPeerId');
            });
            it('should broadcast on $rootscope new peerid', function () {
                expect(rootScope.$broadcast).toHaveBeenCalledWith('BrokerPeerOpen', {id: 'newPeerId'});
            });
        });

        describe('_onCall' , function() {
            beforeEach(function () {
                spyOn(rootScope, '$broadcast').and.returnValue(true);
                brokerService._onCall('call');
            });
            it('should broadcast call on $rootscope', function () {
                expect(rootScope.$broadcast).toHaveBeenCalledWith('BrokerPeerCall', {client: 'call'});
            });
        });

        describe('_onConnection' , function() {
            beforeEach(function () {
                spyOn(rootScope, '$broadcast').and.returnValue(true);
                brokerService._onConnection('connection');
            });
            it('should broadcast call on $rootscope', function () {
                expect(rootScope.$broadcast).toHaveBeenCalledWith('BrokerPeerConnection', {connection: 'connection'});
            });
        });

        describe('_onError' , function() {
            beforeEach(function () {
                spyOn(rootScope, '$broadcast').and.returnValue(true);
                brokerService._onError('error');
            });
            it('should broadcast call on $rootscope', function () {
                expect(rootScope.$broadcast).toHaveBeenCalledWith('BrokerPeerError', {error: 'error'});
            });
        });

        describe('connect', function () {
            var peer = {};
            beforeEach(function(){
                peer.connect = function(){};
                spyOn(peerService, 'get').and.returnValue(peer);

            });
            it('should call `peer.connect` with connect id' , function(){
                spyOn(peer,'connect').and.returnValue('clientConnection');

                brokerService.connect('clientId');

                expect(peer.connect).toHaveBeenCalledWith('clientId');
            });

            it('should broadcast `BrokerPeerConnection` with return from peer.connect' , inject(function($rootScope){
                spyOn(peer,'connect').and.returnValue('clientConnection');
                spyOn($rootScope,'$broadcast').and.returnValue(true);

                brokerService.connect('clientId');

                expect($rootScope.$broadcast).toHaveBeenCalledWith('BrokerPeerConnection', {
                    connection: 'clientConnection'
                });
            }));
        });

        describe('connectStream', function () {
            var peer = {};
            beforeEach(function(){
                peer.call = function(){};
                spyOn(peerService, 'get').and.returnValue(peer);

            });
            it('should call `peer.connect` with connect id' , function(){
                spyOn(peer,'call').and.returnValue('clientConnection');

                brokerService.connectStream('clientId','stream','metadata');

                expect(peer.call).toHaveBeenCalledWith('clientId','stream',{metadata: 'metadata'});
            });
        });

        describe('getPeerId', function () {
            it('should return server id from peer ' , function(){
                spyOn(peerService, 'get').and.returnValue({id: 'OurId'});

                expect(brokerService.getPeerId()).toBe('OurId');
            });


        });

    });
})
;