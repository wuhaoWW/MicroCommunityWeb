(function (vc) {
    vc.extends({
        data: {
            addInspectionPlanInfo: {
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
                canReexamine: '1000',
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
            vc.component._initAddInspectionPlanDateInfo();
            vc.getDict('inspection_plan', "inspection_plan_period", function (_data) {
                vc.component.addInspectionPlanInfo.inspectionPlanPeriods = _data;
            });
            vc.getDict('inspection_plan', "sign_type", function (_data) {
                vc.component.addInspectionPlanInfo.signTypes = _data;
            });
            $that._listAddInspectionRoutes();
            vc.emit('selectStaffs', 'setStaffs',$that.addInspectionPlanInfo.staffs);
        },
        _initEvent: function () {
           
            vc.on("addInspectionPlanInfo", "notify", function (_param) {
                if (_param.hasOwnProperty("staffId")) {
                    vc.component.addInspectionPlanInfo.staffId = _param.staffId;
                    vc.component.addInspectionPlanInfo.staffName = _param.staffName;
                }
                if (_param.hasOwnProperty("inspectionRouteId")) {
                    vc.component.addInspectionPlanInfo.inspectionRouteId = _param.inspectionRouteId;
                }
            });
        },
        methods: {
            addInspectionPlanValidate() {
                return vc.validate.validate({
                    addInspectionPlanInfo: vc.component.addInspectionPlanInfo
                }, {
                    'addInspectionPlanInfo.inspectionPlanName': [{
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
                    'addInspectionPlanInfo.inspectionRouteId': [{
                        limit: "required",
                        param: "",
                        errInfo: "????????????????????????"
                    }],
                    'addInspectionPlanInfo.inspectionPlanPeriod': [{
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
                    'addInspectionPlanInfo.startDate': [{
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
                    'addInspectionPlanInfo.endDate': [{
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
                    'addInspectionPlanInfo.signType': [{
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
                    'addInspectionPlanInfo.state': [{
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
                    'addInspectionPlanInfo.remark': [{
                        limit: "maxLength",
                        param: "200",
                        errInfo: "????????????????????????200???"
                    }],
                });
            },
            _initAddInspectionPlanDateInfo: function () {
                vc.initDate('addInspectionPlanStartDate', function (_value) {
                    $that.addInspectionPlanInfo.startDate = _value;
                });
                vc.initDate('addInspectionPlanEndDate', function (_value) {
                    $that.addInspectionPlanInfo.endDate = _value;
                });
                vc.initHourMinute('addInspectionPlanStartTime', function (_value) {
                    $that.addInspectionPlanInfo.startTime = _value;
                });
                vc.initHourMinute('addInspectionPlanEndTime', function (_value) {
                    $that.addInspectionPlanInfo.endTime = _value;
                })
            },
            saveInspectionPlanInfo: function () {
                if (!vc.component.addInspectionPlanValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.component.addInspectionPlanInfo.communityId = vc.getCurrentCommunity().communityId;

                $that.addInspectionPlanInfo.inspectionMonth = $that.addInspectionPlanInfo.months.join(',');
                $that.addInspectionPlanInfo.inspectionDay = $that.addInspectionPlanInfo.days.join(',');
                $that.addInspectionPlanInfo.inspectionWorkday = $that.addInspectionPlanInfo.workdays.join(',');
                //???????????????????????? ?????????????????????
                vc.http.apiPost(
                    '/inspectionPlan.saveInspectionPlan',
                    JSON.stringify(vc.component.addInspectionPlanInfo), {
                    emulateJSON: true
                },
                    function (json, res) {
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //??????model
                            
                            vc.toast('??????');
                            vc.goBack();
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
            clearAddInspectionPlanInfo: function () {
                let inspectionPlanPeriods = vc.component.addInspectionPlanInfo.inspectionPlanPeriods;
                let signTypes = vc.component.addInspectionPlanInfo.signTypes;
                vc.component.addInspectionPlanInfo = {
                    inspectionPlanName: '',
                    inspectionRouteId: '',
                    inspectionPlanPeriod: '',
                    staffId: '',
                    startDate: vc.dateFormat(new Date()),
                    endDate: '2050-01-01',
                    beforeTime: '30',
                    startTime:'',
                    endTime:'',
                    signType: '',
                    canReexamine: '1000',
                    state: '2020025',
                    remark: '',
                    signTypes: signTypes,
                    inspectionPlanPeriods: inspectionPlanPeriods,
                    months: [],
                    days: [],
                    workdays: [],
                    inspectionRoutes:[],
                    staffs:[]
                };
            },
            _changeInspectionPeriod: function () {
                $that.addInspectionPlanInfo.months = [];
                $that.addInspectionPlanInfo.days = [];
                $that.addInspectionPlanInfo.workdays = [];
                if ($that.addInspectionPlanInfo.inspectionPlanPeriod == '2020022') {
                    for (let _month = 1; _month < 13; _month++) {
                        $that.addInspectionPlanInfo.months.push(_month);
                    }
                    for (let _day = 1; _day < 32; _day++) {
                        $that.addInspectionPlanInfo.days.push(_day);
                    }
                } else {
                    for (let _day = 1; _day < 8; _day++) {
                        $that.addInspectionPlanInfo.workdays.push(_day);
                    }
                }
            },
            _listAddInspectionRoutes: function() {
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
                        $that.addInspectionPlanInfo.inspectionRoutes = _inspectionRouteManageInfo.inspectionRoutes;
                        
                    },
                    function(errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
        }
    });
})(window.vc);