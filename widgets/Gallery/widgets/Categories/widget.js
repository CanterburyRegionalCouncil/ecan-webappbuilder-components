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
	], function(declare, lang, arrayUtil, dom, domClass, query, _WidgetBase, _TemplatedMixin, widgetTemplate, CategoryWidget){
		return declare('CategoriesWidget', [_WidgetBase, _TemplatedMixin], {
			templateString:widgetTemplate,
			_container:null,
			startup:function(){
				this.inherited(arguments);
				this._container = dom.byId('container');
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
				query('.search-results', this.domNode).removeClass('hide')
			},
			_showHome:function(/*Event*/ e){
				e.preventDefault();
				this.onShowPanelEvent("Home");
			},
			_showItems:function(/*Event*/ e){
				e.preventDefault();
				query('.search-items', this.domNode).removeClass('hide');
				query('.search-results', this.domNode).addClass('hide')
			},
			onShowPanelEvent:function(){}
		});
	}
);