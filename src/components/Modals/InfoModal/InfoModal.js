import './InfoModal.css';

export function InfoModal(props) {
  return (
    <div className="ProductAddedModalContainer">
      {props.text}
    </div>
  );
}
