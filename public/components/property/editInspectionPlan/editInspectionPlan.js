(function (vc, vm) {
    vc.extends({
        data: {
            editInspectionPlanInfo: {
                inspectionPlanId: '',
                inspectionPlanName: '',
                inspectionRouteId: '',
                inspectionPlanPeriod: '',
                inspectionPlanPeriods: [],
                startDate: vc.dateFormat(new Date()),
                endDate: '2050-01-01',
                beforeTime: '30',
                startTime:'',
                endTime:'',
                signType: '',
                canReexamine: '',
                signTypes: [],
                state: '2020025',
                remark: '',
                months: [],
                days: [],
                workdays: [],
                inspectionRoutes:[],
                staffs:[]
            }
        },
        _initMethod: function () {
            vc.getDict('inspection_plan', "sign_type", function (_data) {
                vc.component.editInspectionPlanInfo.signTypes = _data;
            });
            vc.getDict('inspection_plan', "inspection_plan_period", function (_data) {
                vc.component.editInspectionPlanInfo.inspectionPlanPeriods = _data;
            });
        },
        _initEvent: function () {
            vc.component._initEditInspectionPlanDateInfo();
            vc.on('editInspectionPlan', 'openEditInspectionPlanModal', function (_params) {
                vc.component.refreshEditInspectionPlanInfo();
                vc.copyObject(_params, vc.component.editInspectionPlanInfo);
                vc.component.editInspectionPlanInfo.communityId = vc.getCurrentCommunity().communityId;
                $that.editInspectionPlanInfo.months = _params.inspectionMonth.split(',');
                $that.editInspectionPlanInfo.days = _params.inspectionDay.split(',');
                $that.editInspectionPlanInfo.workdays = _params.inspectionWorkday.split(',');
                $('#editInspectionPlanModel').modal('show');
                $that._listEditInspectionRoutes();
                $that._listEditInspectionPlanStaffs();
            });

            vc.on('editInspectionPlanInfo', 'notify', function(_param){
                vc.component.editInspectionPlanInfo.inspectionRouteId = _param.inspectionRouteId;
            })
        },
        methods: {
            editInspectionPlanValidate: function () {
                return vc.validate.validate({
                    editInspectionPlanInfo: vc.component.editInspectionPlanInfo
                }, {
                    'editInspectionPlanInfo.inspectionPlanName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "maxin",
                            param: "1,100",
                            errInfo: "??????????????????????????????100???"
                        },
                    ],
                    'editInspectionPlanInfo.inspectionRouteId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "maxin",
                            param: "1,30",
                            errInfo: "????????????????????????30???"
                        },
                    ],
                    'editInspectionPlanInfo.inspectionPlanPeriod': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "maxin",
                            param: "1,12",
                            errInfo: "????????????????????????"
                        },
                    ],
                    'editInspectionPlanInfo.startDate': [{
                        limit: "required",
                        param: "",
                        errInfo: "??????????????????????????????"
                    },
                    {
                        limit: "date",
                        param: "",
                        errInfo: "?????????????????????????????????????????????"
                    },
                    ],
                    'editInspectionPlanInfo.endDate': [{
                        limit: "required",
                        param: "",
                        errInfo: "??????????????????????????????"
                    },
                    {
                        limit: "date",
                        param: "",
                        errInfo: "?????????????????????????????????????????????"
                    },
                    ],
                    'editInspectionPlanInfo.signType': [
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
                    'editInspectionPlanInfo.state': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                    ],
                    'editInspectionPlanInfo.remark': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "????????????????????????200???"
                        },
                    ],
                    'editInspectionPlanInfo.inspectionPlanId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????????????????"
                        }]
                });
            },
            editInspectionPlan: function () {
                if (!vc.component.editInspectionPlanValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                $that.editInspectionPlanInfo.inspectionMonth = $that.editInspectionPlanInfo.months.join(',');
                $that.editInspectionPlanInfo.inspectionDay = $that.editInspectionPlanInfo.days.join(',');
                $that.editInspectionPlanInfo.inspectionWorkday = $that.editInspectionPlanInfo.workdays.join(',');
                vc.http.apiPost(
                    '/inspectionPlan.updateInspectionPlan',
                    JSON.stringify(vc.component.editInspectionPlanInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //??????model
                            $('#editInspectionPlanModel').modal('hide');
                            vc.emit('inspectionPlanManage', 'listInspectionPlan', {});
                            return;
                        }
                        vc.toast(json);
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                        vc.toast(errInfo);
                    });
            },
            refreshEditInspectionPlanInfo: function () {
                var signTypes = vc.component.editInspectionPlanInfo.signTypes;
                var inspectionPlanPeriods = vc.component.editInspectionPlanInfo.inspectionPlanPeriods;
                vc.component.editInspectionPlanInfo = {
                    inspectionPlanId: '',
                    inspectionPlanName: '',
                    inspectionRouteId: '',
                    inspectionPlanPeriod: '',
                    inspectionPlanPeriods: inspectionPlanPeriods,
                    startDate: vc.dateFormat(new Date()),
                    endDate: '2050-01-01',
                    beforeTime: '30',
                    startTime:'',
                    endTime:'',
                    signType: '',
                    canReexamine: '',
                    signTypes: signTypes,
                    state: '2020025',
                    remark: '',
                    months: [],
                    days: [],
                    workdays: [],
                    inspectionRoutes:[],
                    staffs:[]
                };
            },
            _initEditInspectionPlanDateInfo: function () {
                vc.initDate('editInspectionPlanStartDate', function (_value) {
                    $that.editInspectionPlanInfo.startDate = _value;
                });
                vc.initDate('editInspectionPlanEndDate', function (_value) {
                    $that.editInspectionPlanInfo.endDate = _value;
                });
                vc.initHourMinute('editInspectionPlanStartTime', function (_value) {
                    $that.editInspectionPlanInfo.startTime = _value;
                });
                vc.initHourMinute('editInspectionPlanEndTime', function (_value) {
                    $that.editInspectionPlanInfo.endTime = _value;
                })
            },
            _listEditInspectionRoutes: function() {
                let param = {
                    params: {
                        page:1,
                        row:100,
                        communityId:vc.getCurrentCommunity().communityId
                    }
                };
                //??????get??????
                vc.http.apiGet('/inspectionRoute.listInspectionRoutes',
                    param,
                    function(json, res) {
                        let _inspectionRouteManageInfo = JSON.parse(json);
                        $that.editInspectionPlanInfo.inspectionRoutes = _inspectionRouteManageInfo.inspectionRoutes;
                        
                    },
                    function(errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
            _listEditInspectionPlanStaffs: function () {
                let param = {
                    params: {
                        page: 1,
                        row: 100,
                        communityId: vc.getCurrentCommunity().communityId,
                        inspectionPlanId: $that.editInspectionPlanInfo.inspectionPlanId
                    }
                };
                //??????get??????
                vc.http.apiGet('/inspectionPlanStaff.listInspectionPlanStaffs',
                    param,
                    function (json, res) {
                        let _inspectionRouteManageInfo = JSON.parse(json);
                        _inspectionRouteManageInfo.inspectionPlanStaffs.forEach(item => {
                            item.userId = item.staffId;
                            item.name = item.staffName;
                        });
                        $that.editInspectionPlanInfo.staffs = _inspectionRouteManageInfo.inspectionPlanStaffs;
                        vc.emit('selectStaffs', 'setStaffs',$that.editInspectionPlanInfo.staffs);
                    }, function (errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
        }
    });
})(window.vc, window.vc.component);
