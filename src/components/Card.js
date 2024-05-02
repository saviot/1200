import React, {useState, useEffect} from 'react';
import ActiveSvg from '../images/icon_love_active.svg';
import InactiveSvg from '../images/icon_love_non_active.svg';
import TrashIcon from '../images/icon_trash.svg';
import Api from '../utils/api';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ImagePopup from './ImagePopup';

export default function Card({
  link,
  name,
  likes,
  card_id,
  owner_id,
  user_id,
  setCardData,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const api = new Api();

  useEffect(() => {
    const isLiked = likes.some((like) => like._id === user_id);
    setIsLiked(isLiked);
  }, [likes, user_id]);

  const handleCardClick = () => {
    setIsPreviewModalOpen(true);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);

    // Perform API call to like or dislike card
    if (!isLiked) {
      api.likeCard(card_id);
    } else {
      api.dislikeCard(card_id);
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    api.deleteCard(card_id).then(() => {
      setCardData((prevData) =>
        prevData.filter((card) => card._id !== card_id),
      );
      setIsModalOpen(false);
    });
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/270x280.png/000000?text=404';
  };

  const isOwn = owner_id === user_id;

  const cardDeleteButtonClassName = `card__icon-trash ${
    isOwn ? 'card__icon-trash_visible' : 'card__icon-trash_hidden'
  }`;

  return (
    <div className='card__item' id={card_id}>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
        <img src={TrashIcon} alt='delete' />
      </button>
      <div className='card__image'>
        <img
          src={link}
          alt={name}
          onClick={handleCardClick}
          onError={(e) => handleImageError(e)}
        />
      </div>
      <div className='card__info'>
        <h2 className='card__info-title'>{name}</h2>
        <div className='card__info-icon'>
          {isLiked ? (
            <button className='card__icon-x active' onClick={handleLikeClick}>
              <img src={ActiveSvg} alt='active love' />
            </button>
          ) : (
            <button className='card__icon active' onClick={handleLikeClick}>
              <img src={InactiveSvg} alt='non active love' />
            </button>
          )}
          <p className='card__like'>{likeCount}</p>
        </div>
      </div>

      {isModalOpen && (
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isPreviewModalOpen && (
        <ImagePopup
          isOpen={isPreviewModalOpen}
          imageUrl={link}
          imageName={name}
          onClose={() => setIsPreviewModalOpen(false)}
        />
      )}
    </div>
  );
}
