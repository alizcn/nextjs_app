import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Head>
        <title>Hoş Geldiniz</title>
        <meta name="description" content="Kayıt ol veya giriş yap." />
      </Head>
      <h1 className="text-4xl font-bold mb-8 text-black">Hoş Geldiniz</h1>
      <div className="flex space-x-4">
        <Link href="/register" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" aria-label="Kayıt Ol">
          Kayıt Ol
        </Link>
        <Link href="/login" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" aria-label="Giriş Yap">
          Giriş Yap
        </Link>
      </div>
    </div>
  );
}
