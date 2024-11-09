import React, { useEffect } from "react";

const CountDown = ({
  duration,
  setOpenTimeOutDialog,
  setOpenTimeLeftDialog,
  user,
}: {
  duration: number;
  setOpenTimeOutDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenTimeLeftDialog: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
}) => {
  const [timeLeft, setTimeLeft] = React.useState(duration || 0);

  // Convert time left in seconds to hours and minutes
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  // monitor time left
  useEffect(() => {
    if (user) {
      if (timeLeft === 0) {
        setOpenTimeOutDialog(true);
        return;
      }

      // if time less then 5 min show a alert
      if (timeLeft === 300) {
        setOpenTimeLeftDialog(true);
      }

      const timerId = setInterval(() => {
        setTimeLeft((prevTime: number) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft, user]);

  return (
    <div className="text-center sticky top-0 bg-gray-800 text-white p-1 z-20">
      <h1 className="text-lg sm:text-xl md:text-2xl font-medium">Quiz {user ? "Countdown" : "Duration"}</h1>
      <h2 className="text-base">
        {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h2>
    </div>
  );
};

export default CountDown;
