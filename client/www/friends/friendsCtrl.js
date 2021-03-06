angular.module('which.controllers.friends', ['which.factory', 'ionic.contrib.ui.tinderCards'])


.controller('FriendsCtrl', function($scope, $ionicHistory, $state, User, WhichFactory) {
  $scope.filters = {};
  $scope.userSearch=""; 

  $scope.message=''; 
  $scope.$on('$ionicView.afterEnter', function() {
    $scope.getFriendsWiches(); 
    getPotentialFriends(); 
  });
  var getPotentialFriends= function () {
    User.getUsers()
      .then(function (response) {
        console.log($scope.users); 
        $scope.users= response; 
      })
  }


  $scope.addFriend= function (friendName) {
    console.log('friendName', friendName)
    User.addFriend(friendName)
      .then(function (response) {
        if(response.status===200){ 
          $scope.message= 'Successfully added!'
        }  
        $scope.getFriendsWiches(); 
        $scope.userSearch=""; 
        // $scope.reloadRoute(); 
        // $scope.reloadPage(); 
        
      })

  }

  $scope.reloadRoute = function() {
    $state.reload();
  };

  $scope.reloadPage = function(){window.location.reload();}

  $scope.removeFriend= function (friendId) {
    User.removeFriend(friendId)
      .then(function (response) {
        $scope.getFriendsWiches(); 
      })

  }


  $scope.getFriendsWiches= function () {
    User.getFriendsWiches()
      .then (function (friendsWiches){
        $scope.friends= friendsWiches.uniqueFriends;
        $scope.friendsWhiches= friendsWiches.whiches;
      })
  }

  $scope.storeId= function (id){
    $scope.storedId= id; 
  }

  $scope.goToWhich = function(id) {
    WhichFactory.getWhichByID(id).then(function(which) {
      console.log(which);
      $state.go('app.which', {
        id: which.id,
        question: which.question,
        thingA: which.thingA,
        thingB: which.thingB
      });
    })
  };

 
  
});