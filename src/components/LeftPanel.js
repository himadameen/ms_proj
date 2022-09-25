import React from 'react';
import { Link } from 'react-router-dom';

const LeftPanel = () => {
  return (
    <>
      <div className='main'>
        <div className='left'>
          <ul className='links'>
            <li className='item'>
              <Link className='item_n' to={'/task'}>My Tasks</Link>
            </li>
            <li className='item'>
              <Link className='item_n' to={'/progress'}>In Progress</Link>
            </li>
            <li className='item'>
              <Link className='item_n' to={'/complete'}>Completed</Link>
            </li>
            <li className='item'>
              <Link className='item_n' to={'/newProcess'}>New Process</Link>
            </li>
          </ul>
          <div className='upload_box'>
        <Link className='upload' to={'/upload'}>Upload</Link>
        </div>    
        </div>
        
      </div>
    </>
  )
}

export default LeftPanel