import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

type NavItem = { href: string; label: string };

const navItems: NavItem[] = [
  { href: "/magazine", label: "매거진" },
  { href: "/invitation", label: "청첩장 제작" },
  { href: "/dress", label: "드레스 기록" },
];

export function PublicHeader() {
  return (
    <header className="w-full">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-2.5 px-12 py-7">
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="inline-flex items-center">
            <img
              src="/assets/brand/logo.svg"
              alt="WEDIT"
              width={115}
              height={28}
              className="h-7 w-28"
            />
          </Link>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-semibold leading-[1.4] tracking-[-2.5px] text-text-tertiary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-[222px] bg-white p-4 text-base font-semibold leading-5 tracking-[-2.5px] text-text-default outline outline-[0.7px] outline-offset-[-0.7px] outline-text-default"
            >
              log in
            </Link>

            <Link
              href="/quotes"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-[222px] bg-brand-primary p-4 text-lg font-semibold leading-6 tracking-[-2.5px] text-white"
            >
              <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center">
                {/* 아이콘은 추후 교체 예정(공용 아이콘 컴포넌트/에셋) */}
                <span className="h-4 w-4 rounded bg-white/70" />
              </span>
              견적서 보러가기
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

