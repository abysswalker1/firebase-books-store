import React from 'react';
import './ratingStars.css'

type Props = {
  rating: number
}

const RatingStars: React.FC<Props> = ({rating}) => {

  const ChooseStar: React.FC<{rate: number}> = (props) => (
    (props.rate <= 0)
      ? <i className="bi bi-star"></i>
      : (props.rate < 1 && props.rate > 0)
          ? <i className="bi bi-star-half"></i>
          : <i className="bi bi-star-fill"></i>
  )

  return (
    <div className='rating-stars'>
      { (function Star( accum: number ): JSX.Element {
          return (accum < 4)
            ? <><ChooseStar rate={rating - accum} /> {Star(accum + 1)} </>
            : <ChooseStar rate={rating - accum} /> 
        })(0)
      }
    </div>
  );
};

export default RatingStars;