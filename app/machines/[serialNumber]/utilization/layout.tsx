import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function MachineUtilizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full p-5 border border-black rounded-md shadow-md shadow-black">
      <div className="mb-10 border-b border-slate-800">
        <nav className="flex">
          {/* Selected */}
          <Link
            href={`machines/4c48d884-b055-11ed-afa1/utilization`}
            className="inline-flex items-center gap-2 py-4 font-semibold border-b-4 border-indigo-800 px-7 "
          >
            <ChartBarIcon className="w-5" />
            Graph
          </Link>
          <Link
            href={`machines/4c48d884-b055-11ed-afa1/utilization/stats`}
            className="inline-flex items-center gap-2 py-4 border-b-2 border-transparent px-7 hover:border-b-2 hover:border-indigo-800"
          >
            <ClipboardDocumentListIcon className="w-5" />
            Statistics
          </Link>
        </nav>
      </div>

      {children}
    </main>
  );
}
