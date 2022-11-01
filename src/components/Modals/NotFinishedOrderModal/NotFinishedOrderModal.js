import './NotFinishedOrderModal.css';

export function NotFinishedOrderModal(props) {
  return (
    <div className="container text-center oldOrderInfoContainer">
      <p>You have some products in shopping card</p>
      <button className="btn-primary" onClick={props.closeModal}>
        OK
      </button>
    </div>
  );
}
