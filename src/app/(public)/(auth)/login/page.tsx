import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-[780px] flex-col items-center gap-11 px-9 py-14">
      <div className="flex w-full min-w-44 flex-col items-center justify-start gap-3">
        <h1 className="w-full text-center text-2xl font-semibold leading-9 text-text-default">
          웨딧에 오신 것을 환영해요
        </h1>
        <p className="w-full text-center text-base font-normal leading-5 text-text-secondary">
          로그인을 하면 더 많은 기능을 이용할 수 있어요
          <br />
          저희 함께 결혼 준비해요
        </p>
      </div>

      <LoginForm />
    </main>
  );
}

