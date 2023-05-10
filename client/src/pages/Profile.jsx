import React from 'react';
import { Form, Sidebar } from '../components/profile';

function Profile(props) {
  return (
    <div className='px-5 background-dark pb-10 pt-5'>
      <div className='row'>
        <Sidebar />
        <div className='col-lg-9'>
          <Form />
        </div>
      </div>
    </div>
  );
}

export default Profile;
