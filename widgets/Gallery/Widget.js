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
			_home:null,
			_categories:null, 
			_organisations:null,
			_tags:null,
			startup: function() {
				this.inherited(arguments);
				
				var searchUri = this.config.portalApiUri + "/" + this.config.searchPath;
				
				this._home = new HomeWidget();
				this._home.baseUri = searchUri;
				this._home.pageSize = 6;
				this._home.mapItemUrls = this.config.mapItemUrls;
				this._home.map = this.map;
				this._home.placeAt(this);
				this._home.on("showPanelEvent", lang.hitch(this, this._showPanel));
				this._configureAsPanel(this._home.domNode);
				this._setPanelFocus(this._home.domNode);
				
				this._categories = new ItemParametersWidget();
				this._categories.title = "Categories";
				this._categories.type = "category";
				this._categories.baseUri = searchUri;
				this._categories.pageSize = 6;
				this._categories.mapItemUrls = this.config.mapItemUrls;
				this._categories.map = this.map;
				this._categories.placeAt(this);
				this._categories.on("showPanelEvent", lang.hitch(this, this._showPanel));
				this._configureAsPanel(this._categories.domNode);
				
				this._organisations = new ItemParametersWidget();
				this._organisations.title = "Organisations";
				this._organisations.type = "org";
				this._organisations.baseUri = searchUri;
				this._organisations.pageSize = 6;
				this._organisations.mapItemUrls = this.config.mapItemUrls;
				this._organisations.map = this.map;
				this._organisations.placeAt(this);
				this._organisations.on("showPanelEvent", lang.hitch(this, this._showPanel));
				this._configureAsPanel(this._organisations.domNode);
				
				this._tags = new ItemParametersWidget();
				this._tags.title = "Tags";
				this._tags.isCloud = true;
				this._tags.baseUri = searchUri;
				this._tags.pageSize = 6;
				this._tags.mapItemUrls = this.config.mapItemUrls;
				this._tags.map = this.map;
				this._tags.placeAt(this);
				this._tags.on("showPanelEvent", lang.hitch(this, this._showPanel));
				this._configureAsPanel(this._tags.domNode);
				
				this._configureSearchElements();
				this.resize();
			},
			_showPanel:function(panelName){
				this._removePanelFocus(this._home.domNode);
				this._removePanelFocus(this._categories.domNode);
				this._removePanelFocus(this._organisations.domNode);
				this._removePanelFocus(this._tags.domNode);
				
				if(panelName == "Home"){
					this._setPanelFocus(this._home.domNode);
				}else if(panelName =="Category"){
					this._setPanelFocus(this._categories.domNode);
				}else if(panelName == "Organisation"){
					this._setPanelFocus(this._organisations.domNode);
				}else if(panelName == "Tags"){
						this._setPanelFocus(this._tags.domNode);
				}
			},
			_configureAsPanel:function(panelNode){
				domClass.add(panelNode, "view-stack");
			},
			_removePanelFocus:function(panelNode){
				domClass.remove(panelNode, "view-stack-focus");
			},
			_setPanelFocus:function(panelNode){
				domClass.add(panelNode, "view-stack-focus");
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
				this._tags.items(tags);
			},
			resize: function(){
				this._home.resize(); 	
				this._categories.resize();
				this._organisations.resize();
				this._tags.resize();
			}		
	});

	}
);
