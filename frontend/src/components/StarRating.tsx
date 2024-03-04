/* eslint-disable react/no-array-index-key */
import { BsStarFill } from 'react-icons/bs';

interface StarRatingProps {
  totalStars: number;
}

function StarRating({ totalStars }: StarRatingProps) {
  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => (
        <BsStarFill key={index} className="text-[#41924B]" size={30} />
      ))}
    </div>
  );
}

export default StarRating;
