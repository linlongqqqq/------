import { MongoClient, Collection } from 'mongodb'
import { IUser, IFile, Ishare, ISession } from './models/types'

export let users: Collection<IUser>
export let files: Collection<IFile>
export let shares: Collection<Ishare>
export let sessions: Collection<ISession>

export async function init() {
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  const db = client.db()
  users = db.collection('users')
  files = db.collection('files')
  shares = db.collection('shares')
  sessions = db.collection('sessions')
  sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 14 * 24 * 3600 })
}
