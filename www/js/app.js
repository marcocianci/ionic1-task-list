// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starterTask' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starterTask', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

/**
 * Everything within the $scope variable will be accessible within the view
 */
app.controller('mainController',function($scope, $ionicPopup, $ionicListDelegate){
  $scope.mensagem = 'Hello World!';
  $scope.title = 'Lista de Tarefas!';
  var tasks = new getTasks();
  $scope.list = tasks.items;
  $scope.showMarked = false;
  $scope.removeStatus = false;

  function getItem(item,newItem){
    $scope.data = {};
    $scope.data.newTask = item.name;
    /**
     * @Link http://ionicframework.com/docs/api/service/$ionicPopup/
     */
    $ionicPopup.show({
      title:"Nova tarefa",
      scope: $scope,
      template:"<input ng-model='data.newTask' type='text' placeholder='Tarefa' autofocus='true'>",
      buttons: [
        {text:'OK',
          onTap: function(e){
            item.name = $scope.data.newTask;
            if (newItem) {
                tasks.add(item);
            }
            tasks.save();
            $ionicListDelegate.closeOptionButtons();
          }
        },
        {text:'Cancelar',
          onTap: function(e){
            $ionicListDelegate.closeOptionButtons();
          }
        }
      ]
    });
    // $ionicListDelegate.closeOptionButtons();
  };

  $scope.onHideItem = function(item) {
    return item.finished && !$scope.showMarked;
  };

  $scope.onClickRemove = function() {
    $scope.removeStatus = !$scope.removeStatus;
  }

  /**
   * CREATE item
   */
  $scope.onItemAdd = function() {
    var item = {name:'', finished:false};
    getItem(item,true);
  };

  /**
   * DELETE item
   */
  $scope.onItemRemove = function(item){
    tasks.remove(item);
    tasks.save();
  };

  /**
   * UPDATE item
   */
  $scope.onItemEdit = function(item){
    getItem(item,false);
  };
  /**
   * UPDATE item status
   */
  $scope.onMarkTask = function(item){
    item.finished = !item.finished;
    tasks.save();
  };

});
