import { Request, Response } from 'express'
import { db } from '../database/connection'
import { convertHourToMinutes } from '../utils'

interface ScheduleItem {
  week_day: number
  from: string
  to: string
}

interface ClassQuery {
  week_day: number
  subject: string
  time: string
}

export async function listClasses(req: Request, res: Response) {
  const query = req.query as any
  const { week_day, subject, time } = query as ClassQuery

  if (!week_day || !subject || !time) {
    return res.status(400).json({ error: 'Missing filters to search classes' })
  }

  const timeInMinutes = convertHourToMinutes(time)

  const classes = await db('classes')
    .whereExists(function () {
      this.select('class_schedule.*')
        .from('class_schedule')
        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
        .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
    })
    .where('classes.subject', '=', subject)
    .join('users', 'classes.user_id', '=', 'users.id')
    .select(['classes.*', 'users.*'])

  return res.json(classes)
}

export async function createClass(req: Request, res: Response) {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body

  const trx = await db.transaction()
  try {
    const [user_id] = await trx('users').insert({ name, avatar, whatsapp, bio })
    const [class_id] = await trx('classes').insert({ subject, cost, user_id })

    const classSchedule = schedule.map(({ week_day, from, to }: ScheduleItem) => ({
      week_day,
      from: convertHourToMinutes(from),
      to: convertHourToMinutes(to),
      class_id
    }))

    await trx('class_schedule').insert(classSchedule)

    await trx.commit()

    return res.status(201).send()
  } catch (err) {
    await trx.rollback()
    return res.status(400).json({ error: 'Unexpected error while creating a new class' })
  }
}
