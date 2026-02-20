"use client";

import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/atoms/Button/Button";
import { UnderlineField } from "@/features/auth/components/_shared/UnderlineField";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(pw: string) {
  // 대소문자/숫자/특수문자 포함 8자 이상
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasNumber = /\d/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  const longEnough = pw.length >= 8;
  return hasUpper && hasLower && hasNumber && hasSpecial && longEnough;
}

export function SignupForm() {
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("");
  const [birth, setBirth] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const [submitting, setSubmitting] = React.useState(false);
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const phoneErrorId = React.useId();
  const nameErrorId = React.useId();
  const birthErrorId = React.useId();
  const emailErrorId = React.useId();
  const passwordErrorId = React.useId();
  const passwordConfirmErrorId = React.useId();

  const errors = {
    phone: touched.phone && !phone.trim() ? "연락처를 입력해 주세요." : undefined,
    name: touched.name && !name.trim() ? "성명을 입력해 주세요." : undefined,
    birth: touched.birth && !birth.trim() ? "생년월일을 입력해 주세요." : undefined,
    email:
      touched.email && !email.trim()
        ? "이메일을 입력해 주세요."
        : touched.email && !isValidEmail(email)
          ? "이메일 형식을 확인해 주세요."
          : undefined,
    password:
      touched.password && !password.trim()
        ? "비밀번호를 입력해 주세요."
        : touched.password && password && !validatePassword(password)
          ? "비밀번호 형식을 확인해 주세요."
          : undefined,
    passwordConfirm:
      touched.passwordConfirm && !passwordConfirm.trim()
        ? "비밀번호 확인을 입력해 주세요."
        : touched.passwordConfirm && passwordConfirm !== password
          ? "비밀번호가 일치하지 않습니다."
          : undefined,
  };

  const canSubmit =
    phone.trim() &&
    name.trim() &&
    birth.trim() &&
    isValidEmail(email) &&
    validatePassword(password) &&
    passwordConfirm === password &&
    !submitting;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      phone: true,
      name: true,
      birth: true,
      email: true,
      password: true,
      passwordConfirm: true,
    });
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      // TODO: API 연동 전까지는 UI/기능만 구현
      await new Promise((r) => setTimeout(r, 600));
      alert("회원가입 기능은 준비 중입니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative flex flex-col items-center justify-start gap-9">
        {/* 라벨-컨트롤을 '행 단위'로 묶어서 1:1 매칭 */}
        <div className="flex w-full flex-col gap-3">
          <div className="grid grid-cols-[96px_1fr] items-center gap-x-28">
            <div className="w-24 whitespace-nowrap text-body-2 text-[var(--black-default)] uppercase">
              본인인증
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => alert("휴대폰 인증은 준비 중입니다.")}
              className="w-fit"
            >
              휴대폰 인증
            </Button>
          </div>

          <div className="grid grid-cols-[96px_1fr] items-center gap-x-28 gap-y-1">
            <div className="w-24 whitespace-nowrap text-body-2 text-[var(--black-default)] uppercase">
              연락처
            </div>
            <UnderlineField
              name="phone"
              value={phone}
              onChange={setPhone}
              placeholder="010-0000-0000"
              autoComplete="tel"
              error={errors.phone}
              errorId={phoneErrorId}
              renderError={false}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              paddingYClassName="py-2.5"
              reserveErrorSpace={false}
              wrapperClassName="w-full"
            />
            <div />
            <p
              id={phoneErrorId}
              aria-live="polite"
              className={[
                "min-h-5 text-sm font-normal leading-5 text-coral-400",
                errors.phone ? "visible" : "invisible",
              ].join(" ")}
            >
              {errors.phone ?? " "}
            </p>
          </div>

          <div className="grid grid-cols-[96px_1fr] items-center gap-x-28 gap-y-1">
            <div className="w-24 whitespace-nowrap text-body-2 text-[var(--black-default)] uppercase">
              성명
            </div>
            <UnderlineField
              name="name"
              value={name}
              onChange={setName}
              placeholder="000"
              autoComplete="name"
              error={errors.name}
              errorId={nameErrorId}
              renderError={false}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              paddingYClassName="py-2.5"
              reserveErrorSpace={false}
              wrapperClassName="w-full"
            />
            <div />
            <p
              id={nameErrorId}
              aria-live="polite"
              className={[
                "min-h-5 text-sm font-normal leading-5 text-coral-400",
                errors.name ? "visible" : "invisible",
              ].join(" ")}
            >
              {errors.name ?? " "}
            </p>
          </div>

          <div className="grid grid-cols-[96px_1fr] items-center gap-x-28 gap-y-1">
            <div className="w-24 whitespace-nowrap text-body-2 text-[var(--black-default)] uppercase">
              생년월일
            </div>
            <UnderlineField
              name="birth"
              value={birth}
              onChange={setBirth}
              placeholder="2001.00.00"
              autoComplete="bday"
              error={errors.birth}
              errorId={birthErrorId}
              renderError={false}
              onBlur={() => setTouched((t) => ({ ...t, birth: true }))}
              paddingYClassName="py-2.5"
              reserveErrorSpace={false}
              wrapperClassName="w-full"
            />
            <div />
            <p
              id={birthErrorId}
              aria-live="polite"
              className={[
                "min-h-5 text-sm font-normal leading-5 text-coral-400",
                errors.birth ? "visible" : "invisible",
              ].join(" ")}
            >
              {errors.birth ?? " "}
            </p>
          </div>

          <div className="grid grid-cols-[96px_1fr] items-center gap-x-28 gap-y-1">
            <div className="w-24 whitespace-nowrap text-body-2 text-[var(--black-default)] uppercase">
              아이디
            </div>
            <UnderlineField
              name="email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="이메일을 입력해 주세요."
              autoComplete="email"
              error={errors.email}
              errorId={emailErrorId}
              renderError={false}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              paddingYClassName="py-3"
              reserveErrorSpace={false}
              wrapperClassName="w-full"
              endAddon={
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => alert("중복 확인은 준비 중입니다.")}
                >
                  중복 확인
                </Button>
              }
            />
            <div />
            <p
              id={emailErrorId}
              aria-live="polite"
              className={[
                "min-h-5 text-sm font-normal leading-5 text-coral-400",
                errors.email ? "visible" : "invisible",
              ].join(" ")}
            >
              {errors.email ?? " "}
            </p>
          </div>

          <div className="grid grid-cols-[96px_1fr] items-center gap-x-28 gap-y-1">
            <div className="w-24 whitespace-nowrap text-body-2 text-[var(--black-default)] uppercase">
              비밀번호
            </div>
            <UnderlineField
              name="password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="대소문자, 숫자. 특수문자 포함 8글자 이상"
              autoComplete="new-password"
              error={errors.password}
              errorId={passwordErrorId}
              renderError={false}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              paddingYClassName="py-2.5"
              reserveErrorSpace={false}
              wrapperClassName="w-full"
            />
            <div />
            <p
              id={passwordErrorId}
              aria-live="polite"
              className={[
                "min-h-5 text-sm font-normal leading-5 text-coral-400",
                errors.password ? "visible" : "invisible",
              ].join(" ")}
            >
              {errors.password ?? " "}
            </p>
          </div>

          <div className="grid grid-cols-[96px_1fr] items-center gap-x-28 gap-y-1">
            <div className="w-24 whitespace-nowrap text-body-2 text-[var(--black-default)] uppercase">
              비밀번호 확인
            </div>
            <UnderlineField
              name="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={setPasswordConfirm}
              placeholder="설정한 비밀번호를 입력해 주세요."
              autoComplete="new-password"
              error={errors.passwordConfirm}
              errorId={passwordConfirmErrorId}
              renderError={false}
              onBlur={() => setTouched((t) => ({ ...t, passwordConfirm: true }))}
              paddingYClassName="py-2.5"
              reserveErrorSpace={false}
              wrapperClassName="w-full"
            />
            <div />
            <p
              id={passwordConfirmErrorId}
              aria-live="polite"
              className={[
                "min-h-5 text-sm font-normal leading-5 text-coral-400",
                errors.passwordConfirm ? "visible" : "invisible",
              ].join(" ")}
            >
              {errors.passwordConfirm ?? " "}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center justify-center gap-8">
          <Button
            type="submit"
            size="mid"
            className="px-10 py-4"
            disabled={!Boolean(canSubmit)}
          >
            {submitting ? "회원가입 중..." : "회원가입 하기"}
          </Button>
          <Link href="/login">
            <Button type="button" variant="outline" size="mid" className="px-10 py-4">
              취소
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
}

