import { useEffect, useState } from "react";

const useSnap = () => {
  const [snap, setSnap] = useState(null);

  useEffect(() => {
    const ClientKey = "SB-Mid-client-LSH8eb7-3QZ0sNFm";
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", ClientKey);
    script.onload = () => {
      setSnap(window.snap);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapPop = (snap_token, action) => {
    if (snap) {
      snap.pay(snap_token, action);
    }
  };

  return { snapPop };
};

export default useSnap;
