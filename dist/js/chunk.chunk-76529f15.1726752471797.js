(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76529f15"],{"1a82":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-card",{staticClass:"page-card",attrs:{shadow:"never"}},[r("SearchForm",{ref:"searchForm",attrs:{options:t.options,"search-config":t.searchConfig},on:{search:t.onSearch,init:t.onInit}}),r("div",[r("TablePackage",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,size:t.$size,border:"","storage-name":"adi-collect","header-cell-style":{"text-align":"center",background:"#fafafa"},"cell-style":{"text-align":"center"}},scopedSlots:t._u([{key:"btnContentLeft",fn:function(){return[r("el-button",{directives:[{name:"setButtonPower",rawName:"v-setButtonPower",value:"adi-collect-set",expression:"'adi-collect-set'"}],attrs:{type:"primary",size:t.$s_size},on:{click:function(e){return t.handlebatchClick("set")}}},[t._v("領取設置")])]},proxy:!0},{key:"btnContentRight",fn:function(){return[r("el-tooltip",{staticClass:"item table-top-btn",attrs:{effect:"dark",content:"刷新列表",placement:"top"}},[r("el-button",{attrs:{size:"mini",circle:"",icon:"el-icon-refresh-right"},on:{click:t.getData}})],1)]},proxy:!0}])},[r("el-table-column",{attrs:{fixed:"","show-overflow-tooltip":"",prop:"order_sn",label:"領取編號","min-width":"150"}}),r("el-table-column",{attrs:{fixed:"","show-overflow-tooltip":"",prop:"relation_addr",label:"關聯地址","min-width":"150"}}),r("el-table-column",{attrs:{prop:"base",label:"領取數量","min-width":"150"}}),r("el-table-column",{attrs:{prop:"rate",label:"手續費","min-width":"150"}}),r("el-table-column",{attrs:{prop:"num",label:"實際到賬","min-width":"150"}}),r("el-table-column",{attrs:{prop:"type_str",label:"領取類型","min-width":"150"}}),r("el-table-column",{attrs:{"show-overflow-tooltip":"",prop:"txid",label:"hash","min-width":"150"}}),r("el-table-column",{attrs:{prop:"created_at",label:"領取時間","min-width":"160"}})],1),r("div",{staticClass:"footerpage"},[r("el-pagination",{attrs:{background:"","current-page":t.searchForm.page,"page-size":t.searchForm.page_size,layout:"total,  prev, pager, next, jumper",total:t.searchForm.total},on:{"current-change":t.handleCurrentChange}})],1)],1)],1),r("Set",{ref:"Set",attrs:{options:t.options}}),r("SetAuto",{ref:"SetAuto"})],1)},a=[],o=r("c7eb"),u=r("1da1"),i=r("21fd"),c=r("0272"),s=r("c6e7"),l=r("9418"),d=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-dialog",{attrs:{width:"30%","close-on-click-modal":!1,title:"領取設置","before-close":t.handleClose,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"label-position":"top",model:t.ruleForm,rules:t.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"領取手續費：",prop:"commission"}},[r("el-input",{attrs:{placeholder:"請輸入領取手續費",clearable:""},model:{value:t.ruleForm.commission,callback:function(e){t.$set(t.ruleForm,"commission",e)},expression:"ruleForm.commission"}},[r("el-select",{staticStyle:{width:"100px"},attrs:{slot:"append",placeholder:"請選擇"},slot:"append",model:{value:t.ruleForm.commission_type,callback:function(e){t.$set(t.ruleForm,"commission_type",e)},expression:"ruleForm.commission_type"}},t._l(t.options.unit_enum,(function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1)],1),r("el-form-item",{attrs:{label:"最低領取數量：",prop:"lowest"}},[r("el-input",{attrs:{placeholder:"請輸入最低領取數量",clearable:""},model:{value:t.ruleForm.lowest,callback:function(e){t.$set(t.ruleForm,"lowest",e)},expression:"ruleForm.lowest"}},[r("template",{slot:"append"},[t._v("ADI")])],2)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:t.$s_size},on:{click:t.handleClose}},[t._v("取 消")]),r("el-button",{attrs:{size:t.$s_size,type:"primary"},on:{click:t.submitForm}},[t._v("確 定")])],1)],1)],1)},f=[],m=r("95d8"),p={name:"",props:{options:{type:Object,default:function(){return{}}}},data:function(){return{mode:"",dialogFormVisible:!1,ruleForm:{commission:"",lowest:"",commission_type:1},rules:{commission:[{required:!0,message:"請輸入提現手續費",trigger:"blur"}],lowest:[{required:!0,message:"請輸入最低領取數量",trigger:"blur"}]}}},computed:{},created:function(){},methods:{getData:function(){var t=this;return Object(u["a"])(Object(o["a"])().mark((function e(){var r,n;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(m["T"])();case 2:r=e.sent,n=r.data,n.commission_type&&(t.ruleForm=n);case 5:case"end":return e.stop()}}),e)})))()},handleClose:function(){this.$refs.ruleForm.resetFields(),this.dialogFormVisible=!1},submitForm:function(){var t=this;this.$refs.ruleForm.validate(function(){var e=Object(u["a"])(Object(o["a"])().mark((function e(r){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r){e.next=2;break}return e.abrupt("return",Object(l["a"])(t,"請按需求填写！"));case 2:return e.next=4,Object(m["U"])(t.ruleForm);case 4:Object(l["a"])(t,"操作成功！","success"),t.$emit("getData"),t.handleClose();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}},b=p,h=r("2877"),g=Object(h["a"])(b,d,f,!1,null,"63a4b258",null),j=g.exports,O=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-dialog",{attrs:{width:"20%","close-on-click-modal":!1,title:"自動審核","before-close":t.handleClose,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"label-position":"top",model:t.ruleForm,rules:t.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"是否開啟自動審核：",prop:"xy_trans_auto"}},[r("el-switch",{attrs:{"active-text":"開啟","inactive-text":"關閉","active-value":2,"inactive-value":1},model:{value:t.ruleForm.xy_trans_auto,callback:function(e){t.$set(t.ruleForm,"xy_trans_auto",e)},expression:"ruleForm.xy_trans_auto"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{size:t.$s_size},on:{click:t.handleClose}},[t._v("取 消")]),r("el-button",{attrs:{size:t.$s_size,type:"primary"},on:{click:t.submitForm}},[t._v("確 定")])],1)],1)],1)},w=[],x={name:"",data:function(){return{mode:"",dialogFormVisible:!1,ruleForm:{xy_trans_auto:""},rules:{xy_trans_auto:[{required:!0,message:"請選擇是否開啟自動審核",trigger:"change"}]}}},computed:{},created:function(){},methods:{getData:function(){var t=this;return Object(u["a"])(Object(o["a"])().mark((function e(){var r,n;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(m["Y"])();case 2:r=e.sent,n=r.data,t.ruleForm=n;case 5:case"end":return e.stop()}}),e)})))()},handleClose:function(){this.$refs.ruleForm.resetFields(),this.dialogFormVisible=!1},submitForm:function(){var t=this;this.$refs.ruleForm.validate(function(){var e=Object(u["a"])(Object(o["a"])().mark((function e(r){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r){e.next=2;break}return e.abrupt("return",Object(l["a"])(t,"請選擇是否開啟自動審核！"));case 2:return e.next=4,Object(m["Z"])(t.ruleForm);case 4:Object(l["a"])(t,"操作成功！","success"),t.$emit("getData"),t.handleClose();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}},y=x,v=Object(h["a"])(y,O,w,!1,null,"7d315770",null),F=v.exports,_={name:"ADICollect",components:{TablePackage:i["a"],SearchForm:c["a"],Set:j,SetAuto:F},mixins:[s["a"]],data:function(){return{loading:!1,options:{state_enum:[],type_enum:[],unit_enum:[]},searchConfig:[{key:"order_sn",type:"input",label:"領取編號",value:""},{key:"relation_addr",type:"input",label:"關聯地址",value:""},{key:"type",type:"select",label:"領取類型",value:""},{key:"create_time",type:"datetimerange",label:"领取時間",is_simple:!0,value:""},{key:"base",type:"interval",label:"領取數量",value:""},{key:"rate",type:"interval",label:"手續費",value:""},{key:"num",type:"interval",label:"實際到賬",value:""},{key:"txid",type:"input",label:"hash",value:""}],tableData:[]}},computed:{},created:function(){this.getEnum()},methods:{getEnum:function(){var t=this;return Object(u["a"])(Object(o["a"])().mark((function e(){var r,n;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(m["ab"])();case 2:r=e.sent,n=r.data,t.options.state_enum=n.xywithdraw_state,t.options.type_enum=n.xywithdraw_type,t.options.unit_enum=n.xywithdraw_commission_type;case 7:case"end":return e.stop()}}),e)})))()},getData:function(){var t=this;return Object(u["a"])(Object(o["a"])().mark((function e(){var r,n;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,Object(m["bb"])(t.getSearchOptions());case 3:r=e.sent,n=r.data,t.loading=!1,t.tableData=n.data,t.searchForm.total=n.total;case 8:case"end":return e.stop()}}),e)})))()},handlebatchClick:function(t){"set"===t?(this.$refs.Set.getData(),this.$refs.Set.dialogFormVisible=!0):"auto"===t&&(this.$refs.SetAuto.getData(),this.$refs.SetAuto.dialogFormVisible=!0)},handleClick:function(t,e){var r=this;"audit"===t&&this.$confirm("審核通過後，領取數量將發放至錢包中，請確認是否發放？","審核發放",{confirmButtonText:"通過",cancelButtonText:"拒絕",distinguishCancelAndClose:!0,type:"warning"}).then((function(){r.setPass(e)})).catch((function(t){"cancel"===t&&r.setRefuse(e)}))},setRefuse:function(t){var e=this;this.$prompt("","拒絕原因",{confirmButtonText:"確定",cancelButtonText:"取消",inputType:"textarea",inputErrorMessage:"拒絕原因不能為空",inputValidator:function(t){return t?!(t.length>30)||"限制30個字符":"拒絕原因"}}).then(function(){var r=Object(u["a"])(Object(o["a"])().mark((function r(n){var a;return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=n.value,r.next=3,Object(m["db"])({id:t.id,reason:a});case 3:Object(l["a"])(e,"操作成功！","success"),e.getData();case 5:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}()).catch((function(){}))},setPass:function(t){var e=this;return Object(u["a"])(Object(o["a"])().mark((function r(){return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.$prompt("","请输入HASH",{confirmButtonText:"確定",cancelButtonText:"取消",inputType:"textarea",inputErrorMessage:"HASH不能為空",inputValidator:function(t){return!!t||"HASH不能為空"}}).then(function(){var r=Object(u["a"])(Object(o["a"])().mark((function r(n){var a;return Object(o["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=n.value,r.next=3,Object(m["cb"])({id:t.id,hash:a});case 3:Object(l["a"])(e,"操作成功！","success"),e.getData();case 5:case"end":return r.stop()}}),r)})));return function(t){return r.apply(this,arguments)}}()).catch((function(){}));case 1:case"end":return r.stop()}}),r)})))()}}},k=_,C=Object(h["a"])(k,n,a,!1,null,"35212b84",null);e["default"]=C.exports},"95d8":function(t,e,r){"use strict";r.d(e,"mb",(function(){return a})),r.d(e,"lb",(function(){return o})),r.d(e,"kb",(function(){return u})),r.d(e,"nb",(function(){return i})),r.d(e,"q",(function(){return c})),r.d(e,"R",(function(){return s})),r.d(e,"ab",(function(){return l})),r.d(e,"h",(function(){return d})),r.d(e,"bb",(function(){return f})),r.d(e,"cb",(function(){return m})),r.d(e,"db",(function(){return p})),r.d(e,"T",(function(){return b})),r.d(e,"U",(function(){return h})),r.d(e,"Y",(function(){return g})),r.d(e,"Z",(function(){return j})),r.d(e,"hb",(function(){return O})),r.d(e,"ib",(function(){return w})),r.d(e,"jb",(function(){return x})),r.d(e,"fb",(function(){return y})),r.d(e,"gb",(function(){return v})),r.d(e,"eb",(function(){return F})),r.d(e,"y",(function(){return _})),r.d(e,"x",(function(){return k})),r.d(e,"z",(function(){return C})),r.d(e,"l",(function(){return $})),r.d(e,"a",(function(){return S})),r.d(e,"k",(function(){return D})),r.d(e,"O",(function(){return z})),r.d(e,"D",(function(){return A})),r.d(e,"A",(function(){return V})),r.d(e,"C",(function(){return T})),r.d(e,"B",(function(){return B})),r.d(e,"w",(function(){return E})),r.d(e,"p",(function(){return H})),r.d(e,"t",(function(){return P})),r.d(e,"s",(function(){return q})),r.d(e,"W",(function(){return I})),r.d(e,"n",(function(){return L})),r.d(e,"o",(function(){return R})),r.d(e,"Q",(function(){return J})),r.d(e,"g",(function(){return M})),r.d(e,"H",(function(){return N})),r.d(e,"E",(function(){return U})),r.d(e,"G",(function(){return Y})),r.d(e,"I",(function(){return Z})),r.d(e,"J",(function(){return G})),r.d(e,"F",(function(){return K})),r.d(e,"K",(function(){return Q})),r.d(e,"L",(function(){return W})),r.d(e,"M",(function(){return X})),r.d(e,"N",(function(){return tt})),r.d(e,"r",(function(){return et})),r.d(e,"S",(function(){return rt})),r.d(e,"j",(function(){return nt})),r.d(e,"i",(function(){return at})),r.d(e,"v",(function(){return ot})),r.d(e,"u",(function(){return ut})),r.d(e,"X",(function(){return it})),r.d(e,"d",(function(){return ct})),r.d(e,"b",(function(){return st})),r.d(e,"f",(function(){return lt})),r.d(e,"V",(function(){return dt})),r.d(e,"m",(function(){return ft})),r.d(e,"P",(function(){return mt})),r.d(e,"c",(function(){return pt})),r.d(e,"e",(function(){return bt}));var n=r("b775");function a(t){return Object(n["a"])({url:"xy-order/list",params:t})}function o(t){return Object(n["a"])({url:"xy-order/enums",params:t})}function u(t){return Object(n["a"])({url:"xy-order/buy-config",params:t})}function i(t){return Object(n["a"])({url:"xy-order/set-config",method:"post",data:t})}function c(t){return Object(n["a"])({url:"setting/get-person-part",params:t})}function s(t){return Object(n["a"])({url:"setting/set-person-part",method:"post",data:t})}function l(t){return Object(n["a"])({url:"xy-balance-withdraw/enums",params:t})}function d(t){return Object(n["a"])({url:"xybalance-wallet/list",params:t})}function f(t){return Object(n["a"])({url:"xy-balance-withdraw/list",params:t})}function m(t){return Object(n["a"])({url:"xy-balance-withdraw/pass",method:"post",data:t})}function p(t){return Object(n["a"])({url:"xy-balance-withdraw/reject",method:"post",data:t})}function b(t){return Object(n["a"])({url:"setting/get-xy-draw-rate",params:t})}function h(t){return Object(n["a"])({url:"setting/set-xy-draw-rate",method:"post",data:t})}function g(t){return Object(n["a"])({url:"xy-balance-withdraw/auto-get",params:t})}function j(t){return Object(n["a"])({url:"xy-balance-withdraw/auto-set",method:"post",data:t})}function O(t){return Object(n["a"])({url:"xy-fenrun-rule/enums",params:t})}function w(t){return Object(n["a"])({url:"xy-fenrun-rule/list",params:t})}function x(t){return Object(n["a"])({url:"xy-fenrun-rule/set",method:"post",data:t})}function y(t){return Object(n["a"])({url:"xy-fenrun-items/enums",params:t})}function v(t){return Object(n["a"])({url:"xy-fenrun-items/list",params:t})}function F(t){return Object(n["a"])({url:"xy-fenrun-items/detail",params:t})}function _(t){return Object(n["a"])({url:"ipo-order/list",params:t})}function k(t){return Object(n["a"])({url:"ipo-order/config",params:t})}function C(t){return Object(n["a"])({url:"ipo-order/set",method:"post",data:t})}function $(t){return Object(n["a"])({url:"setting/get-xy-acc",params:t})}function S(t){return Object(n["a"])({url:"setting/add-xy-acc",method:"post",data:t})}function D(t){return Object(n["a"])({url:"setting/del-xy-acc",method:"post",data:t})}function z(t){return Object(n["a"])({url:"setting/set-xy-acc",method:"post",data:t})}function A(t){return Object(n["a"])({url:"xy-nodes/list",params:t})}function V(t){return Object(n["a"])({url:"xy-nodes/add",method:"post",data:t})}function T(t){return Object(n["a"])({url:"xy-nodes/edit",method:"post",data:t})}function B(t){return Object(n["a"])({url:"xy-nodes/del",params:t})}function E(t){return Object(n["a"])({url:"ipo-awards/list",params:t})}function H(t){return Object(n["a"])({url:"xybalance-wallet/get-income-distribute",params:t})}function P(t){return Object(n["a"])({url:"xybalance-wallet/get-withdraw-log",params:t})}function q(t){return Object(n["a"])({url:"xybalance-wallet/get-resource-log",params:t})}function I(t){return Object(n["a"])({url:"user/adi-group",params:t})}function L(t){return Object(n["a"])({url:"user/adi-get-direct-by-id",params:t})}function R(t){return Object(n["a"])({url:"setting/get-huilv",params:t})}function J(t){return Object(n["a"])({url:"setting/set-huilv",method:"post",data:t})}function M(t){return Object(n["a"])({url:"ipo-awards/enum",params:t})}function N(t){return Object(n["a"])({url:"resource-config/list",params:t})}function U(t){return Object(n["a"])({url:"resource-config/add",method:"post",data:t})}function Y(t){return Object(n["a"])({url:"resource-config/edit",method:"post",data:t})}function Z(t){return Object(n["a"])({url:"resource-config/on",params:t})}function G(t){return Object(n["a"])({url:"resource-config/sort",params:t})}function K(t){return Object(n["a"])({url:"resource-config/del",params:t})}function Q(t){return Object(n["a"])({url:"xy-resource-withdraw/enums",params:t})}function W(t){return Object(n["a"])({url:"xy-resource-withdraw/list",params:t})}function X(t){return Object(n["a"])({url:"xy-resource-withdraw/pass",method:"post",data:t})}function tt(t){return Object(n["a"])({url:"xy-resource-withdraw/reject",method:"post",data:t})}function et(t){return Object(n["a"])({url:"setting/get-resource-draw-rate",params:t})}function rt(t){return Object(n["a"])({url:"setting/set-resource-draw-rate",method:"post",data:t})}function nt(t){return Object(n["a"])({url:"callback/list",params:t})}function at(t){return Object(n["a"])({url:"callback/enums",params:t})}function ot(t){return Object(n["a"])({url:"xy-index/stat",params:t})}function ut(t){return Object(n["a"])({url:"xy-index/enums",params:t})}function it(t){return Object(n["a"])({url:"xybalance-wallet/upper",params:t})}function ct(t){return Object(n["a"])({url:"adi2dot-exchange/list",params:t})}function st(t){return Object(n["a"])({url:"adi2dot-exchange/enums",params:t})}function lt(t){return Object(n["a"])({url:"adi2dot-user/switch",params:t})}function dt(t){return Object(n["a"])({url:"adi2dot-user/update-exchange-quota",method:"post",data:t})}function ft(t){return Object(n["a"])({url:"setting/get-adi-system",params:t})}function mt(t){return Object(n["a"])({url:"setting/set-adi-system",method:"post",data:t})}function pt(t){return Object(n["a"])({url:"adi2dot-exchange/get-switch",params:t})}function bt(t){return Object(n["a"])({url:"adi2dot-exchange/set-switch",method:"post",data:t})}},c6e7:function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));var n={data:function(){return{searchShow:!0,options:{},searchForm:{page:1,page_size:10,total:0},selectList:[],message:{},eventEnum:{del:"onDel",add:"onAdd",edit:"onEdit",batchDel:"onBatchDel"}}},methods:{getSearchOptions:function(){return this.$refs.searchForm?Object.assign({},this.searchForm,this.$refs.searchForm.searchForm):this.searchForm},onInit:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this.$refs.searchForm?this.$refs.searchForm.searchForm:{},r=Object.assign({},t,this.$options.data().searchForm,e);this.searchForm=r,this.getData()},onSearch:function(){this.searchForm.page=1,this.getData()},onCancel:function(){this.isShow=!1},handleSelectionChange:function(t){this.selectList=t},handleCurrentChange:function(t){this.loading=!0,this.searchForm.page=t,this.getData()}}}}}]);