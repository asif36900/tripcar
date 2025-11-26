export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <h1 className="text-7xl font-extrabold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all"
      >
        Go Back Home
      </a>

      <div className="mt-10">
        <img
          src="/404.webp"
          alt="Not Found Illustration"
          className="w-100 opacity-100"
        />
      </div>
    </div>
  );
}
