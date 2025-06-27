import { Await, createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { Suspense, useState, useTransition } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Badge } from '~/components/ui/badge';
import { Loader2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import LiveClock from '~/components/common/LiveClock/LiveClock';
import Counter from '~/components/common/Counter/Counter';

const personServerFn = createServerFn({ method: 'GET' })
  .validator((d: string) => d)
  .handler(({ data: name }) => ({
    name,
    randomNumber: Math.floor(Math.random() * 100)
  }));

const slowServerFn = createServerFn({ method: 'GET' })
  .validator((d: string) => d)
  .handler(async ({ data: name }) => {
    await new Promise((r) => setTimeout(r, 2000));
    return { name, randomNumber: Math.floor(Math.random() * 100) };
  });

export const Route = createFileRoute('/_sharedLayout/_protected/deferred')({
  loader: async () => ({
    deferredStuff: new Promise<string>((r) =>
      setTimeout(() => r('Hello from the async world!'), 2000)
    ),
    deferredPerson: slowServerFn({ data: 'Tanner Linsley' }),
    person: await personServerFn({ data: 'John Doe' })
  }),
  component: Deferred
});

function Deferred() {
  const { person: initialPerson, deferredStuff, deferredPerson } = Route.useLoaderData();
  const [name, setName] = useState(initialPerson.name);
  const [personPromise, setPersonPromise] = useState(() => personServerFn({ data: name }));
  const [isPending, startTransition] = useTransition();

  const refetchPerson = () => {
    startTransition(() => {
      setPersonPromise(personServerFn({ data: name }));
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-10 animate-in fade-in slide-in-from-bottom-2">
      <div className="flex justify-end">
        <LiveClock />
      </div>
      <motion.section layout className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">Dynamic Person Fetcher</h2>

        <div className="flex gap-2 items-center">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="flex-1"
          />
          <Button onClick={refetchPerson} disabled={isPending}>
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="ml-2">{isPending ? 'Fetching...' : 'Fetch'}</span>
          </Button>
        </div>

        <Suspense fallback={<LoadingMessage text="Loading person..." />}>
          <Await promise={personPromise}>
            {(person) => (
              <motion.div layout className="border rounded-md p-4 bg-muted/50 text-sm space-y-1">
                <Badge variant="outline">Success</Badge>
                <div>
                  <strong>Name:</strong> {person.name}
                </div>
                <div>
                  <strong>Random Number:</strong> {person.randomNumber}
                </div>
              </motion.div>
            )}
          </Await>
        </Suspense>
      </motion.section>
      <motion.section layout className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">Deferred Person Data</h3>

        <Suspense fallback={<LoadingMessage text="Loading slow data..." />}>
          <Await promise={deferredPerson}>
            {(data) => (
              <motion.div layout className="p-4 border rounded-md bg-muted/50 text-sm space-y-1">
                <div>
                  <strong>Name:</strong> {data.name}
                </div>
                <div>
                  <strong>Random Number:</strong> {data.randomNumber}
                </div>
              </motion.div>
            )}
          </Await>
        </Suspense>
      </motion.section>

      <motion.section layout className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">Deferred Message</h3>
        <Suspense fallback={<LoadingMessage text="Loading message..." />}>
          <Await promise={deferredStuff}>
            {(data) => (
              <div className="text-md font-semibold flex items-center gap-2 text-muted-foreground">
                {data}
              </div>
            )}
          </Await>
        </Suspense>
      </motion.section>
      <Counter />
    </div>
  );
}

function LoadingMessage({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      {text}
    </div>
  );
}
