define([
		'dojo/_base/declare',
		'dojo/_base/lang',
		'dojo/on',
		'dojo/dom-class',
		'dojo/dom-attr',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./widget.html',
	],function(declare, lang, on, domClass, domAttr, _WidgetBase, _TemplatedMixin, widgetTemplate){
		return declare('MapThumbWidget',[_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			_item:null,
			_callback:null,
			constructor:function(item, callback){
				this._item = item;
				this._callback = callback;
			},
			startup:function(){
				this.inherited(arguments);

				this.resultTitleNode.textContent = item.Title;
				this.resultTitleSnippet.textContent = item.Snippet;

				var imgSrc = "http://www.arcgis.com/sharing/rest/content/items/" +
					item.Id + "/info/" + item.ThumbnailUrl;

				domAttr.set(this.resultImageNode, "src", imgSrc);
				domAttr.set(this.resultImageNode, "alt", imgSrc);

				domClass.add(this.resultGlyphiconNode, "glyphicon-globe");
				on(this.resultOpenButtonNode, "click", lang.hitch(this, this._openWebMap));
				on(this.resultImageNode, "click", lang.hitch(this, this._openDetails));
			},
			_openWebMap:function(/*Event*/ e){
					e.preventDefault();
					var response = {
						item: this._item,
						action: "openWebMap"
					};
					this._callback(null, response);
			},
			_openDetails:function(/*Event*/ e){
				 e.preventDefault();
				 var response = {
					 item: this._item,
					 action: "openDetails"
				 };
				 this._callback(null, response);
			}
		});

	}
);
