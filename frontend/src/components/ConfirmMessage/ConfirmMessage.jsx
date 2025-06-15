import './ConfirmMessage.css';

const ConfirmMessage = ({ type, onConfirm, onCancel }) => {
  const messages = {
    task: 'Are you sure you want to eliminate this task?',
    event: 'Are you sure you want to eliminate this event?',
    image: 'Are you sure you want to eliminate this image?',
  };

  return (
    <div className="confirm-message">
      <p>{messages[type] || 'Are you sure you want to proceed?'}</p>
      <div className="confirm-buttons">
        <button onClick={onConfirm} className="confirm-yes">Yes</button>
        <button onClick={onCancel} className="confirm-no">No</button>
      </div>
    </div>
  );
};

export default ConfirmMessage