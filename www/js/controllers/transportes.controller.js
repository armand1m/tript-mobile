angular
.module('app.controllers')
.controller('TransportesCtrl', function($scope, $ionicLoading, $ionicModal, $ionicPopup, Search, Bairro, Instituicao, TIPO_TRANSPORTE, $ionicFilterBar) {
  $scope.TIPO_TRANSPORTE = TIPO_TRANSPORTE;

  $scope.veiculo = {};
  $scope.filtro = {};
  $scope.veiculos = [];
  $scope.bairros = [];
  $scope.instituicoes = [];
  $scope.loading = false;
  $scope.filtrarVeiculosModal = null;
  $scope.filterBarInstance = null;

  $scope.refresh = refresh;

  _init();

  function _init() {
    getVeiculos();
    _setupFiltrarVeiculosModal();
    _getBairros();
    _getInstituicoes();
  }

  function refresh() {
    Search
    .query()
    .$promise
    .then(function (veiculos) {
      $scope.veiculos = veiculos;
      $scope.$broadcast('scroll.refreshComplete');
    })
    .catch(_error);
  }

  function getVeiculos() {
    _toggleLoading();

    Search
    .query($scope.filtro)
    .$promise
    .then(function (veiculos) {
      $scope.veiculos = veiculos;
      console.log($scope.veiculos);
      _toggleLoading();
    })
    .catch(_error);
  }

  function _getBairros() {
    _toggleLoading();

    Bairro
    .query()
    .$promise
    .then(function (bairros) {
      $scope.bairros = bairros;
      _toggleLoading();
    })
    .catch(_error);
  }

  function _getInstituicoes() {
    _toggleLoading();

    Instituicao
    .query()
    .$promise
    .then(function (instituicoes) {
      $scope.instituicoes = instituicoes;
      _toggleLoading();
    })
    .catch(_error);
  }

  function _toggleLoading() {
    $scope.loading = !$scope.loading;
  }

  function _error(response) {
    $ionicPopup.alert({
      title: 'Vish, deu ruim..',
      template: response.errorMessage
    });
  }

  function _setupFiltrarVeiculosModal() {
    $ionicModal
    .fromTemplateUrl('templates/modals/filtros.html', {
      scope: $scope,
      animation: 'slide-in-up'
    })
    .then(function(modal) {
      $scope.filtrarVeiculosModal = modal;
    });

    $scope.$on('$destroy', function() {
      $scope.filtrarVeiculosModal.remove();
    });

    $scope.$on('modal.hidden', function() {
      $scope.filtro = {};
    });
  }

  $scope.showFilterBar = function () {
    var filterBarInstance = $ionicFilterBar.show({
      items: $scope.veiculos,
      update: function (filteredVeiculos, filterText) {
        $scope.veiculos = filteredVeiculos;
      },
    });
  };
})
