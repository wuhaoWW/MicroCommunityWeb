(function (vc) {
    vc.extends({
        data: {
            addContractInfo: {
                contractId: '',
                contractName: '',
                contractCode: '',
                contractType: '',
                partyA: '',
                partyB: '',
                aContacts: '',
                bContacts: '',
                aLink: '',
                bLink: '',
                operator: '',
                operatorLink: '',
                allNum: '',
                amount: '',
                startTime: '',
                endTime: '',
                signingTime: '',
                contractTypes: [],
                contractTypeSpecs: [],
                roomId: '',
                ownerName: '',
                link: '',
                objType: '1111',
                objId: '-1',
                contractParentId: '',
                parentContractCode: '',
                parentContractName: '',
                parentStateName: '',
                objName: '',
                objPersonName: '',
                objPersonId: '',
                rooms: [],
                contractFilePo: [],
                tempfile: '',
                contractPartyAs: [],
                audit: '',
                staffName: '',
                nextUserId: ''
            }
        },
        _initMethod: function () {
            $that._loadAddContractType();
            $that._loadAddContractParkA();
            if (vc.getParam("contractId")) {
                $that.addContractInfo.contractParentId = vc.getParam("contractId");
                $that.addContractInfo.parentContractCode = vc.getParam("contractCode");
                $that.addContractInfo.parentContractName = vc.getParam("contractName");
                $that.addContractInfo.parentStateName = vc.getParam("stateName");
                $that.addContractInfo.contractId = '';
                $that.addContractInfo.contractCode = '';
                $that.addContractInfo.contractName = '';
                $that.addContractInfo.allNum = vc.getParam("objId");
                $that._queryRoom();
                $that._listContracts();
            }
            vc.initDateTime('addStartTime', function (_value) {
                $that.addContractInfo.startTime = _value;
            });
            vc.initDateTime('addEndTime', function (_value) {
                $that.addContractInfo.endTime = _value;
            });
            vc.initDateTime('addSigningTime', function (_value) {
                $that.addContractInfo.signingTime = _value;
            });
            $that.addContractInfo.signingTime = vc.dateTimeFormat(new Date().getTime());
        },
        _initEvent: function () {
            vc.on('addContract', 'chooseRoom', function (param) {
                $that.addContractInfo.rooms.push(param);
            })
            vc.on('addContract', 'chooseOwner', function (param) {
                $that.addContractInfo.partyB = param.name;
                $that.addContractInfo.bContacts = param.name;
                $that.addContractInfo.bLink = param.link;
                $that.addContractInfo.objId = param.ownerId;
            })
            vc.on("addContract", "notify3", function (info) {
                vc.component.addContractInfo.nextUserId = info.staffId;
                vc.component.addContractInfo.staffName = info.staffName;
            });
        },
        methods: {
            addContractValidate() {
                return vc.validate.validate({
                    addContractInfo: vc.component.addContractInfo
                }, {
                    'addContractInfo.contractName': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "????????????????????????64???"
                        },
                    ],
                    'addContractInfo.contractCode': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "30",
                            errInfo: "??????????????????"
                        },
                    ],
                    'addContractInfo.contractType': [
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
                    'addContractInfo.partyA': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "??????????????????"
                        },
                    ],
                    'addContractInfo.partyB': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "200",
                            errInfo: "??????????????????"
                        },
                    ],
                    'addContractInfo.aContacts': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "???????????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "???????????????????????????64???"
                        },
                    ],
                    'addContractInfo.bContacts': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "???????????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "???????????????????????????64???"
                        },
                    ],
                    'addContractInfo.aLink': [{
                        limit: "required",
                        param: "",
                        errInfo: "??????????????????????????????"
                    }],
                    'addContractInfo.bLink': [{
                        limit: "required",
                        param: "",
                        errInfo: "??????????????????????????????"
                    }],
                    'addContractInfo.operator': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "?????????????????????"
                        },
                        {
                            limit: "maxLength",
                            param: "64",
                            errInfo: "???????????????64???"
                        },
                    ],
                    'addContractInfo.operatorLink': [{
                        limit: "required",
                        param: "",
                        errInfo: "????????????????????????"
                    }],
                    'addContractInfo.amount': [{
                        limit: "money",
                        param: "",
                        errInfo: "??????????????????????????????1.50"
                    }],
                    'addContractInfo.startTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "??????????????????????????????"
                        },
                    ],
                    'addContractInfo.endTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "??????????????????????????????"
                        },
                    ],
                    'addContractInfo.signingTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????????????????"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "??????????????????????????????"
                        },
                    ]
                });
            },
            _queryRoom: function () {
                let param = {
                    params: {
                        contractId: vc.getParam("contractId"),
                        page: 1,
                        row: 100
                    }
                }
                //??????get??????
                vc.http.apiGet('/contract/queryContractRoom',
                    param,
                    function (json, res) {
                        var _contractTFile = JSON.parse(json);
                        vc.component.addContractInfo.rooms = _contractTFile.data;
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
            saveContractInfo: function () {
                if (!vc.component.addContractValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.component.addContractInfo.communityId = vc.getCurrentCommunity().communityId;

                vc.http.apiPost(
                    '/contract/saveContract',
                    JSON.stringify(vc.component.addContractInfo), {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //??????model
                            vc.toast('????????????');
                            $that._goBack();
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
            clearAddContractInfo: function () {
                let _contractTypes = $that.addContractInfo.contractTypes;
                vc.component.addContractInfo = {
                    contractName: '',
                    contractCode: '',
                    contractType: '',
                    partyA: '',
                    partyB: '',
                    aContacts: '',
                    bContacts: '',
                    aLink: '',
                    bLink: '',
                    operator: '',
                    operatorLink: '',
                    amount: '',
                    startTime: '',
                    endTime: '',
                    signingTime: '',
                    contractTypes: _contractTypes,
                    contractTypeSpecs: [],
                    allNum: '',
                    roomId: '',
                    ownerName: '',
                    link: '',
                    objId: '-1',
                    objType: '1111',
                    contractParentId: '',
                    parentContractCode: '',
                    parentContractName: '',
                    parentStateName: '',
                    objName: '',
                    objPersonName: '',
                    objPersonId: '',
                    rooms: [],
                    contractPartyAs: [],
                    audit: '',
                    staffName: '',
                    nextUserId: ''
                };
            },
            _loadAddContractType: function () {
                let param = {
                    params: {
                        page: 1,
                        row: 100
                    }
                }
                //??????get??????
                vc.http.apiGet('/contract/queryContractType',
                    param,
                    function (json, res) {
                        var _contractTypeManageInfo = JSON.parse(json);
                        vc.component.addContractInfo.contractTypes = _contractTypeManageInfo.data;
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
            _loadAddContractParkA: function () {
                let param = {
                    params: {
                        page: 1,
                        row: 100
                    }
                }
                //??????get??????
                vc.http.apiGet('/contractPartya/queryContractPartya',
                    param,
                    function (json, res) {
                        var _contractTypeManageInfo = JSON.parse(json);
                        vc.component.addContractInfo.contractPartyAs = _contractTypeManageInfo.data;
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
            _changeContractType: function () {
                $that.addContractInfo.contractTypes.forEach(item => {
                    if ($that.addContractInfo.contractType == item.contractTypeId) {
                        $that.addContractInfo.audit = item.audit;
                    }
                })
                let param = {
                    params: {
                        page: 1,
                        row: 100,
                        contractTypeId: $that.addContractInfo.contractType
                    }
                }
                $that.addContractInfo.contractTypeSpecs = [];
                vc.http.apiGet('/contract/queryContractTypeSpec',
                    param,
                    function (json, res) {
                        let _contractTypeSpecManageInfo = JSON.parse(json);
                        _contractTypeSpecManageInfo.data.forEach(item => {
                            item.value = '';
                            if (item.specShow == 'Y') {
                                item.values = [];
                                //$that._loadAttrValue(item.specCd, item.values);
                                $that.addContractInfo.contractTypeSpecs.push(item);
                            }
                        });
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
            _goBack: function () {
                vc.goBack();
            },
            _selectRoom: function () {
                vc.emit('searchRoom', 'openSearchRoomModel', {})
            },
            _openDelRoomModel: function (_room) {
                let _tmpRooms = [];
                $that.addContractInfo.rooms.forEach(item => {
                    if (item.roomId != _room.roomId) {
                        _tmpRooms.push(item);
                    }
                });
                $that.addContractInfo.rooms = _tmpRooms;
            },
            addFileStep: function () {
                let _file = {
                    seq: $that.addContractInfo.contractFilePo.length,
                    fileSaveName: '',
                    fileRealName: ''
                }
                $that.addContractInfo.contractFilePo.push(_file);
            },
            deleteStep: function (_step) {
                for (var i = 0; i < $that.addContractInfo.contractFilePo.length; i++) {
                    if ($that.addContractInfo.contractFilePo[i].seq == _step.seq) {

                        $that.addContractInfo.contractFilePo.splice(i, 1);
                    }
                }
            },
            getFile: function (e, index) {
                vc.component.addContractInfo.tempfile = e.target.files[0];
                $that.addContractInfo.contractFilePo[index].fileRealName = vc.component.addContractInfo.tempfile.name;
                this._importData(index);
            },
            _importData: function (index) {
                // ????????????
                let _fileName = vc.component.addContractInfo.tempfile.name;
                let _suffix = _fileName.substring(_fileName.lastIndexOf('.') + 1);
                if (!vc.component.checkFileType(_suffix.toLowerCase())) {
                    vc.toast('?????????????????????????????????PDF???????????????');
                    return;
                }
                var param = new FormData();
                param.append("uploadFile", vc.component.addContractInfo.tempfile);
                vc.http.upload(
                    'importRoomFee',
                    'uploadContactFile',
                    param, {
                        emulateJSON: true,
                        //???????????????
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            $that.addContractInfo.contractFilePo[index].fileSaveName = json;
                            vc.toast("????????????");
                            return;
                        }
                        vc.toast(json, 10000);
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                        vc.toast(errInfo, 10000);
                    });
            },
            checkFileType: function (fileType) {
                const acceptTypes = ['png', 'pdf', 'jpg'];
                for (var i = 0; i < acceptTypes.length; i++) {
                    if (fileType === acceptTypes[i]) {
                        return true;
                    }
                }
                return false;
            },
            _changeContractPartyA: function () {
                let _partyA = $that.addContractInfo.partyA;
                $that.addContractInfo.contractPartyAs.forEach(item => {
                    if (_partyA == item.partyA) {
                        $that.addContractInfo.aLink = item.aLink;
                        $that.addContractInfo.aContacts = item.aContacts;
                    }
                })
            },
            _searchOwner: function () {
                vc.emit('searchOwner', 'openSearchOwnerModel', {});
            },
            _listContracts: function () {
                let param = {
                    params: {
                        page: 1,
                        row: 1,
                        contractId: vc.getParam('contractId')
                    }
                };
                //??????get??????
                vc.http.apiGet('/contract/queryContract',
                    param,
                    function (json, res) {
                        let _expirationContractInfo = JSON.parse(json);
                        vc.copyObject(_expirationContractInfo.data[0], vc.component.addContractInfo);
                        $that.addContractInfo.contractId = '';
                        $that.addContractInfo.contractCode = '';
                        $that.addContractInfo.contractName = '';
                        $that.addContractInfo.startTime = $that.addContractInfo.endTime;
                        $that.addContractInfo.endTime = '';
                        $that.addContractInfo.signingTime = '';
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
        }
    });
})(window.vc);