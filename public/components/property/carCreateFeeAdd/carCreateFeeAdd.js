(function (vc) {
    vc.extends({
        data: {
            carCreateFeeAddInfo: {
                feeTypeCds: [],
                feeConfigs: [],
                parkingAreas: [],
                locationObjId: '',
                locationTypeCd: '',
                carId: '',
                feeTypeCd: '',
                configId: '',
                carState: ['H', 'S'],
                isMore: false,
                locationTypeCdName: '',
                startTime: '',
                paId: '',
                feeFlag: '',
                endTime: ''
            }
        },
        _initMethod: function () {
            vc.component._initCarCreateFeeAddDateInfo();
            vc.getDict('pay_fee_config', "fee_type_cd", function (_data) {
                vc.component.carCreateFeeAddInfo.feeTypeCds = _data;
            });
            vc.component._loadParkingAreas();
        },
        _initEvent: function () {
            vc.on('carCreateFeeAdd', 'openCarCreateFeeAddModal',
                function (_param) {
                    vc.component.carCreateFeeAddInfo.isMore = _param.isMore;
                    if (!_param.isMore) {
                        vc.component.carCreateFeeAddInfo.locationTypeCd = '2000';
                        vc.component.carCreateFeeAddInfo.locationObjId = _param.car.carId;
                        vc.component.carCreateFeeAddInfo.carId = _param.car.carId;
                        vc.component.carCreateFeeAddInfo.locationTypeCdName = _param.car.carNum;
                    }
                    $('#carCreateFeeAddModel').modal('show');
                });
            vc.on("carCreateFeeAdd", "notify", function (param) {
                $that.carCreateFeeAddInfo.paId = param.paId;
            })
        },
        methods: {
            _initCarCreateFeeAddDateInfo: function () {
                vc.initDate('carCreateFeeStartTime', function (_startTime) {
                    console.log(_startTime)
                    $that.carCreateFeeAddInfo.startTime = _startTime;
                });
                vc.initDate('carCreateFeeEndTime', function (_endTime) {
                    $that.carCreateFeeAddInfo.endTime = _endTime;
                    let start = Date.parse(new Date($that.carCreateFeeAddInfo.startTime))
                    let end = Date.parse(new Date($that.carCreateFeeAddInfo.endTime))
                    if (start - end >= 0) {
                        vc.toast("????????????????????????????????????")
                        $that.carCreateFeeAddInfo.endTime = '';
                    }
                });
                //??????????????????????????????????????????,????????????????????? 
                //document.getElementsByClassName('form-control carCreateFeeStartTime')[0].addEventListener('click', myfunc)
                function myfunc(e) {
                    e.currentTarget.blur();
                }
            },
            carCreateFeeAddValidate() {
                return vc.validate.validate({
                    carCreateFeeAddInfo: vc.component.carCreateFeeAddInfo
                }, {
                    'carCreateFeeAddInfo.locationTypeCd': [{
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
                    'carCreateFeeAddInfo.locationObjId': [{
                        limit: "required",
                        param: "",
                        errInfo: "????????????????????????"
                    }],
                    'carCreateFeeAddInfo.feeTypeCd': [{
                        limit: "required",
                        param: "",
                        errInfo: "????????????????????????"
                    }],
                    'carCreateFeeAddInfo.configId': [{
                        limit: "required",
                        param: "",
                        errInfo: "????????????????????????"
                    }],
                    'carCreateFeeAddInfo.carState': [{
                        limit: "required",
                        param: "",
                        errInfo: "????????????????????????"
                    }],
                    'carCreateFeeAddInfo.startTime': [{
                        limit: "required",
                        param: "",
                        errInfo: "??????????????????????????????"
                    },
                        {
                            limit: "datetime",
                            param: "",
                            errInfo: "?????????????????????????????? YYYY-MM-DD hh:mm:ss"
                        }
                    ]
                });
            },
            saveCarCreateFeeInfo: function () {
                vc.component.carCreateFeeAddInfo.communityId = vc.getCurrentCommunity().communityId;
                if (vc.component.carCreateFeeAddInfo.locationTypeCd == '1000') { // ??????ID
                    vc.component.carCreateFeeAddInfo.locationObjId = vc.component.carCreateFeeAddInfo.communityId;
                } else if (vc.component.carCreateFeeAddInfo.locationTypeCd == '2000') {
                    vc.component.carCreateFeeAddInfo.locationObjId = vc.component.carCreateFeeAddInfo.carId;
                } else if (vc.component.carCreateFeeAddInfo.locationTypeCd == '3000') {
                    vc.component.carCreateFeeAddInfo.locationObjId = vc.component.carCreateFeeAddInfo.paId;
                } else {
                    vc.toast("??????????????????");
                    return;
                }
                if (!vc.component.carCreateFeeAddValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.component.carCreateFeeAddInfo.communityId = vc.getCurrentCommunity().communityId;
                vc.http.apiPost('fee.saveParkingSpaceCreateFee',
                    JSON.stringify(vc.component.carCreateFeeAddInfo), {
                        emulateJSON: true
                    },
                    function (json, res) {
                        var _json = JSON.parse(json);
                        if (res.status == 200) {
                            //??????model
                            $('#carCreateFeeAddModel').modal('hide');
                            vc.component.clearAddFeeConfigInfo();
                            vc.emit('listParkingSpaceFee', 'notify', {});
                            vc.emit('simplifyCarFee', 'notify', {});
                            if (_json.hasOwnProperty('code') && _json.code != 0) {
                                vc.toast(_json.msg);
                                return;
                            }
                            vc.toast("???????????????????????????[" + _json.totalCar + "]???????????????[" + _json.successCar + "],??????[" + _json.errorCar + "]", 8000);
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
            clearAddFeeConfigInfo: function () {
                var _feeTypeCds = vc.component.carCreateFeeAddInfo.feeTypeCds;
                var _parkingAreas = vc.component.carCreateFeeAddInfo.parkingAreas;
                vc.component.carCreateFeeAddInfo = {
                    feeTypeCds: [],
                    feeConfigs: [],
                    parkingAreas: [],
                    locationTypeCd: '',
                    locationObjId: '',
                    psId: '',
                    feeTypeCd: '',
                    configId: '',
                    billType: '',
                    carState: ['H', 'S'],
                    isMore: false,
                    locationTypeCdName: '',
                    startTime: vc.dateTimeFormat(new Date().getTime()),
                    paId: '',
                    feeFlag: '',
                    endTime: ''
                };
                vc.component.carCreateFeeAddInfo.feeTypeCds = _feeTypeCds;
                vc.component.carCreateFeeAddInfo.parkingAreas = _parkingAreas;
            },
            _changeCarFeeTypeCd: function (_feeTypeCd) {
                var param = {
                    params: {
                        page: 1,
                        row: 20,
                        communityId: vc.getCurrentCommunity().communityId,
                        feeTypeCd: _feeTypeCd,
                        isDefault: 'F',
                        valid: '1'
                    }
                };
                //??????get??????
                vc.http.apiGet('/feeConfig.listFeeConfigs', param,
                    function (json, res) {
                        var _feeConfigManageInfo = JSON.parse(json);
                        vc.component.carCreateFeeAddInfo.feeConfigs = _feeConfigManageInfo.feeConfigs;
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                    });
            },
            _loadParkingAreas: function (_feeTypeCd) {
                var param = {
                    params: {
                        page: 1,
                        row: 20,
                        communityId: vc.getCurrentCommunity().communityId,
                    }
                };
                //??????get??????
                vc.http.apiGet('/parkingArea.listParkingAreas', param,
                    function (json, res) {
                        if (res.status == 200) {
                            var _parkingAreaInfo = JSON.parse(json);
                            vc.component.carCreateFeeAddInfo.parkingAreas = _parkingAreaInfo.parkingAreas;
                        }
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                    });
            },
            _carCreateFeeAddIfOnceFee(_configId) {
                $that.carCreateFeeAddInfo.endTime = '';
                $that.carCreateFeeAddInfo.feeConfigs.forEach(item => {
                    if (_configId == item.configId) {
                        $that.carCreateFeeAddInfo.feeFlag = item.feeFlag;
                        return;
                    }
                });
            }
        }
    });
})(window.vc);