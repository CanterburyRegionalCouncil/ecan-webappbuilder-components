define([
		'dojo/_base/declare',
		'dojo/_base/lang',
		'dojo/dom-class',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./template/widget.html',
		'./../Result/widget',
		'./../../js/RetrieveWebMapSearchItems',
	], function(declare, lang, domClass, _WidgetBase, _TemplatedMixin, widgetTemplate,
			ResultsWidget, RetrieveWebMapSearchItems){
		return declare('HomeWidget', [_WidgetBase, _TemplatedMixin], {
			templateString:widgetTemplate,
			baseUri:"",
			_allResults:null,
			pageSize:6,
			itemDetailsUrl:null,
			map:null,
			description:"",
			startup:function(){
				this.inherited(arguments);

				this.searchDescriptionNode.textContent = this.description;

				this._retrieveWebMapSearchItems = new RetrieveWebMapSearchItems();
				this._retrieveWebMapSearchItems.baseUri = this.baseUri;
				this._retrieveWebMapSearchItems.on("onItemsRetrievedEvent", lang.hitch(this, this._configureResults));

			 	var retrieveInitialWebMapSearchResults = new RetrieveWebMapSearchItems();
				retrieveInitialWebMapSearchResults.baseUri = this.baseUri;
				retrieveInitialWebMapSearchResults.on("onItemsRetrievedEvent", lang.hitch(this, this._configureInitalResults));
				retrieveInitialWebMapSearchResults.query = "";
				retrieveInitialWebMapSearchResults.count = 10;
				retrieveInitialWebMapSearchResults.offset = 0;
				retrieveInitialWebMapSearchResults.request();

				this._resultsWidget = new ResultsWidget();
				this._resultsWidget.baseUri = this.baseUri;
				this._resultsWidget.pageSize = this.pageSize;
				this._resultsWidget.itemDetailsUrl = this.itemDetailsUrl;
				this._resultsWidget.map = this.map;
				this._resultsWidget.isFreeText = true;
				this._resultsWidget.placeAt(this.searchResultsNode);
			},
			searchText:function(/* Event */ e){

				e.preventDefault();

				var searchText = this.searchInputNode.value;

				if(searchText){
					this._retrieveWebMapSearchItems.query = searchText;
					this._retrieveWebMapSearchItems.count = 10;
					this._retrieveWebMapSearchItems.offset = 0;
					this._retrieveWebMapSearchItems.request();
				}
			},
			_configureInitalResults:function(response){
				this._allResults = response;
				this._showSearchForm();
			},
			_configureResults:function(response){
				this._resultsWidget.clearResults();
				this._resultsWidget.updatePagination = true;
				this._resultsWidget.showResults(response);
				this._showBreadCrumbs();
			},
			searchByCategory:function(/* Event */ e){
				e.preventDefault();
				this.onShowPanelEvent("Category");
			},
			searchByOrganisation:function(/* Event */ e){
				e.preventDefault();
				this.onShowPanelEvent("Organisation");
			},
			_showSearchForm:function(){

				this._resultsWidget.clearResults();
				this._resultsWidget.updatePagination = true;
				this._resultsWidget.showResults(this._allResults);

		  	domClass.add(this.breadcrumbsNode, 'hide');
				domClass.remove(this.searchFormNode, 'hide');
			},
			_showBreadCrumbs:function(){
				domClass.remove(this.breadcrumbsNode, 'hide');
				domClass.add(this.searchFormNode, 'hide');
			},
			resize:function(){
				this._resultsWidget.resize();
			},
			onShowPanelEvent:function(){}
		});
	}
);
