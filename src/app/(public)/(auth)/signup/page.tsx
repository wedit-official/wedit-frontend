import { SignupForm } from "@/features/auth/components/SignupForm/SignupForm";

export default function SignupPage() {
  return (
    <main className="w-full">
      <div className="flex w-full flex-col items-center justify-start">
        <div className="flex w-full max-w-[1100px] flex-col items-start justify-start gap-10 overflow-hidden px-9 py-8 md:min-w-[508px]">
      <div className="flex w-full flex-col items-start justify-start gap-3">
        <h1 className="w-full text-2xl font-semibold leading-9 text-text-default uppercase">
          회원가입
        </h1>
        <p className="w-full text-base font-normal leading-5 text-text-secondary">
          공개된 가격 정보로 시작하는 결혼 준비.
          <br />
          웨딧과 함께 더 똑똑하게 준비하세요
        </p>
      </div>

      <SignupForm />
        </div>
      </div>
    </main>
  );
}

