export default function Page() {
  return (
    <div
      className="relative w-full overflow-hidden h-screen"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
      >
        <source
          src="https://7phi3gs87h8dhn9v.public.blob.vercel-storage.com/Stars-foDcul1BQr2QlBurTSfRrFbQ81as4x.mp4"
          type="video/mp4"
        />
        Seu navegador não suporta o vídeo.
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-black p-5">
          ToDo App
        </h1>
        <a href="/signup" className="text-lg mt-4 bg-blue-800 hover:bg-blue-900 py-4 px-7 rounded-full ease-in duration-200">
          get started
        </a>
      </div>
    </div>
  );
}
