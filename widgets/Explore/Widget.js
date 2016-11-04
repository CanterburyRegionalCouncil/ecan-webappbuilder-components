define([
		'dojo/_base/declare',
		'dojo/_base/event',
		'dojo/_base/lang',
		'dojo/on',
		'dojo/dom-class',
		'jimu/BaseWidget',
		'esri/config',
		'./widgets/Search/widget',
		'./widgets/Result/widget',
		'./js/RetrieveWebMapSearchItems',
		'./js/RetrieveWebMapGroups',
		'./js/QueryResultToResultsList',
		'./js/PortalItemFactory',
		'xstyle/css!./css/bootstrap3_3_7.css'
],function(declare, event, lang, on, domClass, BaseWidget, esriConfig,
	SearchWidget, Results, RetrieveWebMapSearchItems, RetrieveWebMapGroups, QueryResponseToResultsList,
	PortalItemFactory) {

	return declare([BaseWidget], {

		baseClass: 'gallery-widget',
		startup: function() {
			this.inherited(arguments);

			this._searchWidget = new SearchWidget(
				lang.hitch(this, this._searchTextEnterCallback),
				lang.hitch(this, this._searchByCategoryButtonClickCallback),
				lang.hitch(this, this._searchByOrganisationButtonClickCallback));
			this._searchWidget.placeAt(this);

			this._retrieveWebMapSearchItems = new RetrieveWebMapSearchItems();
			this._retrieveWebMapSearchItems.baseUri = this.config.portalApiUri;
			this._retrieveWebMapSearchItems.query = "";
			this._retrieveWebMapSearchItems.count = this.config.pageSize;
			this._retrieveWebMapSearchItems.offset = 0;
			this._retrieveWebMapSearchItems.request(
				lang.hitch(this, this._initialWebMapSearchItemsCallback));

			var portalItemFactory = new PortalItemFactory(
				this._groupItemClickedCallback,
				this._appItemClickCallback,
				this._webMapItemClickCallback
			);

			this._queryResultToResultsList = new QueryResultToResultsList(portalItemFactory);

			this._results = new Results();
			this._results.placeAt(this, "last");

			this._retrieveWebMapGroups = new RetrieveWebMapGroups();
			this._retrieveWebMapGroups.baseUri = this.config.portalApiUri;

			// this._retrieveWebMapGroups.request(
			// 	"WebMapGroupsForCategories",
			// 	lang.hitch(this, this.__webMapGroupsForCategoriesCallback)
			// );
			//
			// this._retrieveWebMapGroups.request(
			// 	"WebMapGroupsForOrganisations",
			// 	lang.hitch(this, this._webMapGroupsForOrganisationsCallback)
			// );

		},
		_searchTextEnterCallback:function(error, response){

		},
		_searchByCategoryButtonClickCallback:function(error, response){

		},
		_searchByOrganisationButtonClickCallback:function(error, response){

		},
		_webMapGroupsForCategoriesCallback:function(error, response){
			if(error){
				throw error;
			}else{
				var searchResults = response.Results;
				this._categories = this._queryResultToResultsList.addToResultsList(searchResults);
			}
		},
		_webMapGroupsForOrganisationsCallback:function(error, response){
			if(error){
				throw error;
			}else{
				var searchResults = response;
				this._organisations = this._queryResultToResultsList.addToResultsList(searchResults);
			}
		},
		_groupItemClickedCallback:function(error, response){

		},
		_appItemClickCallback:function(error, response){

		},
		_webMapItemClickCallback:function(error, response){

		},
		_initialWebMapSearchItemsCallback:function(error, response){
			if(error){
				throw error;
			}else{
				var searchResults = response.Results;
				this._defaultResults = this._queryResultToResultsList.addToResultsList(searchResults);
				this._results.items(this._defaultResults);
			}
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
		resize: function(){
			this._home.resize();
			this._categories.resize();
			this._organisations.resize();
		}
	});
});

//
// var exent = "";
// exent += this._map.extent.xmin + ",";
// exent += this._map.extent.ymin + ",";
// exent += this._map.extent.xmax + ",";
// exent += this._map.extent.ymax + ",";
// exent += this._map.extent.spatialReference.wkid;
//
// var url = this._item.Url.replace("{id}", this._item.Id);
// url += "&extent=" + exent;
//
// window.open(url, '_self');


//
// var url = this._itemDetailsUrl + "?webmap=" + this._item.Id;
// window.open(url, '_blank');
