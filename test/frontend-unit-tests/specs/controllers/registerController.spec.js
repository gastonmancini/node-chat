'use strict';

describe('Controller: RegisterController', function () {

  var UserService, AuthService, createRegisterController, scope, location;

  beforeEach(function () {
    module('chatApp');
  });

  beforeEach(function () {
     
    // When Angular injects the UserService dependency it will use the implementation we provided above
    inject(function ($controller, $rootScope, $location, _UserService_, _AuthService_) {
      scope = $rootScope.$new();
      location = $location;
      UserService = _UserService_;
      AuthService = _AuthService_;
      createRegisterController = function (params) {
        return $controller('RegisterController', {
          $scope: scope,
          $stateParams: params || {}
        });
      };
      createRegisterController();
    });

  });

  it('should be correctly initialized', function () {
    expect(scope.user).not.toBeUndefined();
    expect(scope.errorMessage).toBe('');
  });

  it('should show an error when the registration fails', function () {

    spyOn(UserService, 'register').and.callFake(function () {

      var response = { data: { message: 'Test Registration Error' } };

      return {
        then: function (success, error) {
          return error(response);
        }
      };
    });

    scope.register(scope.user);
    expect(scope.errorMessage).toBe('Test Registration Error');

  });

  it('should set the current user and redirect to the chat', function () {

    var currentUser;
    var params = { user: { _id: 1, email: 'test@email.com', username: 'testUsername', token: 'testAuthToken' } };

    scope.setCurrentUser = function (id, email, username) {
      currentUser = { _id: id, email: email, username: username };
    };

    spyOn(AuthService, 'parseToken').and.returnValue(params);

    spyOn(UserService, 'register').and.callFake(function () {

      var response = { data: { token: 'encodedToken' } };

      return {
        then: function (success, error) {
          return success(response);
        }
      };
    });

    spyOn(location, 'path');

    scope.register(scope.user);
    
    // The user is set
    expect(currentUser._id).toBe(params.user._id);
    expect(currentUser.email).toBe(params.user.email);
    expect(currentUser.username).toBe(params.user.username);
   
    // Redirects to the chat 
    expect(location.path).toHaveBeenCalledWith('/chat');

  });
});