"use client";

export function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="모달 닫기"
        onClick={onClose}
      />

      <div className="relative z-10 w-80 rounded-xl bg-white overflow-hidden shadow-lg">
        <div className="px-6 pt-5 pb-4 flex flex-col items-center gap-3">
          <h2 className="text-lg font-semibold leading-6 text-[var(--grey-900)]">
            업체 삭제
          </h2>
          <p className="text-xs font-medium leading-5 text-[var(--grey-700)]">
            선택한 업체를 정말 삭제하시겠어요?
          </p>
        </div>
        <div className="flex gap-2.5 px-6 pb-5 justify-center">
          <button
            type="button"
            onClick={onClose}
            className="h-10 min-w-[9rem] rounded-[222px] bg-white px-4 outline outline-[0.70px] outline-offset-[-0.70px] outline-[var(--grey-900)] inline-flex items-center justify-center gap-2.5 text-base font-semibold capitalize leading-5 text-[var(--text-default)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 min-w-[9rem] rounded-[222px] bg-[var(--coral-400)] px-4 inline-flex items-center justify-center gap-2.5 text-base font-semibold capitalize leading-5 text-white"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}
