(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6897fd8a"],{"2eef":function(e,t,n){"use strict";var c=n("7a23"),o=function(e){return Object(c["C"])("data-v-71890b7a"),e=e(),Object(c["A"])(),e},i={class:"icon",xmlns:"http://www.w3.org/2000/svg","enable-background":"new 0 0 20 20",height:"48px",viewBox:"0 0 20 20",width:"48px",fill:"#000000"},a=o((function(){return Object(c["j"])("rect",{fill:"none",height:"20",width:"20"},null,-1)})),r=o((function(){return Object(c["j"])("path",{d:"M10,2c0,0-6.5,5.16-6.5,9.5c0,3.59,2.91,6.5,6.5,6.5s6.5-2.91,6.5-6.5C16.5,7.16,10,2,10,2z M10,16.5c-2.76,0-5-2.24-5-5 c0-2.47,3.1-5.8,5-7.53c1.9,1.73,5,5.05,5,7.53C15,14.26,12.76,16.5,10,16.5z M7.03,11.93c0.24,1.66,1.79,2.77,3.4,2.54 c0.3-0.04,0.57,0.19,0.57,0.49c0,0.28-0.2,0.47-0.42,0.5c-2.23,0.31-4.22-1.23-4.54-3.39C6,11.77,6.23,11.5,6.54,11.5 C6.79,11.5,7,11.68,7.03,11.93z"},null,-1)})),s=[a,r];function u(e,t,n,o,a,r){return Object(c["z"])(),Object(c["i"])("svg",i,s)}var l={name:"IconNotes"},d=(n("3a22"),n("d959")),f=n.n(d);t["a"]=f()(l,[["render",u],["__scopeId","data-v-71890b7a"]])},"31f5":function(e,t,n){"use strict";n("7339")},"370b":function(e,t,n){"use strict";var c=n("7a23"),o=function(e){return Object(c["C"])("data-v-681f211d"),e=e(),Object(c["A"])(),e},i={class:"icon",viewBox:"0 0 24 24"},a=o((function(){return Object(c["j"])("path",{fill:"currentColor",d:"M4,12H20C20,8.27 17.44,5.13 14,4.25C13.86,5.24 13,6 12,6C11,6 10.14,5.24 10,4.25C6.56,5.13 4,8.27 4,12M12,2A10,10 0 0,1 22,12A2,2 0 0,1 20,14H4A2,2 0 0,1 2,12A10,10 0 0,1 12,2M13.5,17H10.5L9.92,19L9.65,20H14.35L14.08,19L13.5,17M15,15L16,18.5L16.27,19.45L16.35,20C16.35,21.1 15.45,22 14.35,22H9.65L9.17,21.94C8.1,21.66 7.45,20.57 7.73,19.5L8,18.5L9,15H15M16,7A2,2 0 0,1 18,9A2,2 0 0,1 16,11A2,2 0 0,1 14,9A2,2 0 0,1 16,7M8,7A2,2 0 0,1 10,9A2,2 0 0,1 8,11A2,2 0 0,1 6,9A2,2 0 0,1 8,7Z"},null,-1)})),r=[a];function s(e,t,n,o,a,s){return Object(c["z"])(),Object(c["i"])("svg",i,r)}var u={name:"IconMushroom",data:function(){return{}}},l=(n("4289"),n("d959")),d=n.n(l);t["a"]=d()(u,[["render",s],["__scopeId","data-v-681f211d"]])},"3a22":function(e,t,n){"use strict";n("d046")},4289:function(e,t,n){"use strict";n("a82f")},4582:function(e,t,n){"use strict";n("981c")},"5b44":function(e,t,n){"use strict";var c=n("7a23"),o=["src","alt"],i={class:"image-hover-text"};function a(e,t,n,a,r,s){var u=Object(c["H"])("IconBarAction");return Object(c["z"])(),Object(c["i"])("div",{class:Object(c["s"])({imageContainer:r.isLoaded,hiddenContainer:!r.isLoaded})},[Object(c["j"])("img",{class:"image",src:n.imageSource,alt:n.title,onLoad:t[0]||(t[0]=function(){return s.onLoaded&&s.onLoaded.apply(s,arguments)})},null,40,o),r.isLoaded&&n.title?(Object(c["z"])(),Object(c["i"])("div",{key:0,class:"image-overlay",onClick:t[1]||(t[1]=function(t){return e.$emit("imageClick")}),role:"link",tabindex:"0"},[Object(c["j"])("p",i,Object(c["K"])(n.title),1)])):Object(c["h"])("",!0),r.isLoaded?(Object(c["z"])(),Object(c["g"])(u,{key:1,actions:n.actions,onPerformAction:t[2]||(t[2]=function(t){return e.$emit("performAction",t)}),class:"icon-bar"},null,8,["actions"])):Object(c["h"])("",!0)],2)}n("caad"),n("2532");function r(e,t,n,o,i,a){var r=Object(c["H"])("IconWater"),s=Object(c["H"])("IconFlowerPot"),u=Object(c["H"])("IconMushroom");return Object(c["z"])(),Object(c["i"])("div",null,[n.actions.includes("water")?(Object(c["z"])(),Object(c["i"])("div",{key:0,class:"water-icon",onClick:t[0]||(t[0]=function(){return o.performAction("water","watered")}),style:Object(c["t"])({left:"".concat(3*n.actions.indexOf("water"),"rem")})},[Object(c["l"])(r,{class:"inner-icon"})],4)):Object(c["h"])("",!0),n.actions.includes("repot")?(Object(c["z"])(),Object(c["i"])("div",{key:1,class:"pot-icon",onClick:t[1]||(t[1]=function(){return o.performAction("repot","repotted")}),style:Object(c["t"])({left:"".concat(3*n.actions.indexOf("repot"),"rem")})},[Object(c["l"])(s,{class:"inner-icon"})],4)):Object(c["h"])("",!0),n.actions.includes("fertilize")?(Object(c["z"])(),Object(c["i"])("div",{key:2,class:"mushroom-icon",onClick:t[2]||(t[2]=function(){return o.performAction("fertilize","fertilized")}),style:Object(c["t"])({left:"".concat(3*n.actions.indexOf("fertilize"),"rem")})},[Object(c["l"])(u,{class:"inner-icon"})],4)):Object(c["h"])("",!0)])}var s=n("2eef"),u=n("370b"),l=n("a666"),d={name:"IconBarAction",components:{IconWater:s["a"],IconMushroom:u["a"],IconFlowerPot:l["a"]},props:{actions:Array},emits:["performAction"],setup:function(e,t){var n=t.emit,c=function(e,t){confirm("Have you ".concat(t," your plant?"))&&n("performAction",e)};return{performAction:c}}},f=(n("4582"),n("d959")),m=n.n(f),b=m()(d,[["render",r],["__scopeId","data-v-cd80ea7a"]]),j={name:"ImageCard",components:{IconBarAction:b},props:{imageSource:String,title:String,actions:Array},emits:["imageLoaded","performAction","imageClick"],data:function(){return{isLoaded:!1}},methods:{onLoaded:function(){this.isLoaded=!0,this.$emit("imageLoaded")}}};n("31f5"),t["a"]=m()(j,[["render",a],["__scopeId","data-v-55998b78"]])},"5fc1":function(e,t,n){"use strict";n("8243")},"686a":function(e,t,n){"use strict";var c=n("7a23"),o={ref:"container",class:"gallery-container"},i={class:"reload-trigger",ref:"reloadTrigger"};function a(e,t,n,a,r,s){var u=Object(c["H"])("ImageCard");return Object(c["z"])(),Object(c["i"])(c["a"],null,[Object(c["j"])("div",o,[(Object(c["z"])(!0),Object(c["i"])(c["a"],null,Object(c["F"])(a.imageColumns,(function(o,i){return Object(c["z"])(),Object(c["i"])("div",{class:"gallery-column",key:i},[0==i?Object(c["G"])(e.$slots,"default",{key:0},void 0,!0):Object(c["h"])("",!0),(Object(c["z"])(!0),Object(c["i"])(c["a"],null,Object(c["F"])(o,(function(o){return Object(c["z"])(),Object(c["g"])(u,Object(c["q"])({key:o.id},o,{onImageLoaded:t[0]||(t[0]=function(){return a.setAllImagesLoadedIfTrue(n.images)}),onImageClick:function(t){return e.$emit("itemClick",o)},actions:n.includeActions?o.actions:[],style:{width:"250px"},onPerformAction:function(t){return e.$emit("performAction",{id:o.id,action:t})}}),null,16,["onImageClick","actions","onPerformAction"])})),128))])})),128))],512),Object(c["S"])(Object(c["j"])("div",i,null,512),[[c["O"],a.allImagesLoaded]])],64)}var r=n("5b44"),s=n("33b5"),u=n("68c0"),l=function(){var e=0,t=Object(c["E"])([]),n=0,o=Object(c["E"])(!1),i=Object(c["E"])(null),a=function(n){for(var c=0;c<n.length;c++)t.value[c%e].push(n[c]);for(var o=0;o<e;o++)t.value[o].push()},r=function(){var n=30,c=270;e=Math.floor((i.value.clientWidth-n)/c),e<=0&&(e=1);for(var o=[],a=0;a<e;a++)o[a]=[];t.value=o},s=function(e){n=0,r(),a(e)},u=function(e){n++,n===e.length&&(o.value=!0)};return{container:i,allImagesLoaded:o,updateColumns:s,imageColumns:t,setAllImagesLoadedIfTrue:u}},d={name:"ImageGallery",components:{ImageCard:r["a"]},props:{images:Array,includeActions:{type:Boolean,default:!1}},emits:["itemClick","moreImages","performAction"],setup:function(e,t){var n=t.emit,o=null,i=Object(c["E"])(null),a=l(),r=a.container,d=a.allImagesLoaded,f=a.updateColumns,m=a.setAllImagesLoadedIfTrue,b=a.imageColumns,j=Object(s["a"])((function(){return f(e.images)}));return Object(u["a"])(j),Object(c["P"])((function(){return e.images}),(function(e){f(e)})),Object(c["w"])((function(){o=new IntersectionObserver((function(e){!0===e[0].isIntersecting&&n("moreImages")})),o.observe(i.value),f(e.images)})),Object(c["x"])((function(){o.disconnect()})),{reloadTrigger:i,setAllImagesLoadedIfTrue:m,container:r,allImagesLoaded:d,imageColumns:b}}},f=(n("f654"),n("d959")),m=n.n(f);t["a"]=m()(d,[["render",a],["__scopeId","data-v-324ba608"]])},7339:function(e,t,n){},8243:function(e,t,n){},"981c":function(e,t,n){},a666:function(e,t,n){"use strict";var c=n("7a23"),o=function(e){return Object(c["C"])("data-v-c7923a74"),e=e(),Object(c["A"])(),e},i={class:"icon",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":"true",role:"img",width:"0.88em",height:"1em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 897 1024"},a=o((function(){return Object(c["j"])("path",{d:"M625.944 320q-27-1-54-15q-2-1-4-3t-3-2q-45 31-80.5 72t-35.5 76q0 21 21 64h267q13 0 22.5 9.5t9.5 22.5v64q0 13-9.5 22.5t-22.5 9.5h-32l-77 357q-3 11-12 19t-20 8h-293q-12 0-21-8t-12-19l-77-357h-32q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h216q8-34 8-64q0-38-14-82q-42-49-102-76q-65 53-138 12q-24-13-43-27t-32.5-31.5t-23-31.5t-15.5-36.5t-9.5-37.5t-4.5-43t-1.5-44.5T.944 0q22 25 56 36t68 13t68 6.5t65 24.5t50 58q13 25 13 56q0 25-10 47q47 27 74 47q20 15 40 46q26-55 94-96v-1q-25-91 54-136q31-17 58.5-26.5t56-9.5t49.5 2.5t52 16t50 23t58 30.5q-33 6-59 28.5t-44.5 48.5t-39.5 51.5t-53 41t-75 13.5z",fill:"currentColor"},null,-1)})),r=[a];function s(e,t,n,o,a,s){return Object(c["z"])(),Object(c["i"])("svg",i,r)}var u={name:"IconFlowerPot",data:function(){return{}}},l=(n("5fc1"),n("d959")),d=n.n(l);t["a"]=d()(u,[["render",s],["__scopeId","data-v-c7923a74"]])},a82f:function(e,t,n){},d046:function(e,t,n){},ed90:function(e,t,n){},f654:function(e,t,n){"use strict";n("ed90")}}]);
//# sourceMappingURL=chunk-6897fd8a.4009bb9f.js.map