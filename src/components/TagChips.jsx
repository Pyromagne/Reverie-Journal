import React from 'react';
import { Chip, Stack } from '@mui/material';

const TagChips = ({ tags, onDelete }) => {
  return (
    <Stack spacing={1} direction="row" className="w-full flex flex-wrap justify-center">
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          variant="outlined"
          color="primary"
          style={{ margin: '4px' }}
          onDelete={() => onDelete(index)}
        />
      ))}
    </Stack>
  );
};

export default TagChips;