import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        AI Knowledge Widget for Support & Docs
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mb-8">
        Upload your documentations, train your custom RAG chatbot, and embed it on your website in seconds.
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go to Dashboard →
      </Link>
    </div>
  );
}