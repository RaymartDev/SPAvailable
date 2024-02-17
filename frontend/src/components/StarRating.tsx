/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { BsStarFill } from 'react-icons/bs';

interface StarRatingProps {
  totalStars: number;
}

function StarRating({ totalStars }: StarRatingProps) {
  const [rating, setRating] = useState(0);

  const handleClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => (
        <BsStarFill
          key={index}
          className={index < rating ? 'text-[#41924B]' : 'text-gray-400'}
          onClick={() => handleClick(index)}
          size={30}
        />
      ))}
    </div>
  );
}

export default StarRating;
