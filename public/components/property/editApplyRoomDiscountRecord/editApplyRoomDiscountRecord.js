(function (vc, vm) {
    vc.extends({
        data: {
            editApplyRoomDiscountRecordInfo: {
                ardId: '',
                roomName: '',
                roomId: '',
                discountId: '',
                discountName: '',
                applyTypeName: '',
                createUserName: '',
                createUserTel: '',
                startTime: '',
                endTime: '',
                stateName: '',
                state: '',
                applyRoomDiscountRecords: [],
                communityId: ''
            }
        },
        _initMethod: function () {
            $that._initEditApplyRoomDiscountRecordInfo();
        },
        _initEvent: function () {
            vc.on('editApplyRoomDiscountRecord', 'openEditApplyRoomDiscountRecordModal', function (_params) {
                vc.component.refreshEditApplyRoomDiscountRecordInfo();
                $('#editApplyRoomDiscountRecordModel').modal('show');
                vc.copyObject(_params, vc.component.editApplyRoomDiscountRecordInfo);
                vc.component.editApplyRoomDiscountRecordInfo.communityId = vc.getCurrentCommunity().communityId;
            });
        },
        methods: {
            _initEditApplyRoomDiscountRecordInfo: function () {
                $('.startTime').datetimepicker({
                    minView: "month",
                    language: 'zh-CN',
                    fontAwesome: 'fa',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.startTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".startTime").val();
                        var start = Date.parse(new Date(value));
                        var end = Date.parse(new Date(vc.component.editApplyRoomDiscountRecordInfo.endTime));
                        if (start - end >= 0) {
                            vc.toast("????????????????????????????????????????????????");
                            $(".startTime").val('');
                            vc.component.editApplyRoomDiscountRecordInfo.startTime = "";
                        } else {
                            vc.component.editApplyRoomDiscountRecordInfo.startTime = value;
                        }
                    });
                $('.endTime').datetimepicker({
                    minView: "month",
                    language: 'zh-CN',
                    fontAwesome: 'fa',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.endTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".endTime").val();
                        var start = Date.parse(new Date(vc.component.editApplyRoomDiscountRecordInfo.startTime));
                        var end = Date.parse(new Date(value));
                        if (start - end >= 0) {
                            vc.toast("??????????????????????????????????????????");
                            $(".endTime").val('');
                            vc.component.editApplyRoomDiscountRecordInfo.endTime = "";
                        } else {
                            vc.component.editApplyRoomDiscountRecordInfo.endTime = value;
                        }
                    });
                //??????????????????????????????????????????
                document.getElementsByClassName('form-control startTime')[0].addEventListener('click', myfunc)

                function myfunc(e) {
                    e.currentTarget.blur();
                }

                document.getElementsByClassName("form-control endTime")[0].addEventListener('click', myfunc)

                function myfunc(e) {
                    e.currentTarget.blur();
                }
            },
            editApplyRoomDiscountRecordValidate: function () {
                return vc.validate.validate({
                    editApplyRoomDiscountRecordInfo: vc.component.editApplyRoomDiscountRecordInfo
                }, {
                    'editApplyRoomDiscountRecordInfo.ardId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????id????????????"
                        }
                    ],
                    'editApplyRoomDiscountRecordInfo.roomName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????"
                        }
                    ],
                    'editApplyRoomDiscountRecordInfo.applyTypeName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        }
                    ],
                    'editApplyRoomDiscountRecordInfo.createUserName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "?????????????????????"
                        }
                    ],
                    'editApplyRoomDiscountRecordInfo.startTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        }
                    ],
                    'editApplyRoomDiscountRecordInfo.endTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        }
                    ],
                    'editApplyRoomDiscountRecordInfo.stateName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????"
                        }
                    ]
                });
            },
            editApplyRoomDiscountRecord: function () {
                if (!vc.component.editApplyRoomDiscountRecordValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.http.apiPost(
                    '/applyRoomDiscount/editApplyRoomDiscount',
                    JSON.stringify(vc.component.editApplyRoomDiscountRecordInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //??????model
                            $('#editApplyRoomDiscountRecordModel').modal('hide');
                            vc.emit('applyRoomDiscountManage', 'listApplyRoomDiscount', {});
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
            refreshEditApplyRoomDiscountRecordInfo: function () {
                vc.component.editApplyRoomDiscountRecordInfo = {
                    ardId: '',
                    roomName: '',
                    roomId: '',
                    discountId: '',
                    discountName: '',
                    applyTypeName: '',
                    createUserName: '',
                    createUserTel: '',
                    startTime: '',
                    endTime: '',
                    stateName: '',
                    state: '',
                    applyRoomDiscountRecords: [],
                    communityId: ''
                }
            }
        }
    });
})(window.vc, window.vc.component);
