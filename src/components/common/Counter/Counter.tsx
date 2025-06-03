import { useState } from 'react';
import { PlusCircle, MinusCircle, RotateCcw } from 'lucide-react';
import { getCountMessage } from './helper';

const buttonClass =
  'flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 border shadow-sm hover:shadow-md active:scale-95';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 md:p-8 bg-white border border-rose-100 rounded-xl shadow-sm select-none">
      <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">Interactive Counter</h1>

      <section className="space-y-6">
        <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
          Counter Example
        </p>

        <div className="bg-muted/50 rounded-md p-5 border border-muted space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-slate-700">
              Count: <span className="text-pink-600">{count}</span>
            </span>
            <span className="text-sm text-muted-foreground italic">{getCountMessage(count)}</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setCount((c) => c + 1)}
              className={`${buttonClass} bg-black text-white hover:bg-zinc-800 cursor-pointer`}
            >
              <PlusCircle className="h-4 w-4" />
              Increment
            </button>

            <button
              onClick={() => setCount((c) => c - 1)}
              className={`${buttonClass} bg-pink-600 text-white hover:bg-pink-700 cursor-pointer`}
            >
              <MinusCircle className="h-4 w-4" />
              Decrement
            </button>

            <button
              onClick={() => setCount(0)}
              className={`${buttonClass} bg-white text-slate-700 border-slate-200 hover:bg-slate-100 cursor-pointer`}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
