define([
		'dojo/_base/declare', 
		'dojo/_base/event',
		'dojo/_base/lang',
		'dojo/on',
		'dojo/dom-class',
		'jimu/BaseWidget', 
		'./widgets/Home/widget',
		'./js/PortalSearch',
		'./widgets/Categories/widget'
	],function(declare, event, lang, on, domClass, BaseWidget, HomeWidget, PortalSearch, CategoriesWidget) {
  
		return declare([BaseWidget], {
			
			baseClass: 'gallery-widget',
			_viewController:null,
			_resultsHome:null,
			_home:null,
			_categories:null,
			startup: function() {
				this.inherited(arguments);
				
				var searchUri = this.config.portalApiUri + "/" + this.config.searchPath;
				
				this._home = new HomeWidget();
				this._home.baseUri = searchUri;
				this._home.pageSize = 6;
				this._home.mapItemUrls = this.config.mapItemUrls;
				this._home.map = this.map;
				this._home.placeAt(this, 0);
				this._home.on("showPanelEvent", lang.hitch(this, this._showPanel));
				domClass.add(this._home.domNode, "view-stack");
				domClass.add(this._home.domNode, "view-stack-focus");
				
				this._categories = new CategoriesWidget();
				this._categories.baseUri = searchUri;
				this._categories.pageSize = 6;
				this._categories.mapItemUrls = this.config.mapItemUrls;
				this._categories.map = this.map;
				this._categories.placeAt(this, 1);
				this._categories.on("showPanelEvent", lang.hitch(this, this._showPanel));
				domClass.add(this._categories.domNode, "view-stack");
				
				this._configureSearchElements();
			},
			_showPanel:function(panelName){
				domClass.remove(this._home.domNode, "view-stack-focus");
				domClass.remove(this._categories.domNode, "view-stack-focus");
				
				
				if(panelName == "Home"){
					domClass.add(this._home.domNode, "view-stack-focus");
				}else if(panelName =="Category"){
					domClass.add(this._categories.domNode, "view-stack-focus");
				}
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
				
			},_configureCategories:function(categories){
				this._categories.items(categories);
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
				//this._viewController.focusView('searchResult');
			},
			searchHome:function(/* Event */ e){
				this._viewController.focusView('searchHome');
			},
			resize: function(){
				this._home.resize(); 	
				this._categories.resize();
			}		
	});

	}
);
