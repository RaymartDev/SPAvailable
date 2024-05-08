/* eslint-disable react/no-array-index-key */
import { BsStarFill } from 'react-icons/bs';

interface StarRatingProps {
  totalStars: number;
  onClick?: (index: number) => void;
}

function StarRating({ totalStars, onClick }: StarRatingProps) {
  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => (
        <BsStarFill
          key={index}
          className="text-[#41924B]"
          size={30}
          onClick={() => onClick && onClick(index)}
        />
      ))}
    </div>
  );
}

StarRating.defaultProps = {
  onClick: undefined,
};

export default StarRating;
