import { Request, Response } from 'express'
import { db } from '../database/connection'

export async function listConnections(_: Request, res: Response) {
  const [{ total }] = await db('connections').count('* as total')

  return res.json({ total })
}

export async function createConnection(req: Request, res: Response) {
  const { user_id } = req.body

  await db('connections').insert({ user_id })
}
