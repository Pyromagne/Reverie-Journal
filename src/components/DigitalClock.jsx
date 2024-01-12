import { centuryGothicFont } from '../constants';

import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = (time) => {
    /* return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); */
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
  };

  return (
    <Typography variant="h4" align="center" className='text-slate-100' sx={centuryGothicFont}>
      {formattedTime(currentTime)}
    </Typography>
  );
};

export default DigitalClock;