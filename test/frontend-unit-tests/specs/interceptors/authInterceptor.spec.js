'use strict';

describe('Interceptor: AuthInterceptor', function () {

  var AuthInterceptor, AuthService, q;

  beforeEach(function () {
    module('chatApp');
  });

  beforeEach(function () {

    inject(function (_$q_, _AuthService_, _AuthInterceptor_) {
        AuthInterceptor = _AuthInterceptor_;
        AuthService = _AuthService_;
        q = _$q_;
    });
    
  });

  it('should intercept and set the auth token in the request header', function () {
    // TODO
  });
 
  it('should intercept a response and save the auth token', function () {
    // TODO
  });

});