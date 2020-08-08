import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import { api } from '../../services/api'

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

function TeacherForm() {
  const history = useHistory()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [bio, setBio] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const [scheduleItems, setScheduleItems] = useState([{ week_day: 0, from: '', to: '' }])
  const addNewSchedule = () => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }])
  }

  const setScheduleItemValue = (position: number, field: string, value: string) => {
    const updatedItems = scheduleItems.map((item, idx) => {
      if (idx !== position) return item
      return { ...item, [field]: value }
    })

    setScheduleItems(updatedItems)
  }

  const handleCreateClass = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
      })

      history.push('/')
    } catch (err) {
      alert('Error registering your class!')
    }
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader title="It's amazing that you want to teach." description="Fulfill this inscription form to start" />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Personal Information</legend>
            <Input name="name" label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            <Textarea name="bio" label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
          </fieldset>

          <fieldset>
            <legend>Class Information</legend>
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

            <Input name="cost" label="Hourly rate per class" value={cost} onChange={(e) => setCost(e.target.value)} />
          </fieldset>

          <fieldset>
            <legend>
              Available Hours
              <button type="button" onClick={addNewSchedule}>
                + New Schedule
              </button>
            </legend>

            {scheduleItems.map((item, idx) => {
              return (
                <div key={item.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Week Day"
                    value={item.week_day}
                    onChange={(e) => setScheduleItemValue(idx, 'week_day', e.target.value)}
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

                  <Input
                    name="from"
                    label="from"
                    type="time"
                    value={item.from}
                    onChange={(e) => setScheduleItemValue(idx, 'from', e.target.value)}
                  />
                  <Input
                    name="to"
                    label="to"
                    type="time"
                    value={item.to}
                    onChange={(e) => setScheduleItemValue(idx, 'to', e.target.value)}
                  />
                </div>
              )
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Warning" />
              Important! <br />
              Insert all required information
            </p>
            <button type="submit">Register</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm
