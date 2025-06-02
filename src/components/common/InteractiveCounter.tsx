import { useState } from 'react';
import { PlusCircle, MinusCircle, RotateCcw } from 'lucide-react';

const getCountMessage = (count: number) => {
  if (count === 0) return 'Start counting!';
  if (count < 0) return 'Going negative!';
  if (count <= 10) return 'Getting started';
  if (count <= 50) return 'Nice progress!';
  if (count <= 100) return "You're on fire! ";
  return 'Counter master! 🎉';
};

const buttonClass =
  'flex items-center gap-2 px-4 py-2 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg';

export default function InteractiveCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Interactive Counter
          </h1>

          <section className="space-y-6 pt-6">
            <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">
              Counter Example
            </p>

            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-slate-800">
                  Count: <span className="text-blue-600">{count}</span>
                </span>
                <div className="text-sm text-slate-500">{getCountMessage(count)}</div>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => setCount((c) => c + 1)}
                  className={`${buttonClass} bg-blue-600 hover:bg-blue-700`}
                >
                  <PlusCircle className="h-4 w-4" />
                  Increment
                </button>

                <button
                  onClick={() => setCount((c) => c - 1)}
                  className={`${buttonClass} bg-red-500 hover:bg-red-600`}
                >
                  <MinusCircle className="h-4 w-4" />
                  Decrement
                </button>

                <button
                  onClick={() => setCount(0)}
                  className={`${buttonClass} bg-slate-500 hover:bg-slate-600`}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-700 font-medium">
                  Current value: {count} | {count % 2 === 0 ? 'Even' : 'Odd'} |{' '}
                  {count === 0 ? 'Zero' : count > 0 ? 'Positive' : 'Negative'}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
