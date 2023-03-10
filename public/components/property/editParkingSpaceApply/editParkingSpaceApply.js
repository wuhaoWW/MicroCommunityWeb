(function (vc, vm) {
    vc.extends({
        data: {
            editParkingSpaceApplyInfo: {
                applyId: '',
                carNum: '',
                carBrand: '',
                carType: '',
                carColor: '',
                startTime: '',
                endTime: '',
                applyPersonName: '',
                applyPersonLink: '',
                applyPersonId: '',
                state: '1001',
                remark: ''
            }
        },
        _initMethod: function () {
            $('.editStartTime').datetimepicker({
                language: 'zh-CN',
                fontAwesome: 'fa',
                format: 'yyyy-mm-dd hh:ii:ss',
                initTime: true,
                initialDate: new Date(),
                autoClose: 1,
                todayBtn: true
            });
            $('.editStartTime').datetimepicker()
                .on('changeDate', function (ev) {
                    var value = $(".editStartTime").val();
                    vc.component.editParkingSpaceApplyInfo.startTime = value;
                });
            $('.editEndTime').datetimepicker({
                language: 'zh-CN',
                fontAwesome: 'fa',
                format: 'yyyy-mm-dd hh:ii:ss',
                initTime: true,
                initialDate: new Date(),
                autoClose: 1,
                todayBtn: true
            });
            $('.editEndTime').datetimepicker()
                .on('changeDate', function (ev) {
                    var value = $(".editEndTime").val();
                    vc.component.editParkingSpaceApplyInfo.endTime = value;
                });
        },
        _initEvent: function () {
            vc.on('editParkingSpaceApply', 'openEditParkingSpaceApplyModal', function (_params) {
                vc.component.refreshEditParkingSpaceApplyInfo();
                $('#editParkingSpaceApplyModel').modal('show');
                vc.copyObject(_params, vc.component.editParkingSpaceApplyInfo);
                vc.component.editParkingSpaceApplyInfo.communityId = vc.getCurrentCommunity().communityId;
            });
        },
        methods: {
            editParkingSpaceApplyValidate: function () {
                return vc.validate.validate({
                    editParkingSpaceApplyInfo: vc.component.editParkingSpaceApplyInfo
                }, {
                    'editParkingSpaceApplyInfo.carNum': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "?????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "12",
                            errInfo: "?????????????????????12???"
                        }
                    ],
                    'editParkingSpaceApplyInfo.carBrand': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "50",
                            errInfo: "????????????????????????50???"
                        }
                    ],
                    'editParkingSpaceApplyInfo.carType': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "????????????????????????"
                        }
                    ],
                    'editParkingSpaceApplyInfo.carColor': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "12",
                            errInfo: "????????????"
                        }
                    ],
                    'editParkingSpaceApplyInfo.startTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "????????????????????????"
                        }
                    ],
                    'editParkingSpaceApplyInfo.endTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "????????????????????????"
                        }
                    ],
                    'editParkingSpaceApplyInfo.applyPersonName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "?????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "?????????????????????"
                        }
                    ],
                    'editParkingSpaceApplyInfo.applyPersonLink': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "???????????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "11",
                            errInfo: "???????????????????????????11???"
                        }
                    ],
                    'editParkingSpaceApplyInfo.applyPersonId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "?????????ID????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "30",
                            errInfo: "??????????????????ID??????"
                        }
                    ],
                    'editParkingSpaceApplyInfo.state': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "????????????????????????"
                        }
                    ],
                    'editParkingSpaceApplyInfo.remark': [
                        {
                            limit: "maxLength",
                            param: "300",
                            errInfo: "???????????????"
                        }
                    ],
                    'editParkingSpaceApplyInfo.applyId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????ID????????????"
                        }
                    ]
                });
            },
            editParkingSpaceApply: function () {
                if (!vc.component.editParkingSpaceApplyValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.http.apiPost(
                    'parkingSpaceApply.updateParkingSpaceApply',
                    JSON.stringify(vc.component.editParkingSpaceApplyInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //??????model
                            $('#editParkingSpaceApplyModel').modal('hide');
                            vc.emit('parkingSpaceApplyManage', 'listParkingSpaceApply', {});
                            vc.toast("????????????");
                            return;
                        } else {
                            vc.toast(_json.msg);
                        }
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                        vc.message(errInfo);
                    });
            },
            refreshEditParkingSpaceApplyInfo: function () {
                vc.component.editParkingSpaceApplyInfo = {
                    applyId: '',
                    carNum: '',
                    carBrand: '',
                    carType: '',
                    carColor: '',
                    startTime: '',
                    endTime: '',
                    applyPersonName: '',
                    applyPersonLink: '',
                    applyPersonId: '',
                    state: '1001',
                    remark: ''
                }
            }
        }
    });
})(window.vc, window.vc.component);
