define([
	'dojo/_base/declare',
	'dojo/dom-class',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dojo/text!./template/widget.html'
	],function(declare, domClass, _WidgetBase, _TemplatedMixin, widgetTemplate){
	
		return declare('ItemParameter', [_WidgetBase, _TemplatedMixin],{
			templateString:widgetTemplate,
			
			_parameter:null,
			parameter:function(parameter){
				this._parameter = parameter;
				
				this.set("innerText", parameter.Title);
				this.set("title", parameter.Title);
				this.set("itemCount", parameter.ItemCount + " maps & apps");
				this.set("badgeCount", parameter.ItemCount);
	

				if(parameter.Thumbnail){
					var id = parameter.Id;
					var thumbnail = parameter.Thumbnail;
					
					this.set("imageAlt", parameter.Title);
					this.set("imageUrl", "http://www.arcgis.com/sharing/rest/community/groups/" + id + "/info/" + thumbnail);
					
					domClass.remove(this.parameterImageNode, 'hide');
				}
			},
			weightParameterByItemCount:function(){
				
				var cssClass = "Weight1";
				
				if(this._parameter.ItemCount == 1){
					cssClass = "Weight5";
				}else if(this._parameter.ItemCount == 2){
					cssClass = "Weight4";
				}else if(this._parameter.ItemCount == 3){
					cssClass = "Weight3";
				}else if(this._parameter.ItemCount == 4){
					cssClass = "Weight2";
				}
				
				domClass.add(this.titleNode, cssClass);
			},
			innerText:"Unknown",
			_setInnerTextAttr:{node:"titleNode", type:"innerHTML"},
			
			title:"Unknown",
			_setTitleAttr:{node:"titleNode", type:"attribute", attribute:"title"}, 
			
			itemCount:"Unknown",
			_setItemCountAttr:{node:"imageLinkNode", type:"attribute", attribute:"title"}, 
			
			imageUrl:null,
			_setImageUrlAttr: {node: "imageNode", type: "attribute", attribute: "src" },
			
			badgeCount:" ",
			_setBadgeCountAttr:{node:"badgeNode", type:"innerHTML"}, 

			imageAlt:"",
			_setImageAltAttr: {node: "imageNode", type: "attribute", attribute: "alt"},
			
			_onClick:function(/*event*/ e){
				this.onParameterClickEvent(this._parameter);
			},
				
			onParameterClickEvent:function(){}
		});
	}
);