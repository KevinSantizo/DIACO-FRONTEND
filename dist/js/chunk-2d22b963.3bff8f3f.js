(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22b963"],{f036:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{id:"regular-tables",fluid:"",tag:"section"}},[[a("v-row",[1==t.permissions?a("v-dialog",{attrs:{persistent:"","max-width":"600px"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,o=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"ml-4",attrs:{outlined:"",color:"#1D3557"}},"v-btn",o,!1),n),[a("v-icon",{attrs:{size:"30"}},[t._v("mdi-plus")])],1),a("v-btn",{staticClass:"ml-5",attrs:{color:"#101729",outlined:""},on:{click:function(e){return t.getCompanies()}}},[a("v-icon",{attrs:{size:"30",dark:""}},[t._v("mdi-refresh")])],1)]}}],null,!1,3899498816),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("form",{on:{submit:t.onSubmit}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v("Nuevo comercio")])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Nombre*",name:"name_company",required:""},model:{value:t.form.name_company,callback:function(e){t.$set(t.form,"name_company","string"===typeof e?e.trim():e)},expression:"form.name_company"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Correo electrónico",name:"email_company",required:""},model:{value:t.form.email_company,callback:function(e){t.$set(t.form,"email_company","string"===typeof e?e.trim():e)},expression:"form.email_company"}})],1),a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"Teléfono*",name:"phone_company",required:""},model:{value:t.form.phone_company,callback:function(e){t.$set(t.form,"phone_company","string"===typeof e?e.trim():e)},expression:"form.phone_company"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"mr-3",attrs:{color:"#1D3557",outlined:""},on:{click:function(e){t.dialog=!1}}},[t._v("Cancelar")]),a("v-btn",{attrs:{type:"submit",color:"#1D3557",raised:""},on:{click:function(e){t.dialog=!1}}},[t._v("Guardar")])],1)],1)],1)]):t._e(),a("v-spacer"),a("div",{staticClass:"form-inline"},[a("v-text-field",{attrs:{label:"Buscar",color:"#101729"},model:{value:t.search_term,callback:function(e){t.search_term=e},expression:"search_term"}}),a("button",{staticClass:"btn btn-outline-info my-2 ml-6 mr-6 my-sm-0",on:{click:function(e){return t.getCommerces()}}},[t._v("Buscar")])],1)],1)],a("v-row",t._l(t.toBeShown,(function(e,n){return a("v-col",{key:n,attrs:{cols:"3",lg:"3"}},[a("div",[a("v-card",{staticClass:"pt-4 pb-4",staticStyle:{"text-decoration":"none"},attrs:{elevation:"5",to:"/index/commerce/"+e.id+"/commerce-detail"}},[a("v-list-item",[a("v-list-item-avatar",{attrs:{color:"grey"}},[a("span",{staticClass:"white--text headline"},[t._v(t._s(e.name_company.charAt(0)))])]),a("v-list-item-content",[a("v-list-item-title",{staticClass:"headline"},[t._v(t._s(e.name_company))]),a("v-list-item-subtitle",[t._v(t._s(e.stores.length)+" Sucursales")]),a("v-list-item-subtitle",[t._v(t._s(e.total_complains)+" Quejas")])],1)],1),a("v-card-text",[a("span",[t._v("Ver")]),a("v-icon",{staticClass:"ml-5"},[t._v("mdi-arrow-right")])],1)],1)],1)])})),1),a("div",[a("v-btn",{attrs:{color:"#101729",disabled:1==t.currentPage},on:{click:t.prevPage}},[t._v("Ver menos")]),a("v-btn",{attrs:{color:"#101729",disabled:t.currentPage==t.totalPages},on:{click:t.nextPage}},[t._v("Ver más")])],1),a("v-row",{staticClass:"pt-7"},[a("v-col",{attrs:{cols:"12",lg:"6"}},[a("canvas",{attrs:{id:"chart",width:"400",height:"400"}})])],1)],2)},o=[],r=(a("7db0"),a("d81d"),a("fb6a"),a("96cf"),a("1da1")),c=a("bc3a"),s=a.n(c),i=a("1940"),l=a.n(i),m=a("30ef"),u=a.n(m),d="http://192.168.0.106:8000/",p={data:function(){return{permissions:"",dialog:!1,dialog2:!1,modalShow:!1,currentPage:1,companyStores:[],commerces:[],labels:[],search_term:"",users:[],form:{name_company:"",phone_company:"",email_company:""}}},methods:{getCommerces:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get(d+"api/commerces-stores/?search=".concat(t.search_term)).then((function(e){t.companyStores=e.data})).catch((function(t){console.log("Err: "+t)}));case 2:case"end":return e.stop()}}),e)})))()},getUser:function(){var t=this,e=d+"api/users/";s.a.get(e).then((function(e){t.users=e.data,console.log(t.users);var a=t.users.find((function(e){return e.id==t.$store.state.user}));t.permissions=null===a||void 0===a?void 0:a.permissions}))},getCompanies:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get(d+"api/commerces-stores/").then((function(e){t.companyStores=e.data,console.log(t.companyStores)})).catch((function(t){console.log("Err: "+t)}));case 2:case"end":return e.stop()}}),e)})))()},nextPage:function(){this.currentPage<this.totalPages&&this.currentPage++},prevPage:function(){this.currentPage=this.currentPage-1||1},onSubmit:function(t){var e=this;t.preventDefault();var a="".concat(d,"api/companies/");s.a.post(a,this.form).then((function(t){e.form.name_company=t.data.name_company,e.form.phone_company=t.data.phone_company,e.form.email_company=t.data.email_company,l()("Comercio agregado.","","success")})).catch((function(t){l()("No se ha registrado el comercio!","","error")}))}},computed:{toBeShown:function(){return this.companyStores.slice(0,6*this.currentPage)},totalPages:function(){return Math.ceil(this.companyStores.length/6)}},mounted:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get(d+"api/commerces-complains/").then((function(e){t.commerces=e.data.map((function(t){return t.name_company})),t.labels=e.data.map((function(t){return t.total_complains})),console.log(e.data)})).catch((function(t){console.log("Err: "+t)}));case 2:a=document.getElementById("chart").getContext("2d"),new u.a(a,{type:"bar",data:{labels:t.commerces,datasets:[{steppedLine:!0,showLine:!0,fill:!0,label:"Número de quejas por comercio",backgroundColor:"rgb(0, 48, 73)",data:t.labels}]},options:{}});case 4:case"end":return e.stop()}}),e)})))()},created:function(){this.getCommerces(),this.getUser()}},v=p,f=a("2877"),h=a("6544"),g=a.n(h),_=a("8336"),b=a("b0af"),y=a("99d9"),w=a("62ad"),x=a("a523"),C=a("169a"),k=a("132d"),V=a("da13"),S=a("8270"),P=a("5d23"),I=a("0fd9"),L=a("2fa4"),R=a("8654"),j=Object(f["a"])(v,n,o,!1,null,null,null);e["default"]=j.exports;g()(j,{VBtn:_["a"],VCard:b["a"],VCardActions:y["a"],VCardText:y["b"],VCardTitle:y["c"],VCol:w["a"],VContainer:x["a"],VDialog:C["a"],VIcon:k["a"],VListItem:V["a"],VListItemAvatar:S["a"],VListItemContent:P["a"],VListItemSubtitle:P["b"],VListItemTitle:P["c"],VRow:I["a"],VSpacer:L["a"],VTextField:R["a"]})}}]);
//# sourceMappingURL=chunk-2d22b963.3bff8f3f.js.map