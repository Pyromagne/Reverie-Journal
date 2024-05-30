import { React } from 'react';
import { Chip as _Chip } from '@mui/material';

const Chip = ({ text, onDelete, readOnly, chipKey }) => {

  return (
    <_Chip
      label={text}
      variant="outlined"
      color="primary"
      style={{ margin: '4px' }}
      onDelete={readOnly ? null : () => onDelete(chipKey)}
    />
  );
};

export default Chip;