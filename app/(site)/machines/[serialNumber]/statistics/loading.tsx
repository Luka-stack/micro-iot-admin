export default function Loading() {
  return (
    <main className="flex-1 border border-white/10">
      <div className="flex flex-col items-center justify-center h-full gap-10 animate-pulse">
        <div className="flex space-x-10">
          <div className="flex items-center justify-center h-20 p-4 border rounded-md border-white/10">
            <div className="w-64 h-5 rounded-lg bg-slate-700" />
          </div>
          <div className="flex items-center justify-center h-20 p-4 border rounded-md border-white/10">
            <div className="w-64 h-5 rounded-lg bg-slate-700" />
          </div>
        </div>
        <div className="flex space-x-24">
          <div className="flex flex-col items-center justify-center p-4 space-y-2 border rounded-md border-white/10">
            <div className="w-64 h-5 rounded-lg bg-slate-700" />
            <div className="flex justify-between w-full">
              <div className="h-5 rounded-lg w-28 bg-slate-700" />
              <div className="w-20 h-5 rounded-lg bg-slate-700" />
            </div>
            <div className="flex justify-between w-full">
              <div className="h-5 rounded-lg w-28 bg-slate-700" />
              <div className="w-20 h-5 rounded-lg bg-slate-700" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-4 space-y-2 border rounded-md border-white/10">
            <div className="w-64 h-5 rounded-lg bg-slate-700" />
            <div className="flex justify-between w-full">
              <div className="h-5 rounded-lg w-28 bg-slate-700" />
              <div className="w-20 h-5 rounded-lg bg-slate-700" />
            </div>
            <div className="flex justify-between w-full">
              <div className="h-5 rounded-lg w-28 bg-slate-700" />
              <div className="w-20 h-5 rounded-lg bg-slate-700" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
