import React, { useState, useEffect } from 'react';

const TimeAgo = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Calculate the difference between current time and the timestamp
      const now = new Date().getTime();
      const difference = now - timestamp;

      // Determine the human-readable time ago
      let timeAgo = '';
      if (difference < 1000 * 60) {
        timeAgo = 'Now';
      } else if (difference < 1000 * 60 * 60) {
        timeAgo = `${Math.floor(difference / (1000 * 60))}m ago`;
      } else if (difference < 1000 * 60 * 60 * 24) {
        timeAgo = `${Math.floor(difference / (1000 * 60 * 60))}h ago`;
      } else {
        timeAgo = `${Math.floor(difference / (1000 * 60 * 60 * 24))}d ago`;
      }

      // Update the timeAgo state
      setTimeAgo(timeAgo);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <div className='text-xs max-lg:text-[8px]'>{timeAgo}</div>;
};

export default TimeAgo;