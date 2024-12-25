import { Section } from '@/components/ui/section';
import { CategoryList } from '@/components/categories/category-list';
import { getCategories } from '@/lib/api/movies';

export const revalidate = 3600;

export default async function CategoriesPage() {
  try {
    const categories = await getCategories();

    return (
      <div className="container py-8">
        <Section title="Toutes les catégories">
          <CategoryList categories={categories} />
        </Section>
      </div>
    );
  } catch (error) {
    console.error('Error loading categories page:', error);
    throw error;
  }
}