define([
		'dojo/_base/declare',
		'dojo/_base/lang',
		"dojo/number",
		'esri/SpatialReference'
	], function(declare, lang, number, SpatialReference){
		
		return declare('ExtentUtilities', [], {
			geometryService:null,
			map:null,
			logExtent:function(){
				var extent = this.map.extent;
				var extentString = "";
				extentString += extent.xmin + ",";
				extentString += extent.ymin + ",";
				extentString += extent.xmax + ",";
				extentString += extent.ymax + ",";
				extentString += "2193";
				console.log(extentString);
			},
			extentToGeographicString:function(){
				this.logExtent();
				if(this.map.geographicExtent){
					this._processGeographicExtent();
				}else{
					this._processProjectExtent();
				}
			},
			_processGeographicExtent:function(){
				var extentParameters = this._extentToString(this.map.extent);
				this.projectionStringReady(extentParameters);
			},
			_processProjectExtent:function(){
				var outSR = new SpatialReference(4326);
				var extent = this.map.extent;
				
				this.geometryService.project([extent], outSR, lang.hitch(this, this._projectResults));
			},
			_projectResults:function(projectedExents){
				var geographicExtent = projectedExents[0]; //Only one so grab the first;
				var extentParameters = this._extentToString(geographicExtent);
				this.projectionStringReady(extentParameters);
			},
			_extentToString:function(extent){
				
				var extentString = "";
				
				extentString += number.format(extent.xmin, {places: 4}) + ",";
				extentString += number.format(extent.ymin, {places: 4}) + ",";
				extentString += number.format(extent.xmax, {places: 4}) + ",";
				extentString += number.format(extent.ymax, {places: 4}) + ",";
				
				return extentString;
			},
			projectionStringReady:function(projectionString){
				//To be overridden;
			}
		});
	}
);