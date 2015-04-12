define([
		'dojo/_base/declare', 
		'jimu/BaseWidget', 
		'./js/ViewController'
	
	],function(declare, BaseWidget, ViewController) {
  
		var clazz = declare([BaseWidget], {
			
			baseClass: 'gallery-widget',
			_viewController:null,
			
			startup: function() {
				this.inherited(arguments);
				this._initiateViewController();
			},
			_initiateViewController:function(){
				var viewsIds = [
					'searchHome', 
					'searchCategory', 
					'searchOrganisation', 
					'searchTag', 
					'searchResult'];
					
				this._viewController = new ViewController();
				this._viewController.configureViews(viewsIds);
			},
			searchHome:function(){
				this._viewController.focusView('searchHome');
			},
			searchCategory:function(evt){
				this._viewController.focusView('searchCategory');
			},
			searchOrganisation:function(evt){
				this._viewController.focusView('searchOrganisation');
			},
			searchTag:function(evt){
				this._viewController.focusView('searchTag');
			},
			searchResult:function(evt){
				this._viewController.focusView('searchResult');
			}
	
		// resize: function(){
		//   console.log('Gallery::resize');
		// }
		
	});
  
	return clazz;

	}
);
