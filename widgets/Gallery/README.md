#Gallery Widget#
A Gallery widget for the Esri Web App Builder. Allows Environment Canterbury users to search and explore web maps and apps from ArcGIS Online. 

##About##
A Gallery widget for the Esri Web App Builder. Allows Environment Canterbury users to search and explore web maps and apps from ArcGIS Online.  

This widget does not dynamically search for items on ArcGIS Online. ECAN have a scheduled task which routinely caches item metadata from ArcGIS Online and stores it in a database. The Gallery widget queries this database through their [Portal API](http://test.canterburymaps.govt.nz/portalapi/MapGallerySearch?SearchText=[1941]&PageSize=20&Page=1&OrderBy=MostRecent) (a REST web service) as this is faster that dynamically searching ArcGIS Online. 

When a user clicks on a web map or app the item itself is opened directly from ArcGIS Online.

##Dependencies##
The widget is dependent on the bootstrap.css. The following file needs to be added to the app's init.js file as per the instructions [here](https://developers.arcgis.com/web-appbuilder/sample-code/add-a-third-party-library.htm).

```JS
'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css',  
```


##Supported Versions##
**Javascript API**: 3.12

**Esri Web AppBuilder**: 1.1 