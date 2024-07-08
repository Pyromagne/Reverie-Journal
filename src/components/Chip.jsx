import React from 'react';

const Chip = ({ text, onDelete, readOnly, chipKey }) => {

  return (
    <div
      onClick={readOnly ? null : () => onDelete(chipKey)}
      className={`inline w-fit border-[#267E66] border rounded-full p-1 px-2 ${readOnly ? null : 'hover:cursor-pointer'}`}
    >
      <p className='inline font-light text-sm text-[#267E66]'>{text}</p>
    </div>
  );
};

export default Chip;