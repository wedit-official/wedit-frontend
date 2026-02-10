import { Button } from "@/components/atoms";
import { Counter } from "@/components/molecules";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight">Wedit</h1>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
            결혼 업체 중개 서비스 플랫폼 프론트엔드(Next.js App Router) 기초 세팅이
            완료되었습니다.
          </p>
        </header>

        <section className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </section>

        <Counter />
      </main>
    </div>
  );
}
