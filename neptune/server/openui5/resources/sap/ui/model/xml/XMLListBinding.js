/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/ChangeReason','sap/ui/model/ClientListBinding'],function(q,C,a){"use strict";var X=a.extend("sap.ui.model.xml.XMLListBinding");X.prototype.getContexts=function(s,l){this.iLastStartIndex=s;this.iLastLength=l;if(!s){s=0}if(!l){l=Math.min(this.iLength,this.oModel.iSizeLimit)}var c=this._getContexts(s,l),o={};if(this.bUseExtendedChangeDetection){for(var i=0;i<c.length;i++){o[c[i].getPath()]=this.oModel._getObject(c[i].getPath())[0]}if(this.aLastContexts&&s<this.iLastEndIndex){var t=this;var d=q.sap.arrayDiff(this.aLastContexts,c,function(O,n){var b=t.oLastContextData&&t.oLastContextData[O.getPath()];var N=o&&o[n.getPath()];if(b&&N){return q.sap.isEqualNode(b,N)}return false});c.diff=d}this.iLastEndIndex=s+l;this.aLastContexts=c.slice(0);this.oLastContextData={};var t=this;q.each(o,function(k,n){t.oLastContextData[k]=n.cloneNode(true)})}return c};X.prototype.update=function(){var l=this.oModel._getObject(this.sPath,this.oContext);if(l){this.oList=[];var t=this;if(this.bUseExtendedChangeDetection){q.each(l,function(k,n){t.oList.push(n.cloneNode(true))})}else{this.oList=l.slice(0)}this.updateIndices();this.applyFilter();this.applySort();this.iLength=this._getLength()}else{this.oList=[];this.aIndices=[];this.iLength=0}};X.prototype.checkUpdate=function(f){if(this.bSuspended&&!this.bIgnoreSuspend){return}if(!this.bUseExtendedChangeDetection){var l=this.oModel._getObject(this.sPath,this.oContext);if(!this.oList||!l||l.length!=this.oList.length||f){this.update();this._fireChange({reason:C.Change})}}else{var c=false;var t=this;var l=this.oModel._getObject(this.sPath,this.oContext);if(!q.sap.equal(this.oList,l)){this.update()}var b=this._getContexts(this.iLastStartIndex,this.iLastLength);if(this.aLastContexts){if(this.aLastContexts.length!=b.length){c=true}else{q.each(this.aLastContexts,function(i,o){var n=b[i].getObject();var O=t.oLastContextData&&t.oLastContextData[o.getPath()];if(n&&O&&!O.isEqualNode(n)){c=true;return false}})}}else{c=true}if(c||f){this._fireChange({reason:C.Change})}}};return X},true);
