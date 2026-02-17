import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

type NavItem = { href: string; label: string };

const navItems: NavItem[] = [
  { href: "/magazine", label: "매거진" },
  { href: "/invitation", label: "청첩장 제작" },
  { href: "/dress", label: "드레스 기록" },
];

function BasketIcon({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M1.85842 17.5687C0.785922 13.2788 0.249672 11.135 1.37592 9.6925C2.50217 8.25 4.71342 8.25 9.13467 8.25H14.9222C19.3447 8.25 21.5547 8.25 22.6809 9.6925C23.8072 11.135 23.2709 13.28 22.1984 17.5687C21.5159 20.2975 21.1759 21.6612 20.1584 22.4562C19.1409 23.25 17.7347 23.25 14.9222 23.25H9.13467C6.32217 23.25 4.91592 23.25 3.89842 22.4562C2.88092 21.6612 2.53967 20.2975 1.85842 17.5687Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M21.4033 8.875L20.5158 5.61875C20.1733 4.3625 20.0021 3.735 19.6508 3.26125C19.3006 2.79058 18.825 2.428 18.2783 2.215C17.7283 2 17.0783 2 15.7783 2M2.65332 8.875L3.54082 5.61875C3.88332 4.3625 4.05457 3.735 4.40582 3.26125C4.75604 2.79058 5.23168 2.428 5.77832 2.215C6.32832 2 6.97832 2 8.27832 2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.27832 2C8.27832 1.66848 8.41002 1.35054 8.64444 1.11612C8.87886 0.881696 9.1968 0.75 9.52832 0.75H14.5283C14.8598 0.75 15.1778 0.881696 15.4122 1.11612C15.6466 1.35054 15.7783 1.66848 15.7783 2C15.7783 2.33152 15.6466 2.64946 15.4122 2.88388C15.1778 3.1183 14.8598 3.25 14.5283 3.25H9.52832C9.1968 3.25 8.87886 3.1183 8.64444 2.88388C8.41002 2.64946 8.27832 2.33152 8.27832 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7.02832 13.25V18.25M17.0283 13.25V18.25M12.0283 13.25V18.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
            <nav className="h-6 inline-flex flex-wrap content-center items-center justify-start gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-head-5 text-[var(--black-tertiary)] uppercase"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-[222px] bg-[var(--gray-white)] p-4 text-body-2 text-[var(--black-default)] outline-[0.7px] outline-offset-[-0.7px] outline-[color:var(--black-default)]"
            >
              log in
            </Link>

            <Link
              href="/quotes"
              className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-[222px] bg-[var(--brand-primary)] p-4 text-head-5 text-[var(--gray-white)] hover:bg-[var(--gray-white)] hover:text-[var(--black-default)] hover:outline hover:outline-1 hover:-outline-offset-1 hover:outline-[color:var(--black-default)]"
            >
              <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center">
                <BasketIcon className="h-7 w-7 text-[var(--gray-white)] group-hover:text-[var(--black-default)]" />
              </span>
              견적서 보러가기
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

