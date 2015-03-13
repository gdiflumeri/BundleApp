/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Renderer','./FormLayoutRenderer'],function(q,R,F){"use strict";var G=R.extend(F);G.renderForm=function(r,l,f){var s=l.getSingleColumn();var c=16;var S=false;var C=0;var a=f.getFormContainers();var b=a.length;if(s){c=c/2;C=c}else{C=c/2;for(var i=0;i<b;i++){var o=this.getContainerData(l,a[i]);if(o&&o.getHalfGrid()){S=true;break}}}r.write("<table role=\"presentation\"");r.writeControlData(l);r.write(" cellpadding=\"0\" cellspacing=\"0\"");r.addStyle("border-collapse","collapse");r.addStyle("table-layout","fixed");r.addStyle("width","100%");r.addClass("sapUiGrid");r.writeStyles();r.writeClasses();r.write(">");r.write("<colgroup>");r.write("<col span="+C+">");if(S){r.write("<col class = \"sapUiGridSpace\"span=1>")}if(!s){r.write("<col span="+C+">")}r.write("</colgroup><tbody>");if(f.getTitle()){var t=c;if(S){t++}r.write("<tr><th colspan="+t+">");var d=sap.ui.core.theming.Parameters.get('sap.ui.layout.FormLayout:sapUiFormTitleSize');this.renderTitle(r,f.getTitle(),undefined,false,d,f.getId());r.write("</th></tr>")}var i=0;var e;var o;var g;var h;while(i<b){e=a[i];e._checkProperties();if(e.getVisible()){o=this.getContainerData(l,e);if(o&&o.getHalfGrid()&&!s){g=a[i+1];h=undefined;if(g&&g.getVisible()){h=this.getContainerData(l,g)}if(h&&h.getHalfGrid()){g._checkProperties();this.renderContainerHalfSize(r,l,e,g,c);i++}else{this.renderContainerHalfSize(r,l,e,undefined,c)}}else{this.renderContainerFullSize(r,l,e,c,S)}}i++}if(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version>=9){r.write("<tr style=\"visibility:hidden;\">");for(var i=0;i<c;i++){r.write("<td style=\"visibility:hidden; padding:0; height: 0;\"></td>")}if(S){r.write("<td style=\"visibility:hidden; padding:0; height: 0;\"></td>")}r.write("</tr>")}r.write("</tbody></table>")};G.renderContainerFullSize=function(r,l,c,C,s){var e=c.getExpandable();var t=c.getTooltip_AsString();if(c.getTitle()){var T=C;if(s){T++}r.write("<tr><td colspan="+T+" class=\"sapUiGridHeader\"");if(t){r.writeAttributeEscaped('title',t)}r.write(">");this.renderTitle(r,c.getTitle(),c._oExpandButton,e,false,c.getId());r.write("</td></tr>")}if(!e||c.getExpanded()){var E=c.getFormElements();var o;var a=[];var b;for(var j=0,d=E.length;j<d;j++){o=E[j];if(o.getVisible()){b=a[0]&&(a[0][0]==C);r.write("<tr");if(a[0]!="full"&&!b){r.writeElementData(o);r.addClass("sapUiFormElement")}r.writeClasses();r.write(">");if(!b){a=this.renderElement(r,l,o,false,C,s,a)}else{a.splice(0,1)}r.write("</tr>");if(a[0]=="full"||b){j=j-1}}}if(a.length>0){for(var i=0;i<a.length;i++){r.write("<tr></tr>")}}}};G.renderContainerHalfSize=function(r,l,c,C,a){var b=a/2;var e=c.getExpandable();var t=c.getTooltip_AsString();var T;var o=c.getTitle();var d;var E=[];if(!e||c.getExpanded()){E=c.getFormElements()}var L=E.length;var f=[];var g=0;var h=false;if(C){h=C.getExpandable();T=C.getTooltip_AsString();d=C.getTitle();if(!h||C.getExpanded()){f=C.getFormElements()}g=f.length}if(o||d){r.write("<tr><td colspan="+b+" class=\"sapUiGridHeader\"");if(t){r.writeAttributeEscaped('title',t)}r.write(">");if(o){this.renderTitle(r,o,c._oExpandButton,e,false,c.getId())}r.write("</td><td></td><td colspan="+b+" class=\"sapUiGridHeader\"");if(T){r.writeAttributeEscaped('title',T)}r.write(">");if(d){this.renderTitle(r,d,C._oExpandButton,h,false,C.getId())}r.write("</td></tr>")}if((!e||c.getExpanded())||(!h||C.getExpanded())){var j=[],k=[];var m=0,n=0;var p;var s;var u;var v;while(m<L||n<g){p=E[m];s=f[n];u=j[0]&&(j[0][0]==b);v=k[0]&&(k[0][0]==b);if((p&&p.getVisible())||(s&&s.getVisible())||u||v){r.write("<tr>");if(!u){if(p&&p.getVisible()&&(!e||c.getExpanded())){j=this.renderElement(r,l,p,true,b,false,j)}else{r.write("<td colspan="+b+"></td>")}if(j[0]!="full"){m++}}else{if(j[0][2]>0){r.write("<td colspan="+j[0][2]+"></td>")}j.splice(0,1)}r.write("<td></td>");if(!v){if(s&&s.getVisible()&&(!h||C.getExpanded())){k=this.renderElement(r,l,s,true,b,false,k)}else{r.write("<td colspan="+b+"></td>")}if(k[0]!="full"){n++}}else{if(k[0][2]>0){r.write("<td colspan="+k[0][2]+"></td>")}k.splice(0,1)}r.write("</tr>")}else{m++;n++}}if(j.length>0||k.length>0){for(var i=0;i<j.length||i<k.length;i++){r.write("<tr></tr>")}}}};G.renderElement=function(r,l,e,h,c,s,a){var L=e.getLabelControl();var b=0;var f=e.getFields();var C=0;var A=0;var m=false;if(f.length==1&&this.getElementData(l,f[0])&&this.getElementData(l,f[0]).getHCells()=="full"){if(a.length>0&&a[0]!="full"){q.sap.log.error("Element \""+e.getId()+"\" - Too much fields for one row!","Renderer","GridLayout");return a}if(s){c=c+1}if(L&&a[0]!="full"){r.write("<td colspan="+c+" class=\"sapUiGridLabelFull\">");r.renderControl(L);r.write("</td>");return["full"]}else{a.splice(0,1);var d=this.getElementData(l,f[0]).getVCells();r.write("<td colspan="+c);if(d>1&&h){r.write(" rowspan="+d);for(var x=0;x<d-1;x++){a.push([c,undefined,false])}}r.write(" >");r.renderControl(f[0]);r.write("</td>");return a}}if(a.length>0&&a[0][0]>0){c=c-a[0][0]+a[0][2];m=a[0][1];b=a[0][2];a.splice(0,1)}var g=b;if(L||b>0){g=3;if(L&&b==0){var E=this.getElementData(l,L);if(E){var j=E.getHCells();if(j!="auto"&&j!="full"){g=parseInt(j,10)}}}r.write("<td colspan="+g+" class=\"sapUiGridLabel\">");if(L){r.renderControl(L)}c=c-g;r.write("</td>")}if(f&&f.length>0){var k=c;var n=f.length;for(var i=0,o=f.length;i<o;i++){var p=f[i];var E=this.getElementData(l,p);if(E&&E.getHCells()!="auto"){k=k-parseInt(E.getHCells(),10);n=n-1}}for(var i=0,t=0,o=f.length;i<o;i++){var p=f[i];var E=this.getElementData(l,p);var j="auto";var u=1;var d=1;if(E){j=E.getHCells();d=E.getVCells()}if(j=="auto"){if(k>0){u=Math.floor(k/n);if(u<1){u=1}t++;A=A+u;if((t==n)&&(k>A)){u=u+(k-A)}}else{u=1}}else{u=parseInt(j,10)}C=C+u;if(C>c){q.sap.log.error("Element \""+e.getId()+"\" - Too much fields for one row!","Renderer","GridLayout");C=C-u;break}if(d>1){for(var x=0;x<d-1;x++){if(L){b=g}if(a.length>x){a[x][0]=a[x][0]+u;a[x][2]=b}else{a.push([g+u,undefined,b])}}}if(s&&C>=Math.floor(c/2)&&!m){u=u+1;m=true;if(d>1){for(var x=0;x<d-1;x++){a[x][1]=true}}}r.write("<td");if(u>1){r.write(" colspan="+u)}if(d>1){r.write(" rowspan="+d)}r.write(" >");r.renderControl(p);r.write("</td>")}}if(C<c){var v=c-C;if(!h&&s&&!m){v++}r.write("<td colspan="+v+" ></td>")}return a};G.getContainerData=function(l,c){return l.getLayoutDataForElement(c,"sap.ui.layout.form.GridContainerData")};G.getElementData=function(l,c){return l.getLayoutDataForElement(c,"sap.ui.layout.form.GridElementData")};return G},true);
