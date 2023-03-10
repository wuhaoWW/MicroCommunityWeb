(function(vc) {

    vc.extends({
        data: {
            storeEnterCommunityInfo: {
                communityInfo: [],
                errorInfo: '',
                searchCommunityName: '',
            }
        },
        _initMethod: function() {},
        _initEvent: function() {
            vc.on('storeEnterCommunity', 'openStoreEnterCommunity', function(_params) {
                $('#storeEnterCommunityModel').modal('show');
                vc.component.storeEnterCommunityInfo.searchCommunityName = '';
                vc.component.listNoEnterCommunity();
            });
        },
        methods: {
            listNoEnterCommunity: function() {
                var param = {
                        params: {
                            communityName: vc.component.storeEnterCommunityInfo.searchCommunityName
                        }

                    }
                    //发送get请求
                vc.http.get('storeEnterCommunity',
                    'listNoEnterCommunity',
                    param,
                    function(json, res) {
                        vc.component.storeEnterCommunityInfo.communityInfo = JSON.parse(json);
                    },
                    function(errInfo, error) {
                        console.log('请求失败处理');
                    }
                );
            },
            _saveEnterCommunity: function(_communityInfo) {
                var _param = {
                    communityId: _communityInfo.communityId
                };
                //发送get请求
                vc.http.apiPost('/member.join.community',
                    JSON.stringify(_param), {
                        emulateJSON: true
                    },
                    function(json, res) {
                        if (res.status == 200) {
                            vc.emit('enterCommunity', 'listMyCommunity', {});
                            $('#storeEnterCommunityModel').modal('hide');

                            return;
                        }
                        vc.component.storeEnterCommunityInfo.errorInfo = json;
                    },
                    function(errInfo, error) {
                        console.log('请求失败处理');
                        vc.component.storeEnterCommunityInfo.errorInfo = json;

                    }
                );
            }
        }
    });
})(window.vc);