import React from 'react'
import PageHeader from '../../components/PageHeader'

import './styles.css'
import TeacherItem from '../../components/TeacherItem'

function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="These are the proffys available.">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject" >Course</label>
            <input type="text" id="subject"></input>
          </div>

          <div className="input-block">
            <label htmlFor="week_day">Week Day</label>
            <input type="text" id="week_day"></input>
          </div>

          <div className="input-block">
            <label htmlFor="time" >Hour</label>
            <input type="text" id="time"></input>
          </div>
        </form>
      </PageHeader>

      <main>
        <TeacherItem/>
        <TeacherItem/>
        <TeacherItem/>
        <TeacherItem/>
        <TeacherItem/>
      </main>
    </div>
  )
}

export default TeacherList
