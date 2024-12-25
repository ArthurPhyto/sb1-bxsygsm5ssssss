import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Category } from '@/types/movie';

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  if (!categories.length) {
    return <p className="text-muted-foreground">Aucune catégorie disponible</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.id}`}>
          <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
            {category.name}
          </Badge>
        </Link>
      ))}
    </div>
  );
}