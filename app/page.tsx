import { Section } from '@/components/ui/section';
import { MovieGrid } from '@/components/movies/movie-grid';
import { CategoryList } from '@/components/categories/category-list';
import { getLatestMovies, getCategories } from '@/lib/api/movies';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  try {
    const [{ data: movies }, categories] = await Promise.all([
      getLatestMovies(),
      getCategories(),
    ]);

    return (
      <div className="container space-y-8 py-8">
        <Section title="Catégories">
          <CategoryList categories={categories} />
        </Section>

        <Section title="Films récents">
          <MovieGrid movies={movies} />
        </Section>
      </div>
    );
  } catch (error) {
    console.error('Error loading home page:', error);
    throw error;
  }
}