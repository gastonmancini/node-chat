'use strict';

describe('Login', function() {

	var submitButton, currentUrl;

	beforeEach(function() {
		
		browser.get('/');

		currentUrl = browser.getCurrentUrl();

		expect(currentUrl).toEqual('http://localhost:3000/#/login');
		
		submitButton = element(by.css('.login-form button'));
				
	});

	it('should show the login page', function () {

    	var loginEmailCredential = element(by.model('credentials.email'));
		var loginPasswordCredential = element(by.model('credentials.password'));

    	expect(loginEmailCredential.isPresent()).toBeTruthy();
		expect(loginPasswordCredential.isPresent()).toBeTruthy();
		
	});
	
	it('should show an error if the user was not found', function() {
		
	    submitButton.click();
	    
		expect(element.all(by.css('.error p')).
        	first().getText()).toBe("Authentication failed. User not found.");
  	});
	  
	it('should show an error if the password is wrong', function() {
		
		element(by.model('credentials.email')).sendKeys('e2e@test.com');
    	element(by.model('credentials.password')).sendKeys('anyWrongPassword');
		
	    submitButton.click();
	    
		expect(element.all(by.css('.error p')).
        	first().getText()).toBe("Authentication failed. Wrong password.");
  	});
	  
	it('should successfully login and redirect to the chat', function() {
		
		element(by.model('credentials.email')).sendKeys('e2e@test.com');
    	element(by.model('credentials.password')).sendKeys('e2epassword');
		
	    submitButton.click();
		
	    currentUrl = browser.getCurrentUrl();

		expect(currentUrl).toEqual('http://localhost:3000/#/chat');
  	});
	  
	it('should successfully go to the register page', function() {
		
		var createAccountButton = element(by.css('.register-button'));		
	    createAccountButton.click();
		
	    currentUrl = browser.getCurrentUrl();

		expect(currentUrl).toEqual('http://localhost:3000/#/register');
  	});


});