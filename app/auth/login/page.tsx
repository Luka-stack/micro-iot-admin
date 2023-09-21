'use client';

export default function LoginPage() {
  const login = () => {
    window.open('http://localhost:5001/auth/v1/google/login', '_self');
  };

  const checklogin = async () => {
    try {
      const response = await fetch(
        'http://localhost:5001/auth/v1/authenticated',
        {
          cache: 'no-store',
          method: 'GET',
          credentials: 'include',
          headers: {
            'Access-Control-Allow-Origin': 'true',
          },
        }
      );

      const data = await response.json();

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>This is login Page</h1>
      <button onClick={login} className="px-4 py-2 bg-red-700 rounded-lg">
        Log in with google
      </button>

      <button onClick={checklogin} className="px-4 py-2 bg-blue-700 rounded-lg">
        Check User
      </button>
    </div>
  );
}
