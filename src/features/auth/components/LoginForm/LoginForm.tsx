"use client";

import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/atoms/Button/Button";

import { UnderlineField } from "@/features/auth/components/_shared/UnderlineField";

/* eslint-disable @next/next/no-img-element */

function validatePassword(pw: string) {
  // 대소문자/숫자/특수문자 포함 8자 이상
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasNumber = /\d/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  const longEnough = pw.length >= 8;
  return hasUpper && hasLower && hasNumber && hasSpecial && longEnough;
}

export function LoginForm() {
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [touched, setTouched] = React.useState<{ id: boolean; password: boolean }>({
    id: false,
    password: false,
  });

  const idError = touched.id && !id.trim() ? "아이디를 입력해 주세요." : undefined;
  const pwError =
    touched.password && password && !validatePassword(password)
      ? "비밀번호 형식을 확인해 주세요."
      : touched.password && !password.trim()
        ? "비밀번호를 입력해 주세요."
        : undefined;

  const canSubmit = id.trim().length > 0 && validatePassword(password) && !submitting;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ id: true, password: true });
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      // TODO: API 연동 전까지는 UI/기능만 구현
      await new Promise((r) => setTimeout(r, 600));
      alert("로그인 기능은 준비 중입니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full min-w-80 flex-col items-stretch justify-center gap-11"
    >
      <div className="flex w-full flex-col items-start gap-3.5">
        <UnderlineField
          name="id"
          value={id}
          onChange={setId}
          placeholder="아이디"
          autoComplete="username"
          error={idError}
          onBlur={() => setTouched((t) => ({ ...t, id: true }))}
          paddingYClassName="py-5"
        />

        <UnderlineField
          name="password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="비밀번호 : 대소문자, 숫자, 특수문자 포함 8글자 이상"
          autoComplete="current-password"
          error={pwError}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          paddingYClassName="py-5"
        />
      </div>

      <div className="flex w-full flex-col items-center gap-6">
        <Button type="submit" className="w-full" disabled={!canSubmit}>
          {submitting ? "로그인 중..." : "로그인하기"}
        </Button>

        <div className="inline-flex items-start justify-start gap-8">
          <Link
            href="/find-id"
            className="text-body-3 text-[var(--black-default)] underline"
          >
            아이디 찾기
          </Link>
          <Link
            href="/find-password"
            className="text-body-3 text-[var(--black-default)] underline"
          >
            비밀번호 찾기
          </Link>
          <Link
            href="/signup"
            className="text-body-3 text-[var(--black-default)] underline"
          >
            회원가입 하기
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="inline-flex w-full max-w-[1000px] items-center justify-center gap-2.5">
          <div className="h-0 w-80 outline outline-1 outline-offset-[-0.5px] outline-[color:var(--gray-300)]" />
          <div className="flex-1 text-body-3 text-[var(--black-default)]">OR</div>
          <div className="h-0 w-80 outline outline-1 outline-offset-[-0.5px] outline-[color:var(--gray-300)]" />
        </div>

        <div className="inline-flex w-64 items-start justify-start gap-7">
          {[
            { src: "/assets/icons/social/google.svg", label: "Google" },
            { src: "/assets/icons/social/naver.svg", label: "Naver" },
            { src: "/assets/icons/social/apple.svg", label: "Apple" },
            { src: "/assets/icons/social/kakao.svg", label: "Kakao" },
          ].map((item) => (
            <button
              key={item.src}
              type="button"
              aria-label={`${item.label} 로그인`}
              onClick={() => alert("소셜 로그인은 준비 중입니다.")}
              className="inline-flex h-10 w-10 overflow-hidden rounded-full bg-[var(--gray-white)]"
            >
              <img src={item.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}

