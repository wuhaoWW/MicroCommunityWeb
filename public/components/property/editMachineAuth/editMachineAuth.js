(function (vc, vm) {
    vc.extends({
        data: {
            editMachineAuthInfo: {
                authId: '',
                machineId: '',
                machineName: '',
                personId: '',
                personName: '',
                startTime: '',
                endTime: '',
                accessControlMachines: [],
                staffs: []
            }
        },
        _initMethod: function () {
            vc.component.listEditMachineStaffs();
            vc.component.listEditAccessControlMachine();
            vc.component._initEditMachineAuthInfo();
        },
        _initEvent: function () {
            vc.on('editMachineAuth', 'openEditMachineAuthModal', function (_params) {
                vc.component.refreshEditMachineAuthInfo();
                vc.component.listEditMachineStaffs();
                vc.component.listEditAccessControlMachine();
                $('#editMachineAuthModel').modal('show');
                vc.copyObject(_params, vc.component.editMachineAuthInfo);
                vc.component.editMachineAuthInfo.communityId = vc.getCurrentCommunity().communityId;
            });
        },
        methods: {
            _initEditMachineAuthInfo: function () {
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
                        vc.component.editMachineAuthInfo.startTime = value;
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
                        var start = Date.parse(new Date(vc.component.editMachineAuthInfo.startTime))
                        var end = Date.parse(new Date(value))
                        if (start - end >= 0) {
                            vc.toast("????????????????????????????????????")
                            $(".editEndTime").val('')
                        } else {
                            vc.component.editMachineAuthInfo.endTime = value;
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
            editMachineAuthValidate: function () {
                return vc.validate.validate({
                    editMachineAuthInfo: vc.component.editMachineAuthInfo
                }, {
                    'editMachineAuthInfo.machineId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "??????????????????"
                        }
                    ],
                    'editMachineAuthInfo.personId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "128",
                            errInfo: "??????????????????"
                        }
                    ],
                    'editMachineAuthInfo.startTime': [
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
                    'editMachineAuthInfo.endTime': [
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
                    'editMachineAuthInfo.authId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "ID????????????"
                        }
                    ]
                });
            },
            editMachineAuth: function () {
                if (!vc.component.editMachineAuthValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.http.apiPost(
                    'machineAuth.updateMachineAuth',
                    JSON.stringify(vc.component.editMachineAuthInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //??????model
                            $('#editMachineAuthModel').modal('hide');
                            vc.emit('machineAuthManage', 'listMachineAuth', {});
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
            //??????????????????
            listEditAccessControlMachine: function () {
                var param = {
                    params: {
                        page: 1,
                        row: 100,
                        machineTypeCd: '9999',
                        communityId: vc.getCurrentCommunity().communityId,
                        domain: 'ACCESS_CONTROL'
                    }
                };
                //??????get??????
                vc.http.apiGet('/machine.listMachines',
                    param,
                    function (json) {
                        var _listAccessControlMachine = JSON.parse(json);
                        vc.component.editMachineAuthInfo.accessControlMachines = _listAccessControlMachine.machines;
                    }, function () {
                        console.log('??????????????????');
                    }
                );
            },
            //??????????????????
            listEditMachineStaffs: function () {
                let param = {
                    params: {
                        page: 1,
                        row: 1000,
                        orgLevel: '2'
                    }
                };
                //??????get??????
                vc.http.apiGet('/query.staff.infos',
                    param,
                    function (json, res) {
                        var _listMachineStaffs = JSON.parse(json);
                        vc.component.editMachineAuthInfo.staffs = _listMachineStaffs.staffs;
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
            refreshEditMachineAuthInfo: function () {
                vc.component.editMachineAuthInfo = {
                    authId: '',
                    machineId: '',
                    machineName: '',
                    personId: '',
                    personName: '',
                    startTime: '',
                    endTime: '',
                    accessControlMachines: [],
                    staffs: []
                }
            }
        }
    });
})(window.vc, window.vc.component);
