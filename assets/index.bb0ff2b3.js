import{a8 as f,b3 as g,j as l,a as c,r as x,g as I,m as b,o as z,h as T}from"./index.97a6e20b.js";import{u as $}from"./useLocale.710149ec.js";const F=()=>{const[,e]=f(),o=new g(e.colorBgBase);let i={};return o.toHsl().l<.5&&(i={opacity:.65}),l("svg",{style:i,width:"184",height:"152",viewBox:"0 0 184 152",xmlns:"http://www.w3.org/2000/svg",children:c("g",{fill:"none",fillRule:"evenodd",children:[c("g",{transform:"translate(24 31.67)",children:[l("ellipse",{fillOpacity:".8",fill:"#F5F5F7",cx:"67.797",cy:"106.89",rx:"67.797",ry:"12.668"}),l("path",{d:"M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z",fill:"#AEB8C2"}),l("path",{d:"M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",fill:"url(#linearGradient-1)",transform:"translate(13.56)"}),l("path",{d:"M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z",fill:"#F5F5F7"}),l("path",{d:"M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z",fill:"#DCE0E6"})]}),l("path",{d:"M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z",fill:"#DCE0E6"}),c("g",{transform:"translate(149.65 15.383)",fill:"#FFF",children:[l("ellipse",{cx:"20.654",cy:"3.167",rx:"2.849",ry:"2.815"}),l("path",{d:"M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"})]})]})})},B=F,L=()=>{const[,e]=f(),{colorFill:o,colorFillTertiary:i,colorFillQuaternary:t,colorBgContainer:r}=e,{borderColor:a,shadowColor:s,contentColor:h}=x.exports.useMemo(()=>({borderColor:new g(o).onBackground(r).toHexShortString(),shadowColor:new g(i).onBackground(r).toHexShortString(),contentColor:new g(t).onBackground(r).toHexShortString()}),[o,i,t,r]);return l("svg",{width:"64",height:"41",viewBox:"0 0 64 41",xmlns:"http://www.w3.org/2000/svg",children:c("g",{transform:"translate(0 1)",fill:"none",fillRule:"evenodd",children:[l("ellipse",{fill:s,cx:"32",cy:"33",rx:"32",ry:"7"}),c("g",{fillRule:"nonzero",stroke:a,children:[l("path",{d:"M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"}),l("path",{d:"M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",fill:h})]})]})})},N=L,D=e=>{const{componentCls:o,margin:i,marginXS:t,marginXL:r,fontSize:a,lineHeight:s}=e;return{[o]:{marginInline:t,fontSize:a,lineHeight:s,textAlign:"center",[`${o}-image`]:{height:e.emptyImgHeight,marginBottom:t,opacity:e.opacityImage,img:{height:"100%"},svg:{maxWidth:"100%",height:"100%",margin:"auto"}},[`${o}-description`]:{color:e.colorText},[`${o}-footer`]:{marginTop:i},"&-normal":{marginBlock:r,color:e.colorTextDisabled,[`${o}-description`]:{color:e.colorTextDisabled},[`${o}-image`]:{height:e.emptyImgHeightMD}},"&-small":{marginBlock:t,color:e.colorTextDisabled,[`${o}-image`]:{height:e.emptyImgHeightSM}}}}},O=I("Empty",e=>{const{componentCls:o,controlHeightLG:i}=e,t=b(e,{emptyImgCls:`${o}-img`,emptyImgHeight:i*2.5,emptyImgHeightMD:i,emptyImgHeightSM:i*.875});return[D(t)]});var V=globalThis&&globalThis.__rest||function(e,o){var i={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(i[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(i[t[r]]=e[t[r]]);return i};const u=l(B,{}),C=l(N,{}),y=e=>{var{className:o,rootClassName:i,prefixCls:t,image:r=u,description:a,children:s,imageStyle:h}=e,v=V(e,["className","rootClassName","prefixCls","image","description","children","imageStyle"]);const{getPrefixCls:E,direction:S}=x.exports.useContext(z),n=E("empty",t),[H,w]=O(n),[p]=$("Empty"),m=typeof a<"u"?a:p==null?void 0:p.description,M=typeof m=="string"?m:"empty";let d=null;return typeof r=="string"?d=l("img",{alt:M,src:r}):d=r,H(c("div",{...Object.assign({className:T(w,n,{[`${n}-normal`]:r===C,[`${n}-rtl`]:S==="rtl"},o,i)},v),children:[l("div",{className:`${n}-image`,style:h,children:d}),m&&l("div",{className:`${n}-description`,children:m}),s&&l("div",{className:`${n}-footer`,children:s})]}))};y.PRESENTED_IMAGE_DEFAULT=u;y.PRESENTED_IMAGE_SIMPLE=C;const _=y;export{_ as E};