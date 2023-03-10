## 房屋费用操作流程

房屋收费主要包含房屋创建费用，查看房屋费用的页面，也可以实现缴费，这里我们推荐缴费可以通过业务受理页面缴费</br>

房屋创建费用流程：</br>

场景一：物业不关注历史缴费记录场景</br>

1、在房屋费用页面，点击自定义模板，选择需要创建的费用项，导出为Excel；</br>
2、物业可以根据导出的Excel填写建账时间和计费起始时间；</br>
3、建账时间为房屋每年缴费的时间，比如2019-01-01，不能大于当前时间，填写一个缴费时间即可;</br>
4、计费起始时间为该房屋费用缴到那一天了，比如房屋交了2022年度物业费，那么计费起始时间为2023-01-01;</br>
5、将填写好的excel,通过自定义导入方式，房屋创建费用，这里需要注意的时，周期性费用只需要第一次系统上线时创建；</br>
之后将不用再次创建，系统会自动产生费用;</br>

温馨提示：以上是周期性费用创建方式，如果一次性费用创建可以采用批量创建 或者费用导入页面导入的方式创建</br>
间接性费用更多适用于园区房屋出租场景，所以目前只能通过单个房屋创建使用</br>

场景二：物业关注历史缴费记录场景</br>

1、打开设置>系统>历史缴费导入页面;</br>
2、下载房屋模板，填写房屋历史缴费记录，收费项目必须和费用项设置页面中的收费项目一致，注意填写备注为系统上线导入；</br>
3、历史缴费导入页面导入，此时系统会检查该收费项目是否已经挂到房屋上，如果已经挂了，则缴费，没有挂，自动绑定关系，并自动缴费</br>
4、房屋收费页面查看费用和缴费记录;</br>

温馨提示：如果缴费记录太多时系统可能会超时，报错可以忽略，最终检查房屋上是否挂费用成功，建议分多个Excel导入；并且历史缴费的前后顺序不要错乱</br>
Excel中的所有列都是必填，没有可以留空的

房屋缴费流程：</br>

1、打开业务受理页面，根据房屋号，业主名称和业主电话等方式定位业主和房屋；</br>
2、点击房屋费用，查看房屋下的费用然后点击缴费；</br>
3、缴费可以按缴费周期，也可以按结束时间方式来缴费；</br>
4、如果是上个月的费用需要将缴费时间指定到之前的时间，可以点击缴费时间，进行修改;</br>
5、缴费完成后，可以打印收据，浏览器默认打印设置，缩放50%，最小边距，取消页眉页脚；具体根据实际情况调整;</br>
6、如果多个缴费记录打印在一起，可以返回在业务受理页面的补打收据页面，选择后补打；</br>

退费流程：</br>
退费主要是缴费错误，或者押金等的退费；</br>
1、业务受理页面定位房屋，点击房屋费用页面下选择要退费的费用；</br>
2、点击缴费历史进入，点击要退费的记录点击退费；</br>
3、打开退费审核页面，点击审核通过;</br>
4、在业务受理页面，房屋费用查看，是否费用退费成功;</br>

按量缴费流程:</br>
1、首先在费用项必须存在一个费用项公式为 用量* 单价+附加费；</br>
2、在业务受理页面，选择房屋收费 点击按量收费，创建费用；</br>
3、将创建的费用缴费；</br>
温馨提示：使用于水电代收，比如缴100元算出多少度电，然后去电表系统充电，还有就是门禁费，施工进场费等都可以用此功能</br>

单房屋创建费用流程：</br>
1、业务受理页面，根据房屋号，业主名称和业主电话等方式定位业主和房屋；</br>
2、点击创建费用功能，再房屋上创建费用;</br>

费用套餐流程：</br>
费用套餐主要是用于，对于园区房屋出租经常变动，所以可以打包多个 费用为一个费用套餐</br>
可以通过创建套餐的方式将打包的费用批量创建到房屋上;</br>

### 房屋收费

重要字段说明：</br>

费用项目:和费用项设置中费用项目一致;</br>
费用标识:分为周期性 一次性和间接性;</br>
应收金额:当前欠费金额;</br>
建账时间:缴费基准时间，计费结束时间根据 建账时间 和 费用项缴费周期来确定，简单理解为每年业主的缴费时间点;</br>
这里存在一个场景时 收费是按自然月收费还是按非自然月收费，如果自然月收费，那么建账时间就调整为1月1日，如果非自然月收费</br>
那么建账时间和缴费起始时间一致即可</br>
计费起始时间:开始计费的时间，业主已经交缴2022年度物业费，那么这个时间为2023-01-01(业主费用缴到2022年12月31日)</br>
计费结束时间：当前周期内的计费结束时间，基于建账时间计算，是建账时间的缴费周期倍(缴费周期是费用项中设置的)；</br>
状态：分为 收费中状态和收费结束状态；</br>
收费中状态：表明该费用对于房屋还是有效的</br>
收费结束状态：表明该费用已经完成，之后将不会产生欠费</br>

重要按钮说明：</br>
变更：表示费用计费不合适，需要变更，则可以点击变更，这里变更建账时间和计费起始时间，因为计费结束时间是根据建账时间，计费起始时间和缴费周期动态</br>
生成的所以不需要变更</br>

取消：如果费用创建错了，可以取消费用，如果批量创建错误了，可以查看费用的批次号，然后到取消费用页面批量取消;</br>
手工结束：费用之后将不在产生欠费时可以手工结束，不要取消因为有缴费记录 取消是不合适的，手工结束比较合适;</br>

