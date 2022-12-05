import './InfoModal.css';

export function InfoModal(props:{text:string}) {
  return (
    <div className="ProductAddedModalContainer">
      {props.text}
    </div>
  );
}
