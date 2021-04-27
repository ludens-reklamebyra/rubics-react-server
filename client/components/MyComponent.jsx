import React from "react";

function MyComponent(props) {
  const [_num, setNum] = React.useState(props.num || 0);

  return (
    <div className="MyComponent">
      <h1>Heisann, dette er Min Komponent</h1>
      <p>
        Num: <strong>{_num}</strong>
      </p>
      <p>
        <button onClick={() => setNum(_num + 1)}>Increase num</button>
      </p>
      {props.foo && <p>{props.foo}</p>}
      {props.image && (
        <div>
          <img src={props.image.url} />
        </div>
      )}
    </div>
  );
}

export default MyComponent;
