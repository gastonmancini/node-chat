'use strict';

describe('Services: UserService', function () {

  var httpBackend, window, store, ApiBaseUrl, AuthService;

  beforeEach(function () {
    module('chatApp');
  });

  beforeEach(function () {

    inject(function (_$httpBackend_, _$window_, _ApiBaseUrl_, _AuthService_) {
        httpBackend = _$httpBackend_;
        window = _$window_;
        ApiBaseUrl = _ApiBaseUrl_;
        AuthService = _AuthService_;
        store = {};
    });
    
    // Awful hack: http://stackoverflow.com/questions/16722666/angular-resource-testing-httpbackend-flush-cause-unexpected-request 
    httpBackend.whenGET(/\.html$/).respond('');
    
    // LocalStorage mock.
    spyOn(window.localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(window.localStorage, 'setItem').and.callFake(function (key, value) {
      store[key] = value;
    });
    spyOn(window.localStorage, 'removeItem').and.callFake(function (key) {
      delete store[key];
    });
        
  });

  it('should successfully retrieve the login user request result', function () {
    
    var credentials = { email: 'email@test.com', password: 'passwordTest'};
    var endpointUrl = ApiBaseUrl + '/authenticate';
    var tokenRetrieved = 'tokenRetrieved'; 
    
    httpBackend.expectPOST(endpointUrl, credentials).respond(200, { token: tokenRetrieved });
   
    var loginUserResponse = AuthService.login(credentials);
    
    httpBackend.flush();
    
    expect(loginUserResponse.$$state.value.data.token).toEqual(tokenRetrieved);
    
  });
  
  it('should set and retrieve the token', function () {

    var token = 'thisIsMyTestAuthorizationToken';

    AuthService.saveToken(token);

    var retrievedToken = AuthService.getToken();

    expect(retrievedToken).toBe(token);

  });
  
  it('should logout and remove the token from the storage', function () {

    var token = 'thisIsMyTestAuthorizationToken';

    AuthService.saveToken(token);

    var retrievedToken = AuthService.getToken();

    expect(retrievedToken).toBe(token);

    AuthService.logout();
    
    retrievedToken = AuthService.getToken();

    expect(retrievedToken).toBeUndefined();

  });
  
  it('should successfully parse the json web token', function () {
  
      var jsonWebToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
      
      var jsonWebTokenPayload = {
                    "sub": "1234567890",
                    "name": "John Doe",
                    "admin": true
                  };
  
      var tokenPayload = AuthService.parseToken(jsonWebToken);
  
      expect(tokenPayload).toEqual(jsonWebTokenPayload);

  });
  
  describe('isAuthed', function () {

    it('should return false if the user is not authenticated', function () {
  
      var isAuthed = AuthService.isAuthed();
  
      expect(isAuthed).toBe(false);

    });
    
    it('should return true if the user is authenticated and the token does not expire', function () {
  
      var token = 'thisIsMyTestAuthorizationToken';
  
      AuthService.saveToken(token);
  
      var retrievedToken = AuthService.getToken();
  
      expect(retrievedToken).toBe(token);
      
      var params = { exp: 1 };
      
      spyOn(AuthService, 'parseToken').and.callFake(function() {
        return params;
      });
      
      spyOn(Math, 'round').and.callFake(function () {
        return 0;
      }); 
  
      var isAuthed = AuthService.isAuthed();
  
      expect(isAuthed).toBe(true);

    });
    
  });

});