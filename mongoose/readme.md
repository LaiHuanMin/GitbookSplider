# mongoose Readme file

## 配置
请在根目录`/config/mongo.json`的json文件里配置，项目启动之后不能再更换

## mongoose/bunyan
用于输出日志和控制台，文件统一存放在`/logger/mongodb/`

## mongoose/schema
指定schema

## mongoose/model
指定model

## tips
在使用该模块之后，全局变量会增加：
```js
global.MongoUtil = {
    log,
    mongoose,
    schema: {
        actionTime: SCHEMA_actionTime(mongoose),
        locationFile: SCHEMA_locationFile(mongoose)
    },
    model: {
        ...
    }
};
```