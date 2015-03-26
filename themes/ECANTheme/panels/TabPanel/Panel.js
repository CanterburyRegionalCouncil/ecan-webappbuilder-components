define(
	[
	'dojo/_base/declare',
    'dojo/_base/html',
    'dojo/query',
    'jimu/BaseWidgetPanel',
	'./TabWidgetFrame'
	], function(declare, html, query, BaseWidgetPanel, TabWidgetFrame){
	
		return declare([BaseWidgetPanel],{
			baseClass: 'jimu-widget-panel jimu-tab-panel jimu-main-bgcolor',

			createFrame: function(widgetConfig) {
				var frame = new TabWidgetFrame({
					label: widgetConfig.label
				});

				this._setFrameSize(frame);
					return frame;
				},

				_setFrameSize: function(frame) {
				var count = this.getChildren().length + 1;

				var hPrecent = 1 / count * 100;
				query('.tab-widget-frame', this.containerNode).style('height', hPrecent + '%');
				html.setStyle(frame.domNode, 'height', hPrecent + '%');
			}
		})
	}
)
	
	