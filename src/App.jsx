import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl"></div>
      
      <div className="z-10 bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-3xl shadow-2xl flex flex-col items-center max-w-xl text-center">
        <img src="/newbte.png" alt="BTE" className="w-64 h-auto mb-8 drop-shadow-xl" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          The Next Evolution
        </h1>
        <p className="text-lg text-zinc-400 mb-8">
          A dynamic, modern approach to digital excellence. Welcome to the future of BTE.
        </p>
        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-600 to-amber-500 text-white font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(217,160,8,0.4)]">
          Explore Now
        </button>
      </div>
    </div>
  );
}

export default App;
