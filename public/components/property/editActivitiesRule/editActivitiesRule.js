(function (vc, vm) {
    vc.extends({
        data: {
            editActivitiesRuleInfo: {
                ruleId: '',
                ruleType: '',
                ruleName: '',
                startTime: '',
                endTime: '',
                activitiesObj: '',
                remark: ''
            }
        },
        _initMethod: function () {
            vc.component._initEditActivitiesRuleDate();
        },
        _initEvent: function () {
            vc.on('editActivitiesRule', 'openEditActivitiesRuleModal', function (_params) {
                vc.component.refreshEditActivitiesRuleInfo();
                $('#editActivitiesRuleModel').modal('show');
                vc.copyObject(_params, vc.component.editActivitiesRuleInfo);
                vc.component.editActivitiesRuleInfo.communityId = vc.getCurrentCommunity().communityId;
            });
        },
        methods: {
            _initEditActivitiesRuleDate: function () {
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
                        vc.component.editActivitiesRuleInfo.startTime = value;
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
                        var start = Date.parse(new Date(vc.component.editActivitiesRuleInfo.startTime))
                        var end = Date.parse(new Date(value))
                        if (start - end >= 0) {
                            vc.toast("????????????????????????????????????")
                            $(".editEndTime").val('')
                        } else {
                            vc.component.editActivitiesRuleInfo.endTime = value;
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
            editActivitiesRuleValidate: function () {
                return vc.validate.validate({
                    editActivitiesRuleInfo: vc.component.editActivitiesRuleInfo
                }, {
                    'editActivitiesRuleInfo.ruleType': [
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
                    'editActivitiesRuleInfo.ruleName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "128",
                            errInfo: "??????????????????"
                        }
                    ],
                    'editActivitiesRuleInfo.startTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "datetime",
                            param: "128",
                            errInfo: "????????????????????????"
                        }
                    ],
                    'editActivitiesRuleInfo.endTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "datetime",
                            param: "",
                            errInfo: "????????????????????????"
                        }
                    ],
                    'editActivitiesRuleInfo.activitiesObj': [
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
                    'editActivitiesRuleInfo.remark': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "1024",
                            errInfo: "??????????????????"
                        }
                    ],
                    'editActivitiesRuleInfo.ruleId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????ID????????????"
                        }
                    ]
                });
            },
            editActivitiesRule: function () {
                if (!vc.component.editActivitiesRuleValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.http.apiPost(
                    '/activitiesRule/updateActivitiesRule',
                    JSON.stringify(vc.component.editActivitiesRuleInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //??????model
                            $('#editActivitiesRuleModel').modal('hide');
                            vc.emit('activitiesRuleManage', 'listActivitiesRule', {});
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
            refreshEditActivitiesRuleInfo: function () {
                vc.component.editActivitiesRuleInfo = {
                    ruleId: '',
                    ruleType: '',
                    ruleName: '',
                    startTime: '',
                    endTime: '',
                    activitiesObj: '',
                    remark: ''
                }
            }
        }
    });
})(window.vc, window.vc.component);
