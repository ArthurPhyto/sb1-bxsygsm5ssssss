import { Cast } from '@/types/movie';

interface MovieCastProps {
  cast: Cast[];
}

export function MovieCast({ cast }: MovieCastProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Casting</h2>
      <div className="space-y-2">
        {cast.map((actor, index) => (
          <p key={index} className="text-muted-foreground">
            {actor.name} {actor.character && `(${actor.character})`}
          </p>
        ))}
      </div>
    </div>
  );
}