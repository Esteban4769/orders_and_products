import { useState, useEffect } from 'react';
import myImage from '../../images/clock.svg';
import { getFormattedDateTime } from '../../utils/dateFormatter';

export const TopMenu = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [formattedDate, formatedTime] = getFormattedDateTime(dateTime);

  return (
    <header className="top-menu">
      <div className="top-menu__date">
        Today
        {formattedDate}
        <div className="top-menu__clock-icon-wrapper">
          <img
            src={myImage}
            alt="clock_icon"
            className="top-menu__clock-icon"
          />
          {formatedTime}
        </div>
      </div>
    </header>
  );
};
