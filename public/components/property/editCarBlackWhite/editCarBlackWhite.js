(function (vc, vm) {
    vc.extends({
        data: {
            editCarBlackWhiteInfo: {
                bwId: '',
                blackWhite: '',
                carNum: '',
                startTime: '',
                endTime: ''
            }
        },
        _initMethod: function () {
            vc.component._initEditCarBlackWhiteDateInfo();
        },
        _initEvent: function () {
            vc.on('editCarBlackWhite', 'openEditCarBlackWhiteModal',
                function (_params) {
                    vc.component.refreshEditCarBlackWhiteInfo();
                    $('#editCarBlackWhiteModel').modal('show');
                    vc.copyObject(_params, vc.component.editCarBlackWhiteInfo);
                    vc.component.editCarBlackWhiteInfo.communityId = vc.getCurrentCommunity().communityId;
                });
        },
        methods: {
            _initEditCarBlackWhiteDateInfo: function () {
                vc.component.editCarBlackWhiteInfo.startTime = vc.dateTimeFormat(new Date().getTime());
                $('.editCarBlackWhiteStartTime').datetimepicker({
                    language: 'zh-CN',
                    fontAwesome: 'fa',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.editCarBlackWhiteStartTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".editCarBlackWhiteStartTime").val();
                        vc.component.editCarBlackWhiteInfo.startTime = value;
                    });
                $('.editCarBlackWhiteEndTime').datetimepicker({
                    language: 'zh-CN',
                    fontAwesome: 'fa',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.editCarBlackWhiteEndTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".editCarBlackWhiteEndTime").val();
                        var start = Date.parse(new Date(vc.component.editCarBlackWhiteInfo.startTime))
                        var end = Date.parse(new Date(value))
                        if (start - end >= 0) {
                            vc.toast("????????????????????????????????????")
                            $(".editCarBlackWhiteEndTime").val('')
                        } else {
                            vc.component.editCarBlackWhiteInfo.endTime = value;
                        }
                    });
                //??????????????????????????????????????????
                document.getElementsByClassName('form-control editCarBlackWhiteStartTime')[0].addEventListener('click', myfunc)

                function myfunc(e) {
                    e.currentTarget.blur();
                }

                document.getElementsByClassName("form-control editCarBlackWhiteEndTime")[0].addEventListener('click', myfunc)

                function myfunc(e) {
                    e.currentTarget.blur();
                }
            },
            editCarBlackWhiteValidate: function () {
                return vc.validate.validate({
                    editCarBlackWhiteInfo: vc.component.editCarBlackWhiteInfo
                }, {
                    'editCarBlackWhiteInfo.blackWhite': [
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
                    'editCarBlackWhiteInfo.carNum': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "?????????????????????"
                        },
                        {
                            limit: "maxin",
                            param: "1,12",
                            errInfo: "???????????????12???"
                        },
                    ],
                    'editCarBlackWhiteInfo.startTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "???????????????????????????"
                        },
                    ],
                    'editCarBlackWhiteInfo.endTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "???????????????????????????"
                        },
                    ],
                    'editCarBlackWhiteInfo.bwId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????ID????????????"
                        }
                    ]
                });
            },
            editCarBlackWhite: function () {
                vc.component.editCarBlackWhiteInfo.communityId = vc.getCurrentCommunity().communityId;
                if (!vc.component.editCarBlackWhiteValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.http.apiPost('/carBlackWhite.updateCarBlackWhite', JSON.stringify(vc.component.editCarBlackWhiteInfo), {
                        emulateJSON: true
                    },
                    function (json, res) {
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //??????model
                            $('#editCarBlackWhiteModel').modal('hide');
                            vc.emit('carBlackWhiteManage', 'listCarBlackWhite', {});
                            vc.toast("????????????");
                            return;
                        } else {
                            vc.toast(_json.msg);
                        }
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                        vc.toast(errInfo);
                    });
            },
            refreshEditCarBlackWhiteInfo: function () {
                vc.component.editCarBlackWhiteInfo = {
                    bwId: '',
                    blackWhite: '',
                    carNum: '',
                    startTime: '',
                    endTime: ''
                }
            }
        }
    });
})(window.vc, window.vc.component);