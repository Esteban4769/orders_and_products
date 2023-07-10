import { useState, useEffect } from 'react';
import myImage from '../../images/clock.svg';
import topMenuIcon from '../../images/top-menu-icon.png';

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

  const [
    formattedDate,
    formatedTime,
    formattedDay,
  ] = getFormattedDateTime(dateTime);

  return (
    <header className="top-menu">
      <div className="top-menu__title">
        <div className="top-menu__title-icon-wrapper">
          <img
            src={topMenuIcon}
            alt="top-menu-icon"
            className="top-menu__title-icon"
          />
        </div>
        &nbsp;
        Orders & Products
      </div>
      <div className="top-menu__date">
        <p>
          {formattedDay}
        </p>
        {formattedDate}
        <div className="top-menu__clock-icon-wrapper">
          <img
            src={myImage}
            alt="clock_icon"
            className="top-menu__clock-icon"
          />
          &nbsp;
          {formatedTime}
        </div>
      </div>
    </header>
  );
};
