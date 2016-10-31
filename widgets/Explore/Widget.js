define([
		'dojo/_base/declare',
		'dojo/_base/event',
		'dojo/_base/lang',
		'dojo/on',
		'dojo/dom-class',
		'jimu/BaseWidget',
		'esri/config',
		'./widgets/Home/widget',
		'./js/SearchParameters',
		'./widgets/ItemParameters/Widget',
		'xstyle/css!./css/bootstrap3_3_7.css'
	],function(declare, event, lang, on, domClass, BaseWidget, esriConfig, HomeWidget, SearchParameters, ItemParametersWidget) {

		return declare([BaseWidget], {

			baseClass: 'gallery-widget',
			_home:null,
			_categories:null,
			_organisations:null,
			_tags:null,
			startup: function() {
				this.inherited(arguments);

				this._injectPanelsIntoWidget();
				this._retrieveSearchParameters();
				this.resize();
			},
			_injectPanelsIntoWidget:function(){

				this._home = new HomeWidget();
				this._home.baseUri = this.config.portalApiUri;
				this._home.description = this.config.description;
				this._home.pageSize = 6;
				this._home.mapItemUrls = this.config.mapItemUrls;
				this._home.map = this.map;
				this._home.geometryService = esriConfig.defaults.geometryService;
				this._home.placeAt(this);
				this._home.on("showPanelEvent", lang.hitch(this, this._showPanel));
				this._configureAsPanel(this._home.domNode);
				this._setPanelFocus(this._home.domNode);

				this._categories = new ItemParametersWidget();
				this._categories.title = "Categories";
				this._categories.baseUri = this.config.portalApiUri;
				this._categories.webMapGroupType = "WebMapGroupsForCategories";
				this._categories.pageSize = 6;
				this._categories.mapItemUrls = this.config.mapItemUrls;
				this._categories.map = this.map;
				this._categories.geometryService = esriConfig.defaults.geometryService;
				this._categories.placeAt(this);
				this._categories.on("showPanelEvent", lang.hitch(this, this._showPanel));
				this._configureAsPanel(this._categories.domNode);

				this._organisations = new ItemParametersWidget();
				this._organisations.title = "Organisations";
				this._organisations.baseUri = this.config.portalApiUri;
				this._organisations.webMapGroupType = "WebMapGroupsForOrganisations";
				this._organisations.pageSize = 6;
				this._organisations.mapItemUrls = this.config.mapItemUrls;
				this._organisations.map = this.map;
				this._organisations.geometryService = esriConfig.defaults.geometryService;
				this._organisations.placeAt(this);
				this._organisations.on("showPanelEvent", lang.hitch(this, this._showPanel));
				this._configureAsPanel(this._organisations.domNode);
			},
			_showPanel:function(panelName){
				this._removePanelFocus(this._home.domNode);
				this._removePanelFocus(this._categories.domNode);
				this._removePanelFocus(this._organisations.domNode);

				if(panelName == "Home"){
					this._setPanelFocus(this._home.domNode);
				}else if(panelName =="Category"){
					this._setPanelFocus(this._categories.domNode);
				}else if(panelName == "Organisation"){
					this._setPanelFocus(this._organisations.domNode);
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
			_retrieveSearchParameters:function(){

				var searchParameters = new SearchParameters();
				searchParameters.uri = this.config.portalApiUri + "/" + this.config.configPath;
				searchParameters.on("onSearchResultsRetreived", lang.hitch(this, this._configureResults));
				searchParameters.requestSearchParameters();

			},
			resize: function(){
				this._home.resize();
				this._categories.resize();
				this._organisations.resize();
			}
		});
	}
);
