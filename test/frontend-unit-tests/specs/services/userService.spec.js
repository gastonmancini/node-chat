'use strict';

describe('Services: UserService', function () {

  var httpBackend, ApiBaseUrl, UserService;

  beforeEach(function () {
    module('chatApp');
  });

  beforeEach(function () {

    inject(function (_$httpBackend_, _ApiBaseUrl_, _UserService_) {
      httpBackend = _$httpBackend_;
      ApiBaseUrl = _ApiBaseUrl_;
      UserService = _UserService_;
    });
    
    // Awful hack: http://stackoverflow.com/questions/16722666/angular-resource-testing-httpbackend-flush-cause-unexpected-request 
    httpBackend.whenGET(/\.html$/).respond('');

  });

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should successfully retrieve the register user request result', function () {

    var user = { username: 'usernameTest', email: 'email@test.com', password: 'passwordTest' };
    var endpointUrl = ApiBaseUrl + '/users';
    var tokenRetrieved = 'tokenRetrieved';

    httpBackend.expectPOST(endpointUrl, { user: user }).respond(200, { token: tokenRetrieved });

    var registerUserResponse = UserService.register(user);

    httpBackend.flush();

    expect(registerUserResponse.$$state.value.data.token).toEqual(tokenRetrieved);

  });

});