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
		'./../ItemCloudParameter/widget',
		'./../Result/widget',
	], function(declare, lang, arrayUtil, domConstruct, domClass, _WidgetBase, _TemplatedMixin, widgetTemplate, ItemParameterWidget, ItemCloudParameterWidget, ResultWidget){
		
		return declare('ParameterWidget',[_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			title:"Unknown",
			type:"",
			baseUri:"",
			pageSize:6,
			mapItemUrls:null,
			map:null,
			isCloud:false,
			_searchItemContainerNode:null,
			startup:function(){
				this.inherited(arguments);
				this.itemsBreadCrumbTitle.innerHTML = this.title;
				this.itemsTitle.innerHTML = this.title;
				this.resultsBreadCrumbTitle.innerHTML = this.title;
				
				this._createItemContainerNode();
				
				this._resultsWidget = new ResultWidget();
				this._resultsWidget.baseUri = this.baseUri;
				this._resultsWidget.type = this.type;
				this._resultsWidget.pageSize = this.pageSize;
				this._resultsWidget.mapItemUrls = this.mapItemUrls;
				this._resultsWidget.map = this.map;
				this._resultsWidget.placeAt(this.searchResultsNode);
			},
			_createItemContainerNode:function(){
			
				if(this.isCloud){
					this._searchItemContainerNode = domConstruct.create("div");
				}
				else{
					this._searchItemContainerNode = domConstruct.create("ul");
				}
				
				domClass.add(this._searchItemContainerNode, "search-item-container");
				domConstruct.place(this._searchItemContainerNode, this.searchItemsNode);
			},
			items:function(items){
				arrayUtil.forEach(items, lang.hitch(this, this._configureItem));
			},
			_configureItem:function(parameter){
			
				var parameterWidget = {};
				
				if(this.isCloud){
					parameterWidget = new ItemCloudParameterWidget();
				}
				else{
					parameterWidget = new ItemParameterWidget();
				}
				 
				parameterWidget.parameter(parameter);
				parameterWidget.placeAt(this._searchItemContainerNode);
				parameterWidget.on('parameterClickEvent', lang.hitch(this, this._parameterClicked));
			},
			_parameterClicked:function(parameter){
				
				this._resultsWidget.clearResults();
				this._resultsWidget.updatePagination = true;
				this._resultsWidget.searchText = parameter.Title;
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