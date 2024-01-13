import React from 'react';
import { Chip, Stack } from '@mui/material';

const Chips = ({ items, onDelete, readOnly }) => {
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