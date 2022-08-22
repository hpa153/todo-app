import React from 'react';

import './style.scss';

const About = () => {
  return (
    <main>
      <h1 className='helpTitle'>About</h1>
      <p>
        This app will help you to keep track of your tasks.
      </p>
      <p>
        You can include new tasks using the <strong>Create a new task</strong> form, on the home page.
      </p>
      <p>
        Don't forget the change the status of the task to <em>Completed</em> once it was done.
      </p>
    </main>
  )
}

export default About;