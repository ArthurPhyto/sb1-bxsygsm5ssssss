import { Metadata } from 'next';
import { MovieDetails } from '@/components/movies/movie-details';
import { getAllMovieIds, getMovieById } from '@/lib/api/movies';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const movieIds = await getAllMovieIds();
  return movieIds.map((id) => ({
    id: id.toString(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movie = await getMovieById(parseInt(params.id));
  if (!movie) return { title: 'Film non trouvé' };
  
  return {
    title: movie.title_seo,
    description: movie.meta_description_seo
  };
}

export default async function MoviePage({ params }: Props) {
  const movie = await getMovieById(parseInt(params.id));
  if (!movie) return notFound();

  return <MovieDetails movie={movie} />;
}