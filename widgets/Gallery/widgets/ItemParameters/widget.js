define([
		'dojo/_base/declare',
		'dojo/_base/lang',
		'dojo/_base/array',
		'dojo/query',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./template/widget.html',
		'./../../js/ViewController',
		'./../ItemParameter/widget',
		'./../Result/widget',
	], function(declare, lang, arrayUtil, query, _WidgetBase, _TemplatedMixin, widgetTemplate, ViewController, ItemParameterWidget, ResultWidget){
		
		return declare('ParameterWidget',[_WidgetBase, _TemplatedMixin, ViewController],{
			templateString:widgetTemplate,
			title:"Unknown",
			type:"",
			baseUri:"",
			pageSize:6,
			mapItemUrls:null,
			map:null,
			_container:null,
			_resultsWidget:null,
			startup:function(){
				this.inherited(arguments);
				
				this.itemsBreadCrumbTitle.innerHTML = this.title;
				this.itemsTitle.innerHTML = this.title;
				this.resultsBreadCrumbTitle.innerHTML = this.title;
				
				this._container = query('.search-item-container', this.domNode)[0]; //Only one so grab the first
				var resultContainer = query('.search-result-container', this.domNode)[0]; //Only one so grab the first
				
				this._resultsWidget = new ResultWidget();
				this._resultsWidget.baseUri = this.baseUri;
				this._resultsWidget.type = this.type;
				this._resultsWidget.pageSize = this.pageSize;
				this._resultsWidget.mapItemUrls = this.mapItemUrls;
				this._resultsWidget.map = this.map;
				this._resultsWidget.placeAt(resultContainer);
			},
			
			items:function(items){
				arrayUtil.forEach(items, lang.hitch(this, this._configureItem));
			},
			_configureItem:function(parameter){
				var parameterWidget = new ItemParameterWidget();
				parameterWidget.parameter(parameter);
				parameterWidget.placeAt(this._container);
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
			resize:function(){
				this._resultsWidget.resize();
			}
		});
	}
);