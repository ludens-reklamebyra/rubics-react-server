import React from "react";
import ReactDOM from "react-dom";
import Page from "@ludens-reklame/rubics-react/dist/components/Page.js";

ReactDOM.hydrate(
  <Page store={_STORE} renderComponent={renderComponent} />,
  document.querySelector("#app")
);

function renderComponent(component, props, children) {
  return (
    <ClientComponent component={component} props={props} children={children} />
  );
}

function ClientComponent({ component, props, children }) {
  const Component = React.lazy(() =>
    import(`./components/${component.component}.js`)
  );

  return (
    <React.Suspense
      fallback={
        <div
          id={component.name}
          className="component"
          dangerouslySetInnerHTML={{
            __html: document.getElementById(component.name).innerHTML,
          }}
        />
      }
    >
      <div id={component.name} className="component">
        <Component {...props}>{children}</Component>
      </div>
    </React.Suspense>
  );
}
