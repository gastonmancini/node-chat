'use strict';

describe('Interceptor: AuthInterceptor', function () {

  var AuthInterceptor, AuthService;

  beforeEach(function () {
    module('chatApp');
  });

  beforeEach(function () {

    inject(function (_AuthService_, _AuthInterceptor_) {
      AuthInterceptor = _AuthInterceptor_;
      AuthService = _AuthService_;
    });

  });

  it('should intercept and set the auth token and the content type in the request header', function () {

    var token = 'token';
    var config = { headers: { 'x-access-token': '', 'Content-Type': '' } };

    spyOn(AuthService, 'getToken').and.callFake(function () {
      return token;
    });

    var configResult = AuthInterceptor.request(config);

    expect(configResult.headers['x-access-token']).toEqual(token);
    expect(configResult.headers['Content-Type']).toEqual('application/json; charset=UTF-8');

  });

  it('should intercept a response and save the auth token', function () {

    var res = { data: { token: 'authToken' } };

    var savedToken = '';

    spyOn(AuthService, 'saveToken').and.callFake(function (token) {
      savedToken = token;
    });

    AuthInterceptor.response(res);

    expect(savedToken).toEqual(res.data.token);

  });

});