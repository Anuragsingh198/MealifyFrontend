// Modal.js
import React from 'react';
import './modal.css';

const Modal = ({ children, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='close-button' onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
