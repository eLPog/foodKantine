interface singleIconElementInterface {
   svgClassName:string,
    path:string[],
    title:string,
    text?:string
}
export function SingleIconElement(props:singleIconElementInterface) {
  return (
    <li title={props.title} className="nav__container__menu__list__li">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className={props.svgClassName}
        viewBox="0 0 16 16"
      >
        { props.path.map((el) => (
          <path d={el} key={Math.random() * 100} />
        )) }
      </svg>
      <span className="nav__container__menu__list__li__text">{props.text}</span>
    </li>
  );
}
