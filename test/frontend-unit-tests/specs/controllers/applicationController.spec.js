'use strict';

describe('Controller: ApplicationController', function () {

  var AuthService, createApplicationController, scope, location, window, store;

  beforeEach(function () {
    module('chatApp');
  });

  beforeEach(function () {

    inject(function ($controller, $rootScope, _$location_, _$window_, _AuthService_) {
      scope = $rootScope.$new();
      location = _$location_;
      window = _$window_;
      AuthService = _AuthService_;
      store = {};
      createApplicationController = function (params) {
        return $controller('ApplicationController', {
          $scope: scope,
          $stateParams: params || {}
        });
      };
      createApplicationController();
    });
    
    
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

  it('should set and retrieve the current user', function () {

    var currentUser = { _id: 1, email: 'test@email.com', username: 'testUsername' };

    scope.setCurrentUser(currentUser._id, currentUser.email, currentUser.username);

    var user = scope.getCurrentUser();

    expect(user._id).toBe(currentUser._id);
    expect(user.email).toBe(currentUser.email);
    expect(user.username).toBe(currentUser.username);

  });

  it('should return false if the user is not authed', function () {

    spyOn(AuthService, 'isAuthed').and.returnValue(false);

    var isAuthed = scope.isAuthed();

    expect(isAuthed).toBe(false);

  });

  it('should return true if the user is authed', function () {

    spyOn(AuthService, 'isAuthed').and.returnValue(true);

    var isAuthed = scope.isAuthed();

    expect(isAuthed).toBe(true);

  });

  it('should logout the authenticated user and redirect to the login', function () {

    var currentUser = { _id: 1, email: 'test@email.com', username: 'testUsername' };

    scope.setCurrentUser(currentUser._id, currentUser.email, currentUser.username);

    var user = scope.getCurrentUser();

    expect(user._id).toBe(currentUser._id);
    expect(user.email).toBe(currentUser.email);
    expect(user.username).toBe(currentUser.username);

    spyOn(AuthService, 'logout').and.callFake(function () { });

    spyOn(location, 'path');

    scope.logout();

    expect(window.localStorage.getItem('currentUser')).toBeUndefined();

    expect(location.path).toHaveBeenCalledWith('/login');
  });

});