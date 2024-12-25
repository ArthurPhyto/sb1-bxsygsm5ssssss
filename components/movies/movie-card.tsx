import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/films/${movie.id}`}>
      <Card className="overflow-hidden transition-transform hover:scale-105">
        <div className="aspect-[2/3] relative">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
          <p className="text-sm text-muted-foreground">
            {format(new Date(movie.release_date), 'dd MMMM yyyy', { locale: fr })}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}