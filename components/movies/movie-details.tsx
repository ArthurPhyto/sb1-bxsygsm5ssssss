import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Movie } from '@/types/movie';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MovieCast } from './movie-cast';
import { MovieTrailer } from './movie-trailer';
import { MovieRating } from './movie-rating';

interface MovieDetailsProps {
  movie: Movie;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <MovieRating rating={movie.vote_average} />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <Link key={genre.id} href={`/categories/${genre.id}`}>
                <Badge variant="secondary">{genre.name}</Badge>
              </Link>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground">
              Sortie le {format(new Date(movie.release_date), 'dd MMMM yyyy', { locale: fr })}
            </p>
            <p className="text-muted-foreground">
              Durée : {movie.runtime} minutes
            </p>
          </div>

          <p className="text-lg leading-relaxed">{movie.overview}</p>

          {movie.cast.length > 0 && <MovieCast cast={movie.cast} />}
          {movie.trailer_url && <MovieTrailer url={movie.trailer_url} />}
        </div>
      </div>
    </div>
  );
}