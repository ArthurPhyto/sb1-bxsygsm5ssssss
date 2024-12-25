interface MovieTrailerProps {
  url: string;
}

export function MovieTrailer({ url }: MovieTrailerProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Bande-annonce</h2>
      <div className="aspect-video">
        <iframe
          src={url}
          className="w-full h-full"
          allowFullScreen
          title="Bande-annonce"
        />
      </div>
    </div>
  );
}