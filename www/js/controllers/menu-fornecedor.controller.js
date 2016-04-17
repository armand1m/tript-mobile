angular
.module('app.controllers')
.controller('MenuFornecedorCtrl', function($scope, $state, $ionicSideMenuDelegate, $ionicPopup, SessionService) {
  $scope.logout = logout;

  function logout() {
    $ionicPopup.confirm({
      title: 'Já vai?',
      template: 'Tem certeza?'
    })
    .then(function(res) {
      if (res) {
        SessionService.clear();
        $state.go('login');
      } else {
        $ionicSideMenuDelegate.toggleLeft();
      }
    });
  }
})
