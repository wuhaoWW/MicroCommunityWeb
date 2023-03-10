(function (vc, vm) {
    vc.extends({
        data: {
            editShopsInfo: {
                roomId: '',
                unitId: '',
                apartment: '',
                roomNum: '',
                layer: '',
                builtUpArea: '',
                feeCoefficient: '1.0',
                remark: '',
                communityId: '',
                attrs: [],
                roomRent: '',
                roomArea: '',
                startTime: '',
                endTime: '',
                state: '',
                roomSubType: '120'
            }
        },
        _initMethod: function () {
            $that._loadRoomAttrSpec();
            vc.component._initDate();
        },
        _initEvent: function () {
            vc.on('editShops', 'openEditShopsModal', function (_room) {
                $that.refreshEditShopsInfo();
                vc.copyObject(_room, vc.component.editShopsInfo);
                if (_room.startTime != null && _room.startTime != '' && _room.startTime != 'undefined') {
                    vc.component.editShopsInfo.startTime = _room.startTime.split(" ")[0];
                }
                if (_room.endTime != null && _room.endTime != '' && _room.endTime != 'undefined') {
                    vc.component.editShopsInfo.endTime = _room.endTime.split(" ")[0];
                }
                vc.component.editShopsInfo.state = _room.state;
                $('#editShopsModel').modal('show');
                vc.component.editShopsInfo.communityId = vc.getCurrentCommunity().communityId;
                if (_room.hasOwnProperty('roomAttrDto')) {
                    let _roomAttrDtos = _room.roomAttrDto;
                    _roomAttrDtos.forEach(item => {
                        $that.editShopsInfo.attrs.forEach(attrItem => {
                            if (item.specCd == attrItem.specCd) {
                                attrItem.attrId = item.attrId;
                                attrItem.value = item.value;
                            }
                        })
                    })
                }
            });
        },
        methods: {
            _initDate: function () {
                $(".startTime").datetimepicker({
                    minView: "month",
                    language: 'zh-CN',
                    fontAwesome: 'fa',
                    format: 'yyyy-mm-dd',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $(".endTime").datetimepicker({
                    minView: "month",
                    language: 'zh-CN',
                    fontAwesome: 'fa',
                    format: 'yyyy-mm-dd',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.startTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".startTime").val();
                        vc.component.editShopsInfo.startTime = value;
                    });
                $('.endTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".endTime").val();
                        vc.component.editShopsInfo.endTime = value;
                        let start = Date.parse(new Date($that.editShopsInfo.startTime))
                        let end = Date.parse(new Date($that.editShopsInfo.endTime))
                        if (start - end >= 0) {
                            vc.toast("????????????????????????????????????")
                        }
                    });
                //??????????????????????????????????????????
                // document.getElementsByClassName("form-control startTime")[0].addEventListener('click', myfunc)
                // function myfunc(e) {
                //     e.currentTarget.blur();
                // }
                // document.getElementsByClassName("form-control endTime")[0].addEventListener('click', myfunc)
            },
            _loadRoomAttrSpec: function () {
                $that.editShopsInfo.attrs = [];
                vc.getAttrSpec('building_room_attr', function (data) {
                    data.forEach(item => {
                        item.value = '';
                        item.values = [];
                        $that._loadAttrValue(item.specCd, item.values);
                        if (item.specShow == 'Y') {
                            $that.editShopsInfo.attrs.push(item);
                        }
                    });
                });
            },
            _loadAttrValue: function (_specCd, _values) {
                vc.getAttrValue(_specCd, function (data) {
                    data.forEach(item => {
                        if (item.valueShow == 'Y') {
                            _values.push(item);
                        }
                    });
                });
            },
            editShopsValidate: function () {
                return vc.validate.validate({
                    editShopsInfo: vc.component.editShopsInfo
                }, {
                    'editShopsInfo.roomNum': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "12",
                            errInfo: "??????????????????????????????12???"
                        }
                    ],
                    'editShopsInfo.layer': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????????????????"
                        },
                        {
                            limit: "num",
                            param: "",
                            errInfo: "?????????????????????????????????"
                        }
                    ],
                    'editShopsInfo.builtUpArea': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "money",
                            param: "",
                            errInfo: "???????????????????????? 300.00"
                        },
                        {
                            limit: "maxLength",
                            param: "12",
                            errInfo: "????????????????????????????????????6???"
                        }
                    ],
                    'editShopsInfo.roomArea': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "money",
                            param: "",
                            errInfo: "???????????????????????? 300.00"
                        }
                    ],
                    'editShopsInfo.roomRent': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????"
                        },
                        {
                            limit: "money",
                            param: "",
                            errInfo: "?????????????????? 300.00"
                        }
                    ],
                    'editShopsInfo.feeCoefficient': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "money",
                            param: "",
                            errInfo: "???????????????????????? 300.00"
                        }
                    ],
                    'editShopsInfo.remark': [
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "????????????????????????200???"
                        }
                    ]
                });
            },
            editShops: function () {
                if (!vc.component.editShopsValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.http.apiPost(
                    '/room.updateRoom',
                    JSON.stringify(vc.component.editShopsInfo), {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //??????model
                            $('#editShopsModel').modal('hide');
                            vc.emit('shops', 'loadData', {
                                floorId: vc.component.editShopsInfo.floorId
                            });
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
            refreshEditShopsInfo: function () {
                let _attrs = $that.editShopsInfo.attrs;
                _attrs.forEach(_item => {
                    _item.attrId = '';
                    _item.value = '';
                });
                vc.component.editShopsInfo = {
                    roomId: '',
                    unitId: '',
                    roomNum: '',
                    layer: '',
                    builtUpArea: '',
                    feeCoefficient: '1.0',
                    remark: '',
                    communityId: '',
                    apartment: '',
                    attrs: _attrs,
                    roomRent: '',
                    roomArea: '',
                    roomSubType: '120'
                }
            }
        }
    });
})(window.vc, window.vc.component);