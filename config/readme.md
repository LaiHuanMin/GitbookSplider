# config配置文件

## fetch.json
获取内容使用download，获取连接使用link，两者都获取就用both 
```
{
    "which": "download" 
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