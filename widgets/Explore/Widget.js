define([
		'dojo/_base/declare',
		'dojo/_base/event',
		'dojo/_base/lang',
		'dojo/on',
		'dojo/dom-class',
		'jimu/BaseWidget',
		'esri/config',
		'./widgets/Search/widget',
		'./widgets/BreadcrumbWidget/widget',
		'./widgets/Result/widget',
		'./js/RetrieveWebMapSearchItems',
		'./js/RetrieveWebMapGroups',
		'./js/RetrieveWebMapGroupItems',
		'./js/QueryResultToResultsList',
		'./js/PortalItemFactory',
		'xstyle/css!./css/bootstrap3_3_7.css'
],function(declare, event, lang, on, domClass, BaseWidget, esriConfig,
	SearchWidget, BreadcrumbWidget, Results, RetrieveWebMapSearchItems,
	RetrieveWebMapGroups, RetrieveWebMapGroupItems, QueryResponseToResultsList,
	PortalItemFactory) {

	return declare([BaseWidget], {

		baseClass: 'gallery-widget',
		startup: function() {
			this.inherited(arguments);

			this._breadcrumbWidget = new BreadcrumbWidget(
				lang.hitch(this, this._homeClickCallback));

			this._searchWidget = new SearchWidget(
				lang.hitch(this, this._searchTextEnterCallback),
				lang.hitch(this, this._searchByCategoryButtonClickCallback),
				lang.hitch(this, this._searchByOrganisationButtonClickCallback));
			this._searchWidget.placeAt(this);

			this._retrieveWebMapGroupItems = new RetrieveWebMapGroupItems()
			this._retrieveWebMapGroupItems.baseUri = this.config.portalApiUri;
			this._retrieveWebMapGroupItems.query = "";
			this._retrieveWebMapGroupItems.count = this.config.pageSize;
			this._retrieveWebMapGroupItems.offset = 0;

			this._retrieveWebMapSearchItems = new RetrieveWebMapSearchItems();
			this._retrieveWebMapSearchItems.baseUri = this.config.portalApiUri;
			this._retrieveWebMapSearchItems.query = "";
			this._retrieveWebMapSearchItems.count = this.config.pageSize;
			this._retrieveWebMapSearchItems.offset = 0;
			this._retrieveWebMapSearchItems.request(
				lang.hitch(this, this._initialWebMapSearchItemsCallback));

			var portalItemFactory = new PortalItemFactory(
				lang.hitch(this, this._groupItemClickedCallback),
				lang.hitch(this, this._appItemClickCallback),
				lang.hitch(this, this._webMapItemClickCallback)
			);

			this._queryResultToResultsList = new QueryResultToResultsList(portalItemFactory);

			this._results = new Results();
			this._results.placeAt(this, "last");

			this._retrieveWebMapGroupsCategories = new RetrieveWebMapGroups();
			this._retrieveWebMapGroupsCategories.baseUri = this.config.portalApiUri;

			this._retrieveWebMapGroupsCategories.request(
			 	"WebMapGroupsForCategories",
			 	lang.hitch(this, this._webMapGroupsForCategoriesCallback)
			);

			this._retrieveWebMapGroupsOrganisations = new RetrieveWebMapGroups();
			this._retrieveWebMapGroupsOrganisations.baseUri = this.config.portalApiUri;
			this._retrieveWebMapGroupsOrganisations.request(
				"WebMapGroupsForOrganisations",
				lang.hitch(this, this._webMapGroupsForOrganisationsCallback)
			);

		},
		_searchTextEnterCallback:function(error, response){
			// TODO: Implement text search
		},
		_searchByCategoryButtonClickCallback:function(error, response){
			if(this._searchWidget.domNode.parentNode)
				this.domNode.removeChild(this._searchWidget.domNode);

			this._breadcrumbWidget.clearTrail();
			this._breadcrumbWidget.addWebMapGroupTitle("Categories");
			this._breadcrumbWidget.placeAt(this, "first");
			this._results.replaceItems(this._categories);
		},
		_searchByOrganisationButtonClickCallback:function(error, response){

			if(this._searchWidget.domNode.parentNode)
				this.domNode.removeChild(this._searchWidget.domNode);

			this._breadcrumbWidget.clearTrail();
			this._breadcrumbWidget.addWebMapGroupTitle("Districts");
			this._breadcrumbWidget.placeAt(this, "first");
			this._results.replaceItems(this._organisations);
		},
		_webMapGroupsForCategoriesCallback:function(error, response){
			if(error){
				throw error;
			}else{
				var searchResults = response;
				this._categories = this
					._queryResultToResultsList
					.addToResultsList(searchResults, "WebMapGroupsForCategories");
			}
		},
		_webMapGroupsForOrganisationsCallback:function(error, response){
			if(error){
				throw error;
			}else{
				var searchResults = response;
				this._organisations = this.
					_queryResultToResultsList
					.addToResultsList(searchResults, "WebMapGroupsForOrganisations");
			}
		},
		_groupItemClickedCallback:function(error, response){

			if(response.source == "WebMapGroupsForCategories"){
				this._breadcrumbWidget.addResults(
					lang.hitch(this, this._searchByCategoryButtonClickCallback));
			}else if (response.source == "WebMapGroupsForOrganisations") {
				this._breadcrumbWidget.addResults(
					lang.hitch(this, this._searchByOrganisationButtonClickCallback));
			}

			this._retrieveWebMapGroupItems.groupID = response.Id;
			this._retrieveWebMapGroupItems.request(
				lang.hitch(this, this._webMapGroupItemsClickedCallback));
		},
		_webMapGroupItemsClickedCallback:function(error, response){
			if(error){
				throw error;
			}else{
				var searchResults = response.Results;
				this._currentResults = this._queryResultToResultsList.addToResultsList(searchResults);
				this._results.replaceItems(this._currentResults);
			}
		},
		_appItemClickCallback:function(error, response){
			// TODO: Implement app click
		},
		_webMapItemClickCallback:function(error, response){
			// TODO: Implement web map click
		},
		_initialWebMapSearchItemsCallback:function(error, response){
			if(error){
				throw error;
			}else{
				var searchResults = response.Results;
				this._defaultResults = this._queryResultToResultsList.addToResultsList(searchResults);
				this._results.replaceItems(this._defaultResults);
			}
		},
		_homeClickCallback:function(err, response){
			this._breadcrumbWidget.clearTrail();
			this.domNode.removeChild(this._breadcrumbWidget.domNode);
			this._searchWidget.placeAt(this, "first");
			this._results.replaceItems(this._defaultResults);
		}
		// _showPanel:function(panelName){
		// 	this._removePanelFocus(this._home.domNode);
		// 	this._removePanelFocus(this._categories.domNode);
		// 	this._removePanelFocus(this._organisations.domNode);
		//
		// 	if(panelName == "Home"){
		// 		this._setPanelFocus(this._home.domNode);
		// 	}else if(panelName =="Category"){
		// 		this._setPanelFocus(this._categories.domNode);
		// 	}else if(panelName == "Organisation"){
		// 		this._setPanelFocus(this._organisations.domNode);
		// 	}
		// },
		// _configureAsPanel:function(panelNode){
		// 	domClass.add(panelNode, "view-stack");
		// },
		// _removePanelFocus:function(panelNode){
		// 	domClass.remove(panelNode, "view-stack-focus");
		// },
		// _setPanelFocus:function(panelNode){
		// 	domClass.add(panelNode, "view-stack-focus");
		// },
		// resize: function(){
		// 	this._home.resize();
		// 	this._categories.resize();
		// 	this._organisations.resize();
		// }
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
