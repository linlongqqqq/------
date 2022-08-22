import { MongoClient, Collection } from 'mongodb'
import { IUser, ITask, ISession } from './models/types'

export let users: Collection<IUser>
export let tasks: Collection<ITask>
export let sessions: Collection<ISession>

export async function init() {
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  const db = client.db()
  users = db.collection('users')
  tasks = db.collection('tasks')
  sessions = db.collection('sessions')
  sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 14 * 24 * 3600 })
}
