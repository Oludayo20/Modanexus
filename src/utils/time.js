import { useEffect, useState } from 'react';

const Time = ({ time }) => {
  const [difference, setDifference] = useState(null);

  useEffect(() => {
    const calculateDifference = () => {
      const currentTime = new Date();
      const targetTime = new Date(time);
      const timeDifference = currentTime - targetTime;

      setDifference(timeDifference);
    };

    calculateDifference();
  }, [time]);

  const formatTimeDifference = (difference) => {
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''}, ${hours % 24} hour${
        hours % 24 > 1 ? 's' : ''
      }`;
    }

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}, ${minutes % 60} minute${
        minutes % 60 > 1 ? 's' : ''
      }`;
    }

    return `${minutes} minute${minutes > 1 ? 's' : ''}, ${seconds % 60} second${
      seconds % 60 > 1 ? 's' : ''
    }`;
  };

  return (
    <p>
      {difference !== null
        ? formatTimeDifference(difference)
        : 'Calculating...'}
    </p>
  );
};

export default Time;
