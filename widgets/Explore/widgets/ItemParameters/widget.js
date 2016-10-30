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
		"dojo/dom-construct",
		"dojo/dom"

	], function(declare, lang, arrayUtil, domConstruct, domClass, _WidgetBase, _TemplatedMixin, widgetTemplate, ItemParameterWidget, ResultWidget){

		return declare('ParameterWidget',[_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			title:"Unknown",
			baseUri:"",
			pageSize:6,
			mapItemUrls:null,
			map:null,
			geometryService:null,
			_searchItemContainerNode:null,
			startup:function(){
				this.inherited(arguments);

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
			_createItemContainerNode:function(){

				this._searchItemContainerNode = domConstruct.toDom("<ul class='list-group' data-dojo-type='dojox/mobile/EdgeToEdgeList' ></ul>");
				domClass.add(this._searchItemContainerNode, "search-item-container");
				domConstruct.place(this._searchItemContainerNode, this.searchItemsNode);
			},
			items:function(items){
				arrayUtil.forEach(items, lang.hitch(this, this._configureItem));
			},
			_configureItem:function(parameter){

				var parameterWidget = {};

				parameterWidget = new ItemParameterWidget();
				parameterWidget.parameter(parameter);
				parameterWidget.placeAt(this._searchItemContainerNode);
				parameterWidget.on('parameterClickEvent', lang.hitch(this, this._parameterClicked));
			},
			_parameterClicked:function(parameter){

				this._resultsWidget.clearResults();
				this._resultsWidget.updatePagination = true;
				this._resultsWidget.searchText = parameter.Tag;
				this._resultsWidget.searchMapsAndApps();

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
