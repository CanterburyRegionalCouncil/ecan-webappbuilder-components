define([
		'dojo/_base/declare', 
		'dojo/_base/event',
		'dojo/_base/lang',
		'dojo/on',
		'dojo/dom-class',
		'jimu/BaseWidget', 
		'./widgets/Home/widget',
		'./js/SearchParameters',
		'./widgets/ItemParameters/Widget'
	],function(declare, event, lang, on, domClass, BaseWidget, HomeWidget, SearchParameters, ItemParametersWidget) {
  
		return declare([BaseWidget], {
			
			baseClass: 'gallery-widget',
			_viewController:null,
			_resultsHome:null,
			_home:null,
			_categories:null, 
			_organisations:null,
			_stackContainer:null,
			startup: function() {
				this.inherited(arguments);
				
				var searchUri = this.config.portalApiUri + "/" + this.config.searchPath;
				
				this._home = new HomeWidget();
				this._home.baseUri = searchUri;
				this._home.pageSize = 6;
				this._home.mapItemUrls = this.config.mapItemUrls;
				this._home.map = this.map;
				this._home.placeAt(this, 0);
				this._home.placeAt(this.domNode, 0);
				this._home.on("showPanelEvent", lang.hitch(this, this._showPanel));
				domClass.add(this._home.domNode, "view-stack");
				domClass.add(this._home.domNode, "view-stack-focus");
				
				//this._categories = new CategoriesWidget();
				this._categories = new ItemParametersWidget();
				this._categories.title = "Categories";
				this._categories.type = "category";
				this._categories.baseUri = searchUri;
				this._categories.pageSize = 6;
				this._categories.mapItemUrls = this.config.mapItemUrls;
				this._categories.map = this.map;
				this._categories.placeAt(this, 1);
				this._categories.on("showPanelEvent", lang.hitch(this, this._showPanel));
				domClass.add(this._categories.domNode, "view-stack");
				
				this._organisations = new ItemParametersWidget();
				this._organisations.title = "Organisations";
				this._organisations.type = "org";
				this._organisations.baseUri = searchUri;
				this._organisations.pageSize = 6;
				this._organisations.mapItemUrls = this.config.mapItemUrls;
				this._organisations.map = this.map;
				this._organisations.placeAt(this, 2);
				this._organisations.on("showPanelEvent", lang.hitch(this, this._showPanel));
				domClass.add(this._organisations.domNode, "view-stack");
				
				this._configureSearchElements();
				this.resize();
			},
			_showPanel:function(panelName){
				domClass.remove(this._home.domNode, "view-stack-focus");
				domClass.remove(this._categories.domNode, "view-stack-focus");
				domClass.remove(this._organisations.domNode, "view-stack-focus");
				
				if(panelName == "Home"){
					domClass.add(this._home.domNode, "view-stack-focus");
				}else if(panelName =="Category"){
					domClass.add(this._categories.domNode, "view-stack-focus");
				}else if(panelName == "Organisation"){
					domClass.add(this._organisations.domNode, "view-stack-focus");
				}
			},
			_configureSearchElements:function(){
			
				var baseUri = this.config.portalApiUri;
				
				var searchParameters = new SearchParameters();
				searchParameters.uri = baseUri + "/" + this.config.configPath;

				searchParameters.on("onCategoriesRetrievedEvent", lang.hitch(this, this._configureCategories));
				searchParameters.on("onOrganisationsRetrievedEvent", lang.hitch(this, this._configureOrganisations));
				searchParameters.on("onTagsRetrievedEvent", lang.hitch(this, this._configureTags));
				searchParameters.on("onSearchResultsRetreived", lang.hitch(this, this._configureResults));
				
				searchParameters.requestSearchParameters();
				
			},_configureCategories:function(categories){
				this._categories.items(categories);
			},
			_configureOrganisations:function(organisations){
				this._organisations.items(organisations);
			},
			_configureTags:function(tags){
				console.log("Populate Tag Cloud");
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
