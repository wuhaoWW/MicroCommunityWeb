(function (vc, vm) {
    vc.extends({
        data: {
            editMeterWaterInfo: {
                waterId: '',
                meterType: '',
                preDegrees: '',
                curDegrees: '',
                preReadingTime: '',
                curReadingTime: '',
                remark: ''
            }
        },
        _initMethod: function () {
            $that._initEditMeterWaterDateInfo();
        },
        _initEvent: function () {
            vc.on('editMeterWater', 'openEditMeterWaterModal', function (_params) {
                vc.component.refreshEditMeterWaterInfo();
                $('#editMeterWaterModel').modal('show');
                vc.copyObject(_params, vc.component.editMeterWaterInfo);
                vc.component.editMeterWaterInfo.communityId = vc.getCurrentCommunity().communityId;
            });
        },
        methods: {
            _initEditMeterWaterDateInfo: function () {
                $('.editPreReadingTime').datetimepicker({
                    language: 'zh-CN',
                    fontAwesome: 'fa',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.editPreReadingTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".editPreReadingTime").val();
                        vc.component.editMeterWaterInfo.preReadingTime = value;
                    });
                $('.editCurReadingTime').datetimepicker({
                    language: 'zh-CN',
                    fontAwesome: 'fa',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.editCurReadingTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".editCurReadingTime").val();
                        var start = Date.parse(new Date(vc.component.editMeterWaterInfo.preReadingTime))
                        var end = Date.parse(new Date(value))
                        if (start - end >= 0) {
                            vc.toast("????????????????????????????????????????????????")
                            $(".addCurReadingTime").val('')
                        } else {
                            vc.component.editMeterWaterInfo.curReadingTime = value;
                        }
                    });
                //??????????????????????????????????????????
                document.getElementsByClassName('form-control editPreReadingTime')[0].addEventListener('click', myfunc)

                function myfunc(e) {
                    e.currentTarget.blur();
                }

                document.getElementsByClassName("form-control editCurReadingTime")[0].addEventListener('click', myfunc)

                function myfunc(e) {
                    e.currentTarget.blur();
                }
            },
            editMeterWaterValidate: function () {
                return vc.validate.validate({
                    editMeterWaterInfo: vc.component.editMeterWaterInfo
                }, {
                    'editMeterWaterInfo.meterType': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "?????????????????????"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "???????????????"
                        }
                    ],
                    'editMeterWaterInfo.preDegrees': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "money",
                            param: "",
                            errInfo: "????????????????????????"
                        }
                    ],
                    'editMeterWaterInfo.curDegrees': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "money",
                            param: "",
                            errInfo: "????????????????????????"
                        }
                    ],
                    'editMeterWaterInfo.preReadingTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????????????????"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "??????????????????????????????"
                        }
                    ],
                    'editMeterWaterInfo.curReadingTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????????????????"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "??????????????????????????????"
                        }
                    ],
                    'editMeterWaterInfo.remark': [
                        {
                            limit: "maxLength",
                            param: "500",
                            errInfo: "??????????????????"
                        }
                    ],
                    'editMeterWaterInfo.waterId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "???ID????????????"
                        }
                    ]
                });
            },
            editMeterWater: function () {
                if (!vc.component.editMeterWaterValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.http.apiPost(
                    'meterWater.updateMeterWater',
                    JSON.stringify(vc.component.editMeterWaterInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //??????model
                            $('#editMeterWaterModel').modal('hide');
                            vc.emit('meterWaterManage', 'listMeterWater', {});
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
            getChange: function () {
                //????????????
                var preDegrees = parseFloat(vc.component.editMeterWaterInfo.preDegrees);
                //????????????
                var curDegrees = parseFloat(vc.component.editMeterWaterInfo.curDegrees);
                if (preDegrees > curDegrees) {
                    vc.toast("???????????????????????????????????????");
                    vc.component.editMeterWaterInfo.curDegrees = "";
                }
            },
            refreshEditMeterWaterInfo: function () {
                vc.component.editMeterWaterInfo = {
                    waterId: '',
                    meterType: '',
                    preDegrees: '',
                    curDegrees: '',
                    preReadingTime: '',
                    curReadingTime: '',
                    remark: ''
                }
            }
        }
    });
})(window.vc, window.vc.component);
