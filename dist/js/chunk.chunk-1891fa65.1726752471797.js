(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1891fa65"],{"21a6":function(e,t,n){(function(n){var a,r,o;(function(n,i){r=[],a=i,o="function"===typeof a?a.apply(t,r):a,void 0===o||(e.exports=o)})(0,(function(){"use strict";function t(e,t){return"undefined"==typeof t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}function a(e,t,n){var a=new XMLHttpRequest;a.open("GET",e),a.responseType="blob",a.onload=function(){c(a.response,t,n)},a.onerror=function(){console.error("could not download file")},a.send()}function r(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function o(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(a){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var i="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n&&n.global===n?n:void 0,s=i.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),c=i.saveAs||("object"!=typeof window||window!==i?function(){}:"download"in HTMLAnchorElement.prototype&&!s?function(e,t,n){var s=i.URL||i.webkitURL,c=document.createElement("a");t=t||e.name||"download",c.download=t,c.rel="noopener","string"==typeof e?(c.href=e,c.origin===location.origin?o(c):r(c.href)?a(e,t,n):o(c,c.target="_blank")):(c.href=s.createObjectURL(e),setTimeout((function(){s.revokeObjectURL(c.href)}),4e4),setTimeout((function(){o(c)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,n,i){if(n=n||e.name||"download","string"!=typeof e)navigator.msSaveOrOpenBlob(t(e,i),n);else if(r(e))a(e,n,i);else{var s=document.createElement("a");s.href=e,s.target="_blank",setTimeout((function(){o(s)}))}}:function(e,t,n,r){if(r=r||open("","_blank"),r&&(r.document.title=r.document.body.innerText="downloading..."),"string"==typeof e)return a(e,t,n);var o="application/octet-stream"===e.type,c=/constructor/i.test(i.HTMLElement)||i.safari,l=/CriOS\/[\d]+/.test(navigator.userAgent);if((l||o&&c||s)&&"undefined"!=typeof FileReader){var u=new FileReader;u.onloadend=function(){var e=u.result;e=l?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=e:location=e,r=null},u.readAsDataURL(e)}else{var d=i.URL||i.webkitURL,p=d.createObjectURL(e);r?r.location=p:location.href=p,r=null,setTimeout((function(){d.revokeObjectURL(p)}),4e4)}});i.saveAs=c.saveAs=c,e.exports=c}))}).call(this,n("c8ba"))},"25cb":function(e,t,n){"use strict";n("2a07")},"2a07":function(e,t,n){},4847:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-card",{staticClass:"page-card",attrs:{shadow:"never"}},[n("SearchForm",{ref:"searchForm",attrs:{options:e.options,"search-config":e.searchConfig},on:{search:e.onSearch,init:e.onInit}}),n("div",[n("TablePackage",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,size:e.$size,border:"","storage-name":"revenue-static","header-cell-style":{"text-align":"center",background:"#fafafa"},"cell-style":{"text-align":"center"}},on:{"selection-change":e.handleSelectionChange},scopedSlots:e._u([{key:"btnContentLeft",fn:function(){return[n("span",{staticClass:"title "},[e._v("总计：")]),n("span",{staticClass:"table-describe"},[e._v("收益數量："+e._s(e.ape))]),n("el-button",{directives:[{name:"setButtonPower",rawName:"v-setButtonPower",value:"revenue-static-export",expression:"'revenue-static-export'"}],attrs:{type:"primary",size:e.$s_size},on:{click:function(t){return e.handlebatchClick("export")}}},[e._v("導出")]),n("el-button",{directives:[{name:"setButtonPower",rawName:"v-setButtonPower",value:"revenue-static-set",expression:"'revenue-static-set'"}],attrs:{type:"primary",size:e.$s_size},on:{click:function(t){return e.handlebatchClick("set")}}},[e._v("收益設置")]),n("el-button",{directives:[{name:"setButtonPower",rawName:"v-setButtonPower",value:"revenue-static-retransmission",expression:"'revenue-static-retransmission'"}],attrs:{type:"primary",size:e.$s_size},on:{click:function(t){return e.handlebatchClick("retransmission")}}},[e._v("收益補發")])]},proxy:!0},{key:"btnContentRight",fn:function(){return[n("el-tooltip",{staticClass:"item table-top-btn",attrs:{effect:"dark",content:"刷新列表",placement:"top"}},[n("el-button",{attrs:{size:"mini",circle:"",icon:"el-icon-refresh-right"},on:{click:e.getData}})],1)]},proxy:!0}])},[n("el-table-column",{attrs:{fixed:"",prop:"uid",label:"用戶ID","min-width":"100"}}),n("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"relation_addr",label:"關聯地址","min-width":"150"}}),n("el-table-column",{attrs:{prop:"balance",label:"當日獎金池（APE）","min-width":"140"}}),n("el-table-column",{attrs:{prop:"left",label:"累計餘量（APE）","min-width":"140"}}),n("el-table-column",{attrs:{prop:"type6_str",label:"收益比例","min-width":"80"}}),n("el-table-column",{attrs:{prop:"persons",label:"發放人數","min-width":"80"}}),n("el-table-column",{attrs:{prop:"ape",label:"收益數量（APE）","min-width":"140"}}),n("el-table-column",{attrs:{prop:"created_at",label:"收益發放時間","min-width":"160"}})],1),n("div",{staticClass:"footerpage"},[n("el-pagination",{attrs:{background:"","current-page":e.searchForm.page,"page-size":e.searchForm.page_size,layout:"total,  prev, pager, next, jumper",total:e.searchForm.total},on:{"current-change":e.handleCurrentChange}})],1)],1)],1),n("Set",{ref:"Set",on:{getData:e.getData}}),n("SetRetransmission",{ref:"SetRetransmission",on:{getData:e.getData}})],1)},r=[],o=n("c7eb"),i=n("1da1"),s=n("5530"),c=n("2f62"),l=n("21fd"),u=n("0272"),d=n("c6e7"),p=n("21a6"),m=n.n(p),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-dialog",{attrs:{width:"35%",title:"收益設置","before-close":e.handleClose,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"label-position":"top",model:e.ruleForm,rules:e.rules,"label-width":"120px"}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{staticStyle:{"margin-bottom":"20px"},attrs:{span:24}},[n("div",{staticClass:"red"},[e._v("設置說明： 設置成功後，次日將按照以下比例規則發放靜態收益")])]),n("el-col",{attrs:{span:24}},[n("el-form-item",{attrs:{label:"靜態收益比例：",prop:"pool_p"}},[n("el-input",{attrs:{clearable:"",placeholder:"請輸入靜態收益比例"},model:{value:e.ruleForm.pool_p,callback:function(t){e.$set(e.ruleForm,"pool_p",t)},expression:"ruleForm.pool_p"}},[n("template",{slot:"append"},[e._v("%")])],2)],1)],1)],1)],1),n("div",{staticClass:"dialog-footer"},[n("el-button",{attrs:{size:"mini"},on:{click:e.handleClose}},[e._v("取 消")]),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.submitForm}},[e._v("确 定")])],1)],1)],1)},b=[],h=(n("ac1f"),n("00b4"),n("d9e2"),n("a9e3"),n("9418")),v=n("757b"),g={name:"",data:function(){var e=function(e,t,n){var a=/^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/;if(t&&!a.test(t))n(new Error("包含两位小數的正數"));else if(Number(t)>100)return n(new Error("比例不能超過100%"));n()};return{mode:"",dialogFormVisible:!1,ruleForm:{left_p:"",pool_p:""},rules:{left_p:[{required:!0,message:"請輸入餘量池",trigger:"blur"},{validator:e,trigger:"blur"}],pool_p:[{required:!0,message:"請輸入靜態收益比例",trigger:"blur"},{validator:e,trigger:"blur"}]}}},computed:{},created:function(){},methods:{getData:function(){var e=this;return Object(i["a"])(Object(o["a"])().mark((function t(){var n,a;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(v["m"])();case 2:n=t.sent,a=n.data,a.pool_p&&(e.ruleForm=a);case 5:case"end":return t.stop()}}),t)})))()},handleClose:function(){this.$refs.ruleForm.resetFields(),this.dialogFormVisible=!1},submitForm:function(){var e=this;this.$refs.ruleForm.validate(function(){var t=Object(i["a"])(Object(o["a"])().mark((function t(n){return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n){t.next=2;break}return t.abrupt("return",Object(h["a"])(e,"请按要求填写！"));case 2:return t.next=4,Object(v["n"])(e.ruleForm);case 4:Object(h["a"])(e,"操作成功！","success"),e.$emit("getData"),e.handleClose();case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}},w=g,j=(n("a529"),n("2877")),O=Object(j["a"])(w,f,b,!1,null,"4bbdf814",null),_=O.exports,x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-dialog",{attrs:{width:"35%",title:"收益補發","before-close":e.handleClose,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-descriptions",{attrs:{border:"",title:"發放詳情",column:1}},[n("el-descriptions-item",{attrs:{label:"發放日期"}},[e._v(e._s(e.detailsForm.date))]),n("el-descriptions-item",{attrs:{label:"發放數量"}},[e._v(e._s(e.detailsForm.static_income))]),n("el-descriptions-item",{attrs:{label:"是否已發放"}},[e._v(e._s(e.detailsForm.has_send_out?"已發放":"未發放"))]),n("el-descriptions-item",{attrs:{label:"備用池余額"}},[e._v(e._s(e.detailsForm.static_assist))])],1),n("div",{staticClass:"dialog-footer",staticStyle:{"margin-top":"15px"}},[n("el-button",{attrs:{size:"mini"},on:{click:e.handleClose}},[e._v("取 消")]),n("el-button",{attrs:{size:"mini",disabled:!e.detailsForm.can_send,type:"primary"},on:{click:e.submitForm}},[e._v("确 定")])],1)],1)],1)},y=[],F={name:"",data:function(){return{mode:"",dialogFormVisible:!1,detailsForm:{}}},computed:{},created:function(){},methods:{getData:function(){var e=this;return Object(i["a"])(Object(o["a"])().mark((function t(){var n,a;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(v["p"])();case 2:n=t.sent,a=n.data,e.detailsForm=a,console.log(a,888888888);case 6:case"end":return t.stop()}}),t)})))()},handleClose:function(){this.dialogFormVisible=!1},submitForm:function(){var e=this;return Object(i["a"])(Object(o["a"])().mark((function t(){return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(v["o"])();case 2:Object(h["a"])(e,"操作成功！","success"),e.$emit("getData"),e.handleClose();case 5:case"end":return t.stop()}}),t)})))()}}},k=F,C=Object(j["a"])(k,x,y,!1,null,"1fe0fd8c",null),S=C.exports,D={name:"RevenueStatic",components:{TablePackage:l["a"],SearchForm:u["a"],Set:_,SetRetransmission:S},mixins:[d["a"]],data:function(){return{loading:!1,options:{type6_enum:[]},searchConfig:[{key:"uid",type:"input",label:"用戶ID",value:""},{key:"relation_addr",type:"input",label:"關聯地址",value:""},{key:"type6",type:"select",label:"收益比例",value:""},{key:"create_time",type:"datetimerange",label:"收益發放時間",is_simple:!0,value:""}],tableData:[],ape:0}},computed:Object(s["a"])({},Object(c["b"])(["buttonRoles"])),created:function(){this.getEnum()},methods:{getEnum:function(){var e=this;return Object(i["a"])(Object(o["a"])().mark((function t(){var n,a;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(v["b"])();case 2:n=t.sent,a=n.data,e.options.type6_enum=a.static_type6;case 5:case"end":return t.stop()}}),t)})))()},getData:function(){var e=this;return Object(i["a"])(Object(o["a"])().mark((function t(){var n,a;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,Object(v["e"])(e.getSearchOptions());case 3:n=t.sent,a=n.data,e.loading=!1,e.tableData=a.data,e.ape=a.total_ape,e.searchForm.total=a.total;case 9:case"end":return t.stop()}}),t)})))()},handlebatchClick:function(e){var t=this;return Object(i["a"])(Object(o["a"])().mark((function n(){var a,r,i,c;return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("export"!==e){n.next=16;break}return a=Object(s["a"])({},t.getSearchOptions()),delete a.page,delete a.page_size,delete a.total,n.next=7,Object(v["f"])(a);case 7:r=n.sent,i=r.data,c=new XMLHttpRequest,c.open("GET",i.excel_url,!0),c.responseType="blob",c.onload=function(){var e=new Blob([c.response],{type:"application/vnd.ms-excel"});m.a.saveAs(e,decodeURI(i.excel_url.split("/")[i.excel_url.split("/").length-1]))},c.send(),n.next=17;break;case 16:"set"===e?(t.$refs.Set.getData(),t.$refs.Set.dialogFormVisible=!0):"retransmission"===e&&(t.$refs.SetRetransmission.getData(),t.$refs.SetRetransmission.dialogFormVisible=!0);case 17:case"end":return n.stop()}}),n)})))()},editRemarks:function(e){var t=this;this.$prompt("","請輸入備註",{confirmButtonText:"確定",cancelButtonText:"取消",inputType:"textarea",inputValue:e.remark,inputErrorMessage:"備註不能為空",inputValidator:function(e){return!!e||"請輸入備註"}}).then(function(){var e=Object(i["a"])(Object(o["a"])().mark((function e(n){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.value,Object(h["a"])(t,"操作成功！","success"),t.getData();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(){}))}}},E=D,R=(n("25cb"),Object(j["a"])(E,a,r,!1,null,"d0de4c8a",null));t["default"]=R.exports},"757b":function(e,t,n){"use strict";n.d(t,"e",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"g",(function(){return i})),n.d(t,"i",(function(){return s})),n.d(t,"k",(function(){return c})),n.d(t,"l",(function(){return l})),n.d(t,"a",(function(){return u})),n.d(t,"d",(function(){return d})),n.d(t,"c",(function(){return p})),n.d(t,"f",(function(){return m})),n.d(t,"h",(function(){return f})),n.d(t,"j",(function(){return b})),n.d(t,"m",(function(){return h})),n.d(t,"n",(function(){return v})),n.d(t,"p",(function(){return g})),n.d(t,"o",(function(){return w}));var a=n("b775");function r(e){return Object(a["a"])({url:"income/list1",params:e})}function o(e){return Object(a["a"])({url:"income/enums",params:e})}function i(e){return Object(a["a"])({url:"income/list2",params:e})}function s(e){return Object(a["a"])({url:"income/list3",params:e})}function c(e){return Object(a["a"])({url:"income/list4",params:e})}function l(e){return Object(a["a"])({url:"income/list5",params:e})}function u(e){return Object(a["a"])({url:"income/dynamic-detail",params:e})}function d(e){return Object(a["a"])({url:"income-export/dounion",params:e})}function p(e){return Object(a["a"])({url:"income-export/dobu",params:e})}function m(e){return Object(a["a"])({url:"income/list1-export",params:e})}function f(e){return Object(a["a"])({url:"income/list2-export",params:e})}function b(e){return Object(a["a"])({url:"income/list3-export",params:e})}function h(e){return Object(a["a"])({url:"setting/get-jincome",params:e})}function v(e){return Object(a["a"])({url:"setting/set-jincome",method:"post",data:e})}function g(e){return Object(a["a"])({url:"static-bu/ctx",params:e})}function w(e){return Object(a["a"])({url:"static-bu/create-task",params:e})}},a529:function(e,t,n){"use strict";n("cf3b")},c6e7:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a={data:function(){return{searchShow:!0,options:{},searchForm:{page:1,page_size:10,total:0},selectList:[],message:{},eventEnum:{del:"onDel",add:"onAdd",edit:"onEdit",batchDel:"onBatchDel"}}},methods:{getSearchOptions:function(){return this.$refs.searchForm?Object.assign({},this.searchForm,this.$refs.searchForm.searchForm):this.searchForm},onInit:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=this.$refs.searchForm?this.$refs.searchForm.searchForm:{},n=Object.assign({},e,this.$options.data().searchForm,t);this.searchForm=n,this.getData()},onSearch:function(){this.searchForm.page=1,this.getData()},onCancel:function(){this.isShow=!1},handleSelectionChange:function(e){this.selectList=e},handleCurrentChange:function(e){this.loading=!0,this.searchForm.page=e,this.getData()}}}},cf3b:function(e,t,n){}}]);