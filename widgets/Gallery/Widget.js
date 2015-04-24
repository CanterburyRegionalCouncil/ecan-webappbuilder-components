define([
		'dojo/_base/declare', 
		'dojo/_base/event',
		'dojo/_base/lang',
		'dojo/_base/array',
		'dojo/dom',
		'dojo/on',
		'jimu/BaseWidget', 
		'./js/ViewController',
		'./js/PortalSearch',
		'./widgets/Category/widget',
		'./widgets/Result/widget',
		'dojo/dom-geometry',
		'dojo/query',
	
	],function(declare, event, lang, arrayUtil, dom, on, BaseWidget, ViewController, PortalSearch, CategoryWidget, Results, domGeom, query) {
  
		return declare([BaseWidget], {
			
			baseClass: 'gallery-widget',
			_viewController:null,
			_portalSearch:null,
			_categoryList:null,
			startup: function() {
				this.inherited(arguments);
				
				this._categoryList = dom.byId('categoryList');//Unlikely but possible race condition
				
				this._configureSearchElements();
				this._initiateViewController();
				
				var searchHomePanel = dom.byId("searchHome");
				
				var searchUri = this.config.portalApiUri + "/" + this.config.searchPath;
				var resultsHome = new Results();
				resultsHome.baseUri = searchUri;
				resultsHome.pageSize = 6;
				resultsHome.mapItemUrls = this.config.mapItemUrls;
				resultsHome.map = this.map;
				resultsHome.placeAt(searchHomePanel);
				resultsHome.getAllMapsAndApps();
				
				this.resize();
			},
			_initiateViewController:function(){
				var viewsIds = [
					'searchHome', 
					'searchByCategory', 
					'searchByOrganisation', 
					'searchByTag', 
					'searchResult'];
					
				this._viewController = new ViewController();
				this._viewController.configureViews(viewsIds);
				this._viewController.focusView('searchHome');
			},
			_configureSearchElements:function(){
			
				var baseUri = this.config.portalApiUri;
				
				var portalSearch = new PortalSearch();
				portalSearch.configUri = baseUri + "/" + this.config.configPath;
				portalSearch.searchUri = baseUri + "/" + this.config.searchPath;
				portalSearch.pageSize = this.config.pageSize;
				portalSearch.orderBy = this.config.orderBy;
				
				portalSearch.on("onCategoriesRetrievedEvent", lang.hitch(this, this._configureCategories));
				portalSearch.on("onOrganisationsRetrievedEvent", lang.hitch(this, this._configureOrganisations));
				portalSearch.on("onTagsRetrievedEvent", lang.hitch(this, this._configureTags));
				portalSearch.on("onSearchResultsRetreived", lang.hitch(this, this._configureResults));
				
				portalSearch.requestSearchLinks();
				
				this._portalSearch = portalSearch;
			},_configureCategories:function(categories){
				arrayUtil.forEach(categories, lang.hitch(this, this._configureCategory));
			},
			_configureCategory:function(category){
				var categoryWidget = new CategoryWidget();
				categoryWidget.category(category);
				categoryWidget.placeAt(this._categoryList);
				categoryWidget.on('categoryClickEvent', lang.hitch(this, this._categoryClicked));
			},
			_categoryClicked:function(category){
				this._portalSearch.searchCategory(category);
			},
			_configureOrganisations:function(organisations){
				console.log("Populate Organisations");
			},
			_configureTags:function(tags){
				console.log("Populate Tag Cloud");
			},
			_configureResults:function(results){
				//Populate the search result panel with search result widgets
				//Set up breadcrumbs
				//Set up pagination
				this._viewController.focusView('searchResult');
			},
			searchText:function(/* Event */ e){
				evt.preventDefault();
				console.log("Search Text");
			},
			searchHome:function(/* Event */ e){
				this._viewController.focusView('searchHome');
			},
			searchByCategory:function(/* Event */ e){
				e.preventDefault();
				this._viewController.focusView('searchByCategory');
			},
			searchByOrganisation:function(/* Event */ e){
				this._viewController.focusView('searchByOrganisation');
			},
			searchByTag:function(/* Event */ e){
				this._viewController.focusView('searchByTag');
			},
			searchResult:function(/* Event */ e){
				this._viewController.focusView('searchResult');
			},
			resize: function(){
				var widgetPosition = domGeom.position(this.domNode);
				var nodes = query(".widget-responsive", this.domNode);
				
				if(widgetPosition.w > 0 && widgetPosition.w < 404){
					nodes.removeClass("widget-size-medium");
				}
				else if(widgetPosition.w > 405){
					nodes.addClass("widget-size-medium");
				}
			}		
	});

	}
);
