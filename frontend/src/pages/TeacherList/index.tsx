import React, { useState, FormEvent } from 'react'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import { api } from '../../services/api'

import './styles.css'

function TeacherList() {
  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')
  const [teachers, setTeachers] = useState([])

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault()

    const teachers = await api
      .get('/classes', {
        params: {
          subject,
          week_day,
          time
        }
      })
      .then(({ data }) => data)

    setTeachers(teachers)
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="These are the proffys available.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: 'Art', label: 'Art' },
              { value: 'Physics', label: 'Physics' },
              { value: 'Mathematics', label: 'Mathematics' },
              { value: 'Geography', label: 'Geography' },
              { value: 'Web Development', label: 'Web Development' },
              { value: 'Science', label: 'Science' },
              { value: 'History', label: 'History' }
            ]}
          />
          <Select
            name="week_day"
            label="Week Day"
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
            options={[
              { value: '0', label: 'Sunday' },
              { value: '1', label: 'Monday' },
              { value: '2', label: 'Tuesday' },
              { value: '3', label: 'Wednesday' },
              { value: '4', label: 'Thursday' },
              { value: '5', label: 'Friday' },
              { value: '6', label: 'Saturday' }
            ]}
          />
          <Input type="time" name="time" label="Hour" value={time} onChange={(e) => setTime(e.target.value)} />
          <button type="submit"> Search </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  )
}

export default TeacherList
