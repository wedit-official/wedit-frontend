import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

export function PublicFooter() {
  return (
    <footer className="w-full bg-[var(--gray-200)]">
      <div className="flex w-full flex-col gap-4 px-[clamp(24px,5vw,96px)] py-7">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-semibold leading-9 text-grey-800">
              WEDIT
            </div>
            <div className="text-base font-normal leading-5 text-grey-800">
              제휴 및 입점 문의 : weditteam0@gmail.com
            </div>
            <div className="text-base font-normal leading-5 text-grey-800">
              © 2026 웨딧. All rights reserved.
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Link
              href="/terms"
              className="text-lg font-normal leading-6 text-grey-800 underline"
            >
              이용약관
            </Link>
            <Link
              href="/privacy"
              className="text-lg font-normal leading-6 text-grey-800 underline"
            >
              개인정보 처리방침
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram">
              <img
                src="/assets/icons/social/insta.svg"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

