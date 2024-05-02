import React, {useState, useEffect, useRef} from 'react';
import Api from '../utils/api';
import PopupWithForm from './PopupWithForm';
import iconAdd from '../images/icon_add.svg';

const CreateCardForm = ({
  formData,
  setFormData,
  errors,
  setErrors,
  api,
  namaTempatInputRef,
  linkGambarInputRef,
  setCardData,
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

    if (name === 'nama_tempat') {
      const isValid = namaTempatInputRef.current.checkValidity();
      setErrors((prevErrors) => ({
        ...prevErrors,
        nama_tempat: isValid
          ? ''
          : namaTempatInputRef.current.validationMessage,
      }));
    } else if (name === 'link_gambar') {
      const isValid = linkGambarInputRef.current.checkValidity();
      setErrors((prevErrors) => ({
        ...prevErrors,
        link_gambar: isValid
          ? ''
          : linkGambarInputRef.current.validationMessage,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid =
      namaTempatInputRef.current.checkValidity() &&
      linkGambarInputRef.current.checkValidity();

    if (isValid) {
      api.createNewCard(formData).then((res) => {
        setCardData((prevData) => [res, ...prevData]);
        onClose();
        setFormData({
          nama_tempat: '',
          link_gambar: '',
        });
      });
    } else {
      setErrors({
        nama_tempat: namaTempatInputRef.current.validationMessage,
        link_gambar: linkGambarInputRef.current.validationMessage,
      });
    }
  };

  return (
    <>
      <h3 className='modal__title'>Tambah tempat</h3>
      <div className='modal__wrapper-input'>
        <div className='modal__input'>
          <input
            type='text'
            placeholder='Nama tempat'
            name='nama_tempat'
            className='input'
            value={formData.nama_tempat}
            onChange={handleChange}
            ref={namaTempatInputRef}
            required
            minLength='2'
            maxLength='100'
          />
        </div>
        <p
          style={{opacity: errors.nama_tempat ? 1 : 0}}
          className='error-message'
        >
          {errors.nama_tempat}
        </p>
      </div>
      <div className='modal__wrapper-input'>
        <div className='modal__input'>
          <input
            type='text'
            placeholder='Link tempat'
            className='input'
            name='link_gambar'
            value={formData.link_gambar}
            onChange={handleChange}
            ref={linkGambarInputRef}
            required
            pattern='https?://.+'
          />
        </div>
        <p
          style={{opacity: errors.link_gambar ? 1 : 0}}
          className='error-message'
        >
          {errors.link_gambar}
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

const ModalPopUp = ({isOpen, onClose, setCardData}) => {
  const api = new Api();

  const [formData, setFormData] = useState({
    nama_tempat: '',
    link_gambar: '',
  });

  const [errors, setErrors] = useState({
    nama_tempat: '',
    link_gambar: '',
  });

  const namaTempatInputRef = useRef(null);
  const linkGambarInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setErrors({
        nama_tempat: '',
        link_gambar: '',
      });
    }
  }, [isOpen]);

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <CreateCardForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        api={api}
        namaTempatInputRef={namaTempatInputRef}
        linkGambarInputRef={linkGambarInputRef}
        setCardData={setCardData}
        onClose={onClose}
      />
    </PopupWithForm>
  );
};

function AddPlacePopup({setCardData}) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button className='profile__button' onClick={openModal}>
        <img src={iconAdd} alt='tambah' />
      </button>
      <ModalPopUp
        isOpen={modalOpen}
        onClose={closeModal}
        setCardData={setCardData}
      />
    </>
  );
}

export default AddPlacePopup;
