import { createContext, useContext } from "react";

export const PlannerMapContext = createContext({
  onSelectPlace: () => {},
  setSelectedDay: () => {},
  selectedDay: "",
  selectedPlanDate: {},
  handleDeleteSelectedPlanDate: () => {},
});

export const usePlannerMapContext = () => {
  const context = useContext(PlannerMapContext);
  // context API는 더 상위에서 사용 못함 (예외 처리)
  if (!context) {
    throw new Error("PlannerMapContext를 호출할 수 없는 범위 입니다.");
  }
  return context;
};
