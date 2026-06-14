type VideoCardProps = {
  title?: string;
  category?: string;
  description?: string;
  src?: string;
};

export function VideoCard({ src }: VideoCardProps) {
  return (
    <div className="relative">
      {/* 跟随视频变化的模糊背景 */}
      {src && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="pointer-events-none absolute -inset-16 z-0 h-[calc(100%+8rem)] w-[calc(100%+8rem)] scale-110 object-cover opacity-20 blur-2xl"
        />
      )}

      {/* 主视频 */}
      <div className="relative z-10 overflow-hidden rounded-[28px] bg-black shadow-2xl">
        <div className="relative aspect-video w-full overflow-hidden">
          {src ? (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-900 text-sm text-slate-400">
              Video Preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
