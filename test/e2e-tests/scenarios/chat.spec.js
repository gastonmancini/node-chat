'use strict';

describe('Chat', function() {

	var submitButton, currentUrl;
	
	it('should show not show the chat page if the user is not logged in', function () {

		browser.get('/#/chat');
		
		currentUrl = browser.getCurrentUrl();

		expect(currentUrl).toEqual('http://localhost:3000/#/login');
		
	});
	
	it('should go to the chat page when the user logs in', function () {

		// Go to the login
		browser.get('/#/login');

		currentUrl = browser.getCurrentUrl();

		expect(currentUrl).toEqual('http://localhost:3000/#/login');
		
		submitButton = element(by.css('.login-form button'));
		
		// Login		
		element(by.model('credentials.email')).sendKeys('e2e@test.com');
    	element(by.model('credentials.password')).sendKeys('e2epassword');
		
	    submitButton.click();
		
	    currentUrl = browser.getCurrentUrl();

		expect(currentUrl).toEqual('http://localhost:3000/#/chat');
		
		// Is in the chat page?  

		var chatContainer = element(by.css('.chat'));

    	expect(chatContainer.isPresent()).toBeTruthy();
			
	});
		
});