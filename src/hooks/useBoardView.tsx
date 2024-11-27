import { useState } from "react";

export function useBoardView() {
  const [view, setView] = useState<"list" | "kanban">("kanban");

  return {
    view,
    setView,
  };
}
