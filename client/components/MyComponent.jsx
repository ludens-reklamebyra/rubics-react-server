import React from "react";

function MyComponent(props) {
  return (
    <div className="MyComponent">
      <h1>Heisann, dette er Min Komponent</h1>
      <pre className="MyComponent">{JSON.stringify(props, null, "  ")}</pre>
    </div>
  );
}

export default MyComponent;
