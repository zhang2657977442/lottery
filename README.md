# 抽奖小程序-幸运福利抽奖

:star:一款基于云开发编写的抽奖小程序幸运福利抽奖，用户通过兑换码来获得抽奖次数，支持自定义奖品。使用云开发搭建，无需后端服务，简单方便快捷。建议使用微信开发者打开，适合学习\二次开发等用途。

## 功能模块

+ 兑换次数
+ 幸运抽奖
+ 编辑奖品
+ 中奖记录
+ 收货地址

## 项目截图

![](https://github.com/zhang2657977442/MyPicGo/blob/master/lottery/%E6%88%AA%E5%9B%BE1.png?raw=true)![](https://github.com/zhang2657977442/MyPicGo/blob/master/lottery/%E6%88%AA%E5%9B%BE2.png?raw=true)![](https://github.com/zhang2657977442/MyPicGo/blob/master/lottery/%E6%88%AA%E5%9B%BE3.png?raw=true)![](https://github.com/zhang2657977442/MyPicGo/blob/master/lottery/%E6%88%AA%E5%9B%BE4.png?raw=true)

## 运行步骤

+ 微信开发者工具运行项目
+ 创建一个云开发环境

+  修改app.js文件中的云开发环境配置

![](https://github.com/zhang2657977442/MyPicGo/blob/master/lottery/envid.png?raw=true)

+ 绑定环境上传并部署云函数

![](https://github.com/zhang2657977442/MyPicGo/blob/master/lottery/%E4%B8%8A%E4%BC%A0%E4%BA%91%E5%87%BD%E6%95%B0.png?raw=true)

+ 创建下面四种集合（exchange_code、lottery_record、prize、user）

![](https://github.com/zhang2657977442/MyPicGo/blob/master/lottery/%E5%88%9B%E5%BB%BA%E9%9B%86%E5%90%88.png?raw=true)

+ 修改集合数据权限，把exchange_code、prize集合改为所有用户可读，其他集合默认

![](https://github.com/zhang2657977442/MyPicGo/blob/master/lottery/%E4%BF%AE%E6%94%B9%E6%9D%83%E9%99%90.png?raw=true)

+ 导入兑换码数据，把data中的兑换码.csv导入到exchange_code集合中

+ 导入奖品数据，把data中的奖品清单.csv导入到prize集合中==**（根据以下字段，可以自定义奖品）**==
    + `type`字段表示奖品类型： `cash`（现金）、`goods`（实物）
    + `odds`字段表示中奖概率： 31表示31%几率中奖
    + `inventory`字段表示奖品库存：-1表示无限（库存为0的奖品永远抽不到）
    + `cash`字段表示现金奖励的金额额度
    + `img_url`字段表示奖品图片链接
    + `name`字段表示奖品名称


## 注意事项

由于对接微信支付需要营业执照，零钱到账功能暂未实现，如有需要可自行对接[微信支付](https://pay.weixin.qq.com/)


## 开源不易 谢谢支持

![](https://raw.githubusercontent.com/zhang2657977442/MyPicGo/master/other/%E8%B5%9E%E8%B5%8F%E7%A0%81.jpg)

如有问题请联系
+ QQ：2657977449 
+ 微信：zhang2657977449

