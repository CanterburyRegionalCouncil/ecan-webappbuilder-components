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
				this.set("itemCount", parameter.ItemCount + " maps & apps");
				
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
				
				domClass.add(this.domNode, cssClass);
			},
			
			innerText:"Unknown",
			_setInnerTextAttr:{node:"titleNode", type:"innerHTML"},
			
			itemCount:"Unknown",
			_setItemCountAttr:{node:"titleNode", type:"attribute", attribute:"title"}, 
			
			_onClick:function(/*event*/ e){
				this.onParameterClickEvent(this._parameter);
			},
				
			onParameterClickEvent:function(){}
		});
	}
);