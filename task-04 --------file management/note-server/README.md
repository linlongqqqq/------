# note-service

## 下载依赖
    npm i
## 运行项目
	npm start
## 用到的包
	"dependencies": {
    "dayjs": "^1.11.3",
    "dotenv": "^16.0.1",
    "joi": "^17.6.0",
    "koa": "^2.13.4",
    "koa-body": "^5.0.0",
    "koa-router": "^11.0.1",
    "mongodb": "^4.7.0"

## 数据结构

1.. 用户表

    // 用户
    export interface IUser {
      _id?: ObjectId
      // 账号
      account: string
      // 昵称
      nickname: string
      // 加密之后的密码
      password: string
      // 密码加密的盐
      salt: string
      // 用户状态
      // status: UserStatus
      // 创建时间
      createdAt: Date
    }

2.. 文件表
    
    export interface IFile {
      _id?: ObjectId
      // 父id
      pid: string
      // 标题
      title: string
      // 是否是文件夹
      isFolder: boolean
      // 用户的_id
      userId: ObjectId
      // 笔记
      note?: string
      // 创建时间
      createdAt: Date
    }

3.. 会话表

    // 会话
    export interface ISession {
      // session id
      sid: string
      // 关联的用户_id
      userId: ObjectId
      // 登录的ip地址
      ip: string
      // 创建时间
      createdAt: Date
    }

4. 分享表
    
    export interface Ishare {
      // 浏览次数
      userId: ObjectId
      url: string
      viewed: number
      noteId: ObjectId
      createdAt: Date
    }


# 与上次作业的变化

## 接口方面

1. 用到了数据库的聚合查询
如例
>     export async function list(userId: string, skip = 0, limit = 10) {
>       const match: Filter<IFile= {
>     userId: new ObjectId(userId),
>       }
>       const files = await db.shares
>     .aggregate([
>       {
>     $match: match,
>       },
>       {
>     $lookup: {
>       from: 'files',
>       localField: 'noteId',
>       foreignField: '_id',
>       as: '_files',
>     },
>       },
>       {
>     $unwind: {
>       path: '$_files',
>       preserveNullAndEmptyArrays: true,
>     },
>       },
>       {
>     $addFields: {
>       noteId: '$_files._id',
>       title: '$_files.title',
>     },
>       },
>       {
>     $sort: { createdAt: -1, name: 1 },
>       },
>       {
>     $skip: skip,
>       },
>       {
>     $limit: limit,
>       },
>       {
>     $project: {
>       userId: 1,
>       createdAt: 1,
>       title: 1,
>       noteId: 1,
>     },
>       },
>     ])
>     .toArray()
>       const total = await db.shares.countDocuments()
>       return { files, total }
>     }

- $match 作用： 筛选的条件，类似于正常从数据库里进行筛选的语言。
- $lookup 作用： 连接其他的表。 - from： 表名   - localField :当前表与另一个表连接的相同地方， - foreignField :另一个表的相同点。 - as ：别名
- $unwind ：传路径
- $addFields: 从另一个表里拿出来的数据，并且取一个新名字
- $sort: 排序 1：正序  -1：倒序
- $skip :起始位置
- $limit :截至位置
- $project: 最后输出的数据   1：代表输出 ，0：代表不输出

2. 更新数据

>     // 查看详情
>     export async function show(url: string) {
>       const share = await db.shares.findOne({
>     url: url,
>       })
>       const file = await db.files.findOne({
>     _id: share.noteId,
>       })
>       const note = file.note
>       const viewed = share.viewed + 1
>       await db.shares.updateOne(
>     {
>       _id: share._id,
>     },
>     {
>       $set: { viewed: viewed },
>     }
>       )
>       if (!file) throw stats.ErrTaskNotFound
>       const obj = {
>     note: note,
>     viewed: viewed,
>     title: file.title,
>       }
>       return obj
>     }

前面的{}里面写查询的条件，后面{}里面写更新的数据，$set 必须写，括号里面写更新的数据。


整体来说后端和上周作业没有什么太大的区别，都是用来提供数据的。
接方面就是多了几个接口，并且多了一个分享数据的表，


其中有一点是值得注意的，就是写后端之前一定要把数据结构设计好，并且每个接口需要什么数据，一定要仔细设计一下，不然前端实现的时候总是需要不断的改数据。