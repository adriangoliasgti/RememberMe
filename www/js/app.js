// Declaration of angular
var app = angular.module('rememberMe', ['ionic', 'LocalStorageModule']);

// Local storage prefix
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('rememberMe');
  });

// Angular controller
app.controller('main', function ($scope, $ionicModal, localStorageService) {
    
    var activityData = 'activity';
    // Declaration & initialisation of activities
    $scope.activities = [];
    $scope.activity = {};

    // Configuration of ionic modal before use
    // **Reference --> http://ionicframework.com/docs/api/service/$ionicModal/
    $ionicModal.fromTemplateUrl('new-task-modal.html', {
        scope: $scope,
        animation: 'popIn'
    }).then(function (modal) {
        $scope.newTaskModal = modal;
    });


    // Create new activity controller
    $scope.createActivity = function () {
        $scope.activities.push($scope.activity);
        localStorageService.set(activityData, $scope.activities);
        $scope.activity = {};
        $scope.newTaskModal.hide();
    }
    
    // Remove activity controller
    $scope.removeActivity = function (index) {
        $scope.activities.splice(index, 1);
        localStorageService.set(activityData, $scope.activities);
    }
    
    // Get all activities controller
    $scope.getActivities = function () {
        // Get activities from local storage
        if (localStorageService.get(activityData)) {
            $scope.activities = localStorageService.get(activityData);
        } // End of if
        
        else {
            $scope.activities = [];
        }// End of else
    }
    
    // Complete activity controller
    $scope.completeActivity = function (index) { 
        // Setting activity as completed
        if (index !== -1) {
        } // End of if
        
        localStorageService.set(activityData, $scope.activities); 
    }
    
    // Modal
    // **Reference --> http://ionicframework.com/docs/api/service/$ionicModal/
    $scope.openTaskModal = function () {
        $scope.newTaskModal.show();
    };
    
    // Modal
    // **Reference --> http://ionicframework.com/docs/api/service/$ionicModal/
    $scope.closeTaskModal = function () {
        $scope.newTaskModal.hide();
    };
});