# note-font

## 运行
	npm run dev
# or
	yarn dev
## 下载依赖 
	npm i
## 导入的包
	"antd-mobile": "^5.19.0",
    "antd-mobile-icons": "^0.3.0",
    "axios": "^0.27.2",
    "classnames": "^2.3.1",
    "dayjs": "^1.11.4",
    "http-proxy": "^1.18.1",
    "next": "12.2.3",
    "next-transpile-modules": "^9.0.0",
    "react": "18.2.0",
    "react-copy-to-clipboard": "^5.1.0",
    "react-dom": "18.2.0",
    "react-quill": "^1.3.5"

### public 文件夹下仅仅存放了 img文件夹，用来放图片
### components: 组件里封装了六个

- FileItem：
> 用来渲染每一个列表的每一项，前面的文件文件夹图标根据传入的isFolder判断是文件还是文件夹，来渲染。
> 中间的内容区域分为两行，分辨渲染标题和时间。点击时会使用router.push 方法来跳转页面。
> 
> `具体用法 ：`
> `import { useRouter } from 'next/router'`
> `const router = useRouter()`
> `router.push('/folder/' + file._id)` 
> 括号里面填写跳转的地址
> 最后放菜单图标。

- shareFileItem :和第一个类似，就是传入的数据结构不同，导致不可复用，需要重新写。
- Share ：点击share出现的弹出框，用于分享连接
- MainLayout ：跳转路由，下方的导航栏。
- lsitMenu: 点击菜单弹出来的菜单栏。用于打开文件、分享、重命名、删除等。
- ShareIcon：图标组件

### hooks

- 全局共享数据store 获取文件的hook。

### pages
- 登录、注册、重置密码、个人中心、最近文件、文件夹页、分享页、

# 对于next 知识点

- 每个页面就是独立的路由，不需要单独配置路由，文件夹的名字就是路由地址，index.tsx 的地址是 `'/'`
- 子路由、或者说动态路由只需要在该页面文件夹下面新建文件[_id].tsx 名字可自取。
- 每个页面在渲染的时候需要向后台请求数据。
- 引入了富文本编辑器

具体的知识点笔记就不在这里记录了，有专门软件。。。