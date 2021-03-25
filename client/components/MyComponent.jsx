import React from "react";

function MyComponent(props) {
  return (
    <div className="MyComponent">
      <h1>Heisann, dette er Min Komponent</h1>
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
