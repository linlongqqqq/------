# TODO -server -web

-------

## 工具
- 数据库：mongoDB
- 接口：postman
- 编程： VScode
- 库：joi , koa , antd-mobile , crypto , 阿里字体库。


## 思路

- 先编写服务器接口，在实现页面。
- 需要两个controllers 分别为task.ts 、user.ts 分别用来检验用户输入到接口的数据是否规范。
- 使用joi 来检验用户输入的数据是否合法。封装validate.ts 来帮助实现。
具体用法：
    // 创建用户
    router.post('/create', async (ctx) => {
      const value = validate(
    ctx.request.body,
    Joi.object({
      account: Joi.string().max(20).required(),
      nickname: Joi.string().max(20).required(),
      password: Joi.string().max(20).required(),
      createdAt: new Date(),
    })
      )
      const _id = await userService.create(value)
      ctx.body = new JsonResp({
    _id,
      })
    })
- 同时封装一个state 来定义出错的状态。

###  中间件
- checkError ：通过监测ctx.state 的状态来抛出错误。
- cehckLogin : 设置白名单：登录/注册，当未登陆的时候只有这两个接口是可以正常使用的，其他的都要封死。
- logger ：打印日志文件，帮助开发者找到其中的错误。 定义了几个变量 time、method 、url 、 IP 、status、cost 、

### 数据库
- 采用mongoDB。
- 新建db.ts 用来连接数据库，并建立三个字库: users , tasks, sessions, 分别存放 用户的信息 ，所有任务的信息。以及当前登录用户的session 信息。 
- 其中sessions的数据只保留2个星期

#### 操纵数据库
- service 文件夹下有3个文件，分别对应着3个数据库。
- user 里面定义了 创建用户 、登录用户、获取用户信息、修改密码、密码加盐、等方法。
- task 里面定义了 创建任务、更新任务、删除任务、展示任务列表。
- session 里面定义了创建、删除 session 数据

具体实现分为 get 和 post 方法。
- get方法则通过cookie将用户的sid 传到后端，接受之后从sessions 里面查到对应的用户id，以便后续操作。 
- post方法则是通过使用controllers来校验数据，若数据没有问题则传递给service里面，

### index.ts
- 调用各种中间件，并且设置要监听的端口号。



## web

- 从阿里字体库选择所需要的字体图标。

### 页面
- app：主页面，用于挂载路由。
- Dask ：任务页面，登录后的首页
- finish ： 完成页面
- important ：重要任务界面
- login ：登陆界面
- register ：注册界面
- main ：用于存放菜单，挂在任务界面 
- repass ：修改密码

### 组件：
IAIbunItem 对于列表数据进行分别渲染。

### hooks

- store ：存放全局数据
- useAjax : 进行页面拦截，检验用户是否登录，如果没登陆则右上角会显示登录按钮，若登录了就不显示。再非登录状态下用户不能进行任何操作。
- useTasks 获取接口里面的后台数据。
- useUser 获取用户数据，用来检验用户是否是登陆状态。 
