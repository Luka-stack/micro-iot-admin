export function Skeleton() {
  return (
    <main className="flex flex-col justify-center flex-1 gap-10 border rounded-md border-white/10 animate-pulse">
      <div className="flex flex-wrap justify-center space-x-10">
        <section className="flex items-center p-6 border rounded-md shadow-sm main-gradient border-white/10 shadow-black w-80">
          <div className="w-full h-5 rounded-lg bg-slate-400" />
        </section>
        <section className="flex items-center p-6 border rounded-md shadow-sm main-gradient border-white/10 shadow-black w-80">
          <div className="w-full h-5 rounded-lg bg-slate-400" />
        </section>
      </div>

      <div className="flex flex-wrap justify-center space-x-24">
        <section className="px-6 py-4 border rounded-md shadow-sm border-white/10 shadow-black w-[300px]">
          <div className="w-full h-5 rounded-lg bg-slate-400" />

          <div className="space-y-4 mt-7">
            <div className="w-full h-3 rounded-lg bg-slate-400" />
            <div className="w-full h-3 rounded-lg bg-slate-400" />
          </div>
        </section>

        <section className="px-6 py-4 border rounded-md shadow-sm border-white/10 shadow-black w-[300px]">
          <div className="w-full h-5 rounded-lg bg-slate-400" />

          <div className="space-y-4 mt-7">
            <div className="w-full h-3 rounded-lg bg-slate-400" />
            <div className="w-full h-3 rounded-lg bg-slate-400" />
          </div>
        </section>
      </div>
    </main>
  );
}
