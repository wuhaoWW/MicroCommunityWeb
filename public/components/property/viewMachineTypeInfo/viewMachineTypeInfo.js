/**
    设备类型 组件
**/
(function(vc){

    vc.extends({
        propTypes: {
           callBackListener:vc.propTypes.string, //父组件名称
           callBackFunction:vc.propTypes.string //父组件监听方法
        },
        data:{
            viewMachineTypeInfo:{
                index:0,
                flowComponent:'viewMachineTypeInfo',
                typeId:'',
machineTypeCd:'',
machineTypeName:'',
statusCd:'',

            }
        },
        _initMethod:function(){
            //根据请求参数查询 查询 业主信息
            vc.component._loadMachineTypeInfoData();
        },
        _initEvent:function(){
            vc.on('viewMachineTypeInfo','chooseMachineType',function(_app){
                vc.copyObject(_app, vc.component.viewMachineTypeInfo);
                vc.emit($props.callBackListener,$props.callBackFunction,vc.component.viewMachineTypeInfo);
            });

            vc.on('viewMachineTypeInfo', 'onIndex', function(_index){
                vc.component.viewMachineTypeInfo.index = _index;
            });

        },
        methods:{

            _openSelectMachineTypeInfoModel(){
                vc.emit('chooseMachineType','openChooseMachineTypeModel',{});
            },
            _openAddMachineTypeInfoModel(){
                vc.emit('addMachineType','openAddMachineTypeModal',{});
            },
            _loadMachineTypeInfoData:function(){

            }
        }
    });

})(window.vc);
