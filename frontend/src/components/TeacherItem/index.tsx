import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars3.githubusercontent.com/u/30727166?s=460&u=da27593e89b94bea4a5a2eb67a1d0371e9dba55d&v=4" alt="Rúben Gomes"/>
        <div>
          <strong>Rúben Gomes</strong>
          <span>NodeJS</span>
        </div>
      </header>

      <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        <br/>
        <br/>
        Sint soluta deleniti dignissimos voluptatibus nostrum! Perspiciatis provident laudantium beatae facilis est earum quibusdam labore obcaecati alias, nesciunt accusantium, iste explicabo non?
        Perspiciatis provident laudantium beatae facilis est earum quibusdam labore.
      </p>

      <footer>
        <p>
          Rate/Hour
          <strong>€ 40,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="whatsapp"/>
          Connect
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem
