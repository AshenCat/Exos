import React from 'react';
import useDarkMode from 'use-dark-mode';
import {Form} from 'react-bootstrap';
// import Toggle from './Toggle'

const DarkModeToggle = () => {
    const darkMode = useDarkMode(false);
  
    return (
      <div className="dark-mode-toggle nav-link">
        <Form.Check 
          type="switch"
          id="dark-mode-switch"
          label="Dark mode"
          checked={darkMode.value} 
          onChange={darkMode.toggle}
        />
    </div>
    );
  };
  
  export default DarkModeToggle;