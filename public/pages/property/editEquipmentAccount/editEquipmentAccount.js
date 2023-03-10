(function (vc) {

    vc.extends({
        data: {
            editEquipmentAccountInfo: {
                machineId: '',
                machineName: '',
                machineCode: '',
                brand: '',
                model: '',
                typeId: '',
                locationDetail: '',
                locationObjId: '',
                locationObjName: '',
                firstEnableTime: '',
                warrantyDeadline: '',
                usefulLife: '',
                importanceLevel: '',
                importanceLevels:[],
                state: '',
                purchasePrice: '',
                netWorth: '',
                useOrgId: "",
                useOrgName: "",
                useUserId: "",
                useUserName: "",
                useUseTel: "",
                chargeOrgId: "",
                chargeOrgName: "",
                chargeOrgTel: "",
                chargeUseId: "",
                chargeUseName: "",
                remark: '',
                useStatus:[]
            },
        },
        _initMethod: function () {

            $that.editEquipmentAccountInfo.machineId = vc.getParam('machineId');
            vc.getDict('equipment_account', "importance_level", function (_data) {
                vc.component.editEquipmentAccountInfo.importanceLevels = _data;
            });
            vc.getDict('equipment_account', "state", function (_data) {
                vc.component.editEquipmentAccountInfo.useStatus = _data;
            });
            vc.component._initAddEquipmentAccountInfo();
            $that._listEquipmentAccounts();
        },
        _initEvent: function () {
            
        },
        methods: {
            _initAddEquipmentAccountInfo: function () {
                $('.addFirstEnableTime').datetimepicker({
                    minView: "month",
                    language: 'zh-CN',
                    fontAwesome: 'fa',
                    format: 'yyyy-mm-dd',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.addFirstEnableTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".addFirstEnableTime").val();
                        vc.component.editEquipmentAccountInfo.firstEnableTime = value;
                    });
                $('.addWarrantyDeadlineE').datetimepicker({
                    language: 'zh-CN',
                    fontAwesome: 'fa',
                    format: 'yyyy-mm-dd',
                    initTime: true,
                    minView: 'month',
                    autoClose: 1,
                    todayBtn: true
                });
                $('.addWarrantyDeadlineE').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".addWarrantyDeadlineE").val();
                        vc.component.editEquipmentAccountInfo.warrantyDeadline = value;
                    });
            },

            editEquipmentAccountValidate() {
                return vc.validate.validate({
                    editEquipmentAccountInfo: vc.component.editEquipmentAccountInfo
                }, {
                    'editEquipmentAccountInfo.machineName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "100",
                            errInfo: "????????????????????????64"
                        },
                    ],
                    'editEquipmentAccountInfo.machineCode': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "100",
                            errInfo: "????????????????????????64"
                        },
                    ],
                    'editEquipmentAccountInfo.brand': [
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "????????????????????????32"
                        },
                    ],
                    'editEquipmentAccountInfo.model': [
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "????????????????????????32"
                        },
                    ],
                    'editEquipmentAccountInfo.locationDetail': [
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "????????????????????????150"
                        },
                    ],
                    'editEquipmentAccountInfo.firstEnableTime': [
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "??????????????????????????????150"
                        },
                    ],
                    'editEquipmentAccountInfo.warrantyDeadline': [
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "??????????????????????????????150"
                        },
                    ],
                    'editEquipmentAccountInfo.importanceLevel': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                    ],
                    'editEquipmentAccountInfo.state': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                    ],
                    'editEquipmentAccountInfo.purchasePrice': [
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "????????????????????????8"
                        },
                    ],
                    'editEquipmentAccountInfo.netWorth': [
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "????????????????????????8"
                        },
                    ],
                    'editEquipmentAccountInfo.remark': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "??????????????????200"
                        },
                    ],
                });
            },
            saveEquipmentAccountInfo: function () {
                if (!vc.component.editEquipmentAccountValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.component.editEquipmentAccountInfo.communityId = vc.getCurrentCommunity().communityId;
                vc.http.apiPost(
                    '/equipmentAccount.updateEquipmentAccount',
                    JSON.stringify(vc.component.editEquipmentAccountInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        let _json = JSON.parse(json);
                        vc.toast(_json.msg);

                        if (_json.code == 0) {
                            //??????model
                            vc.goBack();
                            return;
                        }
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');

                        vc.toast(errInfo);

                    });
            },
            _listEquipmentAccounts: function (_page, _row) {
               
                let param = {
                    params: {
                        page:1,
                        row:1,
                        communityId:vc.getCurrentCommunity().communityId,
                        machineId:$that.editEquipmentAccountInfo.machineId
                    }
                };
                //??????get??????
                vc.http.apiGet('/equipmentAccount.listEquipmentAccount',
                    param,
                    function (json, res) {
                        let _equipmentAccountManageInfo = JSON.parse(json);
                        vc.copyObject(_equipmentAccountManageInfo.data[0],$that.editEquipmentAccountInfo);
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
        }
    });

})(window.vc);
