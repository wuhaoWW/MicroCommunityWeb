(function (vc) {
    var DEFAULT_PAGE = 1;
    var DEFAULT_ROWS = 10;
    vc.extends({
        data: {
            listParkingSpaceInfo: {
                parkingSpaces: [],
                total: 0,
                records: 1,
                num: '',
                moreCondition: false,
                conditions: {
                    psId: '',
                    area: '',
                    paId: '',
                    areaNum: '',
                    state: ''
                },
                currentPage: DEFAULT_PAGE
            }
        },
        _initMethod: function () {
            vc.component._listParkingSpaceData(DEFAULT_PAGE, DEFAULT_ROWS);
        },
        _initEvent: function () {
            vc.on('listParkingSpace', 'listParkingSpaceData', function () {
                vc.component._listParkingSpaceData($that.listParkingSpaceInfo.currentPage, DEFAULT_ROWS);
                vc.component.listParkingSpaceInfo.num = '';
            });
            vc.on('listParkingSpace', 'chooseParkingArea', function (_parkingArea) {
                vc.component.listParkingSpaceInfo.conditions.paId = _parkingArea.paId;
                vc.component.listParkingSpaceInfo.conditions.areaNum = _parkingArea.num;
                vc.component.listParkingSpaceInfo.num = '';
            });
            vc.on('listParkingSpace', 'listParkingAreaData', function (_parkingArea) {
                vc.component.listParkingSpaceInfo.conditions.paId = _parkingArea.paId;
                vc.component._listParkingSpaceData(DEFAULT_PAGE, DEFAULT_ROWS);
                vc.component.listParkingSpaceInfo.num = '';
            });
            vc.on('pagination', 'page_event', function (_currentPage) {
                $that.listParkingSpaceInfo.currentPage = _currentPage;
                vc.component._listParkingSpaceData(_currentPage, DEFAULT_ROWS);
            });
        },
        methods: {
            _listParkingSpaceData: function (_page, _row) {
                var param = {
                    params: {
                        page: _page,
                        row: _row,
                        communityId: vc.getCurrentCommunity().communityId,
                        num: vc.component.listParkingSpaceInfo.num.trim(),
                        psId: vc.component.listParkingSpaceInfo.conditions.psId.trim(),
                        area: vc.component.listParkingSpaceInfo.conditions.area,
                        paId: vc.component.listParkingSpaceInfo.conditions.paId,
                        state: vc.component.listParkingSpaceInfo.conditions.state,
                    }
                }
                //??????get??????
                vc.http.apiGet('/parkingSpace.queryParkingSpaces',
                    param,
                    function (json, res) {
                        var listParkingSpaceData = JSON.parse(json);
                        vc.component.listParkingSpaceInfo.total = listParkingSpaceData.total;
                        vc.component.listParkingSpaceInfo.records = listParkingSpaceData.records;
                        vc.component.listParkingSpaceInfo.parkingSpaces = listParkingSpaceData.parkingSpaces;
                        vc.emit('pagination', 'init', {
                            total: vc.component.listParkingSpaceInfo.records,
                            dataCount: vc.component.listParkingSpaceInfo.total,
                            currentPage: _page
                        });
                    },
                    function (errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },
            _openAddParkingSpaceModal: function () { //???????????????
                vc.emit('addParkingSpace', 'openAddParkingSpaceModal', -1);
            },
            _openDelParkingSpaceModel: function (_parkingSpace) { // ?????????????????????
                vc.emit('deleteParkingSpace', 'openParkingSpaceModel', _parkingSpace);
            },
            _openEditParkingSpaceModel: function (_parkingSpace) {
                vc.emit('editParkingSpace', 'openEditParkingSpaceModal', _parkingSpace);
            },
            _openToSellParkingSpaceModel: function (_parkingSpace) { // ??????
                vc.jumpToPage('/#/pages/property/sellParkingSpace?' + vc.objToGetParam(_parkingSpace));
            },
            _openToHireParkingSpaceModel: function (_parkingSpace) { //??????
                vc.jumpToPage('/#/pages/property/hireParkingSpace?' + vc.objToGetParam(_parkingSpace));
            },
            _viewParkingSpaceState: function (state) {
                if (state == 'F') {
                    return "??????";
                } else if (state == 'S') {
                    return "?????????";
                } else if (state == 'H') {
                    return "?????????";
                } else {
                    return "??????";
                }
            },
            _viewParkingTypeCd: function (typeCd) {
                var result = '??????';
                switch (typeCd) {
                    case '1001':
                        result = '???????????????';
                        break;
                    case '2001':
                        result = '???????????????';
                        break;
                }
                return result;
            },
            //??????
            _queryRoomMethod: function () {
                vc.component._listParkingSpaceData(DEFAULT_PAGE, DEFAULT_ROWS);
            },
            //??????
            _resetRoomMethod: function () {
                vc.component.listParkingSpaceInfo.conditions.areaNum = "";
                vc.component.listParkingSpaceInfo.num = "";
                vc.component.listParkingSpaceInfo.conditions.state = "";
                vc.component.listParkingSpaceInfo.conditions.psId = "";
                vc.component.listParkingSpaceInfo.conditions.paId = "";
                vc.component._listParkingSpaceData(DEFAULT_PAGE, DEFAULT_ROWS);
            },
            _moreCondition: function () {
                if (vc.component.listParkingSpaceInfo.moreCondition) {
                    vc.component.listParkingSpaceInfo.moreCondition = false;
                } else {
                    vc.component.listParkingSpaceInfo.moreCondition = true;
                }
            },
            _openChooseParkingArea: function () {
                vc.emit('chooseParkingArea', 'openChooseParkingAreaModel', {});
            },
        }
    })
})(window.vc);