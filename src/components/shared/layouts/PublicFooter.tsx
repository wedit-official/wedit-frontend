import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

export function PublicFooter() {
  return (
    <footer className="w-full bg-gray-200">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-12 py-7">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-semibold leading-9 text-text-secondary">
              WEDIT
            </div>
            <div className="text-base font-normal leading-5 text-text-secondary">
              제휴 및 입점 문의 : weditteam0@gmail.com
            </div>
            <div className="text-base font-normal leading-5 text-text-secondary">
              © 2026 웨딧. All rights reserved.
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Link
              href="/terms"
              className="text-lg font-normal leading-6 text-text-secondary underline"
            >
              이용약관
            </Link>
            <Link
              href="/privacy"
              className="text-lg font-normal leading-6 text-text-secondary underline"
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

