define([
		'dojo/_base/declare',
		'dojo/_base/lang',
		'dojo/_base/array',
		'dojo/dom-construct',
		'dojo/dom-class',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./template/widget.html',
		'./../ItemParameter/widget',
		'./../Result/widget',
		'./../../js/RetrieveWebMapGroups',
		'./../../js/RetrieveWebMapGroupItems',
		"dojo/dom-construct",
		"dojo/dom"

	], function(declare, lang, arrayUtil, domConstruct, domClass, _WidgetBase,
			_TemplatedMixin, widgetTemplate, ItemParameterWidget,
			ResultWidget, RetrieveWebMapGroups, RetrieveWebMapGroupItems){

		return declare('ParameterWidget',[_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			title:"Unknown",
			baseUri:"",
			webMapGroupType:"",
			pageSize:6,
			mapItemUrls:null,
			map:null,
			geometryService:null,
			_searchItemContainerNode:null,
			_retrieveWebMapGroupItems:null,
			startup:function(){
				this.inherited(arguments);

				var retrieveWebMapGroups = new RetrieveWebMapGroups();
				retrieveWebMapGroups.baseUri = this.baseUri;
				retrieveWebMapGroups.type = this.webMapGroupType;
				retrieveWebMapGroups.on("onGroupsRetrievedEvent",
				lang.hitch(this, this._configureGroups));
				retrieveWebMapGroups.request();

				this._retrieveWebMapGroupItems = new RetrieveWebMapGroupItems();
				this._retrieveWebMapGroupItems.baseUri = this.baseUri;
				this._retrieveWebMapGroupItems.on("onItemsRetrievedEvent",
					lang.hitch(this, this._configureItems));

				if (this.title =="Organisations")
				{
					this.itemsBreadCrumbTitle.innerHTML = "Districts";
					this.itemsTitle.innerHTML = "Districts";
					this.resultsBreadCrumbTitle.innerHTML = "Districts";
				}
				else{
					this.itemsBreadCrumbTitle.innerHTML = this.title;
					this.itemsTitle.innerHTML = this.title;
					this.resultsBreadCrumbTitle.innerHTML = this.title;
				}

				this._createItemContainerNode();

				this._resultsWidget = new ResultWidget();
				this._resultsWidget.baseUri = this.baseUri;
				this._resultsWidget.pageSize = this.pageSize;
				this._resultsWidget.mapItemUrls = this.mapItemUrls;
				this._resultsWidget.map = this.map;
				this._resultsWidget.geometryService = this.geometryService;
				this._resultsWidget.placeAt(this.searchResultsNode);
			},
			_configureGroups:function(groups){
				arrayUtil.forEach(groups, lang.hitch(this, this._configureGroup));
			},
			_configureGroup:function(item){

				var parameterWidget = new ItemParameterWidget();
				parameterWidget.parameter(item);
				parameterWidget.placeAt(this._searchItemContainerNode);
				parameterWidget.on('parameterClickEvent', lang.hitch(this,
						this._parameterClicked));
			},
			_createItemContainerNode:function(){

				var ul = "<ul class='list-group' data-dojo-type='dojox/mobile/EdgeToEdgeList' ></ul>";
				this._searchItemContainerNode = domConstruct.toDom(ul);
				domClass.add(this._searchItemContainerNode, "search-item-container");
				domConstruct.place(this._searchItemContainerNode, this.searchItemsNode);
			},
			_parameterClicked:function(item){

				this._retrieveWebMapGroupItems.groupID = item.Id;
				this._retrieveWebMapGroupItems.count = 10;
				this._retrieveWebMapGroupItems.offset = 0;
				this._retrieveWebMapGroupItems.request();
			},
			_configureItems:function(response){
				this._resultsWidget.clearResults();
				this._resultsWidget.updatePagination = true;
				this._resultsWidget.showResults(response);
				//this._resultsWidget.searchText = parameter.Tag;
				//this._resultsWidget.searchMapsAndApps();
				this._showResults();
			},
			_showHomeClick:function(/*Event*/ e){
				e.preventDefault();
				this._showItems();
				this.onShowPanelEvent("Home");
			},
			_showItemsClick:function(/*Event*/ e){
				e.preventDefault();
				this._resultsWidget.clearResults();
				this._showItems();
			},
			_showItems:function(){
				domClass.remove(this.searchItemsNode, 'hide');
				domClass.add(this.searchResultsNode, 'hide');
			},
			_showResults:function(){
				domClass.add(this.searchItemsNode, 'hide');
				domClass.remove(this.searchResultsNode, 'hide');
			},
			resize:function(){
				this._resultsWidget.resize();
			},
			onShowPanelEvent:function(){}
		});
	}
);
