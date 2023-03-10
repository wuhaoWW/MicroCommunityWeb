(function (vc, vm) {
    vc.extends({
        data: {
            editServiceImplInfo: {
                serviceBusinessId: '',
                businessTypeCd: '',
                name: '',
                invokeType: '',
                url: '1000',
                messageTopic: '',
                timeout: '60',
                retryCount: '3',
                description: ''
            }
        },
        _initMethod: function () {
        },
        _initEvent: function () {
            vc.on('editServiceImpl', 'openEditServiceImplModal', function (_params) {
                vc.component.refreshEditServiceImplInfo();
                $('#editServiceImplModel').modal('show');
                vc.copyObject(_params, vc.component.editServiceImplInfo);
                //vc.component.editServiceImplInfo.communityId = vc.getCurrentCommunity().communityId;
            });
        },
        methods: {
            editServiceImplValidate: function () {
                return vc.validate.validate({
                    editServiceImplInfo: vc.component.editServiceImplInfo
                }, {
                    'editServiceImplInfo.serviceBusinessId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "服务实现ID不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "50",
                            errInfo: "服务实现ID不能超过50"
                        },
                    ],
                    'editServiceImplInfo.businessTypeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "业务类型不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,50",
                            errInfo: "业务类型必须在2至50字符之间"
                        },
                    ],
                    'editServiceImplInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "业务名称不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "2,50",
                            errInfo: "业务类型必须在2至50字符之间"
                        },
                    ],
                    'editServiceImplInfo.invokeType': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "调用类型不能为空"
                        },
                        {
                            limit: "maxin",
                            param: "1,4",
                            errInfo: "调用类型错误"
                        },
                    ],
                    'editServiceImplInfo.url': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "调用地址不能为空"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "调用地址超过200位"
                        },
                    ],
                    'editServiceImplInfo.messageTopic': [
                        {
                            limit: "maxLength",
                            param: "50",
                            errInfo: "kafka主题不能超过50"
                        },
                    ],
                    'editServiceImplInfo.timeout': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "超时时间不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "超时时间必须为数字"
                        },
                    ],
                    'editServiceImplInfo.retryCount': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "重试次数不能为空"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "重试次数必须为数字"
                        },
                    ],
                    'editServiceImplInfo.description': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "备注内容不能超过200"
                        },
                    ]
                });
            },
            editServiceImpl: function () {
                if (!vc.component.editServiceImplValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.http.apiPost(
                    '/serviceImpl.updateServiceImpl',
                    JSON.stringify(vc.component.editServiceImplInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //关闭model
                            $('#editServiceImplModel').modal('hide');
                            vc.emit('serviceImplManage', 'listServiceImpl', {});
                            vc.toast("修改成功");
                            return;
                        }
                    },
                    function (errInfo, error) {
                        console.log('请求失败处理');
                        vc.toast(errInfo);
                    });
            },
            refreshEditServiceImplInfo: function () {
                vc.component.editServiceImplInfo = {
                    serviceBusinessId: '',
                    businessTypeCd: '',
                    name: '',
                    invokeType: '',
                    url: '1000',
                    messageTopic: '',
                    timeout: '60',
                    retryCount: '3',
                    description: ''
                }
            }
        }
    });

})(window.vc, window.vc.component);
