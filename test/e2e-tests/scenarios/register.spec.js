'use strict';

describe('Register', function () {

	var submitButton, currentUrl;

	beforeEach(function () {

		browser.get('/#/register');

		currentUrl = browser.getCurrentUrl();

		expect(currentUrl).toEqual('http://localhost:3000/#/register');

		submitButton = element(by.css('.register-form button'));

	});

	it('should show the register page', function () {

		var loginUsernameCredential = element(by.model('user.username'));
		var loginEmailCredential = element(by.model('user.email'));
		var loginPasswordCredential = element(by.model('user.password'));

		expect(loginUsernameCredential.isPresent()).toBeTruthy();
		expect(loginEmailCredential.isPresent()).toBeTruthy();
		expect(loginPasswordCredential.isPresent()).toBeTruthy();

	});

	it('should not allow to submit if the email is not set', function () {

		element(by.model('user.password')).sendKeys('e2epassword');
		element(by.model('user.username')).sendKeys('e2e_user');

		submitButton.click();

		currentUrl = browser.getCurrentUrl();
		expect(currentUrl).toEqual('http://localhost:3000/#/register');
	});
	
	it('should not allow to submit if the username is not set', function () {

		element(by.model('user.email')).sendKeys('e2e@test.com');
		element(by.model('user.password')).sendKeys('e2epassword');

		submitButton.click();

		currentUrl = browser.getCurrentUrl();
		expect(currentUrl).toEqual('http://localhost:3000/#/register');
	});

	it('should not allow to submit if the password is not set', function () {

		element(by.model('user.email')).sendKeys('e2e@test.com');
		element(by.model('user.username')).sendKeys('e2e_user');

		submitButton.click();

		currentUrl = browser.getCurrentUrl();
		expect(currentUrl).toEqual('http://localhost:3000/#/register');
	});

	it('should successfully go to the login page', function () {

		element(by.model('user.email')).sendKeys('e2e@test.com');
		element(by.model('user.password')).sendKeys('e2epassword');
		element(by.model('user.username')).sendKeys('e2e_user');

		var createAccountButton = element(by.css('.login-button'));
		createAccountButton.click();

		currentUrl = browser.getCurrentUrl();

		expect(currentUrl).toEqual('http://localhost:3000/#/login');
	});

});