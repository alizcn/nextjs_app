import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      setUser(decoded);
    } catch (error) {
      console.error('Token geçersiz:', error);
      localStorage.removeItem('token'); // Clear invalid token
      router.push('/login');
    } finally {
      setLoading(false); // Set loading to false once the process is complete
    }
  }, [router]);

  if (loading) {
    return <p>Yükleniyor...</p>; // Loading state
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-black">Dashboard</h1>
      <p className="text-lg text-black">
        Hoş geldiniz, kullanıcı ID'niz: {user.id.replace(/'/g, '&rsquo;')} {/* Ensure any single quotes are escaped */}
      </p>
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
