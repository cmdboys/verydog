
Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```

## 未来实现
### 1.定时抓取大佬的微博信息，存数据库
#### 实现
接口
```html
https://m.weibo.cn/api/container/getIndex?containerid=2304131761511274_-_WEIBO_SECOND_PROFILE_WEIBO&page_type=03&page=1
```
* containerid = 大佬的用户id
* page = 分页
* 默认抓取一页即可