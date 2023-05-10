import React, { useEffect, useState } from 'react';
import { user, logo } from '../../assets';
import { Pencil } from 'react-bootstrap-icons';
import { getMe, updateMe } from '../../api/UsersAPI';

function Form(props) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [banner, setBanner] = useState('');
  const [bio, setBio] = useState('');
  const [showPicEditButton, setShowPicEditButton] = useState(false);
  const [showBannerEditButton, setShowBannerEditButton] = useState(false);

  const [picPreview, setPicPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  useEffect(() => {
    getMe().then((res) => {
      setId(res.user.id);
      setName(res.user.name);
      setEmail(res.user.email);
      setImage(res.user.profilePicture);
      setPicPreview(res.user.profilePicture);
    });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    updateMe({ name, profilePicture: image });
  };

  function handlePicChange(e) {
    const file = e.target.files[0];

    if (file) {
      setImage(e.target.files[0]);
      const reader = new FileReader();

      reader.onload = () => {
        setPicPreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPicPreview(null);
    }
  }
  function handleBannerChange(e) {
    const file = e.target.files[0];

    if (file) {
      setBanner(e.target.files[0]);
      const reader = new FileReader();

      reader.onload = () => {
        setBannerPreview(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setBannerPreview(null);
    }
  }

  return (
    <div className='row'>
      <div className='col-12 mb-5'>
        <div
          className='rounded-border img-fluid background-gray'
          style={{
            height: '250px',
            width: '100%',
            backgroundImage: `url("${logo}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div
          onMouseEnter={() => setShowPicEditButton(true)}
          onMouseLeave={() => setShowPicEditButton(false)}
          src={user}
          alt=''
          width={'100px'}
          height={'100px'}
          style={{
            height: '100px',
            width: '100px',
            backgroundImage: `url("${picPreview ? picPreview : user}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '50px',
            position: 'relative',
            //   top: "180px",
            //   left: "50px",
            marginLeft: '50px',
            marginTop: '-60px',
          }}
        >
          {showPicEditButton && (
            <>
              <input
                type='file'
                id='pic'
                name='pic'
                className='d-none'
                accept='.png,.gif,.jpg,.jpeg'
                max='100000000'
                onChange={(e) => handlePicChange(e)}
              />
              <label htmlFor='pic'>
                <Pencil
                  color='white'
                  className='pointer background-gray p-2'
                  size={'30px'}
                  style={{
                    position: 'absolute',
                    top: '60%',
                    left: '40%',
                    borderRadius: '10px',
                  }}
                />
              </label>
            </>
          )
          }
        </div >
      </div >
      <div className='col-lg-9'>
        <div className='form-group'>
          <label htmlFor='name' className='font-clash text-white'>
            Display Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            value={name}
            className='form-control form-control-lg background-gray rounded-border paraColor formInput'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email' className='font-clash text-white'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            value={email}
            className='form-control form-control-lg background-gray rounded-border paraColor formInput'
            disabled
          />
        </div>
        <div className='form-group'>
          <label htmlFor='bio' className='font-clash text-white'>
            Bio
          </label>
          <textarea
            id='bio'
            name='bio'
            type='text'
            value={bio}
            rows={2}
            className='form-control form-control-lg background-gray rounded-border paraColor formInput'
            placeholder='Tell us something about you.'
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button
          type='submit'
          className='btn btn-lg background-secondary rounded-pill px-5 py-2 text-white mt-3'
          onClick={handleUpdate}
        >
          Save Changes
        </button>
      </div>
    </div >
  );
}

export default Form;
