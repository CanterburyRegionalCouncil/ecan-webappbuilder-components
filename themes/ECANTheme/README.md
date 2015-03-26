# ECAN THEME #
Basic Environment Canterbury theme for use with the Esri Web AppBuilder (WAB) developed by Sam Drummond on behalf of Environment Canterbury.

## Background ##
This theme was developed using limited documentation from the [Esri Developers Site](https://developers.arcgis.com/web-appbuilder/guide/create-a-theme.htm). ECAN's [Land and Property Map](http://canterburymaps.govt.nz/WebApps/PropertyMap/?SEARCH=VAL|2240008336) as a guide for styling.

##Limitations##
During the development of the theme four limitations were identified:

###1. Single widget controller###
ECAN's [Land and Property Map](http://canterburymaps.govt.nz/WebApps/PropertyMap/?SEARCH=VAL|2240008336) appears to have two locations to launch widgets - either from the side panel or from the header bar. 

WAB themes are intended to be configurable so that publishers can modify the amount and types of tools provided through widgets.  As such it was intended that as per the [Land and Property Map](http://canterburymaps.govt.nz/WebApps/PropertyMap/?SEARCH=VAL|2240008336) publisher would be able to add an unknown number of widgets to the side panel and header bar. 

There is no documentation that indicates this is possible at version 1.1. On-Panel widget buttons are managed using WidgetControllers and draw configuration from the applications widget pool. At this stage the WAB is restricted in that there can only be one widget pool. So while the theme can have two WidgetControllers they both load the exact same widgets. 

This functionality may actually be available but it is not yet documented. The WAB administration interface can load a theme and will display multiple containers for launching widgets but there is no way save which items from the widget pool are loaded into each.

This has been logged on [GeoNet](https://geonet.esri.com/thread/127783).

###2. Header Controller Link Offset###
As the WAB can only have a single widget controller the widgets launched from the header panel have been provided through widget placeholders. These are static locations where On-Panel widgets can be loaded and are positioned using the config.json file for the themes layout (i.e. [Theme]/layouts\default\config.json). 

To replicate the layout of the [Land and Property Map](http://canterburymaps.govt.nz/WebApps/PropertyMap/?SEARCH=VAL|2240008336) these placeholders have been positioned over the header bar. To prevent these place holders from over lapping any items on the header bar the following style rule have been added to the default layout stylesheet ([Theme]\styles\default\style.css)

    .jimu-widget-header .links {
      margin-right: 141px;
    }

###3. Panel Styling not loading from style.css###
During development the tab panels stylesheet ([Theme]\panels\TabPanel\style.css) was not being applied to the panel widget. This works for the two out of the box Esri Themes (FoldableTheme and TabTheme) but was not working when a custom theme was created.  

To work around this the contents of [Theme]\panels\TabPanel\style.css has been duplicated to the start of the default layouts stylesheet ([Theme]\styles\default\style.css). Custom rules have been added to the bottom of the stylesheet so that if this bug is fixed a developer can simply remove the duplicated rules from the top of the stylesheet and the theme will continue working correctly.  

This has been logged on [GeoNet](https://geonet.esri.com/thread/127782).

###4. Stylesheet injection order###
Intially it was thought that there were limitations to the theme styling framework which prevented developers from configuring the styles of off-panel widgets. 

Esri Documentation indicated that theme styling should be done in the common stylesheet ([Theme]\common.css). However, the common stylesheet is injected before the off-panel widgets in the cascade. This means that the widgets style rules were superseding the themes. 

To work around this off panel widget style rules have been placed in the layouts stylesheet (i.e. [Theme]\styles\default\style.css).