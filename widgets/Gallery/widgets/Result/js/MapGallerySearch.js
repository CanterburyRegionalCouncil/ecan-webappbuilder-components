define([
		'dojo/_base/declare',
		'dojo/_base/lang',
		'dojo/Evented',
		'esri/request'
		
	], function(declare, lang, Evented, esriRequest){
		
		return declare('MapGallerySearch', [Evented],{
			baseUri:"",
			pageSize:6,
			page:1,
			orderBy:"MostRecent",
			type:"",
			searchText:"", 
			isFreeText:false,
			requestSearchResults:function(){
				
				var requestUri = this.baseUri + "?";
				var parameters = "";
				
				if(this.searchText){
				
					parameters = this.searchText
					
					if(!this.isFreeText){
						parameters = "[" + parameters + "]";
					}
					
					parameters = "SearchText=" + parameters + "&";
				}
				
				requestUri += parameters;
				requestUri += "PageSize=" + this.pageSize;
				requestUri += "&Page=" + this.page;
				requestUri += "&OrderBy=" + this.orderBy;
				
				var requestSearchResults = esriRequest({
					url:requestUri,
					content:{f:"json"}
				});
				
				requestSearchResults.then(lang.hitch(this, this.searchResultsRequestResponse), this.searchResultsRequestError);
			},
			searchResultsRequestResponse:function(){},
			searchResultsRequestError:function(error){
				console.log(error);
			}
		});
	});