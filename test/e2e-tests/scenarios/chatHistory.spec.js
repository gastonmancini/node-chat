'use strict';

describe('ChatHistory', function() {

	var submitButton, currentUrl;
	
	it('should show the history page if the user is logged in', function () {

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
		
		// Go to the chat history page once is logged
		browser.get('/#/history');
		
		currentUrl = browser.getCurrentUrl();

		expect(currentUrl).toEqual('http://localhost:3000/#/history');
		
		// Is in the chat history page?  

		var chatHistoryContainer = element(by.css('.chat-history'));

    	expect(chatHistoryContainer.isPresent()).toBeTruthy();
		
	});
		
});