'use client';

import Image from 'next/image';

export const GlobalNavigation = () => {
  return (
    <header className="flex items-center justify-between flex-none h-20 p-4">
      {/* IMG */}
      <Image src={'/logo.png'} alt="iot logo" width={64} height={64} />

      {/* Navigation */}
      <nav className="flex items-center space-x-10">
        <h3 className="px-4 py-2 rounded-md cursor-pointer main-gradient">
          Machines
        </h3>
        <h3 className="px-4 py-2 rounded-md cursor-pointer main-gradient-hover">
          Work progress
        </h3>
        <h3 className="px-4 py-2 rounded-md cursor-pointer main-gradient-hover">
          Alerts
        </h3>
        <h3 className="px-4 py-2 rounded-md cursor-pointer main-gradient-hover">
          Shifts
        </h3>
        <h3 className="px-4 py-2 rounded-md cursor-pointer main-gradient-hover">
          Maintenance
        </h3>
      </nav>

      {/* User */}
      <div>
        <p className="text-xs text-slate-500">Admin</p>
        <h3>Takahiro Hayami</h3>
      </div>
    </header>
  );
};
