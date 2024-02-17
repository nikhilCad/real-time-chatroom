import { useEffect, useState } from "react"

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);

  //avoid hydration errors 
  useEffect(() => {
    setMounted(true);
  }, []);

  //gets the url of the current window
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

  if (!mounted) {
    return "";
  }

  return origin;
}