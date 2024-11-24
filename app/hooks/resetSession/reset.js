import { useEffect } from "react";
import { signOut } from "next-auth/react";

const InactivityHandler = ({ timeout = 60 * 1000 }) => { // Default: 1 minute
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      if (timer) clearTimeout(timer); // Clear any existing timer
      console.log("Activity detected. Timer reset.");
      timer = setTimeout(() => {
        console.log("Inactivity timeout. Logging out...");
        signOut({
            redirect: true,
          callbackUrl: "/", // This will reload the page after logout
        });
        window.location.reload(); // Trigger page reload after inactivity logout
      }, timeout);
    };

    const handleActivity = () => {
      console.log("User activity detected.");
      resetTimer(); // Reset the timer on activity
    };

    // Attach event listeners for user activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("click", handleActivity);

    // Start the inactivity timer
    resetTimer();

    // Cleanup event listeners on unmount
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [timeout]);

  return null; // No UI required
};

export default InactivityHandler;
