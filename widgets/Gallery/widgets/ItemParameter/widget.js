define([
	'dojo/_base/declare',
	'dojo/query',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dojo/text!./template/widget.html'
	],function(declare, query, _WidgetBase, _TemplatedMixin, widgetTemplate){
	
		return declare('ItemParameter', [_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			
			_parameter:null,
			parameter:function(parameter){
				this._parameter = parameter;
				
				this.set("innerText", parameter.Title);
				this.set("title", parameter.Title);
				this.set("itemCount", parameter.ItemCount + " maps & apps");
				
				if(parameter.Thumbnail){
					var id = parameter.Id;
					var thumbnail = parameter.Thumbnail;
					
					this.set("imageAlt", parameter.Title);
					this.set("imageUrl", "http://www.arcgis.com/sharing/rest/community/groups/" + id + "/info/" + thumbnail);
					
					query('.gallery-parameter-image', this.domNode).removeClass('hide');
				}
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
				this.onParameterClickEvent(this._parameter);
			},
				
			onParameterClickEvent:function(){}
		});
	}
);