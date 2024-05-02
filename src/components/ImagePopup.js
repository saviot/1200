import React, {useEffect} from 'react';
import iconClose from '../images/icon_close.svg';

function ImagePopup({isOpen, imageUrl, imageName, onClose}) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        !document.getElementById('modal_preview_image').contains(e.target)
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
      id='modalImagePreview'
      className='modal modal-show'
      style={{
        display: 'flex',
      }}
    >
      <div className='modal__content' id='modal_preview_image'>
        <span className='modal__close' onClick={onClose}>
          <img src={iconClose} alt='close' />
        </span>
        <img id='previewImage' src={imageUrl} alt='preview' />
        <p id='namaImage'>{imageName}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
