import { useState } from 'react';
import './ratingfrom.css'
import PropTypes from 'prop-types';

const RatingForm = ({ storeId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(storeId, {
      rating,
      comment: comment.trim() || null
    });
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="rating-form">
      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <span
                className={`star ${ratingValue <= (hover || rating) ? 'filled' : ''}`}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            </label>
          );
        })}
      </div>
      <textarea
        placeholder="Add a comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
      />
      <button 
        type="submit" 
        disabled={!rating}
        className="submit-rating-btn"
      >
        Submit Rating
      </button>
    </form>
  );
};

RatingForm.propTypes = {
  storeId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default RatingForm;