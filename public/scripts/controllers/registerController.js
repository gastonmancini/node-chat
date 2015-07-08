angular.module('chatApp').controller('RegisterController', ['$scope', '$http', '$location', 'UserService', 'AuthService', 'PasswordService', function ($scope, $http, $location, UserService, AuthService, PasswordService) {

	'use strict';
      
	// Initialize the User
	$scope.user = {
		email: '',
		username: '',
		password: ''
	};
      
	// Initialize registration error message
	$scope.errorMessage = '';

	// Check the password strength
	$scope.$watch('user.password', function (pass) {
		$scope.passwordStrength = PasswordService.getStrength(pass);
		if ($scope.isPasswordWeak()) {
			$scope.user.password.$setValidity('strength', false);

		} else {
			$scope.user.password.$setValidity('strength', true);
		}
	});
	
	$scope.isFormInvalid = function () {
		return $scope.user.email === '' || $scope.user.username === '' || $scope.user.password === '' || !$scope.isPasswordOk();
	};

	$scope.isPasswordWeak = function () {
		return $scope.passwordStrength < 40;
	};

	$scope.isPasswordOk = function () {
		return $scope.passwordStrength >= 40 && $scope.passwordStrength <= 70;
	};

	$scope.isPasswordStrong = function () {
		return $scope.passwordStrength > 70;
	};

	$scope.isInputValid = function (input) {
		return input.$dirty && input.$valid;
	};

	$scope.isInputInvalid = function (input) {
		return input.$dirty && input.$invalid;
	};            

	// Register a new user
	$scope.register = function (user) {
            
		// Try to register 
		UserService.register(user)
			.then(function (response, status, headers, config) {
			$location.path('/login/verify_account');
		}, function (response, status, headers, config) {
				$scope.errorMessage = response.data.message;
            });
	}; 

}]);