(function (vc, vm) {
    vc.extends({
        data: {
            editContractInfo: {
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
                amount: '',
                startTime: '',
                endTime: '',
                signingTime: '',
                contractTypes: [],
                contractTypeSpecs: [],
                tempfile: '',
                contractFilePo: []
            }
        },
        _initMethod: function () {
            vc.initDateTime('editStartTime', function (_value) {
                $that.editContractInfo.startTime = _value;
            });
            vc.initDateTime('editEndTime', function (_value) {
                $that.editContractInfo.endTime = _value;
            });

            vc.initDateTime('editSigningTime', function (_value) {
                $that.editContractInfo.signingTime = _value;
            });
            $that._loadEditContractType();
        },
        _initEvent: function () {
            vc.on('editContract', 'openEditContractModal', function (_params) {
                vc.component.refreshEditContractInfo();
                $('#editContractModel').modal('show');
                vc.copyObject(_params, vc.component.editContractInfo);
                $that._loadContractType(_params);
                $that._loadFiles();
            });
            $('#editContractModel').on('show.bs.modal', function (e) {
                $(this).css('display', 'block');
                let modalWidth = $(window).width() * 0.7;
                $(this).find('.modal-dialog').css({
                    'max-width': modalWidth
                });
            });
        },
        methods: {
            editContractValidate: function () {
                return vc.validate.validate({
                    editContractInfo: vc.component.editContractInfo
                }, {
                    'editContractInfo.contractName': [
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
                    'editContractInfo.contractCode': [
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
                    'editContractInfo.contractType': [
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
                    'editContractInfo.partyA': [
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
                    'editContractInfo.partyB': [
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
                    'editContractInfo.aContacts': [
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
                    'editContractInfo.bContacts': [
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
                    'editContractInfo.aLink': [{
                        limit: "required",
                        param: "",
                        errInfo: "??????????????????????????????"
                    }],
                    'editContractInfo.bLink': [{
                        limit: "required",
                        param: "",
                        errInfo: "??????????????????????????????"
                    }],
                    'editContractInfo.operator': [
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
                    'editContractInfo.operatorLink': [{
                        limit: "required",
                        param: "",
                        errInfo: "????????????????????????"
                    }],
                    'editContractInfo.amount': [{
                        limit: "money",
                        param: "",
                        errInfo: "??????????????????????????????1.50"
                    }],
                    'editContractInfo.startTime': [
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
                    'editContractInfo.endTime': [
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
                    'editContractInfo.signingTime': [
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
                    'editContractInfo.contractId': [{
                        limit: "required",
                        param: "",
                        errInfo: "??????ID????????????"
                    }]
                });
            },
            editContract: function () {
                if (!vc.component.editContractValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }
                vc.http.apiPost(
                    '/contract/updateContract',
                    JSON.stringify(vc.component.editContractInfo), {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        let _json = JSON.parse(json);
                        if (_json.code == 0) {
                            //??????model
                            $('#editContractModel').modal('hide');
                            vc.emit('newContractManage', 'listContract', {});
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
            refreshEditContractInfo: function () {
                let _contractTypes = $that.editContractInfo.contractTypes;
                vc.component.editContractInfo = {
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
                    amount: '',
                    startTime: '',
                    endTime: '',
                    signingTime: '',
                    contractTypes: _contractTypes,
                    contractTypeSpecs: [],
                    tempfile: '',
                    contractFilePo: []
                }
            },
            _loadEditContractType: function () {
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
                        vc.component.editContractInfo.contractTypes = _contractTypeManageInfo.data;
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
            _loadContractType: function (_params) {
                let _attrs = _params.attrs;
                let param = {
                    params: {
                        page: 1,
                        row: 100,
                        contractTypeId: $that.editContractInfo.contractType
                    }
                }
                $that.editContractInfo.contractTypeSpecs = [];
                vc.http.apiGet('/contract/queryContractTypeSpec',
                    param,
                    function (json, res) {
                        let _contractTypeSpecManageInfo = JSON.parse(json);
                        _contractTypeSpecManageInfo.data.forEach(item => {
                            _attrs.forEach(_attrItem => {
                                if (item.specCd == _attrItem.specCd) {
                                    item.value = _attrItem.value;
                                } else {
                                    item.value = '';
                                }
                            })
                            if (item.specShow == 'Y') {
                                item.values = [];
                                //$that._loadAttrValue(item.specCd, item.values);
                                $that.editContractInfo.contractTypeSpecs.push(item);
                            }
                        });
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
            _loadFiles: function () {
                let param = {
                    params: {
                        contractId: vc.component.editContractInfo.contractId,
                        page: 1,
                        row: 100
                    }
                }
                //??????get??????
                vc.http.apiGet('/contractFile/queryContractFile',
                    param,
                    function (json, res) {
                        var _contractTFile = JSON.parse(json);
                        let _steps = [];
                        for (let stepIndex = 0; stepIndex < _contractTFile.data.length; stepIndex++) {
                            let _fileStep = _contractTFile.data[stepIndex];
                            let _step = {
                                seq: stepIndex,
                                fileSaveName: _fileStep.fileSaveName,
                                fileRealName: _fileStep.fileRealName
                            };
                            _steps.push(_step);
                        }
                        vc.component.editContractInfo.contractFilePo = _steps;
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
            addEditFileStep: function () {
                let _file = {
                    seq: $that.editContractInfo.contractFilePo.length,
                    fileSaveName: '',
                    fileRealName: ''
                }
                $that.editContractInfo.contractFilePo.push(_file);
            },
            deleteEditStep: function (_step) {
                for (var i = 0; i < $that.editContractInfo.contractFilePo.length; i++) {
                    if ($that.editContractInfo.contractFilePo[i].seq == _step.seq) {
                        $that.editContractInfo.contractFilePo.splice(i, 1);
                    }
                }
            },
            getEditFile: function (e, index) {
                vc.component.editContractInfo.tempfile = e.target.files[0];
                $that.editContractInfo.contractFilePo[index].fileRealName = vc.component.editContractInfo.tempfile.name;
                this._importEditData(index);
            },
            _importEditData: function (index) {
                // ????????????
                if (!vc.component.checkFileType(vc.component.editContractInfo.tempfile.name.split('.')[1])) {
                    vc.toast('?????????????????????????????????PDF???????????????');
                    return;
                }
                var param = new FormData();
                param.append("uploadFile", vc.component.editContractInfo.tempfile);
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
                            $that.editContractInfo.contractFilePo[index].fileSaveName = json;
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
            checkEditFileType: function (fileType) {
                const acceptTypes = ['png', 'pdf', 'jpg'];
                for (var i = 0; i < acceptTypes.length; i++) {
                    if (fileType === acceptTypes[i]) {
                        return true;
                    }
                }
                return false;
            },
            _loadFilesddd: function (_data) {
                $that.workflowSettingInfo.describle = _data.describle;
                let _steps = [];
                if (!_data.hasOwnProperty("workflowSteps")) {
                    return;
                }
            },
        }
    });
})(window.vc, window.vc.component);