# ecan-webappbuilder-components #
Themes and widgets for use with the ESRI ArcGIS WebAppBuilder developed by Environment Canterbury Regional Council.

This repository is broken up into two sections - one for layout **Themes** and one for **Widgets**.  The code has been developed for use with WebAppBuilder version 1.1. 

## Themes ##

The following themes are part of the repository:


- **ESRI Demo theme** (as contained in WebAppBuilder version 1.1 - included as a template for theme development).




## Widgets ##
 
The following widgets are part of the repository:

- **ESRI Demo widget** (as contained in WebAppBuilder version 1.1 - included as a template for widget development).

### Adding Widgets to WebAppBuilder ###

The following instructions explain how to customize the application by editing JSON files directly:

1. Copy the required custom widgets in the widgets folder - make sure to include all files in each of the custom widget's folder when copying. 
2. Add each widget into the app's config.json.
 The example below uses the Demo widget. Add it into the config.json file

		{
		     "name": "Demo",
		     "label": "Demo",
		     "uri": "widgets/Demo/Widget",
		     "index": 13,
		     "id": "widgets/Demo/Widget_1"
		},

1. Open widgets/widgets-manifest.json, and add a new key/value pair. 

	The key is the widget’s URI, the value is the content from your widget’s manifest.json.

	The example below uses the Demo widget. Add the "widgets/Demo/Widget" key and copy its manifest.json content to the widgets-manifest.json here.

		"widgets/Demo/Widget": { 
		     "name": "Demo", 
		     "platform": "HTML", 
		     "version": "0.0.1", 
		     "author": "Esri R&D Center Beijing", 
		     "description": "This is the widget used in developer guide", 
		     "copyright": "", 
		     "license": "http://www.apache.org/licenses/LICENSE-2.0" 
		 },

## Supported versions of ArcGIS API for JavaScript ##
ArcGIS API for JavaScript 3.12 and up.

