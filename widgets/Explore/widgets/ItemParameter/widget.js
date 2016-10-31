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
			parameter:function(parameter, itemCount){
				this._parameter = parameter;

				this.set("innerText", parameter.Title);
				this.set("title", parameter.Title);
				this.set("itemCount", parameter.Items + " maps & apps");
				this.set("badgeCount", parameter.Items);


				if(parameter.Thumbnail){
					var id = parameter.Id;
					var thumbnail = parameter.Thumbnail;

					this.set("imageAlt", parameter.Title);
					this.set("imageUrl", "http://www.arcgis.com/sharing/rest/community/groups/" + id + "/info/" + thumbnail);

					domClass.remove(this.parameterImageNode, 'hide');
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
