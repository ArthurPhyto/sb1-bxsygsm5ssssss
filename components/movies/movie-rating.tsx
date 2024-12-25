import { Star, StarHalf } from 'lucide-react';

interface MovieRatingProps {
  rating: number;
  className?: string;
}

export function MovieRating({ rating, className = '' }: MovieRatingProps) {
  // Convertir la note sur 10 en note sur 5
  const ratingOutOfFive = rating / 2;
  const fullStars = Math.floor(ratingOutOfFive);
  const hasHalfStar = ratingOutOfFive % 1 >= 0.5;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground" />
      ))}
      <span className="text-sm text-muted-foreground ml-1">
        {rating.toFixed(1)}/10
      </span>
    </div>
  );
}