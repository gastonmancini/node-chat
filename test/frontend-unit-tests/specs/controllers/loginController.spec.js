'use strict';

describe('Controller: LoginController', function () {

  var AuthService, createLoginController, scope, location;

  beforeEach(function () {
    module('chatApp');
  });

  beforeEach(function () {
     
    // When Angular injects the AuthService dependency it will use the implementation we provided above
    inject(function ($controller, $rootScope, $location, _AuthService_) {
      scope = $rootScope.$new();
      location = $location;
      AuthService = _AuthService_;
      createLoginController = function (params) {
        return $controller('LoginController', {
          $scope: scope,
          $stateParams: params || {}
        });
      };
      createLoginController();
    });

  });
  
  it('should be correctly initialized', function () {
      expect(scope.credentials).not.toBeUndefined();
      expect(scope.errorMessage).toBe('');
  });

  it('should show an error when the authentication fails', function () {

    spyOn(AuthService, 'login').and.callFake(function () {

      var response = { data: { message: 'Test Login Error' } };

      return {
        then: function (success, error) {
          return error(response);
        }
      };
    });

    scope.authenticate(scope.credentials);
    expect(scope.errorMessage).toBe('Test Login Error');

  });

  it('should set the current user and redirect to the chat', function () {

    var currentUser;
    var params = { user: { _id: 1, email: 'test@email.com', username: 'testUsername', token: 'testAuthToken' } };

    scope.setCurrentUser = function (id, email, username) {
      currentUser = { _id: id, email: email, username: username };
    };

    spyOn(AuthService, 'parseToken').and.returnValue(params);

    spyOn(AuthService, 'login').and.callFake(function () {

      var response = { data: { token: 'encodedToken' } };

      return {
        then: function (success, error) {
          return success(response);
        }
      };
    });

    spyOn(location, 'path');

    scope.authenticate(scope.credentials);
    
    // The user is set
    expect(currentUser._id).toBe(params.user._id);
    expect(currentUser.email).toBe(params.user.email);
    expect(currentUser.username).toBe(params.user.username);
   
    // Redirects to the chat 
    expect(location.path).toHaveBeenCalledWith('/chat');

  });
});