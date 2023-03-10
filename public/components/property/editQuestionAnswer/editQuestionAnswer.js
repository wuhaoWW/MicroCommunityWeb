(function (vc, vm) {
    vc.extends({
        data: {
            editQuestionAnswerInfo: {
                qaId: '',
                qaType: '',
                qaName: '',
                startTime: '',
                endTime: '',
                remark: '',
                content: '',
                photos: []
            }
        },
        _initMethod: function () {
            vc.component._initQuestionDate();
        },
        _initEvent: function () {
            vc.on('editQuestionAnswer', 'openEditQuestionAnswerModal', function (_params) {
                vc.component.refreshEditQuestionAnswerInfo();
                $('#editQuestionAnswerModel').modal('show');
                vc.copyObject(_params, vc.component.editQuestionAnswerInfo);
                vc.component.editQuestionAnswerInfo.photos = _params.fileUrls;
                if (_params.fileUrls) {
                    vc.component._freshPhoto(vc.component.editQuestionAnswerInfo.photos);
                }
                vc.component.editQuestionAnswerInfo.communityId = vc.getCurrentCommunity().communityId;
            });
            vc.on("editQuestionAnswer", "notifyUploadImage", function (_param) {
                if (_param.length > 0) {
                    vc.component.editQuestionAnswerInfo.photos = [];
                    _param.forEach((item) => {
                        vc.component.editQuestionAnswerInfo.photos.push(item.fileId);
                    })
                }else{
                    vc.component.editQuestionAnswerInfo.photos = [];
                }
            });
        },
        methods: {
            _initQuestionDate: function () {
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
                        vc.component.editQuestionAnswerInfo.startTime = value;
                        let start = Date.parse(new Date(vc.component.editQuestionAnswerInfo.startTime))
                        let end = Date.parse(new Date(vc.component.editQuestionAnswerInfo.endTime))
                        if (end != 0 && start - end >= 0) {
                            vc.toast("????????????????????????????????????")
                            vc.component.editQuestionAnswerInfo.startTime = '';
                        }
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
                        vc.component.editQuestionAnswerInfo.endTime = value;
                        let start = Date.parse(new Date(vc.component.editQuestionAnswerInfo.startTime))
                        let end = Date.parse(new Date(vc.component.editQuestionAnswerInfo.endTime))
                        if (start - end >= 0) {
                            vc.toast("????????????????????????????????????")
                            vc.component.editQuestionAnswerInfo.endTime = '';
                        }
                    });
                //??????????????????????????????????????????
                document.getElementsByClassName('form-control editStartTime')[0].addEventListener('click', myfunc)

                function myfunc(e) {
                    e.currentTarget.blur();
                }

                document.getElementsByClassName("form-control editEndTime")[0].addEventListener('click', myfunc)

                function myfunc(e) {
                    e.currentTarget.blur();
                }
            },
            editQuestionAnswerValidate: function () {
                return vc.validate.validate({
                    editQuestionAnswerInfo: vc.component.editQuestionAnswerInfo
                }, {
                    'editQuestionAnswerInfo.qaType': [
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
                    'editQuestionAnswerInfo.qaName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "256",
                            errInfo: "??????????????????"
                        },
                    ],
                    'editQuestionAnswerInfo.startTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "datetime",
                            param: "",
                            errInfo: "??????????????????"
                        },
                    ],
                    'editQuestionAnswerInfo.endTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "datetime",
                            param: "",
                            errInfo: "??????????????????"
                        },
                    ],
                    'editQuestionAnswerInfo.remark': [
                        {
                            limit: "maxLength",
                            param: "512",
                            errInfo: "????????????"
                        },
                    ],
                    'editQuestionAnswerInfo.qaId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????ID????????????"
                        }
                    ]
                });
            },
            editQuestionAnswer: function () {
                if (!vc.component.editQuestionAnswerValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.http.apiPost(
                    '/questionAnswer/updateQuestionAnswer',
                    JSON.stringify(vc.component.editQuestionAnswerInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //??????model
                            $('#editQuestionAnswerModel').modal('hide');
                            vc.emit('questionAnswerManage', 'listQuestionAnswer', {});
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
            refreshEditQuestionAnswerInfo: function () {
                vc.component.editQuestionAnswerInfo = {
                    qaId: '',
                    qaType: '',
                    qaName: '',
                    startTime: '',
                    endTime: '',
                    remark: '',
                    content: '',
                    photos: []
                }
            },
            _freshPhoto: function (_photos) {
                vc.emit('editQuestionAnswer', 'uploadImageUrl', 'notifyPhotos', _photos);
            },
        }
    });
})(window.vc, window.vc.component);
