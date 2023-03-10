(function (vc, vm) {
    vc.extends({
        data: {
            editApplyRoomDiscountInfo: {
                ardId: '',
                startTime: '',
                endTime: '',
                checkRemark: '',
                createRemark: '',
                state: '',
                total: 0,
                records: 1,
                applyRoomDiscounts: [],
                photos: [],
                urls: [],
                url: ''
            }
        },
        _initMethod: function () {
            vc.component._initEditApplyRoomDiscountDateInfo();
        },
        _initEvent: function () {
            vc.on('editApplyRoomDiscount', 'openEditApplyRoomDiscountModal', function (_params) {
                _params = JSON.parse(_params);
                delete _params.state;
                vc.component.refreshEditApplyRoomDiscountInfo();
                $('#editApplyRoomDiscountModel').modal('show');
                vc.copyObject(_params, vc.component.editApplyRoomDiscountInfo);
                vc.component.editApplyRoomDiscountInfo.communityId = vc.getCurrentCommunity().communityId;
                let _photos = [];
                if (_params.urls != null && _params.urls.length > 0) {
                    _params.urls.forEach(item => {
                        _photos.push(item);
                    })
                }
                vc.emit('editApplyRoomDiscount', 'uploadImageUrl', 'notifyPhotos', _photos);
            });
            vc.on("editApplyRoomDiscount", "notifyUploadImage", function (_param) {
                if (_param.length > 0) {
                    vc.component.editApplyRoomDiscountInfo.photos = [];
                    _param.forEach((item) => {
                        vc.component.editApplyRoomDiscountInfo.photos.push(item.fileId);
                    })
                } else {
                    vc.component.editApplyRoomDiscountInfo.photos = [];
                }
            });
        },
        methods: {
            _initEditApplyRoomDiscountDateInfo: function () {
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
                        var start = Date.parse(new Date(value));
                        var end = Date.parse(new Date(vc.component.editApplyRoomDiscountInfo.endTime));
                        if (start - end >= 0) {
                            vc.toast("????????????????????????????????????????????????");
                            $(".editStartTime").val('');
                            vc.component.editApplyRoomDiscountInfo.startTime = "";
                        } else {
                            vc.component.editApplyRoomDiscountInfo.startTime = value;
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
                        var start = Date.parse(new Date(vc.component.editApplyRoomDiscountInfo.startTime));
                        var end = Date.parse(new Date(value));
                        if (start - end >= 0) {
                            vc.toast("????????????????????????????????????????????????");
                            $(".editEndTime").val('');
                            vc.component.editApplyRoomDiscountInfo.endTime = "";
                        } else {
                            vc.component.editApplyRoomDiscountInfo.endTime = value;
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
            editApplyRoomDiscountValidate: function () {
                return vc.validate.validate({
                    editApplyRoomDiscountInfo: vc.component.editApplyRoomDiscountInfo
                }, {
                    'editApplyRoomDiscountInfo.startTime': [
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
                    'editApplyRoomDiscountInfo.endTime': [
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
                    'editApplyRoomDiscountInfo.checkRemark': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "512",
                            errInfo: "??????????????????"
                        },
                    ],
                    'editApplyRoomDiscountInfo.ardId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????ID????????????"
                        }
                    ],
                    'editApplyRoomDiscountInfo.state': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        }
                    ]
                });
            },
            editApplyRoomDiscount: function () {
                if (!vc.component.editApplyRoomDiscountValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.http.apiPost(
                    '/applyRoomDiscount/updateApplyRoomDiscount',
                    JSON.stringify(vc.component.editApplyRoomDiscountInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //??????model
                            $('#editApplyRoomDiscountModel').modal('hide');
                            vc.component.refreshEditApplyRoomDiscountInfo();
                            vc.emit('applyRoomDiscountManage', 'listApplyRoomDiscount', {});
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
            refreshEditApplyRoomDiscountInfo: function () {
                vc.component.editApplyRoomDiscountInfo = {
                    ardId: '',
                    startTime: '',
                    endTime: '',
                    checkRemark: '',
                    createRemark: '',
                    state: '',
                    total: 0,
                    records: 1,
                    applyRoomDiscounts: [],
                    urls: [],
                    photos: [],
                    url: ''
                }
            }
        }
    });
})(window.vc, window.vc.component);
