import { FetchAdmin } from './FetchAdmin';

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl">This is Admin Page Only</h1>
      <FetchAdmin />
    </div>
  );
}
