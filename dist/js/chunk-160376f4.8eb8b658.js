(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-160376f4"],{1276:function(e,t,n){"use strict";var r=n("d784"),a=n("44e7"),i=n("825a"),o=n("1d80"),c=n("4840"),u=n("8aa5"),l=n("50c4"),s=n("577e"),d=n("14c3"),f=n("9263"),b=n("9f7f"),m=n("d039"),p=b.UNSUPPORTED_Y,g=[].push,v=Math.min,h=4294967295,O=!m((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));r("split",(function(e,t,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var r=s(o(this)),i=void 0===n?h:n>>>0;if(0===i)return[];if(void 0===e)return[r];if(!a(e))return t.call(r,e,i);var c,u,l,d=[],b=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),m=0,p=new RegExp(e.source,b+"g");while(c=f.call(p,r)){if(u=p.lastIndex,u>m&&(d.push(r.slice(m,c.index)),c.length>1&&c.index<r.length&&g.apply(d,c.slice(1)),l=c[0].length,m=u,d.length>=i))break;p.lastIndex===c.index&&p.lastIndex++}return m===r.length?!l&&p.test("")||d.push(""):d.push(r.slice(m)),d.length>i?d.slice(0,i):d}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:t.call(this,e,n)}:t,[function(t,n){var a=o(this),i=void 0==t?void 0:t[e];return void 0!==i?i.call(t,a,n):r.call(s(a),t,n)},function(e,a){var o=i(this),f=s(e),b=n(r,o,f,a,r!==t);if(b.done)return b.value;var m=c(o,RegExp),g=o.unicode,O=(o.ignoreCase?"i":"")+(o.multiline?"m":"")+(o.unicode?"u":"")+(p?"g":"y"),j=new m(p?"^(?:"+o.source+")":o,O),y=void 0===a?h:a>>>0;if(0===y)return[];if(0===f.length)return null===d(j,f)?[f]:[];var I=0,w=0,x=[];while(w<f.length){j.lastIndex=p?0:w;var C,L=d(j,p?f.slice(w):f);if(null===L||(C=v(l(j.lastIndex+(p?w:0)),f.length))===I)w=u(f,w,g);else{if(x.push(f.slice(I,w)),x.length===y)return x;for(var k=1;k<=L.length-1;k++)if(x.push(L[k]),x.length===y)return x;w=I=C}}return x.push(f.slice(I)),x}]}),!O,p)},"14c3":function(e,t,n){var r=n("c6b6"),a=n("9263");e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var i=n.call(e,t);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(e))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},"159b":function(e,t,n){var r=n("da84"),a=n("fdbc"),i=n("17c2"),o=n("9112");for(var c in a){var u=r[c],l=u&&u.prototype;if(l&&l.forEach!==i)try{o(l,"forEach",i)}catch(s){l.forEach=i}}},"17c2":function(e,t,n){"use strict";var r=n("b727").forEach,a=n("a640"),i=a("forEach");e.exports=i?[].forEach:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}},"1b84":function(e,t,n){},2376:function(e,t,n){},2532:function(e,t,n){"use strict";var r=n("23e7"),a=n("5a34"),i=n("1d80"),o=n("577e"),c=n("ab13");r({target:"String",proto:!0,forced:!c("includes")},{includes:function(e){return!!~o(i(this)).indexOf(o(a(e)),arguments.length>1?arguments[1]:void 0)}})},"43ee":function(e,t,n){"use strict";n("b1b0")},5480:function(e,t,n){},5530:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));n("b64b"),n("a4d3"),n("4de4"),n("e439"),n("159b"),n("dbb4");function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}},"5a34":function(e,t,n){var r=n("44e7");e.exports=function(e){if(r(e))throw TypeError("The method doesn't accept regular expressions");return e}},"686a":function(e,t,n){"use strict";var r=n("7a23"),a=Object(r["L"])("data-v-85c598cc");Object(r["w"])("data-v-85c598cc");var i={ref:"container",class:"gallery-container"},o={class:"reload-trigger",ref:"reload"};Object(r["u"])();var c=a((function(e,t,n,a,c,u){var l=Object(r["B"])("ImageCard");return Object(r["t"])(),Object(r["f"])(r["a"],null,[Object(r["i"])("div",i,[(Object(r["t"])(!0),Object(r["f"])(r["a"],null,Object(r["z"])(c.imageColumns,(function(t,n){return Object(r["t"])(),Object(r["f"])("div",{class:"gallery-column",key:n},[0==n?Object(r["A"])(e.$slots,"default",{key:0},void 0,!0):Object(r["g"])("",!0),(Object(r["t"])(!0),Object(r["f"])(r["a"],null,Object(r["z"])(t,(function(t){return Object(r["t"])(),Object(r["f"])(l,Object(r["n"])({key:t.id},t,{onImageLoaded:u.setAllImagesLoadedIfTrue,onClick:function(n){return e.$emit("itemClick",t)}}),null,16,["onImageLoaded","onClick"])})),128))])})),128))],512),Object(r["J"])(Object(r["i"])("div",o,null,512),[[r["H"],c.allImagesLoaded]])],64)})),u=Object(r["L"])("data-v-7643905d");Object(r["w"])("data-v-7643905d");var l={key:0,class:"image-overlay"},s={class:"image-hover-text"};Object(r["u"])();var d=u((function(e,t,n,a,i,o){return Object(r["t"])(),Object(r["f"])("div",{class:{imageContainer:i.isLoaded,hiddenContainer:!i.isLoaded}},[Object(r["i"])("img",{class:"image",src:n.imageSource,alt:n.title,onLoad:t[1]||(t[1]=function(){return o.onLoaded&&o.onLoaded.apply(o,arguments)})},null,40,["src","alt"]),i.isLoaded?(Object(r["t"])(),Object(r["f"])("div",l,[Object(r["i"])("p",s,Object(r["D"])(n.title),1)])):Object(r["g"])("",!0)],2)})),f={name:"ImageCard",props:{imageSource:String,title:String},emits:["imageLoaded"],data:function(){return{isLoaded:!1}},methods:{onLoaded:function(){this.isLoaded=!0,this.$emit("imageLoaded")}}};n("fe0c");f.render=d,f.__scopeId="data-v-7643905d";var b=f,m=n("33b5"),p={name:"ImageGallery",components:{ImageCard:b},props:{images:Array},emits:["itemClick","moreImages"],created:function(){window.addEventListener("resize",this.debounceUpdateSize)},mounted:function(){var e=this;this.observer=new IntersectionObserver((function(t){!0===t[0].isIntersecting&&e.$emit("moreImages")})),this.observer.observe(this.$refs.reload),this.updateColumns()},unmounted:function(){window.removeEventListener("resize",this.debounceUpdateSize),this.observer.disconnect()},methods:{setAllImagesLoadedIfTrue:function(){this.loadedImages++,this.loadedImages===this.images.length&&(this.allImagesLoaded=!0)},updateColumns:function(){this.loadedImages=0,this.initialiseColumns(),this.splitImagesIntoColumns()},initialiseColumns:function(){var e=30,t=265;this.numberOfColumns=Math.floor((this.$refs.container.clientWidth-e)/t);for(var n=[],r=0;r<this.numberOfColumns;r++)n[r]=[];this.imageColumns=n},splitImagesIntoColumns:function(){for(var e=0;e<this.images.length;e++)this.imageColumns[e%this.numberOfColumns].push(this.images[e]);for(var t=0;t<this.numberOfColumns;t++)this.imageColumns[t].push()}},data:function(){return{numberOfColumns:0,imageColumns:[],observer:null,loadedImages:0,allImagesLoaded:!1,debounceUpdateSize:Object(m["a"])(this.updateColumns)}},watch:{images:function(){this.updateColumns()}}};n("a11b");p.render=c,p.__scopeId="data-v-85c598cc";t["a"]=p},"8aa5":function(e,t,n){"use strict";var r=n("6547").charAt;e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},"97f7":function(e,t,n){"use strict";var r=n("7a23"),a=Object(r["L"])("data-v-535a508e");Object(r["w"])("data-v-535a508e");var i={value:"",selected:"",disabled:""};Object(r["u"])();var o=a((function(e,t,n,a,o,c){return Object(r["t"])(),Object(r["f"])("div",{class:["inputContainer",{halfInput:"half"===n.size}]},[Object(r["i"])("label",{class:"hidden",for:n.label},Object(r["D"])(n.label),9,["for"]),"select"==n.type?(Object(r["t"])(),Object(r["f"])("select",Object(r["n"])({key:0,id:n.label,class:"inputBox",value:n.modelValue,required:n.required},n.validation,{onChange:t[1]||(t[1]=function(t){return e.$emit("update:modelValue",t.target.value)})}),[Object(r["i"])("option",i,Object(r["D"])(n.label),1),(Object(r["t"])(!0),Object(r["f"])(r["a"],null,Object(r["z"])(n.options,(function(e){return Object(r["t"])(),Object(r["f"])("option",{key:e.value,value:e.value},Object(r["D"])(e.text),9,["value"])})),128))],16,["id","value","required"])):"textarea"===n.type?(Object(r["t"])(),Object(r["f"])("textarea",Object(r["n"])({key:1,id:n.label,class:"inputBox",value:n.modelValue,required:n.required,onInput:t[2]||(t[2]=function(t){return e.$emit("update:modelValue",t.target.value)}),placeholder:n.label},n.validation),null,16,["id","value","required","placeholder"])):(Object(r["t"])(),Object(r["f"])("input",Object(r["n"])({key:2,id:n.label,class:"inputBox",value:n.modelValue,required:n.required,onInput:t[3]||(t[3]=function(t){return e.$emit("update:modelValue",t.target.value)}),placeholder:n.label,type:n.type},n.validation),null,16,["id","value","required","placeholder","type"]))],2)})),c=(n("caad"),{name:"Input",emits:["update:modelValue"],props:{modelValue:String,label:String,required:Boolean,options:Array,validation:Object,type:{default:"text",type:String},size:{default:"full",type:String,validator:function(e){return["half","full"].includes(e)}}},setup:function(){}});n("43ee");c.render=o,c.__scopeId="data-v-535a508e";t["a"]=c},"99af":function(e,t,n){"use strict";var r=n("23e7"),a=n("d039"),i=n("e8b5"),o=n("861d"),c=n("7b0b"),u=n("50c4"),l=n("8418"),s=n("65f0"),d=n("1dde"),f=n("b622"),b=n("2d00"),m=f("isConcatSpreadable"),p=9007199254740991,g="Maximum allowed index exceeded",v=b>=51||!a((function(){var e=[];return e[m]=!1,e.concat()[0]!==e})),h=d("concat"),O=function(e){if(!o(e))return!1;var t=e[m];return void 0!==t?!!t:i(e)},j=!v||!h;r({target:"Array",proto:!0,forced:j},{concat:function(e){var t,n,r,a,i,o=c(this),d=s(o,0),f=0;for(t=-1,r=arguments.length;t<r;t++)if(i=-1===t?o:arguments[t],O(i)){if(a=u(i.length),f+a>p)throw TypeError(g);for(n=0;n<a;n++,f++)n in i&&l(d,f,i[n])}else{if(f>=p)throw TypeError(g);l(d,f++,i)}return d.length=f,d}})},a11b:function(e,t,n){"use strict";n("1b84")},a640:function(e,t,n){"use strict";var r=n("d039");e.exports=function(e,t){var n=[][e];return!!n&&r((function(){n.call(null,t||function(){throw 1},1)}))}},ab13:function(e,t,n){var r=n("b622"),a=r("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[a]=!1,"/./"[e](t)}catch(r){}}return!1}},b1b0:function(e,t,n){},b64b:function(e,t,n){var r=n("23e7"),a=n("7b0b"),i=n("df75"),o=n("d039"),c=o((function(){i(1)}));r({target:"Object",stat:!0,forced:c},{keys:function(e){return i(a(e))}})},cdb7:function(e,t,n){},d784:function(e,t,n){"use strict";n("ac1f");var r=n("6eeb"),a=n("9263"),i=n("d039"),o=n("b622"),c=n("9112"),u=o("species"),l=RegExp.prototype;e.exports=function(e,t,n,s){var d=o(e),f=!i((function(){var t={};return t[d]=function(){return 7},7!=""[e](t)})),b=f&&!i((function(){var t=!1,n=/a/;return"split"===e&&(n={},n.constructor={},n.constructor[u]=function(){return n},n.flags="",n[d]=/./[d]),n.exec=function(){return t=!0,null},n[d](""),!t}));if(!f||!b||n){var m=/./[d],p=t(d,""[e],(function(e,t,n,r,i){var o=t.exec;return o===a||o===l.exec?f&&!i?{done:!0,value:m.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}));r(String.prototype,e,p[0]),r(l,d,p[1])}s&&c(l[d],"sham",!0)}},d9f1:function(e,t,n){"use strict";n("5480")},dbb4:function(e,t,n){var r=n("23e7"),a=n("83ab"),i=n("56ef"),o=n("fc6a"),c=n("06cf"),u=n("8418");r({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(e){var t,n,r=o(e),a=c.f,l=i(r),s={},d=0;while(l.length>d)n=a(r,t=l[d++]),void 0!==n&&u(s,t,n);return s}})},e0cf:function(e,t,n){"use strict";n.r(t);var r=n("7a23"),a=Object(r["L"])("data-v-564f0de8"),i=a((function(e,t,n,i,o,c){var u=Object(r["B"])("LogInForm"),l=Object(r["B"])("ImageGallery"),s=Object(r["B"])("PopUp");return Object(r["t"])(),Object(r["f"])(r["a"],null,[Object(r["i"])(l,{images:o.images,onMoreImages:t[1]||(t[1]=function(e){return c.getImageData()})},{default:a((function(){return[o.isMobile?(Object(r["t"])(),Object(r["f"])(u,{key:0,class:"formCard"})):Object(r["g"])("",!0)]})),_:1},8,["images"]),Object(r["i"])(s,{class:"formPopUp",closable:!1,scrollable:""},{default:a((function(){return[o.isMobile?Object(r["g"])("",!0):(Object(r["t"])(),Object(r["f"])(u,{key:0}))]})),_:1})],64)})),o=n("2909"),c=n("5530"),u=(n("99af"),n("686a")),l=n("dacb"),s=Object(r["L"])("data-v-77ce4d24");Object(r["w"])("data-v-77ce4d24");var d={class:"login-container"},f={class:"logo-container"},b={class:"checkbox-container"},m=Object(r["i"])("label",{class:"checkboxLabel",for:"rememberMe"},"Remember me:",-1),p={class:"button-container"},g=Object(r["h"])(" submit "),v=Object(r["h"])(" reset "),h=Object(r["i"])("h2",{style:{"text-align":"center"}}," Any Email/Password will work for testing. ",-1);Object(r["u"])();var O=s((function(e,t,n,a,i,o){var c=Object(r["B"])("MainLogo"),u=Object(r["B"])("AppInput"),l=Object(r["B"])("AppButton");return Object(r["t"])(),Object(r["f"])("div",d,[Object(r["i"])("div",f,[Object(r["i"])(c)]),Object(r["i"])("form",{class:["form",{submitted:a.hasSubmitted}],id:"loginForm",onSubmit:t[3]||(t[3]=Object(r["K"])((function(){return a.onSubmit&&a.onSubmit.apply(a,arguments)}),["stop","prevent"])),onReset:t[4]||(t[4]=function(){return a.resetForm&&a.resetForm.apply(a,arguments)})},[Object(r["i"])(r["c"],{name:"slide",appear:""},{default:s((function(){return[(Object(r["t"])(!0),Object(r["f"])(r["a"],null,Object(r["z"])(a.getInputs(),(function(e){return Object(r["t"])(),Object(r["f"])(u,{key:e.label,label:e.label,type:e.type,validation:e.validation,required:"",modelValue:a.formData[e.dataName],"onUpdate:modelValue":function(t){return a.formData[e.dataName]=t}},null,8,["label","type","validation","modelValue","onUpdate:modelValue"])})),128))]})),_:1}),Object(r["i"])("div",b,[m,Object(r["J"])(Object(r["i"])("input",{class:"checkbox",id:"rememberMe",type:"checkbox","onUpdate:modelValue":t[1]||(t[1]=function(e){return a.formData.rememberMe=e}),"true-value":!0,"false-value":!1},null,512),[[r["F"],a.formData.rememberMe]])]),Object(r["i"])("div",p,[Object(r["i"])(l,{class:"button",type:"submit",form:"loginForm",onClick:t[2]||(t[2]=function(e){return a.hasSubmitted=!0})},{default:s((function(){return[g]})),_:1}),Object(r["i"])(l,{class:"button",type:"reset",form:"loginForm"},{default:s((function(){return[v]})),_:1}),Object(r["i"])(l,{class:"button",type:"button",onClick:a.toggleRegister},{default:s((function(){return[Object(r["h"])(Object(r["D"])(a.register?"Login":"register"),1)]})),_:1},8,["onClick"])]),h],34)])})),j=(n("4de4"),n("caad"),n("2532"),n("ac1f"),n("1276"),n("a1e9")),y=n("5502"),I=n("6c02"),w=n("45c2"),x=n("97f7"),C=n("b4f6"),L=function(){return{email:"",username:"",password:"",confirmPassword:"",rememberMe:!1}},k=[{label:"Username",type:"text",dataName:"username",appearsIn:["register"]},{label:"Email",type:"email",dataName:"email",appearsIn:["login","register"]},{label:"Password",type:"password",dataName:"password",appearsIn:["login","register"],validation:{minlength:8,maxlength:30}},{label:"Confirm Password",type:"password",dataName:"confirmPassword",appearsIn:["register"],validation:{minlength:8,maxlength:30}}],E={name:"LogInForm",components:{AppButton:w["a"],AppInput:x["a"],MainLogo:C["a"]},setup:function(){var e=Object(y["b"])(),t=Object(I["e"])(),n=Object(j["k"])(!1),r=Object(j["k"])(!1),a=L(),i=function(){return k.filter((function(e){return e.appearsIn.includes(n.value?"register":"login")}))},o=function(e){document.getElementById("Password").setCustomValidity(e),n.value&&document.getElementById("Confirm Password").setCustomValidity(e)},c=function(){return n.value&&a.password!=a.confirmPassword?(o("Password and Confirm Password must match."),!1):(o(""),!0)},u=function(){r.value=!1,o(""),a=L()},l=function(){if(r.value=!0,console.log("test submit"),c()){var n=a.username?a.username:a.email.split("@")[0];e.commit("user/logUserIn",n),t.push("/explore")}},s=function(){u(),n.value=!n.value};return{getInputs:i,register:n,formData:a,hasSubmitted:r,onSubmit:l,toggleRegister:s,resetForm:u}},methods:{}};n("d9f1");E.render=O,E.__scopeId="data-v-77ce4d24";var P=E,S=n("0275"),D=n("33b5"),M={name:"LogIn",components:{ImageGallery:u["a"],PopUp:l["a"],LogInForm:P},data:function(){return{images:[],currentImageRound:0,isMobile:!1,debouncedUpdateMobile:Object(D["a"])(this.updateIsMobile)}},methods:{getDataStub:function(){for(var e=[],t=0;t<5;t++)for(var n=0;n<7;n++){var r=Object(c["a"])({},S[n]);r.id=r.id+7*t+7*this.currentImageRound*5,e.push(r)}return e},getImageData:function(){this.images=[].concat(Object(o["a"])(this.images),Object(o["a"])(this.getDataStub())),this.currentImageRound++},updateIsMobile:function(){this.isMobile=window.innerWidth<572}},created:function(){this.updateIsMobile(),this.getImageData(),window.addEventListener("resize",this.debouncedUpdateMobile)},unmounted:function(){window.removeEventListener("resize",this.debouncedUpdateMobile)}};n("f04e");M.render=i,M.__scopeId="data-v-564f0de8";t["default"]=M},e439:function(e,t,n){var r=n("23e7"),a=n("d039"),i=n("fc6a"),o=n("06cf").f,c=n("83ab"),u=a((function(){o(1)})),l=!c||u;r({target:"Object",stat:!0,forced:l,sham:!c},{getOwnPropertyDescriptor:function(e,t){return o(i(e),t)}})},f04e:function(e,t,n){"use strict";n("cdb7")},fe0c:function(e,t,n){"use strict";n("2376")}}]);
//# sourceMappingURL=chunk-160376f4.8eb8b658.js.map