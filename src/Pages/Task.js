import React, { useState, useEffect } from 'react';
import LeftPanel from '../components/LeftPanel';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import Download from './Download';


const Task = () => {

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [details, setDetails] = useState([]);
  const [files, setFiles] = useState([]);
  const [show, setShow] = useState(false);

  const itemsPerPage = 5;

  const token_data = localStorage.getItem('Token');
  console.log(token_data);

  const url = 'https://dms.missancomputer.com:8081/windream.web.api/search/Search';

  const callFile = async () => {
    try {
      const { files } = await axios.post(url, {
        Headers: {
          // Authorization: `Bearer ${[token_data]}` ,
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCIsInVzZXJuYW1lIjoiYWQubWlzc2FuLmdyb3VwXFx0ZXN0dXNlciIsInVzZXJpZCI6IjEwMDAwMzUiLCJsY2lkIjoiMTAzMyJ9.eyJzdWIiOiIxMDAwMDM1IiwibmJmIjoxNjY0MTI1MzEyLCJleHAiOjE2NjUzMzQ5MTIsImlhdCI6MTY2NDEyNTMxMiwiaXNzIjoiaHR0cHM6Ly9kbXMubWlzc2FuY29tcHV0ZXIuY29tOjgwODEiLCJldWMiOiJFVnVnaEp2OVVHNXZQbGk0dG9NMGx1MkhTWVdGd1plVHFyT3o0RC9qMkw1ckVRNVhhUi8rSFlRdnZQZzVQNTBOQVNGWkI0TVhUQlpZRWREQWFFUVAwR1p2L0dTbjRTRG9HLzYwOGExcm9Pcz0ifQ.s-d_p09Z2zt03bmzPBnqIAEE4h_R0KwvIeXrCrxZPMxszrlRGN7Pti2lLwgn5PfktI_fUGX3kvlttN6Bgpv6uA',
          Accept: 'application/json'
        }
      })
      console.log(files);
      setFiles(files.data);
    }
    catch (err) {
      window.alert("Their is no data !!");
    }
  }

  const url_2 = 'https://dms.missancomputer.com:8081/windream.web.api/authentication/IsValidUser';

  const userDetails = async () => {
    try {
      const { user_detail } = await axios.get(url_2, {
        Headers: {
          // Authorization: `Bearer ${token_data}`,
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCIsInVzZXJuYW1lIjoiYWQubWlzc2FuLmdyb3VwXFx0ZXN0dXNlciIsInVzZXJpZCI6IjEwMDAwMzUiLCJsY2lkIjoiMTAzMyJ9.eyJzdWIiOiIxMDAwMDM1IiwibmJmIjoxNjY0MTI1MzEyLCJleHAiOjE2NjUzMzQ5MTIsImlhdCI6MTY2NDEyNTMxMiwiaXNzIjoiaHR0cHM6Ly9kbXMubWlzc2FuY29tcHV0ZXIuY29tOjgwODEiLCJldWMiOiJFVnVnaEp2OVVHNXZQbGk0dG9NMGx1MkhTWVdGd1plVHFyT3o0RC9qMkw1ckVRNVhhUi8rSFlRdnZQZzVQNTBOQVNGWkI0TVhUQlpZRWREQWFFUVAwR1p2L0dTbjRTRG9HLzYwOGExcm9Pcz0ifQ.s-d_p09Z2zt03bmzPBnqIAEE4h_R0KwvIeXrCrxZPMxszrlRGN7Pti2lLwgn5PfktI_fUGX3kvlttN6Bgpv6uA',
          Accept: 'application/json'
        }
      })
      setDetails(user_detail.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  const url_3 = `https://dms.missancomputer.com:8081/windream.web.api/Documents/Download?parameter.item.id=${files.id}&access_token=${token_data}`;

  const checked = async () => {
    try {
      const { download } = await url_3;
      setShow(true);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    callFile();
    userDetails();
  }, [])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(details.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(details.length / itemsPerPage));
  }, [details, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % details.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <LeftPanel />
      <div className='task_main'>
        <div className='content'>
          <div className='head'>My Tasks</div>
          <div className='title'>
            <input type='checkbox' name='task' />
            <div >Fill Name</div>
            <div >Status</div>
            <div >Assigned By</div>
            <div >Assigned On</div>
          </div>
          <div className='data'>
            <input className='inp' type="checkbox" name='task' onClick={checked} />
            <div className='t1'></div>
            <div className='t2'></div>
            <div className='t3'></div>
            <div className='t4'></div>
          </div>
          <div className='page'>
            <Pagination count={10} shape="rounded"
              onPageChange={handlePageClick} pagecount={pageCount}
              containerclassname="pagination" activelinkclassname='active' renderonzeropagecount={null}
              pagerangedisplayed={5} />
          </div>
        </div>
      </div>
      {show &&
        <div className='down'>
          <Download />
        </div>
      }
    </>
  )
}

export default Task