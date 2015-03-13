/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider'],function(q,E){"use strict";var S=E.extend("sap.ui.model.SelectionModel",{constructor:function(s){E.apply(this);this.iSelectionMode=s||S.SINGLE_SELECTION;this.aSelectedIndices=[];this.iLeadIndex=-1;this.fnSort=function(a,b){return a-b};this.fnSortReverse=function(a,b){return b-a}}});S.SINGLE_SELECTION=0;S.MULTI_SELECTION=1;S.prototype.getSelectionMode=function(){return this.iSelectionMode};S.prototype.setSelectionMode=function(s){this.iSelectionMode=s||S.SINGLE_SELECTION};S.prototype.isSelectedIndex=function(i){return q.inArray(i,this.aSelectedIndices)!==-1};S.prototype.getLeadSelectedIndex=function(){return this.iLeadIndex};S.prototype.setLeadSelectedIndex=function(l){this.setSelectionInterval(l,l);return this};S.prototype.getMinSelectionIndex=function(){if(this.aSelectedIndices.length>0){var i=this.aSelectedIndices.sort(this.fnSort);return i[0]}else{return-1}};S.prototype.getMaxSelectionIndex=function(){if(this.aSelectedIndices.length>0){var i=this.aSelectedIndices.sort(this.fnSortReverse);return i[0]}else{return-1}};S.prototype.getSelectedIndices=function(){var i=this.aSelectedIndices.sort(this.fnSort);return i};S.prototype.setSelectionInterval=function(f,t){if(this.iSelectionMode===S.SINGLE_SELECTION){f=t}var F=Math.min(f,t);var T=Math.max(f,t);var c=this.aSelectedIndices.slice();var s=[];for(var i=F;i<=T;i++){s.push(i);var p=q.inArray(i,c);if(p===-1){c.push(i)}else{c.splice(p,1)}}this._update(s,t,c);return this};S.prototype.addSelectionInterval=function(f,t){if(this.iSelectionMode===S.SINGLE_SELECTION){return this.setSelectionInterval(f,t)}var F=Math.min(f,t);var T=Math.max(f,t);var c=[];var s=this.aSelectedIndices;for(var i=F;i<=T;i++){if(q.inArray(i,s)===-1){s.push(i);c.push(i)}}this._update(s,T,c);return this};S.prototype.moveSelectionInterval=function(s,m){var c=[];var a=this.aSelectedIndices;var l=this.iLeadIndex;for(var i=0;i<a.length;i++){var I=a[i];if(I>=s){c.push(a[i]);a[i]+=m;c.push(a[i]);if(I===this.iLeadIndex){l+=m}}}this._update(a,l,c);return this};S.prototype.removeSelectionInterval=function(f,t){if(this.iSelectionMode===S.SINGLE_SELECTION){f=t}var F=Math.min(f,t);var T=Math.max(f,t);var c=[];var s=this.aSelectedIndices;var l=this.iLeadIndex;for(var i=F;i<=T;i++){var I=q.inArray(i,s);if(I>-1){s.splice(I,1);c.push(i)}if(i===this.iLeadIndex){l=-1}}this._update(s,l,c);return this};S.prototype.sliceSelectionInterval=function(f,t){var F=Math.min(f,t);var T=Math.max(f,t);var c=[];var r=[];var o=this.aSelectedIndices.slice(0);var s=this.aSelectedIndices;var l=this.iLeadIndex;var R=T-F+1;for(var I=T;I>=F;I--){var a=q.inArray(I,s);if(a>-1){s.splice(a,1);r.push(I)}if(I===this.iLeadIndex){l=-1}}for(var I=0;I<s.length;I++){var O=s[I];if(O>=F){var n=s[I]-R;if(O===l){l=n}s[I]=n;if(q.inArray(n,o)===-1){c.push(n)}}}for(var i=0;i<r.length;i++){var I=o[o.length-1-i];if(q.inArray(I,c)===-1){c.push(I)}}for(var i=0;i<r.length;i++){if(q.inArray(r[i],s)===-1&&q.inArray(r[i],c)===-1){c.push(r[i])}}this._update(s,l,c);return this};S.prototype.clearSelection=function(){if(this.aSelectedIndices.length>0||this.iLeadIndex!==-1){this._update([],-1,this.aSelectedIndices.slice())}return this};S.prototype.attachSelectionChanged=function(d,f,l){this.attachEvent("selectionChanged",d,f,l);return this};S.prototype.detachSelectionChanged=function(f,l){this.detachEvent("selectionChanged",f,l);return this};S.prototype.fireSelectionChanged=function(a){this.fireEvent("selectionChanged",a);return this};S.prototype._update=function(s,l,c){var p={rowIndices:c&&c.sort(this.fnSort)};this.aSelectedIndices=s;p.oldIndex=this.iLeadIndex;if(this.iLeadIndex!==l){this.iLeadIndex=l;p.leadIndex=this.iLeadIndex}if(c.length>0||typeof p.leadIndex!=="undefined"){this.fireSelectionChanged(p)}};return S},true);