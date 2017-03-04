// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

//  copyright

/**
             * The copyright text as defined by the scene service.
             *
             * @memberof module:esri/layers/mixins/SceneService
             * @name copyright
             * @type {string}
             */

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/accessorSupport/decorators","../Layer","../../core/MultiOriginJSONSupport","./ArcGISService","./OperationalLayer","./PortalLayer","../../core/Error","../../core/urlUtils","../../core/promiseUtils","../../core/requireUtils","../../request","dojo/_base/lang","dojo/io-query","../../geometry/SpatialReference","../../geometry/Extent","../support/arcgisLayerUrl"],function(e,r,t,o,n,i,l,a,p,s,u,d,y,c,h,f,v,m,g,S){var b=function(r){function o(){var e=null!==r&&r.apply(this,arguments)||this;return e.blendMode=null,e.spatialReference=null,e.fullExtent=null,e.version={major:Number.NaN,minor:Number.NaN,versionString:""},e.copyright=null,e.sublayerTitleMode="item-title",e.title=null,e.layerId=null,e}return t(o,r),o.prototype.readSpatialReference=function(e,r){return this._readSpatialReference(r)},o.prototype._readSpatialReference=function(e){if(null!=e.spatialReference)return m.fromJSON(e.spatialReference);var r=e.store,t=r.indexCRS||r.geographicCRS,o=t&&parseInt(t.substring(t.lastIndexOf("/")+1,t.length),10);return null!=o?new m(o):null},o.prototype.readFullExtent=function(e,r){var t=r.store,o=this._readSpatialReference(r);return null==o||null==t||null==t.extent?null:new g({xmin:t.extent[0],ymin:t.extent[1],xmax:t.extent[2],ymax:t.extent[3],spatialReference:o})},o.prototype.readVersion=function(e,r){var t=r.store,o=null!=t.version?t.version.toString():"",n={major:Number.NaN,minor:Number.NaN,versionString:o},i=o.split(".");return i.length>=2&&(n.major=parseInt(i[0],10),n.minor=parseInt(i[1],10)),n},o.prototype.readCopyright=function(e,r){return r.copyrightText},o.prototype.readTitlePortalItem=function(e,r){return"item-title"!==this.sublayerTitleMode?void 0:e},o.prototype.readTitleService=function(e,r){var t=this.portalItem&&this.portalItem.title;if("item-title"===this.sublayerTitleMode)return S.titleFromUrlAndName(this.url,r.name);var o=r.name||S.parse(this.url).title;return"item-title-and-service-name"===this.sublayerTitleMode&&t&&(o=t+" - "+o),S.cleanTitle(o)},o.prototype.readLayerId=function(e,r){return r.id},Object.defineProperty(o.prototype,"url",{set:function(e){var r=d.urlToObject(e),t=S.parse(r.path);if(t&&null!=t.sublayer){this.layerId=t.sublayer;var o=v.objectToQuery(r.query);e=t.url.path,o&&(e=e+"?"+o)}for(;"/"===e[e.length-1];)e=e.slice(0,-1);this._set("url",e)},enumerable:!0,configurable:!0}),o.prototype.writeUrl=function(e,r){e&&d.isProtocolRelative(e)&&(e="https:"+e);var t=d.urlToObject(e);null!=this.layerId&&t?(r.url=t.path+"/layers/"+this.layerId,t.query&&Object.keys(t.query)&&(r.url+="?"+v.objectToQuery(t.query))):e&&(r.url=e)},Object.defineProperty(o.prototype,"parsedUrl",{get:function(){var e=this._get("url");if(!e)return null;var r=d.urlToObject(e);return null!=this.layerId&&S.match.test(r.path)&&(r.path=r.path+"/layers/"+this.layerId),r},enumerable:!0,configurable:!0}),o.prototype._addUrlToken=function(e){var r=f.mixin({},this.parsedUrl.query,{token:this.token}),t=v.objectToQuery(r);return e+=t?"?"+t:""},o.prototype.readRootNode=function(e,r){return r.store.rootNode},o.prototype._verifyRootNodeAndUpdateExtent=function(){var e=this;return this._fetchRootNode().then(function(r){return e._updateExtentFromRootNode(r)})},o.prototype._updateExtentFromRootNode=function(e){if(null!=this.fullExtent&&!this.fullExtent.hasZ&&null!=e&&Array.isArray(e.mbs)&&4===e.mbs.length){var r=e.mbs[2],t=e.mbs[3];this.fullExtent.zmin=r-t,this.fullExtent.zmax=r+t}},o.prototype._fetchRootNode=function(){if(!this.rootNode)return y.resolve();var e=d.join(this.parsedUrl.path,this.rootNode);return h(this._addUrlToken(e),{query:{f:"json"},responseType:"json"}).then(function(e){return e.data}).otherwise(function(r){throw new u("sceneservice:root-node-missing","Root node missing.",{error:r,url:e})})},o.prototype._fetchService=function(){var e,r=this;return e=null==this.layerId&&/SceneServer\/*$/i.test(this.url)?this._fetchFirstLayerId().then(function(e){null!=e&&(r.layerId=e)}):y.resolve(),e.then(function(){return r._fetchServiceLayer()})},o.prototype._fetchFirstLayerId=function(){return h(this._addUrlToken(this.url),{query:{f:"json"},callbackParamName:"callback",responseType:"json"}).then(function(e){return e.data&&Array.isArray(e.data.layers)&&e.data.layers.length>0?e.data.layers[0].id:void 0})},o.prototype._fetchServiceLayer=function(){var e=this;return h(this._addUrlToken(this.parsedUrl.path),{query:{f:"json"},responseType:"json"}).then(function(r){r.ssl&&(e.url=e.url.replace(/^http:/i,"https:"));var t=r.data;e.read(t,{origin:"service",url:e.parsedUrl}),e._validateLayer(t)})},o.prototype._validateLayer=function(e){},o.prototype.createGraphicsController=function(r){var t=this,o="../graphics/controllers/I3SOnDemandController";r.layer=this,r.addUrlToken=function(e){return t._addUrlToken(e)};var n=c.when(e,o).then(function(e){return new e(r)});return n.then(function(e){t.emit("graphics-controller-create",{graphicsController:e})}),n},o}(n.declared(i,a,l,p,s));return o([n.shared({id:{json:{origins:{service:{read:!1},portalItem:{read:!1}}}}})],b.prototype,"properties",void 0),o([n.property({type:m})],b.prototype,"spatialReference",void 0),o([n.reader("spatialReference",["spatialReference","store.indexCRS","store.geographicCRS"])],b.prototype,"readSpatialReference",null),o([n.property({type:g})],b.prototype,"fullExtent",void 0),o([n.reader("fullExtent",["store.extent","spatialReference","store.indexCRS","store.geographicCRS"])],b.prototype,"readFullExtent",null),o([n.property({readOnly:!0})],b.prototype,"version",void 0),o([n.reader("version",["store.version"])],b.prototype,"readVersion",null),o([n.property({type:String})],b.prototype,"copyright",void 0),o([n.reader("copyright",["copyrightText"])],b.prototype,"readCopyright",null),o([n.property({type:String})],b.prototype,"sublayerTitleMode",void 0),o([n.property({type:String})],b.prototype,"title",void 0),o([n.reader("portal-item","title")],b.prototype,"readTitlePortalItem",null),o([n.reader("service","title",["name"])],b.prototype,"readTitleService",null),o([n.property({type:Number})],b.prototype,"layerId",void 0),o([n.reader("service","layerId",["id"])],b.prototype,"readLayerId",null),o([n.property()],b.prototype,"url",null),o([n.writer("url")],b.prototype,"writeUrl",null),o([n.property({dependsOn:["layerId"]})],b.prototype,"parsedUrl",null),o([n.property()],b.prototype,"store",void 0),o([n.property({type:String})],b.prototype,"rootNode",void 0),o([n.reader("rootNode",["store.rootNode"])],b.prototype,"readRootNode",null),b=o([n.subclass("esri.layers.mixins.SceneService")],b)});