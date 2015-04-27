define([
		'dojo/_base/declare',
		'dojo/_base/lang',
		'dojo/_base/array',
		'dojo/dom',
		'dojo/dom-class',
		'dojo/query',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./template/widget.html',
		'./../Category/widget',
		'./../Result/widget',
	], function(declare, lang, arrayUtil, dom, domClass, query, _WidgetBase, _TemplatedMixin, widgetTemplate, CategoryWidget, ResultWidget){
		return declare('CategoriesWidget', [_WidgetBase, _TemplatedMixin], {
			templateString:widgetTemplate,
			baseUri:"",
			pageSize:6,
			mapItemUrls:null,
			map:null,
			_container:null,
			_resultsWidget:null,
			startup:function(){
				this.inherited(arguments);
				
				this._container = query('.search-item-container', this.domNode)[0]; //Only one so grab the first
				var resultContainer = query('.search-result-container', this.domNode)[0]; //Only one so grab the first
				
				this._resultsWidget = new ResultWidget();
				this._resultsWidget.baseUri = this.baseUri;
				this._resultsWidget.type = "category";
				this._resultsWidget.pageSize = this.pageSize;
				this._resultsWidget.mapItemUrls = this.mapItemUrls;
				this._resultsWidget.map = this.map;
				this._resultsWidget.placeAt(resultContainer);
			},
			resize:function(){
				this._resultsWidget.resize();
			},
			items:function(items){
				arrayUtil.forEach(items, lang.hitch(this, this._configureItem));
			},
			_configureItem:function(category){
				var categoryWidget = new CategoryWidget();
				categoryWidget.category(category);
				categoryWidget.placeAt(this._container);
				categoryWidget.on('categoryClickEvent', lang.hitch(this, this._categoryClicked));
			},
			_categoryClicked:function(category){
				query('.search-items', this.domNode).addClass('hide');
				query('.search-results', this.domNode).removeClass('hide');
				
				this._resultsWidget.updatePagination = true;
				this._resultsWidget.searchMapsAndApps(category.Title);
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
				query('.search-items', this.domNode).removeClass('hide');
				query('.search-results', this.domNode).addClass('hide');
			},
			onShowPanelEvent:function(){}
		});
	}
);