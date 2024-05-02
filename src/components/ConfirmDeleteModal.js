import React, {useEffect} from 'react';
import iconClose from '../images/icon_close.svg';

function ConfirmDeleteModal({isOpen, onClose, onConfirm}) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        !document.getElementById('modal_confirm_card').contains(e.target)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className='modal modal-show'
      style={{
        display: 'flex',
      }}
    >
      <div
        className='modal__content'
        style={{height: '160px'}}
        id='modal_confirm_card'
      >
        <span className='modal__close' onClick={onClose}>
          <img src={iconClose} alt='close' />
        </span>
        <h3 className='modal__title'>Apakah Anda Yakin?</h3>
        <div className='modal__wrapper-button'>
          <button className='modal__button button' onClick={onConfirm}>
            Ya
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
