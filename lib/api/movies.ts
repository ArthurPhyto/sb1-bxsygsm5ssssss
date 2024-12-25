import { supabase } from '@/lib/supabase';
import { Movie, MovieListResponse, Category } from '@/types/movie';

export async function getLatestMovies(limit = 12): Promise<MovieListResponse> {
  const { data, error, count } = await supabase
    .from('movies')
    .select('*', { count: 'exact' })
    .order('release_date', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch latest movies: ${error.message}`);

  return {
    data: data as Movie[],
    count: count || 0
  };
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categorie')
    .select('*')
    .order('name');

  if (error) throw new Error(`Failed to fetch categories: ${error.message}`);
  return data || [];
}

export async function getCategoryById(id: number): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categorie')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(`Failed to fetch category: ${error.message}`);
  return data;
}

export async function getMoviesByCategory(
  categoryId: number,
  page = 1,
  limit = 30
): Promise<MovieListResponse> {
  const offset = (page - 1) * limit;
  
  const category = await getCategoryById(categoryId);
  if (!category) throw new Error('Category not found');

  const { data, error, count } = await supabase
    .from('movies')
    .select('*', { count: 'exact' })
    .contains('genres', [category.name])
    .order('release_date', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw new Error(`Failed to fetch movies by category: ${error.message}`);

  return {
    data: data as Movie[],
    count: count || 0
  };
}

export async function getMovieById(id: number): Promise<Movie | null> {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(`Failed to fetch movie: ${error.message}`);
  return data;
}

export async function getAllMovieIds(): Promise<number[]> {
  const { data, error } = await supabase
    .from('movies')
    .select('id')
    .order('id');

  if (error) throw new Error(`Failed to fetch movie IDs: ${error.message}`);
  return (data || []).map(movie => movie.id);
}