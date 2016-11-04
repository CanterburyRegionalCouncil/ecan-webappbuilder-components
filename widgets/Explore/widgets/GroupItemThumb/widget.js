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
		return declare('GroupThumbWidget',[_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			_item:null,
			_callback:null,
			constructor:function(item, callback){
				this._item = item;
				this._callback = callback;
			},
			startup:function(){

				this.titleNode.textContent = item.Title;
				this.badgeNode.textContent = this._item.Items
				this.set("title", this._item.Title);
				this.set("itemCount", this._item.Items + " maps & apps");


				if(this._item.Thumbnail){
					var id = this._item.Id;
					var thumbnail = this._item.Thumbnail;

					this.set("imageAlt", this._item.Title);
					this.set("imageUrl", "http://www.arcgis.com/sharing/rest/community/groups/" + id + "/info/" + thumbnail);

					domClass.remove(this.parameterImageNode, 'hide');
				}
			}
		});
	});
