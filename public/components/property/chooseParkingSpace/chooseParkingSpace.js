(function(vc) {
    var DEFAULT_PAGE = 1;
    var DEFAULT_ROWS = 10;
    vc.extends({
        propTypes: {
            emitLoadData: vc.propTypes.string
        },
        data: {
            chooseParkingSpaceInfo: {
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
                currentPage: DEFAULT_PAGE,
                data: {}
            }
        },
        _initMethod: function() {},
        _initEvent: function() {
            vc.on('chooseParkingSpace', 'openChooseParkingSpaceModel', function(_param) {
                $that.chooseParkingSpaceInfo.data = _param;
                $that.chooseParkingSpaceInfo.conditions.paId = _param.paId;
                $('#chooseParkingSpaceModel').modal('show');
                vc.component._refreshChooseParkingSpaceInfo();
                vc.component._listParkingSpaceData(1, 10);
            });
            vc.on('chooseParkingSpace', 'paginationPlus', 'page_event', function(_currentPage) {
                vc.component._listParkingSpaceData(_currentPage, 10);
            });
        },
        methods: {
            _listParkingSpaceData: function(_page, _row) {
                var param = {
                        params: {
                            page: _page,
                            row: _row,
                            communityId: vc.getCurrentCommunity().communityId,
                            num: vc.component.chooseParkingSpaceInfo.num,
                            psId: vc.component.chooseParkingSpaceInfo.conditions.psId,
                            area: vc.component.chooseParkingSpaceInfo.conditions.area,
                            paId: vc.component.chooseParkingSpaceInfo.conditions.paId,
                            state: vc.component.chooseParkingSpaceInfo.conditions.state,
                        }
                    }
                    //??????get??????
                vc.http.apiGet('/parkingSpace.queryParkingSpaces',
                    param,
                    function(json, res) {
                        var listParkingSpaceData = JSON.parse(json);
                        vc.component.chooseParkingSpaceInfo.total = listParkingSpaceData.total;
                        vc.component.chooseParkingSpaceInfo.records = listParkingSpaceData.records;
                        vc.component.chooseParkingSpaceInfo.parkingSpaces = listParkingSpaceData.parkingSpaces;
                        vc.emit('chooseParkingSpace', 'paginationPlus', 'init', {
                            total: vc.component.chooseParkingSpaceInfo.records,
                            dataCount: vc.component.chooseParkingSpaceInfo.total,
                            currentPage: _page
                        });
                    },
                    function(errInfo, error) {
                        console.log('??????????????????');
                    }
                );
            },


            chooseParkingSpace: function(_ParkingSpace) {
                if (_ParkingSpace.hasOwnProperty('name')) {
                    _ParkingSpace.ParkingSpaceName = _ParkingSpace.name;
                }
                $that.chooseParkingSpaceInfo.data.psId = _ParkingSpace.psId;
                $that.chooseParkingSpaceInfo.data.psName = _ParkingSpace.num;

                vc.emit($props.emitLoadData, 'listParkingSpaceData', {
                    paId: _ParkingSpace.paId
                });
                $('#chooseParkingSpaceModel').modal('hide');
            },
            queryParkingSpaces: function() {
                vc.component._listParkingSpaceData(1, 10, vc.component.chooseParkingSpaceInfo._currentParkingSpaceName);
            },
            _refreshChooseParkingSpaceInfo: function() {
                vc.component.chooseParkingSpaceInfo._currentParkingSpaceName = "";
            },
            _viewParkingSpaceState: function(state) {
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
            _viewParkingTypeCd: function(typeCd) {
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

        }

    });
})(window.vc);