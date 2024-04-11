import {React, useState, useEffect} from 'react';
import { Chip, Stack } from '@mui/material';

const Chips = ({ items, onDelete, readOnly, onCountChange }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const mappedData = items.map(item => item * 2);
    setCount(mappedData.length);

    if (onCountChange) {
      onCountChange(mappedData.length);
    }
  }, [items, onCountChange]);

  return (
    <Stack spacing={1} direction="row" className="w-full flex flex-wrap justify-center">
      {items.map((item, index) => (
        <Chip
          key={index}
          label={item}
          variant="outlined"
          color="primary"
          style={{ margin: '4px' }}
          onDelete={readOnly ? null : () => onDelete(index)}
        />
      ))}
    </Stack>
  );
};

export default Chips;