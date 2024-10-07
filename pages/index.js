// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold mb-8 text-black">Hoş Geldiniz</h1>
      <div className="flex space-x-4">
        <Link href="/register" className="px-4 py-2 bg-blue-500 text-white rounded">
          Kayıt Ol
        </Link>
        <Link href="/login" className="px-4 py-2 bg-green-500 text-white rounded">
          Giriş Yap
        </Link>
      </div>
    </div>
  );
}
