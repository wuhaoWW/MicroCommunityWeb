(function (vc, vm) {

    vc.extends({
        data: {
            editApplicationKeyInfo: {
                applicationKeyId: '',
                name: '',
                tel: '',
                typeCd: '',
                sex: '',
                age: '',
                idCard: '',
                startTime: '',
                endTime: '',
                floorId: '',
                floorNum: '',
                floorName: '',
                unitId: '',
                unitNum: '',
                roomId: '',
                locationTypeCd: '',
                locationObjId: '',
                roomName: '',
                videoPlaying: false,
                photo: '',
                mediaStreamTrack: null,
                typeFlag:'',
            }
        },
        _initMethod: function () {
            vc.component._initEditApplicationKeyDateInfo();
            //vc.component._initEditApplicationKeyMedia();


        },
        _initEvent: function () {
            vc.on('editApplicationKey', 'openEditApplicationKeyModal', function (_params) {
                vc.component.refreshEditApplicationKeyInfo();
                // $('#editApplicationKeyModel').modal('show');
                vc.copyObject(_params, vc.component.editApplicationKeyInfo);
                if (vc.component.editApplicationKeyInfo.locationTypeCd == '2000') {
                    vc.emit('editApplicationKey', 'floorSelect2', 'setFloor', {
                        floorId: vc.component.editApplicationKeyInfo.floorId,
                        floorNum: vc.component.editApplicationKeyInfo.floorNum
                    });
                    vc.emit('editApplicationKey', 'unitSelect2', 'setUnit', {
                        floorId: vc.component.editApplicationKeyInfo.floorId,
                        floorNum: vc.component.editApplicationKeyInfo.floorNum,
                        unitId: vc.component.editApplicationKeyInfo.unitId,
                        unitNum: vc.component.editApplicationKeyInfo.unitNum,
                    });
                } else if (vc.component.editApplicationKeyInfo.locationTypeCd == '3000') {
                    vc.emit('editApplicationKey', 'floorSelect2', 'setFloor', {
                        floorId: vc.component.editApplicationKeyInfo.floorId,
                        floorNum: vc.component.editApplicationKeyInfo.floorNum
                    });
                    vc.emit('editApplicationKey', 'unitSelect2', 'setUnit', {
                        floorId: vc.component.editApplicationKeyInfo.floorId,
                        floorNum: vc.component.editApplicationKeyInfo.floorNum,
                        unitId: vc.component.editApplicationKeyInfo.unitId,
                        unitNum: vc.component.editApplicationKeyInfo.unitNum,
                    });
                    vc.emit('editApplicationKey', 'roomSelect2', 'setRoom', {
                        floorId: vc.component.editApplicationKeyInfo.floorId,
                        floorNum: vc.component.editApplicationKeyInfo.floorNum,
                        unitId: vc.component.editApplicationKeyInfo.unitId,
                        unitNum: vc.component.editApplicationKeyInfo.unitNum,
                        roomId: vc.component.editApplicationKeyInfo.roomId,
                        roomNum: vc.component.editApplicationKeyInfo.roomNum,
                    });
                }
                vc.component.editApplicationKeyInfo.communityId = vc.getCurrentCommunity().communityId;


            });

            vc.on('editApplicationKey', "_initEditApplicationKeyData", function () {
                vc.component._initEditApplicationKeyMedia();
            });

            vc.on("editApplicationKey", "notify", function (_param) {
                if (_param.hasOwnProperty("floorId")) {
                    vc.component.editApplicationKeyInfo.floorId = _param.floorId;
                }

                if (_param.hasOwnProperty("unitId")) {
                    vc.component.editApplicationKeyInfo.unitId = _param.unitId;
                }

                if (_param.hasOwnProperty("roomId")) {
                    vc.component.editApplicationKeyInfo.roomId = _param.roomId;
                }
            });
        },
        methods: {
            _initEditApplicationKeyDateInfo: function () {
                vc.component.editApplicationKeyInfo.startTime = vc.dateTimeFormat(new Date().getTime());
                $('.editApplicationStartTime').datetimepicker({
                    language: 'zh-CN',
                    fontAwesome: 'fa',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true

                });
                $('.editApplicationStartTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".editApplicationStartTime").val();
                        vc.component.editApplicationKeyInfo.startTime = value;
                    });
                $('.editApplicationEndTime').datetimepicker({
                    language: 'zh-CN',
                    fontAwesome: 'fa',
                    format: 'yyyy-mm-dd hh:ii:ss',
                    initTime: true,
                    initialDate: new Date(),
                    autoClose: 1,
                    todayBtn: true
                });
                $('.editApplicationEndTime').datetimepicker()
                    .on('changeDate', function (ev) {
                        var value = $(".editApplicationEndTime").val();
                        vc.component.editApplicationKeyInfo.endTime = value;
                    });
            },
            editApplicationKeyValidate: function () {
                return vc.validate.validate({
                    editApplicationKeyInfo: vc.component.editApplicationKeyInfo
                }, {
                    'editApplicationKeyInfo.name': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????"
                        },
                        {
                            limit: "maxin",
                            param: "1,64",
                            errInfo: "??????????????????64???"
                        },
                    ],
                    'editApplicationKeyInfo.tel': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "?????????????????????"
                        },
                        {
                            limit: "phone",
                            param: "",
                            errInfo: "?????????????????????"
                        },
                    ],
                    'editApplicationKeyInfo.typeCd': [
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
                    'editApplicationKeyInfo.sex': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "??????????????????"
                        }
                    ],
                    'editApplicationKeyInfo.age': [
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
                    'editApplicationKeyInfo.idCard': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "idCard",
                            param: "",
                            errInfo: "???????????????????????????"
                        },
                    ],
                    'editApplicationKeyInfo.startTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "???????????????????????????"
                        },
                    ],
                    'editApplicationKeyInfo.endTime': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        },
                        {
                            limit: "dateTime",
                            param: "",
                            errInfo: "???????????????????????????"
                        },
                    ],
                    'editApplicationKeyInfo.applicationKeyId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????ID????????????"
                        }],
                    'editApplicationKeyInfo.locationTypeCd': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        }
                    ],
                    'editApplicationKeyInfo.locationObjId': [
                        {
                            limit: "required",
                            param: "",
                            errInfo: "????????????????????????"
                        }
                    ]

                });
            },
            editApplicationKey: function () {
                vc.component.editApplicationKeyInfo.communityId = vc.getCurrentCommunity().communityId;
                if (vc.component.editApplicationKeyInfo.locationTypeCd != '2000' && vc.component.editApplicationKeyInfo.locationTypeCd != '3000') { //?????????????????? ??????ID
                    vc.component.editApplicationKeyInfo.locationObjId = vc.component.editApplicationKeyInfo.communityId;
                } else if (vc.component.editApplicationKeyInfo.locationTypeCd == '2000') {
                    vc.component.editApplicationKeyInfo.locationObjId = vc.component.editApplicationKeyInfo.unitId;
                } else if (vc.component.editApplicationKeyInfo.locationTypeCd == '3000') {
                    vc.component.editApplicationKeyInfo.locationObjId = vc.component.editApplicationKeyInfo.roomId;
                } else {
                    vc.toast("?????????????????????");
                    return;
                }
                if (!vc.component.editApplicationKeyValidate()) {
                    vc.toast(vc.validate.errInfo);
                    return;
                }

                vc.http.apiPost(
                    '/applicationKey.updateApplicationKey',
                    JSON.stringify(vc.component.editApplicationKeyInfo),
                    {
                        emulateJSON: true
                    },
                    function (json, res) {
                        //vm.menus = vm.refreshMenuActive(JSON.parse(json),0);
                        if (res.status == 200) {
                            //??????model
                            $('#editApplicationKeyModel').modal('hide');
                            vc.emit('applicationKeyManage', 'listApplicationKey', {});
                            return;
                        }
                        vc.toast(json);
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');

                        vc.toast(errInfo);
                    });
            },
            refreshEditApplicationKeyInfo: function () {
                vc.component.editApplicationKeyInfo = {
                    applicationKeyId: '',
                    name: '',
                    tel: '',
                    typeCd: '',
                    sex: '',
                    age: '',
                    idCard: '',
                    startTime: '',
                    endTime: '',
                    floorId: '',
                    floorNum: '',
                    floorName: '',
                    unitId: '',
                    unitNum: '',
                    roomId: '',
                    locationTypeCd: '',
                    locationObjId: '',
                    roomName: '',
                    videoPlaying: false,
                    photo: '',
                    mediaStreamTrack: null,
                    typeFlag:'',
                }
            },
            _closeEditApplicationKeyView: function () {
                vc.emit('applicationKeyManage', 'listApplicationKey', {});
                //?????????????????????
                if (vc.component.editApplicationKeyInfo.mediaStreamTrack != null) {
                    vc.component.editApplicationKeyInfo.mediaStreamTrack.stop();
                }
            },
            _editUserMedia: function () {
                return navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia || null;
            },
            _initEditApplicationKeyMedia: function () {
                if (vc.component._editUserMedia()) {
                    vc.component.editApplicationKeyInfo.videoPlaying = false;
                    var constraints = {
                        video: true,
                        audio: false
                    };
                    var editVideo = document.getElementById('editApplicationKeyPhoto');
                    var media = navigator.getUserMedia(constraints, function (stream) {
                        var url = window.URL || window.webkitURL;
                        //video.src = url ? url.createObjectURL(stream) : stream;

                        vc.component.editApplicationKeyInfo.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
                        try {
                            editVideo.src = url ? url.createObjectURL(stream) : stream;
                        } catch (error) {
                            editVideo.srcObject = stream;
                        }
                        editVideo.play();
                        vc.component.editApplicationKeyInfo.videoPlaying = true;
                    }, function (error) {
                        console.log("ERROR");
                        console.log(error);
                    });
                } else {
                    console.log("?????????????????????");
                }
            },
            _takeEditPhoto: function () {
                if (vc.component.editApplicationKeyInfo.videoPlaying) {
                    var canvas = document.getElementById('editApplicationKeyCanvas');
                    var takeEditVideo = document.getElementById('editApplicationKeyPhoto');
                    canvas.width = takeEditVideo.videoWidth;
                    canvas.height = takeEditVideo.videoHeight;
                    canvas.getContext('2d').drawImage(takeEditVideo, 0, 0);
                    var data = canvas.toDataURL('image/jpeg',1.0);
                    vc.component.editApplicationKeyInfo.photo = data;
                    //document.getElementById('photo').setAttribute('src', data);
                }
            },
            _uploadEditPhoto: function (event) {
                $("#uploadEditApplicationKeyPhoto").trigger("click")
            },
            _chooseEditPhoto: function (event) {
                var photoFiles = event.target.files;
                if (photoFiles && photoFiles.length > 0) {
                    // ???????????????????????????
                    var file = photoFiles[0];// ???????????????????????????
                    if (file.size > 1024 * 1024 * 1) {
                        vc.toast("???????????????????????? 2MB!")
                        return false;
                    }
                    var reader = new FileReader(); //??????FileReader??????
                    reader.readAsDataURL(file); //?????????base64
                    reader.onloadend = function (e) {
                        vc.component.editApplicationKeyInfo.photo = reader.result;
                    }
                }
            },
        }
    });

})(window.vc, window.vc.component);
