(function(t){function e(e){for(var s,c,o=e[0],u=e[1],i=e[2],d=0,f=[];d<o.length;d++)c=o[d],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&f.push(n[c][0]),n[c]=0;for(s in u)Object.prototype.hasOwnProperty.call(u,s)&&(t[s]=u[s]);p&&p(e);while(f.length)f.shift()();return a.push.apply(a,i||[]),r()}function r(){for(var t,e=0;e<a.length;e++){for(var r=a[e],s=!0,o=1;o<r.length;o++){var u=r[o];0!==n[u]&&(s=!1)}s&&(a.splice(e--,1),t=c(c.s=r[0]))}return t}var s={},n={app:0},a=[];function c(e){if(s[e])return s[e].exports;var r=s[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.m=t,c.c=s,c.d=function(t,e,r){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)c.d(r,s,function(e){return t[e]}.bind(null,s));return r},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=e,o=o.slice();for(var i=0;i<o.length;i++)e(o[i]);var p=u;a.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"034f":function(t,e,r){"use strict";r("85ec")},"0d77":function(t,e,r){"use strict";r("57d9")},"2e7b":function(t,e,r){},"37fa":function(t,e,r){"use strict";r("2e7b")},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var s=r("2b0e"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("div",{attrs:{id:"nav"}},[r("router-link",{attrs:{to:"/"}},[t._v("Home")])],1),r("router-view")],1)},a=[],c={name:"App",beforeMount:function(){this.$store.dispatch("getSketches"),this.$store.dispatch("getDrafts"),this.$store.dispatch("getOrders")},computed:{sketches:function(){return this.$store.state.sketches},drafts:function(){return this.$store.state.drafts},orders:function(){return this.$store.state.orders}}},o=c,u=(r("034f"),r("2877")),i=Object(u["a"])(o,n,a,!1,null,null,null),p=i.exports,d=r("8c4f"),f=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home"},[r("button",{on:{click:t.postSketchDraft}},[t._v("POST Sketch & Draft")]),t._l(t.sketches,(function(t){return r("SketchesList",{key:t.message,attrs:{sketch:t}})})),r("br"),r("form",{staticClass:"updateSketches",on:{submit:function(e){return e.preventDefault(),t.updateSketch(e)}}},[r("input",{attrs:{type:"number",placeholder:"Sketch ID to change"}}),r("input",{attrs:{type:"text",placeholder:"Changes"}}),r("button",{staticClass:"patchBtn",attrs:{type:"submit"}},[t._v("PATCH Sketch")])]),r("br"),r("form",{on:{submit:function(e){return e.preventDefault(),t.deleteDraft(e)}}},[r("input",{staticClass:"deleteDraft",attrs:{type:"number",placeholder:"Draft ID to delete"}}),r("button",{staticClass:"deleteBtn",attrs:{type:"submit"}},[t._v("DELETE Draft")])]),t._l(t.drafts,(function(t){return r("DraftsList",{key:t.message,attrs:{draft:t}})})),r("br"),r("form",{on:{submit:function(e){return e.preventDefault(),t.postOrder(e)}}},[r("input",{staticClass:"postOrder",attrs:{type:"number",placeholder:"Draft ID to order"}}),r("button",{attrs:{type:"submit"}},[t._v("POST Order")]),t._l(t.orders,(function(t){return r("OrdersList",{key:t.message,attrs:{order:t}})}))],2)],2)},l=[],h=(r("159b"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("span",{staticClass:"bold"},[t._v("ID: ")]),r("span",[t._v(" "+t._s(t.sketch.id)+" ")]),r("span",{staticClass:"bold"},[t._v("message: ")]),r("span",[t._v(t._s(t.sketch.message)+" ")]),r("span",{staticClass:"bold"},[t._v("changes: ")]),r("span",{staticClass:"changes"},[t._v(t._s(t.sketch.changes)+" ")]),r("span",{staticClass:"bold"},[t._v("created at: ")]),r("span",[t._v(t._s(t.sketch.created_at)+" ")]),r("span",{staticClass:"bold"},[t._v("updated at: ")]),r("span",[t._v(t._s(t.sketch.updated_at))])])}),v=[],m={name:"SketchesList",props:{sketch:Object}},b=m,_=(r("0d77"),Object(u["a"])(b,h,v,!1,null,"6e4ffabb",null)),g=_.exports,k=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("span",{staticClass:"bold"},[t._v("ID: ")]),r("span",[t._v(" "+t._s(t.draft.id)+" ")]),r("span",{staticClass:"bold"},[t._v("message: ")]),r("span",[t._v(t._s(t.draft.message)+" ")]),r("span",{staticClass:"bold"},[t._v("created at: ")]),r("span",[t._v(t._s(t.draft.created_at)+" ")]),r("span",{staticClass:"bold"},[t._v("updated at: ")]),r("span",[t._v(t._s(t.draft.updated_at))])])},O=[],w={name:"DraftsList",props:{draft:Object}},D=w,S=(r("aca5"),Object(u["a"])(D,k,O,!1,null,"7a501444",null)),y=S.exports,x=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("span",{staticClass:"bold"},[t._v("ID: ")]),r("span",[t._v(" "+t._s(t.order.id)+" ")]),r("span",{staticClass:"bold"},[t._v("message: ")]),r("span",[t._v(t._s(t.order.message)+" ")]),r("span",{staticClass:"bold"},[t._v("created at: ")]),r("span",[t._v(t._s(t.order.created_at)+" ")]),r("span",{staticClass:"bold"},[t._v("updated at: ")]),r("span",[t._v(t._s(t.order.updated_at))])])},j=[],$={name:"OrdersList",props:{order:Object}},C=$,R=(r("37fa"),Object(u["a"])(C,x,j,!1,null,"2f69746b",null)),L=R.exports,P={name:"Home",components:{SketchesList:g,DraftsList:y,OrdersList:L},methods:{postSketchDraft:function(){this.$store.dispatch("postSketchDraft"),this.$store.dispatch("getSketches"),this.$store.dispatch("getDrafts")},updateSketch:function(t){this.$store.dispatch("updateSketch",{id:t.target[0].valueAsNumber,changes:t.target[1].value}),this.$store.dispatch("getSketches"),document.querySelectorAll(".updateSketches > input").forEach((function(t){return t.value=""}))},deleteDraft:function(t){this.$store.dispatch("deleteDraft",t.target[0].valueAsNumber),this.$store.dispatch("getDrafts"),document.querySelector(".deleteDraft").value=""},postOrder:function(t){this.$store.dispatch("postOrder",t.target[0].valueAsNumber),this.$store.dispatch("getOrders"),document.querySelector(".postOrder").value=""}},computed:{sketches:function(){return this.$store.state.sketches},drafts:function(){return this.$store.state.drafts},orders:function(){return this.$store.state.orders}}},E=P,T=(r("e117"),Object(u["a"])(E,f,l,!1,null,"f31d016c",null)),A=T.exports;s["a"].use(d["a"]);var I=[{path:"/",name:"Home",component:A}],M=new d["a"]({routes:I}),H=M,q=r("1da1"),N=(r("96cf"),r("2f62")),B=r("bc3a"),J=r.n(B);s["a"].use(N["a"]);var z=new N["a"].Store({state:{sketches:[],drafts:[],orders:[]},mutations:{setSketches:function(t,e){t.sketches=e},setDrafts:function(t,e){t.drafts=e},setOrders:function(t,e){t.orders=e}},actions:{getSketches:function(t){return Object(q["a"])(regeneratorRuntime.mark((function e(){var r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,J.a.get("/api/sketches");case 3:s=e.sent,r("setSketches",s.data);case 5:case"end":return e.stop()}}),e)})))()},getDrafts:function(t){return Object(q["a"])(regeneratorRuntime.mark((function e(){var r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,J.a.get("/api/drafts");case 3:s=e.sent,r("setDrafts",s.data);case 5:case"end":return e.stop()}}),e)})))()},getOrders:function(t){return Object(q["a"])(regeneratorRuntime.mark((function e(){var r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.next=3,J.a.get("/api/orders");case 3:s=e.sent,r("setOrders",s.data);case 5:case"end":return e.stop()}}),e)})))()},postSketchDraft:function(){return Object(q["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,J.a.post("/");case 2:e=t.sent,console.log(e);case 4:case"end":return t.stop()}}),t)})))()},updateSketch:function(t,e){return Object(q["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,J.a.patch("/api/sketches/".concat(e.id),{changes:e.changes});case 2:r=t.sent,console.log(r);case 4:case"end":return t.stop()}}),t)})))()},deleteDraft:function(t,e){return Object(q["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,J.a.delete("/api/drafts/".concat(e));case 2:r=t.sent,console.log(r);case 4:case"end":return t.stop()}}),t)})))()},postOrder:function(t,e){return Object(q["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,J.a.post("/api/orders/".concat(e));case 2:r=t.sent,console.log(r);case 4:case"end":return t.stop()}}),t)})))()}},modules:{}});s["a"].config.productionTip=!1,new s["a"]({router:H,store:z,render:function(t){return t(p)}}).$mount("#app")},"57d9":function(t,e,r){},"7a62":function(t,e,r){},"85ec":function(t,e,r){},aca5:function(t,e,r){"use strict";r("b54c")},b54c:function(t,e,r){},e117:function(t,e,r){"use strict";r("7a62")}});
//# sourceMappingURL=app.1b3f5f25.js.map