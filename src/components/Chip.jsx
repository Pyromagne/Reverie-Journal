import React from 'react';

const Chip = ({ text, onDelete, readOnly, chipKey, color = '#267E66' }) => {

  /* const handleMouseEnter = (e) => {
    if (!readOnly) {
      e.target.style.borderColor = '#790000';
      e.target.style.color = '#790000';
    }
  };

  const handleMouseLeave = (e) => {
    if (!readOnly) {
      e.target.style.borderColor = color;
      e.target.style.color = color;
    }
  }; */

  return (
    <div
      onClick={readOnly ? null : () => onDelete(chipKey)}
      style={{ borderColor: color, color: color }}
      className={`inline w-fit h-fit border rounded-full p-1 px-2 ${readOnly ? '' : 'hover:cursor-pointer'}`}
      /* onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} */
    >
      <p
        className="inline font-light text-sm text-nowrap"
      >
        {text}
      </p>
    </div>
  );
};

export default Chip;
