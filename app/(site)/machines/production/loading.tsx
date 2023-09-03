export default function Loading() {
  return (
    <div className="flex w-full p-4 space-x-4 animate-pulse">
      <div className="space-y-5">
        <div className="flex items-center p-3 space-x-4 rounded-lg shadow-md w-60 shadow-black">
          <div className="w-8 rounded-sm aspect-square bg-slate-700" />
          <div className="w-full h-3 rounded-sm bg-slate-700" />
        </div>
        <div className="flex items-center p-3 space-x-4 rounded-lg shadow-md w-60 shadow-black">
          <div className="w-8 rounded-sm aspect-square bg-slate-700" />
          <div className="w-full h-3 rounded-sm bg-slate-700" />
        </div>
        <div className="flex items-center p-3 space-x-4 rounded-lg shadow-md w-60 shadow-black">
          <div className="w-8 rounded-sm aspect-square bg-slate-700" />
          <div className="w-full h-3 rounded-sm bg-slate-700" />
        </div>
        <div className="flex items-center p-3 space-x-4 rounded-lg shadow-md w-60 shadow-black">
          <div className="w-8 rounded-sm aspect-square bg-slate-700" />
          <div className="w-full h-3 rounded-sm bg-slate-700" />
        </div>
        <div className="flex items-center p-3 space-x-4 rounded-lg shadow-md w-60 shadow-black">
          <div className="w-8 rounded-sm aspect-square bg-slate-700" />
          <div className="w-full h-3 rounded-sm bg-slate-700" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-start w-full space-y-5 border-2 rounded-md h-1/2 border-slate-950">
        <div className="w-32 mt-20 rounded-md aspect-square bg-slate-700" />
        <div className="h-5 rounded-sm w-52 bg-slate-700" />
      </div>
    </div>
  );
}
