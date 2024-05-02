import React, {useState, useEffect, useRef} from 'react';
import Api from '../utils/api';
import iconEdit from '../images/icon_edit.svg';
import PopupWithForm from './PopupWithForm';

const EditProfileForm = ({
  formData,
  setFormData,
  errors,
  setErrors,
  api,
  namaInputRef,
  titleInputRef,
  setUserData,
  onClose,
}) => {
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });

    if (name === 'nama') {
      const isValid = namaInputRef.current.checkValidity();
      setErrors((prevErrors) => ({
        ...prevErrors,
        nama: isValid ? '' : namaInputRef.current.validationMessage,
      }));
    } else if (name === 'title') {
      const isValid = titleInputRef.current.checkValidity();
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: isValid ? '' : titleInputRef.current.validationMessage,
      }));
    }
  };

  const handleEditProfileClick = () => {
    const isValid =
      namaInputRef.current.checkValidity() &&
      titleInputRef.current.checkValidity();

    if (isValid) {
      api.setUserInfo(formData).then((res) => {
        setUserData({
          user_id: res._id,
          nama: res.name,
          title: res.about,
          avatar: res.avatar,
        });
        onClose();
      });
    } else {
      setErrors({
        nama: namaInputRef.current.validationMessage,
        title: titleInputRef.current.validationMessage,
      });
    }
  };

  return (
    <>
      <h3 className='modal__title'>Edit Profile</h3>
      <div className='modal__wrapper-input'>
        <div className='modal__input'>
          <input
            type='text'
            placeholder='Nama'
            className='input'
            name='nama'
            value={formData.nama}
            onChange={handleChange}
            ref={namaInputRef}
            minLength='2'
            maxLength='40'
            required
          />
        </div>
        <p style={{opacity: errors.nama ? 1 : 0}} className='error-message'>
          {errors.nama}
        </p>
      </div>
      <div className='modal__wrapper-input'>
        <div className='modal__input'>
          <input
            type='text'
            placeholder='Title'
            className='input'
            name='title'
            value={formData.title}
            onChange={handleChange}
            ref={titleInputRef}
            minLength='2'
            maxLength='200'
            required
          />
        </div>
        <p style={{opacity: errors.title ? 1 : 0}} className='error-message'>
          {errors.title}
        </p>
      </div>
      <button
        type='button'
        className='modal__button button'
        onClick={handleEditProfileClick}
      >
        Simpan
      </button>
    </>
  );
};

const ModalPopUp = ({isOpen, onClose, nama, title, setUserData}) => {
  const [formData, setFormData] = useState({
    nama: nama,
    title: title,
  });

  useEffect(() => {
    setFormData({
      nama: nama,
      title: title,
    });
  }, [nama, title]);

  const [errors, setErrors] = useState({
    nama: '',
    title: '',
  });

  const api = new Api();
  const namaInputRef = useRef(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setErrors({
        nama: '',
        title: '',
      });
    }
  }, [isOpen]);

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <EditProfileForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        api={api}
        namaInputRef={namaInputRef}
        titleInputRef={titleInputRef}
        setUserData={setUserData}
        onClose={onClose}
      />
    </PopupWithForm>
  );
};

function EditProfilePopup({nama, title, setUserData}) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button className='profile__icon' onClick={openModal}>
        <img src={iconEdit} alt='edit akun' />
      </button>
      <ModalPopUp
        isOpen={modalOpen}
        onClose={closeModal}
        nama={nama}
        title={title}
        setUserData={setUserData}
      />
    </>
  );
}

export default EditProfilePopup;
