///// zustand 작성 방식 예시 코드입니다!
// 초기 세팅단계에 더미 데이터로 넣어놓음

import { create } from "zustand";

const useCounter = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useCounter;
