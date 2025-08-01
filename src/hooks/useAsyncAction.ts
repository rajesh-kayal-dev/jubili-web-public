import { useState } from "react";

export function useAsyncAction(callback: () => Promise<void>, delay = 1000) {
  const [loading, setLoading] = useState(false);

  const trigger = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, delay));
      await callback();
    } finally {
      setLoading(false);
    }
  }; 

  return { trigger, loading };
}
