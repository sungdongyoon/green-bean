import { create } from "zustand";

interface TestState {
  value: boolean;
  text: string;
}

export const useTestStore = create<TestState>((set) => ({
  value: false,
  text: "hi",
}));
