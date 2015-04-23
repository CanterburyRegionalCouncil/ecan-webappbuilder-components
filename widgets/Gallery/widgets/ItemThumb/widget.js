define([
		'dojo/_base/declare',
		'dijit/_WidgetBase',
		'dijit/_TemplatedMixin',
		'dojo/text!./template/widget.html'
	],function(declare, _WidgetBase, _TemplatedMixin, widgetTemplate){
		return declare('ItemThumbWidget',[_WidgetBase, _TemplatedMixin],{
			templateString: widgetTemplate,
		});
	
	}
);