'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

export function FetchAdmin() {
  const { data: session } = useSession();
  const [adminResult, setAdminResult] = useState<any>(null);

  const handleAdminFetch = async () => {
    const response = await fetch('http://localhost:5001/api/admin', {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': 'true',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (!response.ok) {
      setAdminResult({ error: true });
    } else {
      const json = await response.json();
      console.log(json);
      setAdminResult(json);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleAdminFetch}>Fetch Admin</button>
        <h3>Result:</h3>
        <p>{JSON.stringify(adminResult)}</p>
      </div>
    </div>
  );
}
