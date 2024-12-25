import { Metadata } from 'next';
import { MovieGrid } from '@/components/movies/movie-grid';
import { Section } from '@/components/ui/section';
import { getMoviesByCategory, getCategoryById, getCategories } from '@/lib/api/movies';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
  searchParams: { page?: string };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    id: category.id.toString(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseInt(params.id);
  if (isNaN(id)) return { title: 'Catégorie non trouvée' };

  const category = await getCategoryById(id);
  if (!category) return { title: 'Catégorie non trouvée' };
  
  return {
    title: `Films ${category.name} - FilmFlix`,
    description: `Découvrez tous les films de la catégorie ${category.name} sur FilmFlix`
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const id = parseInt(params.id);
  if (isNaN(id)) return notFound();

  const page = Math.max(1, parseInt(searchParams.page ?? '1'));
  const limit = 30;
  
  try {
    const category = await getCategoryById(id);
    if (!category) return notFound();

    const { data: movies, count } = await getMoviesByCategory(id, page, limit);
    const totalPages = Math.ceil(count / limit);

    return (
      <div className="container py-8 space-y-8">
        <Section title={`Films - ${category.name}`}>
          <MovieGrid movies={movies} />
        </Section>
        
        {totalPages > 1 && (
          <div className="flex justify-center">
            {/* Pagination will be added later if needed */}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error loading category page:', error);
    throw error;
  }
}