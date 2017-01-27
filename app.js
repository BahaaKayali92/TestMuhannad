(function(){
	'use strict';
	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.directive('foundItems',FoundItems);

var Clicked=false;
function FoundItems(){
	var ddo={
	templateUrl: 'foundItems.html',
    scope: {
      list: '<myList',
      onRemove: '='
        }
	};

	return ddo;
}

NarrowItDownController.$inject=['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){

        var list=this;
        list.searchTerm="";
        list.found=MenuSearchService.getItems();
        list.onClick = function (){
        	if (list.searchTerm==="") {
                Clicked=true;
        		return;
        	}
	    MenuSearchService.getMatchedMenuItems(list.searchTerm,list);
        }
        list.onRemove = function(index){
      	MenuSearchService.onRemove(index);
      }
      list.checkError=function(){
      	console.log(list.found.length);
      	console.log(list.searchTerm);
      	console.log(Clicked);
      	if ((list.searchTerm==="" || list.found.length===0) && Clicked) {
      		return true;
      	}
      	return false;
      }

	};
    MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http){
      var service = this;
      var found=[];
      service.getMatchedMenuItems=function (searchTerm,list){
	 
	   var promise = getMenuItems();
       promise.then(function (response) {
       console.log(response.data);
       for (var item in response.data.menu_items) {
      	 if (response.data.menu_items[item].description.indexOf(searchTerm)!== -1) {
            found.push(response.data.menu_items[item]);
      	}
      }
      Clicked=true;
      console.log(found);

     

    })
    .catch(function (error) {
      console.log(error);
    })
    return "hello";
};
service.onRemove=function(index)
{
	      console.log(index);
	found.splice(index,1);
}
service.getItems=function()
{
	return found;
}
function getMenuItems(){
	var promise = $http({
       method: "GET",
       url: ('https://davids-restaurant.herokuapp.com/menu_items.json')
    });
    return promise;
};
	};
}
)();