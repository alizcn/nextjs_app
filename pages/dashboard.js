// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      try {
        const decoded = jwt.decode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Token geçersiz:', error);
        router.push('/login');
      }
    }
  }, []);

  if (!user) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-black">Dashboard</h1>
      <p className="text-lg text-black">Hoş geldiniz, kullanıcı ID'niz: {user.id}</p>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          router.push('/');
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Çıkış Yap
      </button>
    </div>
  );
}
