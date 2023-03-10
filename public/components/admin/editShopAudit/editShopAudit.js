(function(vc,vm){

    vc.extends({
        data:{
            editShopAuditInfo:{
                auditId:'',
auditId:'',
shopId:'',
shopLogo:'',
storeId:'',
shopName:'',
shopDesc:'',
mapX:'',
mapY:'',
sendAddress:'',
returnAddress:'',
returnPerson:'',
returnLink:'',
state:'',
shopType:'',
openType:'',
areaCode:'',
auditOpinion:'',
applyOpinion:'',
statusCd:'',

            }
        },
         _initMethod:function(){

         },
         _initEvent:function(){
             vc.on('editShopAudit','openEditShopAuditModal',function(_params){
                vc.component.refreshEditShopAuditInfo();
                $('#editShopAuditModel').modal('show');
                vc.copyObject(_params, vc.component.editShopAuditInfo );
                vc.component.editShopAuditInfo.caId = vc.getCurrentCommunity().caId;
            });
        },
        methods:{
            editShopAuditValidate:function(){
                        return vc.validate.validate({
                            editShopAuditInfo:vc.component.editShopAuditInfo
                        },{
                            'editShopAuditInfo.auditId':[
{
                            limit:"required",
                            param:"",
                            errInfo:"审核ID不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"30",
                            errInfo:"审核ID不能超过30"
                        },
                    ],
'editShopAuditInfo.shopId':[
{
                            limit:"required",
                            param:"",
                            errInfo:"店铺ID不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"30",
                            errInfo:"店铺ID不能超过30"
                        },
                    ],
'editShopAuditInfo.shopLogo':[
{
                            limit:"required",
                            param:"",
                            errInfo:"店铺logo不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"1024",
                            errInfo:"店铺logo不能超过1024"
                        },
                    ],
'editShopAuditInfo.storeId':[
{
                            limit:"required",
                            param:"",
                            errInfo:"商户ID不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"30",
                            errInfo:"商户ID不能超过30"
                        },
                    ],
'editShopAuditInfo.shopName':[
{
                            limit:"required",
                            param:"",
                            errInfo:"店铺名称不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"128",
                            errInfo:"店铺名称不能超过128"
                        },
                    ],
'editShopAuditInfo.shopDesc':[
{
                            limit:"required",
                            param:"",
                            errInfo:"店铺描述不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"512",
                            errInfo:"店铺描述不能超过512"
                        },
                    ],
'editShopAuditInfo.mapX':[
{
                            limit:"required",
                            param:"",
                            errInfo:"地区不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"20",
                            errInfo:"地区不能超过20"
                        },
                    ],
'editShopAuditInfo.mapY':[
{
                            limit:"required",
                            param:"",
                            errInfo:"地区不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"20",
                            errInfo:"地区不能超过20"
                        },
                    ],
'editShopAuditInfo.sendAddress':[
{
                            limit:"required",
                            param:"",
                            errInfo:"发货地址不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"512",
                            errInfo:"发货地址不能超过512"
                        },
                    ],
'editShopAuditInfo.returnAddress':[
{
                            limit:"required",
                            param:"",
                            errInfo:"退货地址不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"512",
                            errInfo:"退货地址不能超过512"
                        },
                    ],
'editShopAuditInfo.returnPerson':[
{
                            limit:"required",
                            param:"",
                            errInfo:"退货联系人不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"512",
                            errInfo:"退货联系人不能超过512"
                        },
                    ],
'editShopAuditInfo.returnLink':[
{
                            limit:"required",
                            param:"",
                            errInfo:"退货联系电话不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"11",
                            errInfo:"退货联系电话不能超过11"
                        },
                    ],
'editShopAuditInfo.state':[
{
                            limit:"required",
                            param:"",
                            errInfo:"状态不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"12",
                            errInfo:"状态不能超过12"
                        },
                    ],
'editShopAuditInfo.shopType':[
{
                            limit:"required",
                            param:"",
                            errInfo:"店铺类型不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"30",
                            errInfo:"店铺类型不能超过30"
                        },
                    ],
'editShopAuditInfo.openType':[
{
                            limit:"required",
                            param:"",
                            errInfo:"开店类型不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"2",
                            errInfo:"开店类型不能超过2"
                        },
                    ],
'editShopAuditInfo.areaCode':[
{
                            limit:"required",
                            param:"",
                            errInfo:"地域编码不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"12",
                            errInfo:"地域编码不能超过12"
                        },
                    ],
'editShopAuditInfo.auditOpinion':[
{
                            limit:"required",
                            param:"",
                            errInfo:"审核意见不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"300",
                            errInfo:"审核意见不能超过300"
                        },
                    ],
'editShopAuditInfo.applyOpinion':[
{
                            limit:"required",
                            param:"",
                            errInfo:"申请原因不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"300",
                            errInfo:"申请原因不能超过300"
                        },
                    ],
'editShopAuditInfo.statusCd':[
{
                            limit:"required",
                            param:"",
                            errInfo:"数据状态不能为空"
                        },
 {
                            limit:"maxLength",
                            param:"2",
                            errInfo:"数据状态不能超过2"
                        },
                    ],
'editShopAuditInfo.auditId':[
{
                            limit:"required",
                            param:"",
                            errInfo:"审核店铺ID不能为空"
                        }]

                        });
             },
            editShopAudit:function(){
                if(!vc.component.editShopAuditValidate()){
                    vc.toast(vc.validate.errInfo);
                    return ;
                }

                vc.http.apiPost(
                    '/shopAudit/updateShopAudit',
                    JSON.stringify(vc.component.editShopAuditInfo),
                    {
                        emulateJSON:true
                     },
                     function(json,res){
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //关闭model
                            $('#editShopAuditModel').modal('hide');
                             vc.emit('shopAuditManage','listShopAudit',{});
                            return ;
                        }
                        vc.message(_json.msg);
                     },
                     function(errInfo,error){
                        console.log('请求失败处理');

                        vc.message(errInfo);
                     });
            },
            refreshEditShopAuditInfo:function(){
                vc.component.editShopAuditInfo= {
                  auditId:'',
auditId:'',
shopId:'',
shopLogo:'',
storeId:'',
shopName:'',
shopDesc:'',
mapX:'',
mapY:'',
sendAddress:'',
returnAddress:'',
returnPerson:'',
returnLink:'',
state:'',
shopType:'',
openType:'',
areaCode:'',
auditOpinion:'',
applyOpinion:'',
statusCd:'',

                }
            }
        }
    });

})(window.vc,window.vc.component);
