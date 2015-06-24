'use strict';

describe('Services: ChatHistoryService', function () {

  var httpBackend, ApiBaseUrl, ChatHistoryService;

  beforeEach(function () {
    module('chatApp');
  });

  beforeEach(function () {

    inject(function (_$httpBackend_, _ApiBaseUrl_, _ChatHistoryService_) {
        httpBackend = _$httpBackend_;
        ApiBaseUrl = _ApiBaseUrl_;
        ChatHistoryService = _ChatHistoryService_;
    });
    
    // Awful hack: http://stackoverflow.com/questions/16722666/angular-resource-testing-httpbackend-flush-cause-unexpected-request 
    httpBackend.whenGET(/\.html$/).respond('');
        
  });
  
  afterEach(function () {
     httpBackend.verifyNoOutstandingExpectation();
     httpBackend.verifyNoOutstandingRequest();
  });

  it('should successfully retrieve the chat room history request result', function () {
    
    var testChatRoomName = 'chatRoomName';
    var endpointUrl = ApiBaseUrl + '/history/' + testChatRoomName;   
    var chatRoomHistory = 'chatRoomHistory';
    
    httpBackend.expectGET(endpointUrl).respond(200, { chatRoomHistory: chatRoomHistory });
   
    var chatRoomHistoryResponse = ChatHistoryService.getChatRoomHistory(testChatRoomName);
    
    httpBackend.flush();
    
    expect(chatRoomHistoryResponse.$$state.value.data.chatRoomHistory).toEqual(chatRoomHistory);
    
  });
  
  it('should successfully retrieve the list of chat rooms request result', function () {
    
    var endpointUrl = ApiBaseUrl + '/chatroom';   
    var chatRoomsList = 'chatRoomsList';
    
    httpBackend.expectGET(endpointUrl).respond(200, { chatRoomsList: chatRoomsList });
   
    var chatRoomsListResponse = ChatHistoryService.getChatRooms();
    
    httpBackend.flush();
    
    expect(chatRoomsListResponse.$$state.value.data.chatRoomsList).toEqual(chatRoomsList);
    
  });

});