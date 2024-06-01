import { MouseEvent, useState } from 'react';
import { FaStar } from 'react-icons/fa';

type TypeOnChangeRating = (
    rating: number,
    event: MouseEvent<SVGElement, globalThis.MouseEvent>
) => void;

interface IRating {
    value: number;
    reviews?: number;
    onChange?: TypeOnChangeRating;
}

const Rating = ({ value, reviews, onChange }: IRating) => {
    const countStars = new Array(5).fill(false).fill(true, 0, value);
    const [hoverValue, setHoverValue] = useState<null | number>(null);

    const getColor = (index: number, isStar: boolean) => {
        if (onChange) {
            return (hoverValue as number) >= index ? '#FFAC0C' : '#C4C4C4';
        }

        return isStar ? '#FFAC0C' : '#C4C4C4';
    };

    return (
        <div className="flex gap-3">
            <div className="flex items-center gap-1">
                {countStars.map((isStar, index) => (
                    <FaStar
                        onMouseEnter={() => setHoverValue(index)}
                        onMouseLeave={() => setHoverValue(null)}
                        onClick={(event) => onChange && onChange(index, event)}
                        key={index}
                        style={{
                            color: getColor(index, isStar)
                        }}
                        className="w-5 h-5 transition-colors cursor-pointer"
                    />
                ))}
            </div>
            {reviews && <span>{reviews} Customer Review</span>}
        </div>
    );
};

export default Rating;
