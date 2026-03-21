import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

export default function NetworkErrorPage() {
  const [isOffline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setOffline(true);
    const handleOnline = () => setOffline(false);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <>
      <div className="fixed inset-0 z-999 bg-[#dbdee0] text-black flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
        <IoWarningOutline size={50} className="text-[#6a6968] mb-6" />

        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
          You are Offline!
        </h2>

        <p className="text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md md:max-w-lg mb-6">
          Your internet connection appears to be disabled. Please check your
          internet to continue browsing!
        </p>

        <button
          onClick={() => window.location.reload()}
          className="btn btn-outline btn-info px-6"
        >
          Retry
        </button>
      </div>
    </>
  );
}
