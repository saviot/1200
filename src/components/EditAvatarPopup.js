import React, {useState, useEffect, useRef} from 'react';
import Api from '../utils/api';
import PopupWithForm from './PopupWithForm';
import profilEdit from '../images/profile_edit.svg';

const UpdateAvatarForm = ({
  formData,
  setFormData,
  errors,
  setErrors,
  api,
  linkGambarInputRef,
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

    if (name === 'avatar') {
      const isValid = linkGambarInputRef.current.checkValidity();
      setErrors((prevErrors) => ({
        ...prevErrors,
        avatar: isValid ? '' : linkGambarInputRef.current.validationMessage,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = linkGambarInputRef.current.checkValidity();

    if (isValid) {
      api.updateAvatar({avatar: formData.avatar}).then((res) => {
        setUserData((prevUserData) => ({
          ...prevUserData,
          avatar: res.avatar,
        }));
        onClose();
      });
    } else {
      setErrors({
        avatar: linkGambarInputRef.current.validationMessage,
      });
    }
  };

  return (
    <>
      <h3 className='modal__title'>Update Avatar</h3>
      <div className='modal__wrapper-input'>
        <div className='modal__input'>
          <input
            type='text'
            placeholder='Link tempat'
            className='input'
            name='avatar'
            value={formData.avatar}
            onChange={handleChange}
            ref={linkGambarInputRef}
            required
            pattern='https?://.+'
          />
        </div>
        <p style={{opacity: errors.avatar ? 1 : 0}} className='error-message'>
          {errors.avatar}
        </p>
      </div>
      <button
        type='submit'
        className='modal__button button'
        onClick={handleSubmit}
      >
        Simpan
      </button>
    </>
  );
};

const ModalPopUp = ({isOpen, onClose, setUserData}) => {
  const [formData, setFormData] = useState({
    avatar: '',
  });

  const [errors, setErrors] = useState({
    avatar: '',
  });

  const api = new Api();

  const linkGambarInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setErrors({
        avatar: '',
      });
    }
  }, [isOpen]);

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <UpdateAvatarForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        api={api}
        linkGambarInputRef={linkGambarInputRef}
        setUserData={setUserData}
        onClose={onClose}
      />
    </PopupWithForm>
  );
};

function EditAvatarPopup({avatar, setUserData}) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='profile__image'>
      <img className='profile__image-src' src={avatar} alt='profile' />
      <div className='edit-icon'>
        <button className='profile__icon' onClick={openModal}>
          <img src={profilEdit} alt='edit' />
        </button>
      </div>
      <ModalPopUp
        isOpen={modalOpen}
        onClose={closeModal}
        setUserData={setUserData}
      />
    </div>
  );
}

export default EditAvatarPopup;
