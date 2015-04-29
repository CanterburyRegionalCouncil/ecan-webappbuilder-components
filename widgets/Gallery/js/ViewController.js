define([
		'dojo/_base/declare',
		'dojo/query',
	], function(declare, query){

		return declare('ViewController', [], {
			_showItems:function(){
				query('.search-items', this.domNode).removeClass('hide');
				query('.search-results', this.domNode).addClass('hide');
			},
			_showResults:function(){
				query('.search-items', this.domNode).addClass('hide');
				query('.search-results', this.domNode).removeClass('hide');
			},
			onShowPanelEvent:function(){}
		});
	}
);