# config配置文件

## fetch.json
获取连接使用link，两者都获取就用both。这里没有download，主要是感觉这样太怪了，如果需要下载有link而没有下载的，后期添加这个功能。
```
{
    "which": "link" 
}
```

## mongo.json
数据库配置，如下：
```
{
    "address": "localhost",
    "port": "27017",
    "dbName": "GitBookSplider"
}
```

## url.json
请求连接配置，如下：
```
{
  "baseUrl": "https://www.gitbook.com/explore",
  "lang": "zh",
  "langName": "中文"
}
```