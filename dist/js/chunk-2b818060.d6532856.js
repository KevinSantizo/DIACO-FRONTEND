(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b818060"],{"1d28":function(t,e,a){"use strict";var o=a("b39f"),n=a.n(o);n.a},"6ba0":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("div",[a("v-btn",{staticStyle:{"text-decoration":"none"},attrs:{icon:"",to:"/index/city/"+t.store.store_branch_town.city.id+"/city-detail"}},[a("v-icon",{attrs:{color:"#101729",dark:"",size:"45"}},[t._v("mdi-chevron-left")])],1)],1),a("v-row",[a("h1",{staticClass:"heading-1 ml-7"},[t._v("Sucursal "+t._s(t.store.name_store_branch))]),a("v-spacer"),a("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[a("div",{staticClass:"text-center"},[a("v-btn",t._g(t._b({staticClass:"mr-5",attrs:{outlined:"",color:"#101729"}},"v-btn",n,!1),o),[a("v-icon",{attrs:{size:"30"}},[t._v("mdi-plus")]),t._v("Agregar Queja")],1),a("v-btn",{staticClass:"mr-5",attrs:{color:"#101729",outlined:""},on:{click:function(e){return t.getComplains()}}},[a("v-icon",{attrs:{size:"30",dark:""}},[t._v("mdi-refresh")])],1)],1)]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("form",{on:{submit:t.onSubmit}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v("Nueva queja para "),a("span",{staticClass:"red--text"},[t._v(t._s(t.store.name_store_branch))])])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Nombre*",name:"name_complain",required:""},model:{value:t.form.name_complain,callback:function(e){t.$set(t.form,"name_complain",e)},expression:"form.name_complain"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Descripción*",name:"description_complain",required:""},model:{value:t.form.description_complain,callback:function(e){t.$set(t.form,"description_complain",e)},expression:"form.description_complain"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-row",[a("v-text-field",{staticClass:"font",attrs:{type:"date",dense:"",outlined:""},model:{value:t.form.date_complain,callback:function(e){t.$set(t.form,"date_complain",e)},expression:"form.date_complain"}}),a("v-icon",{staticClass:"mb-6 ml-4",attrs:{size:"45"}},[t._v("mdi-calendar")])],1)],1),a("input",{directives:[{name:"model",rawName:"v-model",value:this.form.store_branch,expression:"this.form.store_branch"}],attrs:{type:"hidden",id:t.store.id,name:"store_branch"},domProps:{value:this.form.store_branch},on:{input:function(e){e.target.composing||t.$set(this.form,"store_branch",e.target.value)}}})],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"mr-3",attrs:{color:"#1D3557",outlined:""},on:{click:function(e){t.dialog=!1}}},[t._v("Cancelar")]),a("v-btn",{attrs:{type:"submit",color:"#1D3557",raised:""},on:{click:function(e){t.dialog=!1}}},[t._v("Guardar")])],1)],1)],1)])],1),a("div",{staticClass:"ml-5"},[a("h6",[t._v(t._s(t.store.address)+" "+t._s(t.store.store_branch_town.name_town)+" "+t._s(t.store.store_branch_town.city.name_city))]),a("h6",[t._v(t._s(t.store.store_branch_town.city.region.name_region))])]),0==t.store.total_complains?a("div",{staticClass:"text-center mt-7"},[a("v-chip",{attrs:{color:"red",large:"",outlined:""}},[a("span",{staticClass:"pa-7",staticStyle:{"font-size":"20px"}},[t._v("Esta tienda no tiene quejas.")])])],1):a("div",{staticClass:"mt-5",staticStyle:{"overflow-x":"auto"}},[a("table",{staticClass:"styled-table"},[a("thead",[a("tr",[a("th",[t._v("Nombre")]),a("th",[t._v("Descripción")]),a("th",[t._v("Fecha")]),a("th",[t._v("Opciones")])])]),a("tbody",t._l(t.store.complains,(function(e){return a("tr",{key:e.name_complain},[a("td",[t._v(t._s(e.name_complain))]),a("td",[t._v(t._s(e.description_complain))]),a("td",[t._v(t._s(e.date_complain))]),a("td",[a("b-button",{attrs:{type:"button",variant:"danger"},on:{click:function(a){t.DELETE(e,e.id),t.modalShow=!t.modalShow}}},[t._v("Eliminar")])],1),a("b-modal",{attrs:{"hide-footer":"",id:"myModal",title:"Eliminar queja"},model:{value:t.modalShow,callback:function(e){t.modalShow=e},expression:"modalShow"}},[a("p",{staticClass:"my-4"},[t._v("¿Estás seguro de eliminar esta queja?")]),a("b-button",{staticClass:"mt-3",attrs:{variant:"outline-danger",block:""},on:{click:function(e){return t.deleteComplain(t.test_complain,t.test_id)}}},[t._v("Eliminar")]),a("b-button",{staticClass:"mt-2",attrs:{variant:"outline-info",block:""},on:{click:function(e){t.modalShow=!t.modalShow}}},[t._v("Cancelar")])],1)],1)})),0)])])],1)},n=[],i=(a("a434"),a("96cf"),a("1da1")),s=a("bc3a"),c=a.n(s),r=a("1940"),l=a.n(r),d="http://192.168.0.106:8000/",u={data:function(){return{date:(new Date).toISOString().substr(0,10),menu:!1,modal:!1,menu2:!1,modalShow:!1,dialog:!1,storeId:this.$route.params.storeId,store:[],fields:[{key:"name_complain",label:"Nombre"},{key:"description_complain",label:"Descripción"},{key:"date_complain",label:"Fecha"}],form:{store_branch:"",name_complain:"",description_complain:"",date_complain:""},complains:[],test_complain:{},test_id:""}},mounted:function(){var t=this;c.a.get("".concat(d,"api/stores-children/").concat(this.storeId,"/")).then((function(e){t.store=e.data,t.complains=t.store.complains,t.form.store_branch=t.store.id,console.log(t.store.complains)})).catch((function(t){console.log(t)}))},methods:{DELETE:function(t,e){this.test_complain=t,this.test_id=e},deleteComplain:function(t,e){var a=this,o="".concat(d,"api/complains/").concat(e,"/");c.a.delete(o).then((function(t){console.log("Error  "+t),l()("Queja eliminada.","","success"),window.location.reload(),a.complains.splice(e,1)}))},getComplains:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:c.a.get("".concat(d,"api/stores-children/").concat(t.storeId,"/")).then((function(e){t.store=e.data,console.log("".concat(t.store.name_store_branch)),t.complains=t.store.complains,t.form.store_branch=t.store.id,console.log(t.store.complains)})).catch((function(t){console.log(t)}));case 1:case"end":return e.stop()}}),e)})))()},onSubmit:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.preventDefault(),o="".concat(d,"api/add-complains/"),a.next=4,c.a.post(o,e.form).then((function(t){e.form.store_branch=t.data.store_branch,e.form.name_complain=t.data.name_complain,e.form.description_complain=t.data.description_complain,e.form.date_complain=t.data.date_complain,l()("Queja agregada.","","success")})).catch((function(t){console.log(t)}));case 4:case"end":return a.stop()}}),a)})))()}},created:function(){}},p=u,m=(a("1d28"),a("2877")),h=a("6544"),v=a.n(h),f=a("8336"),_=a("b0af"),b=a("99d9"),g=a("cc20"),C=a("62ad"),k=a("a523"),w=a("169a"),x=a("132d"),y=a("0fd9"),S=a("2fa4"),j=a("8654"),E=Object(m["a"])(p,o,n,!1,null,null,null);e["default"]=E.exports;v()(E,{VBtn:f["a"],VCard:_["a"],VCardActions:b["a"],VCardText:b["b"],VCardTitle:b["c"],VChip:g["a"],VCol:C["a"],VContainer:k["a"],VDialog:w["a"],VIcon:x["a"],VRow:y["a"],VSpacer:S["a"],VTextField:j["a"]})},"8adc":function(t,e,a){},b39f:function(t,e,a){},cc20:function(t,e,a){"use strict";a("4de4"),a("4160");var o=a("3835"),n=a("5530"),i=(a("8adc"),a("58df")),s=a("0789"),c=a("9d26"),r=a("a9ad"),l=a("4e82"),d=a("7560"),u=a("f2e7"),p=a("1c87"),m=a("af2b"),h=a("d9bd");e["a"]=Object(i["a"])(r["a"],m["a"],p["a"],d["a"],Object(l["a"])("chipGroup"),Object(u["b"])("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default:function(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:function(){return{proxyClass:"v-chip--active"}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])(Object(n["a"])(Object(n["a"])({"v-chip":!0},p["a"].options.computed.classes.call(this)),{},{"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose},this.themeClasses),this.sizeableClasses),this.groupClasses)},hasClose:function(){return Boolean(this.close)},isClickable:function(){return Boolean(p["a"].options.computed.isClickable.call(this)||this.chipGroup)}},created:function(){var t=this,e=[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]];e.forEach((function(e){var a=Object(o["a"])(e,2),n=a[0],i=a[1];t.$attrs.hasOwnProperty(n)&&Object(h["a"])(n,i,t)}))},methods:{click:function(t){this.$emit("click",t),this.chipGroup&&this.toggle()},genFilter:function(){var t=[];return this.isActive&&t.push(this.$createElement(c["a"],{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(s["b"],t)},genClose:function(){var t=this;return this.$createElement(c["a"],{staticClass:"v-chip__close",props:{right:!0,size:18},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.$emit("click:close"),t.$emit("update:active",!1)}}},this.closeIcon)},genContent:function(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),this.$slots.default,this.hasClose&&this.genClose()])}},render:function(t){var e=[this.genContent()],a=this.generateRouteLink(),o=a.tag,i=a.data;i.attrs=Object(n["a"])(Object(n["a"])({},i.attrs),{},{draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:i.attrs.tabindex}),i.directives.push({name:"show",value:this.active}),i=this.setBackgroundColor(this.color,i);var s=this.textColor||this.outlined&&this.color;return t(o,this.setTextColor(s,i),e)}})}}]);
//# sourceMappingURL=chunk-2b818060.d6532856.js.map