define([
	'dojo/_base/declare',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dojo/text!../templates/category.html'
	],function(declare, _WidgetBase, _TemplatedMixin, widgetTemplate){
	
		return declare('CategoryWidget', [_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			
			_category:null,
			category:function(category){
				this._category = category;
				
				this.set("innerText", category.Title);
				this.set("title", category.Title);
				this.set("imageAlt", category.Title);
				this.set("itemCount", category.ItemCount + " maps & apps");
				
				var id = category.Id;
				var thumbnail = category.Thumbnail;
				this.set("imageUrl", "http://www.arcgis.com/sharing/rest/community/groups/" + id + "/info/" + thumbnail);
			},
			innerText:"Unknown",
			_setInnerTextAttr:{node:"titleNode", type:"innerHTML"},
			
			title:"Unknown",
			_setTitleAttr:{node:"titleNode", type:"attribute", attribute:"title"}, 
			
			itemCount:"Unknown",
			_setItemCountAttr:{node:"imageLinkNode", type:"attribute", attribute:"title"}, 
			
			imageUrl:null,
			_setImageUrlAttr: {node: "imageNode", type: "attribute", attribute: "src" },
			
			imageAlt:"",
			_setImageAltAttr: {node: "imageNode", type: "attribute", attribute: "alt"},
			
			_onClick:function(/*event*/ e){
				this.onCategoryClickEvent(this._category);
			},
				
			onCategoryClickEvent:function(){}
		});
	}
);