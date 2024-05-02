import React, {useEffect} from 'react';
import iconClose from '../images/icon_close.svg';

const PopupWithForm = ({isOpen, onClose, children}) => {
  const handleOutsideClick = (e) => {
    if (isOpen && !e.target.closest('.modal__content')) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]); // eslint-disable-line

  return (
    <div
      className={`modal ${isOpen ? 'modal-show' : ''}`}
      style={{display: isOpen ? 'flex' : 'none'}}
    >
      <form className='modal__content form'>
        <span className='modal__close' onClick={onClose}>
          <img src={iconClose} alt='close' />
        </span>
        {children}
      </form>
    </div>
  );
};

export default PopupWithForm;
