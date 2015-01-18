angular.module("constants",[]).constant("LOCALSTORAGE",!0),angular.module("unchatbar",["constants","cgNotify","ngStorage","ui.router","ui.bootstrap","angularjs-dropdown-multiselect"]),angular.module("unchatbar").run(["$templateCache",function(a){"use strict";a.put("views/peer/connection-center.html",'<div class=panel-group role=tablist aria-multiselectable=true data-ng-init="setView(\'dashboard\')"><div class="panel panel-default"><div class=panel-heading role=tab><h4 class=panel-title><span data-ng-click="setView(\'dashboard\')">Dashboard {{panelInfo.dashboard || \'\'}}</span></h4></div><div class="panel-collapse collapse" data-ng-class="{in: showPanel === \'dashboard\'}" role=tabpanel aria-labelledby=headingOne><div class=panel-body>TODO DASHBOARD</div></div></div><div class="panel panel-default"><div class=panel-heading role=tab><h4 class=panel-title><span data-ng-click="setView(\'phoneBook\')">Phone book {{panelInfo.phoneBook || \'\'}}</span></h4></div><div class="panel-collapse collapse" data-ng-class="{in: showPanel === \'phoneBook\'}" role=tabpanel aria-labelledby=headingOne><div class=panel-body><phone-book-admin></phone-book-admin></div></div></div><div class="panel panel-default"><div class=panel-heading role=tab><div class=row><div class=col-md-3 data-ng-click="setView(\'chat\')"><h4 class=panel-title>Text chat</h4></div><div class=col-md-9><phone-book></phone-book></div></div></div><div class="panel-collapse collapse" data-ng-class="{in: showPanel === \'chat\'}" role=tabpanel aria-labelledby=headingOne><div class=panel-body><text-message-list></text-message-list></div></div></div><div class="panel panel-default"><div class=panel-heading role=tab><div class=row><div class=col-md-3 data-ng-click="setView(\'stream\')"><h4 class=panel-title>Audio/Video</h4></div><div class=col-md-9><phone-book-stream></phone-book-stream></div></div></div><div class="panel-collapse collapse" data-ng-class="{in: showPanel === \'stream\'}" role=tabpanel aria-labelledby=headingOne><div class=panel-body><stream></stream></div></div></div></div>'),a.put("views/peer/dialer.html",'<div ng-show=peerId><form class=form-inline><div class=form-group><div class=input-group><input class=form-control data-ng-model=connectId placeholder="client id"><div data-ng-click=connect() class=input-group-addon><i class="fa fa-check fa-1x"></i></div></div></div></form><hr></div>'),a.put("views/peer/layout/chat/content.html",'<div class="col-xs-12 col-sm-9"><div class=jumbotron><active-user></active-user></div><div class=row><div class="col-xs-12 col-lg-12"><h2>Video/Audio</h2><stream></stream></div></div><div class=row><div class="col-xs-12 col-lg-12"><h2>Chat</h2><text-message-list></text-message-list></div></div></div>'),a.put("views/peer/layout/chat/footer.html","<footer><p>&copy; Company 2014</p></footer>"),a.put("views/peer/layout/chat/header.html",'<nav class="navbar navbar-fixed-top navbar-inverse"><div class=container data-ng-init="isCollapse=false"><div class=navbar-header><button type=button class="navbar-toggle collapsed" data-ng-click="isCollapse=!isCollapse" aria-expanded=false aria-controls=navbar><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button><profile></profile><notification-textmessage class=navbar-brand></notification-textmessage></div><div id=navbar class="collapse navbar-collapse" data-ng-class="{\'in\' : isCollapse}"><ul class="nav navbar-nav"><li><a ui-sref-active=active ui-sref=chat.profile>Profile</a></li></ul></div></div></nav>'),a.put("views/peer/layout/chat/index.html",'<div data-ui-view=header></div><div class=container data-ng-init="offcanvas=false"><div class="row row-offcanvas row-offcanvas-left" data-ng-class="{\'active\': offcanvas}"><p class="pull-left visible-xs"><i data-ng-click="offcanvas=!offcanvas" class="fa fa-book fa-4x"></i></p><div data-ui-view=sidebar></div><div data-ui-view=content></div></div><hr></div>'),a.put("views/peer/layout/chat/sidebar.html",'<div class="col-xs-6 col-sm-3 sidebar-offcanvas active"><div class=list-group><phone-book></phone-book></div></div>'),a.put("views/peer/layout/login.html",'<div class=container data-ng-controller=broker><form class=form-signin><h2 class=form-signin-heading>Please sign in</h2><label for=peerId class=sr-only>your Phonenumber</label><input id=peerId class=form-control data-ng-model=peerId placeholder="your phone Number" required autofocus> <button class="btn btn-lg btn-primary btn-block" type=submit data-ng-click=login();>Sign in</button></form></div>'),a.put("views/peer/modal/streamOption.html",'<div class=modal-header><h3 class=modal-title>call option</h3></div><div class=modal-body><div class=row><div class="col-xs-6 text-left"><button type=button class="btn btn-default btn-lg" aria-label="Left Align" ng-click=videoCall()><i class="glyphicon glyphicon-facetime-video"></i>Video</button></div><div class="col-xs-6 text-right"><button type=button class="btn btn-default btn-lg" ng-click=audiCall() aria-label="Left Align" ng-click=videoCall()><i class="glyphicon glyphicon-earphone"></i>Audio</button></div></div></div>'),a.put("views/peer/notification/text-message.html",'<span data-ng-init=getUnreadMessages()><span class=dropdown dropdown on-toggle=toggled(open)><a href class=dropdown-toggle dropdown-toggle><i class="fa fa-comment-o fa-6">{{countUnreadMessages}}</i></a><ul class=dropdown-menu><li data-ng-show="unreadMessages !== {}" class=list-group-item><a href=void();>no data</a></li><li ng-repeat="(index,room) in unreadMessages"><div data-ng-repeat="message in room"><a data-ng-show="index !== message.user" ui-sref="chat.group({groupId: message.groupId})" class=list-group-item>{{getGroup(index).label}}/{{getClient(message.user).label}} : {{message.text}}</a> <a data-ng-show="index === message.user" ui-sref-active=active ui-sref="chat.user({peerId: message.user})" class=list-group-item>{{getClient(message.user).label}} : {{message.text}}</a></div></li></ul></span></span>'),a.put("views/peer/phoneBook/active-user.html",'<div data-ng-init=getClientAndGroups()><div data-ng-show=selectedUser><i data-ng-click="offcanvas=!offcanvas" class="fa fa-user fa-4x"></i><p>{{clientMap[selectedUser].label}}</p><hr><div class="btn btn-success call" data-ng-click=streamToClient(selectedUser)><i class="fa fa-phone fa-3x"></i>single call</div><div class="btn btn-success call" data-ng-click=removeClient(selectedUser)><i class="fa fa-trash fa-3x"></i></div></div><div data-ng-show=selectedGroup><i data-ng-click="offcanvas=!offcanvas" class="fa fa-users fa-4x"></i><p>{{groupMap[selectedGroup].label}}</p><hr><div class="btn btn-success call" data-ng-click=streamToConferenceByGroupId(selectedGroup)><i class="fa fa-phone fa-3x"></i></div><div class="btn btn-success call" data-ng-click=removeGroup(selectedGroup)><i class="fa fa-trash fa-3x"></i></div><div class="btn btn-success call" ng-if="groupMap[selectedGroup].editable === true"><span ng-dropdown-multiselect="" extra-settings="{showCheckAll:false,showUncheckAll : false}" events="{onItemSelect : addUserToGroup,onItemDeselect : removeUserFromGroup}" options="clientMap | filter:ownPeerId" translation-texts="{buttonDefaultText: group.label,dynamicButtonTextSuffix: \'users\'}" selected-model=groupMap[selectedGroup].users></span></div></div></div>'),a.put("views/peer/phoneBook/addNewGroup.html",""),a.put("views/peer/phoneBook/book.html",'<div data-ng-init=init()><tabset justified=true><tab heading=user active=selectedUser><dialer></dialer><br><div ng-repeat="(peerId,connection) in clientMap"><a ui-sref-active=active ui-sref="chat.user({peerId: peerId})" class=list-group-item>{{connection.label}}</a></div></tab><tab heading=Groupps active=selectedGroup><div><form class=form-inline><div class=form-group><div class=input-group><input class=form-control data-ng-model=form.newGroupName placeholder="add new group"><div data-ng-click=createGroup() class=input-group-addon><i class="fa fa-check fa-1x"></i></div></div></div></form><hr></div><br><div ng-repeat="(groupId,group) in groupMap"><a ui-sref-active=active ui-sref="chat.group({groupId: groupId})" class=list-group-item>{{group.label}}</a></div></tab></tabset></div>'),a.put("views/peer/profile-admin.html",'<div class="col-xs-12 col-sm-9" data-ng-controller=profile data-ng-init=init()><form><div class=form-group><label for=profileLabel>Name</label><input required class=form-control id=profileLabel data-ng-model=profile.label placeholder="Enter our name"></div><button type=submit data-ng-click=update() class="btn btn-default">save</button></form></div>'),a.put("views/peer/profile.html","<div data-ng-init=init(); class=navbar-brand>{{peerId}}</div>"),a.put("views/peer/stream/client-stream.html",'<div>user : {{user.label}}<div ng-switch=streamType><div ng-switch-when=video><video-stream type={{type}} stream-id={{streamId}}></video-stream></div><div ng-switch-when=audio><i class="glyphicon glyphicon-volume-up"></i><audio-stream type={{type}} stream-id={{streamId}}></audio-stream></div><div ng-switch-when=isCalling><i class="fa fa-spinner fa-5x fa-spin"></i>is calling</div><button ng-click=close() type=button class="btn btn-danger">hangup</button></div></div>'),a.put("views/peer/stream/stream-video.html","<video autoplay data-ng-show=isVisible width=200></video>"),a.put("views/peer/stream/stream.html",'<div><div data-ng-repeat="(streamId,stream) in streamConferenceMap"><client-stream stream=stream type=conference width=200></client-stream></div><br><hr><div data-ng-repeat="(streamId,stream) in streamMap"><client-stream stream=stream type="\'single\'" width=200></client-stream></div><own-stream-video></own-stream-video></div>'),a.put("views/peer/stream/type/audio.html","<audio autoplay autoplay width=200></audio>"),a.put("views/peer/stream/type/video.html","<video autoplay autoplay width=200></video>"),a.put("views/peer/text-message-list.html","<div class=\"panel panel-default\" data-ng-init=init()><div class=panel-body><div ng-repeat=\"mess in messageList\"><p data-ng-class=\"{'text-left': mess.own === true,'text-right': mess.own === false}\"><span data-ng-show=mess.roomName>{{mess.roomName}}:</span> {{mess.own ? 'XX' + getProfileName(): getUserName(mess.user)}}</p><p class=triangle-right data-ng-class=\"{'left': mess.own === true,'right': mess.own === false}\">{{mess.text}}</p></div></div><div class=panel-footer data-ng-show=isRoomSelected><input data-ng-model=message placeholder=text class=form-control> <button data-ng-click=send() type=button class=\"btn btn-lg btn-primary btn-block\">send</button></div></div>")}]),angular.module("unchatbar").provider("Broker",function(){var a="",b="",c="",d=!1;this.setHost=function(b){a=b},this.setPort=function(a){b=a},this.setPath=function(a){c=a},this.setLocalStorage=function(){d=!0},this.$get=["$rootScope","$localStorage","$sessionStorage","Peer",function(e,f,g,h){var i={_brokerWorker:null,_storage:{peerId:""},init:function(){this._initStorage(),this._brokerWorker=new Worker("scripts/worker/broker-worker.js")},connectServer:function(){h.init(this._storage.peerId,{host:a,port:b,path:c}),this._peerListener()},connect:function(a){var b=h.get().connect(a);i._holdBrokerConnection(),e.$broadcast("BrokerPeerConnection",{connection:b})},connectStream:function(a,b,c){return h.get().call(a,b,{metadata:c})},setPeerId:function(a){i._storage.peerId=a},getPeerId:function(){return h.get().id||""},getPeerIdFromStorage:function(){return this._storage.peerId},_holdBrokerConnection:function(){this._brokerWorker.addEventListener("message",function(){var a=i._isBrowserOnline();a===!0&&h.get().socket._wsOpen()?h.get().socket.send({type:"HEARTBEAT"}):a===!0&&i.connectServer()},!1),this._brokerWorker.postMessage("HEARTBEAT")},_isBrowserOnline:function(){return navigator.onLine},_initStorage:function(){var a=d?f:g;this._storage=a.$default({broker:{peerId:""}}).broker},_peerListener:function(){var a=h.get();a.on("open",function(a){i._onOpen(a)}),a.on("call",function(a){i._onCall(a)}),a.on("connection",function(a){i._onConnection(a)}),a.on("error",function(a){i._onError(a)})},_onOpen:function(a){e.$apply(function(){i.setPeerId(a),e.$broadcast("BrokerPeerOpen",{id:a})})},_onCall:function(a){e.$apply(function(){e.$broadcast("BrokerPeerCall",{client:a})})},_onConnection:function(a){e.$apply(function(){e.$broadcast("BrokerPeerConnection",{connection:a})})},_onError:function(a){e.$apply(function(){e.$broadcast("BrokerPeerError",{error:a})})}};return i}]}),angular.module("unchatbar").provider("Profile",function(){var a=!1;this.setLocalStorage=function(){a=!0},this.$get=["$rootScope","$localStorage","$sessionStorage","Connection",function(b,c,d,e){return{_storageProfile:{profile:{}},init:function(){this._initStorage(),b.$on("ConnectionOpen",function(a,b){e.send(b.peerId,{action:"profile",profile:this.get()})}.bind(this))},_initStorage:function(){var b=a?c:d;this._storageProfile=b.$default({profile:{}})},get:function(){return _.clone(this._storageProfile.profile)},set:function(a){this._storageProfile.profile=a,this._sendProfileUpdate(),b.$broadcast("profileUpdate")},_sendProfileUpdate:function(){_.forEach(e.getMap(),function(a,b){e.send(b,{action:"profile",profile:this.get()})}.bind(this))}}}]}),angular.module("unchatbar").provider("PhoneBook",function(){var a=!1;this.setLocalStorage=function(){a=!0},this.$get=["$rootScope","$sessionStorage","$localStorage","Broker",function(b,c,d,e){var f={_storagePhoneBook:{user:{},groups:{}},init:function(){this._initStorage(),b.$on("BrokerPeerConnection",function(a,b){f.addClient(b.connection.peer,{label:b.connection.peer})}),b.$on("BrokerPeerCall",function(a,b){f.addClient(b.client.peer,b.client.metadata.profile)}),b.$on("BrokerPeerOpen",function(){_.forEach(f.getClientMap(),function(a){a.id&&e.connect(a.id)})}),b.$on("ConnectionGetMessageprofile",function(a,b){f.updateClient(b.peerId,b.message.profile.label||"")}),b.$on("ConnectionGetMessageupdateUserGroup",function(a,b){f.copyGroupFromPartner(b.message.group.id,b.message.group)}),b.$on("ConnectionGetMessageremoveGroup",function(a,b){f._removeGroupByClient(b.peerId,b.message.roomId)})},_initStorage:function(){var b=a?d:c;this._storagePhoneBook=b.$default({phoneBook:{user:{},groups:{}}}).phoneBook},addClient:function(a,b){var c=!1;return this._storagePhoneBook.user[a]||a===e.getPeerId()||(b.id=a,this._storagePhoneBook.user[a]=b,c=!0),this._sendUpdateEvent(),c},updateClient:function(a,b){this._storagePhoneBook.user[a]={label:b||a,id:a},this._sendUpdateEvent()},getClient:function(a){return this._storagePhoneBook.user[a]||""},getClientMap:function(){return this._storagePhoneBook.user},removeClient:function(a){delete this._storagePhoneBook.user[a],this._sendUpdateEvent()},copyGroupFromPartner:function(a,b){-1!==_.findIndex(b.users,{id:e.getPeerId()})?(b.editable=!1,this._storagePhoneBook.groups[a]=b,_.forEach(this._storagePhoneBook.groups[a].users,function(a){e.getPeerId()!==a.id&&this.addClient(a.id,{})&&e.connect(a.id)}.bind(this)),this._sendUpdateEvent()):this._storagePhoneBook.groups[a]&&(delete this._storagePhoneBook.groups[a],this._sendUpdateEvent())},addGroup:function(a){var b=e.getPeerId(),c=[{id:e.getPeerId()}];if(b){var d=this.createNewGroupId();this._storagePhoneBook.groups[d]={label:a,users:c,owner:b,editable:!0,id:d}}this._sendUpdateEvent()},updateGroup:function(a,b){this._storagePhoneBook.groups[a]=b,this._sendUpdateEvent()},createNewGroupId:function(){return e.getPeerId()+(new Date).getTime()},getGroup:function(a){return this._storagePhoneBook.groups[a]},removeGroup:function(a){delete this._storagePhoneBook.groups[a],this._sendUpdateEvent()},_removeGroupByClient:function(a,b){if(this._storagePhoneBook.groups[b].owner===a)delete this._storagePhoneBook.groups[b];else{var c=_.findIndex(this._storagePhoneBook.groups[b].users,{id:a});-1!==c&&this._storagePhoneBook.groups[b].users.splice(c,1)}this._sendUpdateEvent()},getGroupMap:function(){return _.cloneDeep(this._storagePhoneBook.groups)},_sendUpdateEvent:function(){b.$broadcast("PhoneBookUpdate",{})}};return f}]}),angular.module("unchatbar").provider("MessageText",function(){var a=!1;this.setLocalStorage=function(){a=!0},this.$get=["$rootScope","$localStorage","$sessionStorage","Broker","PhoneBook","Connection","Notify",function(b,c,d,e,f,g,h){var i={_selectedRoom:{},_storageMessages:{messages:{},messageInbox:{},queue:{}},init:function(){this._initStorage(),b.$on("ConnectionOpen",function(a,b){i._sendFromQueue(b.peerId)}),b.$on("ConnectionGetMessagetextMessage",function(a,b){h.textMessage("you have new messages"),i._addToInbox(b.message.groupId||b.peerId,b.peerId,b.message)}),b.$on("ConnectionGetMessagereadMessage",function(a,b){i._removeFromQueue(b.peerId,b.message.id)})},setRoom:function(a,c){this._selectedRoom={},c&&(this._selectedRoom={type:a,id:c}),b.$broadcast("MessageTextSetRoom",{})},isRoomOpen:function(){return this._selectedRoom.id?!0:!1},getMessageList:function(){return this._moveFromInboxToMessageStorage(this._selectedRoom.id),this._storageMessages.messages[this._selectedRoom.id]||[]},getMessageInbox:function(){return this._storageMessages.messageInbox},send:function(a){var b={};this._selectedRoom.type&&("user"===this._selectedRoom.type?b=this._sendToUser(a):"group"===this._selectedRoom.type&&(b=this._sendToGroup(a)),b.own=!0,this._addStoStorage(this._selectedRoom.id,this._selectedRoom.id,b))},sendGroupUpdateToUsers:function(a,b){var c=this._getMessageObject("updateUserGroup",{group:b});b.owner===e.getPeerId()&&_.forEach(a,function(a){a.id!==e.getPeerId()&&(g.send(a.id,c),this._addToQueue(a.id,c))}.bind(this))},sendRemoveGroup:function(a){var b={},c={};b=f.getGroup(a).users,c=this._getMessageObject("removeGroup",{roomId:a}),_.forEach(b,function(a){e.getPeerId()!==a.id&&a.id!==e.getPeerId()&&(g.send(a.id,c),this._addToQueue(a.id,c))}.bind(this))},_initStorage:function(){var b=a?c:d;this._storageMessages=b.$default({message:{messages:{},messageInbox:{},queue:{}}}).message},_addStoStorage:function(a,b,c){this._storageMessages.messages[a]||(this._storageMessages.messages[a]=[]),this._storageMessages.messages[a].push({text:c.text,user:b,own:c.own})},_addToInbox:function(a,c,d){this._storageMessages.messageInbox[a]||(this._storageMessages.messageInbox[a]=[]),this._storageMessages.messageInbox[a].push({text:d.text,user:c,own:d.own}),b.$broadcast("MessageTextGetMessage",{isRoomVisible:a===this._selectedRoom.id})},_moveFromInboxToMessageStorage:function(a){this._storageMessages.messageInbox[a]&&(_.forEach(this._storageMessages.messageInbox[a],function(b){i._addStoStorage(a,b.user,b)}.bind(this)),delete this._storageMessages.messageInbox[a],b.$broadcast("MessageTextMoveToStorage",{}))},_sendToUser:function(a){var b=this._getMessageObject("textMessage",{text:a});return g.send(this._selectedRoom.id,b),this._addToQueue(this._selectedRoom.id,b),b},_sendToGroup:function(a){var b=f.getGroup(this._selectedRoom.id),c=this._getMessageObject("textMessage",{groupId:b.id,text:a});return _.forEach(b.users,function(a){a.id!==e.getPeerId()&&(g.send(a.id,c),this._addToQueue(a.id,c))}.bind(this)),c},_getMessageObject:function(a,b){return b.id=this._createUUID(),b.action=a,b},_createUUID:function(){function a(a){var b=(Math.random().toString(16)+"000000000").substr(2,8);return a?"-"+b.substr(0,4)+"-"+b.substr(4,4):b}return a()+a(!0)+a(!0)+a()},_addToQueue:function(a,b){this._storageMessages.queue[a]||(this._storageMessages.queue[a]={}),this._storageMessages.queue[a][b.id]=b},_sendFromQueue:function(a){this._storageMessages.queue[a]&&_.forEach(this._storageMessages.queue[a],function(b){g.send(a,b)}.bind(this))},_removeFromQueue:function(a,b){this._storageMessages.queue[a]&&this._storageMessages.queue[a][b]&&delete this._storageMessages.queue[a][b],0===_.size(this._storageMessages.queue[a])&&delete this._storageMessages.queue[a]}};return i}]}),angular.module("unchatbar").config(["BrokerProvider","PhoneBookProvider","ProfileProvider","MessageTextProvider","LOCALSTORAGE",function(a,b,c,d,e){e===!0&&(a.setLocalStorage(),c.setLocalStorage(),b.setLocalStorage(),d.setLocalStorage()),a.setHost("unchatbar-server.herokuapp.com"),a.setPort(80)}]),angular.module("unchatbar").config(["$stateProvider","$locationProvider",function(a,b){b.html5Mode(!0),a.state("login",{url:"/login",templateUrl:"views/peer/layout/login.html"}).state("layoutChat",{"abstract":!0,templateUrl:"views/peer/layout/chat/index.html"}).state("chat",{parent:"layoutChat",url:"/chat",views:{header:{templateUrl:"views/peer/layout/chat/header.html"},sidebar:{templateUrl:"views/peer/layout/chat/sidebar.html"},content:{templateUrl:"views/peer/layout/chat/content.html"},footer:{templateUrl:"views/peer/layout/chat/footer.html"}}}).state("chat.user",{url:"/user/{peerId}",parent:"chat"}).state("chat.group",{url:"/group/{groupId}",parent:"chat"}).state("chat.profile",{url:"/profile",parent:"layoutChat",views:{header:{templateUrl:"views/peer/layout/chat/header.html"},sidebar:{templateUrl:"views/peer/layout/chat/sidebar.html"},content:{templateUrl:"views/peer/profile-admin.html"},footer:{templateUrl:"views/peer/layout/chat/footer.html"}}})}]),angular.module("unchatbar").service("Stream",["$timeout","$rootScope","$q","Broker","Profile","Connection",function(a,b,c,d,e,f){var g={_stream:{stream:{single:{},conference:{}},ownStream:{}},init:function(){b.$on("BrokerPeerCall",function(a,b){g._onBrokerCall(b.client,b.client.metadata.streamOption)}),b.$on("ConnectionGetMessageupdateStreamGroup",function(a,b){g._callToGroupUsersFromClient(b.peerId,b.message.users)})},callUser:function(a,b){this._createOwnStream(b).then(function(c){g._listenOnClientStreamConnection(d.connectStream(a,c,{profile:e.get(),type:"single",streamOption:b}))})},callConference:function(a,b,c){null===g.getConferenceClient(b)&&d.getPeerId()!==b&&this._createOwnStream(c).then(function(f){g._listenOnClientStreamConnection(d.connectStream(b,f,{profile:e.get(),roomId:a,streamOption:c,type:"conference"}))})},getOwnStream:function(a){var b=this._getOwnStreamKeyByOption(a);return this._stream.ownStream[b]||null},getConferenceClientsMap:function(){return this._stream.stream.conference},getConferenceClient:function(a){return this._stream.stream.conference[a]||null},getClientStream:function(a){return this._stream.stream.single[a]},getClientStreamMap:function(){return this._stream.stream.single},closeAllOwnMedia:function(){_.forEach(this._stream.ownStream,function(a,b){a.stop(),delete this._stream.ownStream[b]}.bind(this)),b.$broadcast("StreamCloseOwn",{})},_onBrokerCall:function(a,b){this._createOwnStream(b).then(function(b){a.answer(b),g._listenOnClientStreamConnection(a)})},_createOwnStream:function(a){var d=c.defer();return navigator.getUserMedia=this._getUserMediaApi(),0===navigator.getUserMedia?d.reject("no media api"):this.getOwnStream(a)?d.resolve(this.getOwnStream(a)):navigator.getUserMedia(a,function(c){var e=this._getOwnStreamKeyByOption(a);this._stream.ownStream[e]=c,b.$broadcast("StreamAddOwn",{streamOption:a}),d.resolve(c)}.bind(this),function(a){return d.reject(a)}),d.promise},_getOwnStreamKeyByOption:function(a){var b="";return _(a).forEach(function(a,c){b+=c+"_"+a}),b},_getUserMediaApi:function(){return navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia},_addEmptyStreamCall:function(a){"single"===a.metadata.type?g._addSingleStream(a,null):"conference"===a.metadata.type&&g._addConferenceStream(a,null)},_listenOnClientStreamConnection:function(a){g._addEmptyStreamCall(a),a.on("stream",function(a){"single"===this.metadata.type?(g._addSingleStream(this,a),b.$apply()):"conference"===this.metadata.type&&(g._addConferenceStream(this,a),g._sendOwnUserFromConference(this.peer),b.$apply())}),a.on("close",function(){"single"===this.metadata.type?g._removeSingleStreamClose(this.peer):"conference"===this.metadata.type&&g._removeConferenceStreamClose(this.peer)})},_sendOwnUserFromConference:function(a){f.send(a,{action:"updateStreamGroup",users:_.keys(g.getConferenceClientsMap())})},_callToGroupUsersFromClient:function(a,b){var c,d;null!==g.getConferenceClient(a)&&(c=g.getConferenceClient(a).option,d=g.getConferenceClient(a).roomId,_.forEach(b,function(a){g.callConference(d,a,c)}))},_addSingleStream:function(a,c){g._stream.stream.single[a.peer]={stream:c,peerId:a.peer,call:a},b.$broadcast("StreamAddClient")},_removeSingleStreamClose:function(a){g._stream.stream.single[a]&&(delete g._stream.stream.single[a],b.$broadcast("StreamDeleteClient"))},_addConferenceStream:function(a,c){g._stream.stream.conference[a.peer]={stream:c,option:a.metadata.streamOption,roomId:a.metadata.roomId,peerId:a.peer,call:a},b.$broadcast("StreamAddClientToConference")},_removeConferenceStreamClose:function(a){g._stream.stream.conference[a]&&(delete g._stream.stream.conference[a],b.$broadcast("StreamDeleteClientToConference"))}};return g}]),angular.module("unchatbar").controller("broker",["$scope","$state","Broker",function(a,b,c){a.peerId="",a.login=function(){c.setPeerId(a.peerId),c.connectServer(),b.go("chat")}}]),angular.module("unchatbar").controller("phoneBook",["$scope","$stateParams","MessageText","PhoneBook","Broker",function(a,b,c,d,e){a.form={},a.clientMap={},a.groupMap={},a.selectedUser="",a.selectedGroup="",a.ownPeerId=e.getPeerId(),a.getClientAndGroups=function(){a.clientMap=d.getClientMap(),a.groupMap=d.getGroupMap(),a.selectedGroup&&!a.groupMap[a.selectedGroup]&&a.setGroup(""),a.selectedUser&&!a.clientMap[a.selectedUser]&&a.setClient("")},a.setClient=function(b){c.setRoom("user",b),a.selectedGroup="",a.selectedUser=b},a.setGroup=function(b){c.setRoom("group",b),a.selectedGroup=b,a.selectedUser=""},a.createGroup=function(){d.addGroup(a.form.newGroupName),a.form.newGroupName=""},a.init=function(){a.getClientAndGroups(),a.selectedUser=b.peerId||"",a.selectedGroup=b.groupId||"",b.peerId?a.setClient(b.peerId):b.groupId&&a.setGroup(b.groupId)},a.$on("$stateChangeSuccess",function(){a.init()}),a.$on("PhoneBookUpdate",function(){a.getClientAndGroups()})}]),angular.module("unchatbar").controller("phoneBookAdmin",["$scope","$state","$stateParams","$modal","MessageText","PhoneBook","Stream",function(a,b,c,d,e,f,g){a.selectedUser="",a.selectedGroup="",a.clientMap={},a.groupMap={},a.removeClient=function(a){f.removeClient(a),b.go("chat")},a.getClientAndGroups=function(){a.clientMap=f.getClientMap(),a.groupMap=f.getGroupMap(),a.selectedUser=c.peerId||"",a.selectedGroup=c.groupId||""},a.removeGroup=function(a){e.sendRemoveGroup(a),f.removeGroup(a),b.go("chat")},a.addUserToGroup=function(){if(a.selectedGroup){var b=a.groupMap[a.selectedGroup].users;e.sendGroupUpdateToUsers(b,a.groupMap[a.selectedGroup]),f.updateGroup(a.selectedGroup,a.groupMap[a.selectedGroup])}},a.removeUserFromGroup=function(){if(a.selectedGroup){var b=f.getGroup(a.selectedGroup).users;e.sendGroupUpdateToUsers(b,a.groupMap[a.selectedGroup]),f.updateGroup(a.selectedGroup,a.groupMap[a.selectedGroup])}},a.getUserName=function(a){return f.getClient(a).label||a},a.streamToClient=function(a){d.open({templateUrl:"views/peer/modal/streamOption.html",controller:"modalStreamOption",size:"sm"}).result.then(function(b){g.callUser(a,b)})},a.streamToConferenceByGroupId=function(b){d.open({templateUrl:"views/peer/modal/streamOption.html",controller:"modalStreamOption",size:"sm"}).result.then(function(c){_.forEach(a.groupMap[b].users,function(a){g.callConference(b,a.id,c)})})},a.$on("PhoneBookUpdate",function(){a.getClientAndGroups()}),a.$on("$stateChangeSuccess",function(){a.selectedUser=c.peerId||"",a.selectedGroup=c.groupId||""})}]),angular.module("unchatbar").controller("dialer",["$scope","Broker",function(a,b){a.peerId=b.getPeerId(),a.connectId="",a.connect=function(){b.connect(a.connectId),a.connectId=""},a.$on("BrokerPeerOpen",function(){a.peerId=b.getPeerId()})}]),angular.module("unchatbar").controller("textMessageList",["$scope","$stateParams","MessageText","PhoneBook","Profile",function(a,b,c,d,e){a.isRoomSelected=!1,a.message="",a.messageList=[],a.send=function(){c.send(a.message),a.messageList=c.getMessageList(),a.message=""},a.getUserName=function(a){return d.getClient(a).label||a},a.init=function(){a.isRoomSelected=b.peerId||b.groupId,a.messageList=c.getMessageList()},a.getProfileName=function(){return e.get().label},a.$on("MessageTextSetRoom",function(){a.init()}),a.$on("MessageTextGetMessage",function(){a.messageList=c.getMessageList()})}]),angular.module("unchatbar").controller("connectionCenter",["$scope",function(a){a.showPanel="",a.setView=function(b){a.showPanel=a.showPanel===b?"":b,a.$broadcast("setView",{name:a.showPanel})}}]),angular.module("unchatbar").controller("profile",["$scope","Profile","Broker",function(a,b,c){a.peerId=c.getPeerId(),a.profile={},a.init=function(){a.profile=b.get()},a.update=function(){b.set(a.profile),a.profile=b.get()},a.$on("profileUpdate",function(){a.init()})}]),angular.module("unchatbar").controller("stream",["$scope","Stream",function(a,b){a.streamMap={},a.streamConferenceMap={},a.closeOwnStream=function(){0===_.size(a.streamConferenceMap)&&0===_.size(a.streamMap)&&b.closeAllOwnMedia()},a.$on("StreamAddClient",function(){a.streamMap=b.getClientStreamMap()}),a.$on("StreamDeleteClient",function(){a.streamMap=b.getClientStreamMap(),a.closeOwnStream()}),a.$on("StreamAddClientToConference",function(){a.streamConferenceMap=b.getConferenceClientsMap()}),a.$on("StreamDeleteClientToConference",function(){a.streamConferenceMap=b.getConferenceClientsMap(),a.closeOwnStream()})}]),angular.module("unchatbar").controller("modalStreamOption",["$scope","$modalInstance",function(a,b){a.videoCall=function(){b.close({video:!0,audio:!0})},a.audiCall=function(){b.close({video:!1,audio:!0})}}]),angular.module("unchatbar").controller("notify",["$scope","MessageText","PhoneBook",function(a,b,c){a.unreadMessages={},a.countUnreadMessages=0,a.getUnreadMessages=function(){a.unreadMessages=b.getMessageInbox(),a.countUnreadMessages=0,_.forEach(a.unreadMessages,function(b){a.countUnreadMessages+=parseInt(_.size(b))})},a.getClient=function(a){return c.getClient(a)},a.getGroup=function(a){return c.getGroup(a)},a.$on("MessageTextGetMessage",function(){a.getUnreadMessages()}),a.$on("MessageTextMoveToStorage",function(){a.getUnreadMessages()})}]),angular.module("unchatbar").service("Peer",["$window",function(a){var b;return{init:function(c,d){b=new a.Peer(c,d)},get:function(){return b||{}}}}]),angular.module("unchatbar").service("Connection",["$rootScope","Broker",function(a,b){var c={_connectionMap:{},init:function(){a.$on("BrokerPeerConnection",function(a,b){this._add(b.connection)}.bind(this))},send:function(a,c){this._connectionMap[a]?this._connectionMap[a].send(c):b.connect(a)},getMap:function(){return this._connectionMap},_add:function(b){b.on("open",function(){c._connectionMap[this.peer]=this,a.$broadcast("ConnectionOpen",{peerId:this.peer})}),b.on("close",function(){delete c._connectionMap[this.peer]}),b.on("data",function(b){var d=this.peer;a.$apply(function(){"readMessage"!==b.action&&b.id&&c.send(d,{action:"readMessage",id:b.id}),a.$broadcast("ConnectionGetMessage"+b.action,{peerId:d,message:b})})})}};return c}]),angular.module("unchatbar").service("Notify",["$window",function(a){var b={_textMessageAudioFile:"sounds/ping.mp3",_textMessageSound:null,init:function(){this._getNotificationPermission(),this._initMessageSound()},textMessage:function(a){this._isPageHidden()===!0&&(b._sendNotify("unchatbar - new Text Messages",a,"newTextMessage"),this._textMessageSound.play())},_getNotificationPermission:function(){a.Notification&&!this._hasNotificationPermission()&&a.Notification.requestPermission(function(b){a.Notification.permission!==b&&(a.Notification.permission=b)})},_initMessageSound:function(){this._textMessageSound=new a.Audio(this._textMessageAudioFile),this._textMessageSound.volume=1},_hasNotificationPermission:function(){return a.Notification&&"granted"===a.Notification.permission},_isPageHidden:function(){var a=document.hidden||document.webkitHidden||document.mozHidden||document.msHidden;
return a||!1},_sendNotify:function(b,c,d){this._hasNotificationPermission()&&new a.Notification(b,{body:c,tag:d})}};return b}]),angular.module("unchatbar").directive("notificationTextmessage",[function(){return{restrict:"E",templateUrl:"views/peer/notification/text-message.html",controller:"notify"}}]),angular.module("unchatbar").directive("ownStreamVideo",["Stream",function(a){return{restrict:"E",templateUrl:"views/peer/stream/stream-video.html",replace:!0,link:function(b,c){b.isVisible=!1,b.$on("StreamAddOwn",function(d,e){b.isVisible=!0,c.prop("src",URL.createObjectURL(a.getOwnStream(e.streamOption)))}),b.$on("StreamCloseOwn",function(){b.isVisible=!1,c.prop("src","")})}}}]),angular.module("unchatbar").directive("clientStream",["Stream","PhoneBook",function(a,b){return{restrict:"E",templateUrl:"views/peer/stream/client-stream.html",scope:{stream:"=",type:"="},controller:["$scope",function(a){a.streamId=a.stream.peerId,a.user=b.getClient(a.stream.peerId),a.close=function(){a.stream.call.close()},a.buildStream=function(){var b=a.stream.stream;a.streamType=b&&b.getVideoTracks()[0]?"video":b?"audio":"isCalling"},a.buildStream()}],link:function(a){a.$watch("stream",function(){a.buildStream()},!1)}}}]),angular.module("unchatbar").directive("stream",[function(){return{restrict:"E",templateUrl:"views/peer/stream/stream.html",controller:"stream"}}]),angular.module("unchatbar").directive("audioStream",["Stream",function(a){return{restrict:"E",templateUrl:"views/peer/stream/type/audio.html",replace:!0,scope:{streamId:"@",type:"@"},link:function(b,c){"conference"===b.type?c.prop("src",URL.createObjectURL(a.getConferenceClient(b.streamId).stream)):"single"===b.type&&c.prop("src",URL.createObjectURL(a.getClientStream(b.streamId).stream))}}}]),angular.module("unchatbar").directive("videoStream",["Stream",function(a){return{restrict:"E",templateUrl:"views/peer/stream/type/video.html",replace:!0,scope:{streamId:"@",type:"@"},link:function(b,c){"conference"===b.type?c.prop("src",URL.createObjectURL(a.getConferenceClient(b.streamId).stream)):"single"===b.type&&c.prop("src",URL.createObjectURL(a.getClientStream(b.streamId).stream))}}}]),angular.module("unchatbar").directive("phoneBookStream",[function(){return{restrict:"E",replace:!0,templateUrl:"views/peer/phoneBook/book-stream.html",controller:"phoneBook"}}]),angular.module("unchatbar").directive("phoneBookNewGroup",[function(){return{restrict:"E",replace:!0,templateUrl:"views/peer/phoneBook/addNewGroup.html",controller:"phoneBookAdmin"}}]),angular.module("unchatbar").directive("phoneBook",[function(){return{restrict:"E",replace:!0,templateUrl:"views/peer/phoneBook/book.html",controller:"phoneBook"}}]),angular.module("unchatbar").directive("phoneBookAdmin",[function(){return{restrict:"E",replace:!0,templateUrl:"views/peer/phoneBook/book-admin.html",controller:"phoneBookAdmin"}}]),angular.module("unchatbar").directive("activeUser",[function(){return{restrict:"E",replace:!0,templateUrl:"views/peer/phoneBook/active-user.html",controller:"phoneBookAdmin"}}]),angular.module("unchatbar").directive("dialer",[function(){return{restrict:"E",templateUrl:"views/peer/dialer.html",controller:"dialer"}}]),angular.module("unchatbar").directive("connectionCenter",[function(){return{restrict:"E",templateUrl:"views/peer/connection-center.html",controller:"connectionCenter"}}]),angular.module("unchatbar").directive("textMessageList",[function(){return{restrict:"E",templateUrl:"views/peer/text-message-list.html",controller:"textMessageList"}}]),angular.module("unchatbar").directive("profile",[function(){return{restrict:"E",templateUrl:"views/peer/profile.html",controller:"profile"}}]),angular.module("unchatbar").run(["$state","Broker","MessageText","PhoneBook","Profile","Connection","Stream","Notify",function(a,b,c,d,e,f,g,h){return c.init(),g.init(),d.init(),e.init(),f.init(),b.init(),h.init(),b.getPeerIdFromStorage()?(b.connectServer(),void a.go("chat")):(a.go("login"),!1)}]);