# Laravel--passport

react-photo-->第三方应用程序相册管理：3000

api-passport-->passport后端：8080

react-admin-->passport后台：3001

apply-->apply前端：3003

api-picture-->pic后端：8082

## 流程

```
                          授权中心注册用户，登录 ---
                                                 |
                                                 |
客户端提交申请 --> 后台审批 --> 设置第三方跳转链接 -----> 跳转登录
```

