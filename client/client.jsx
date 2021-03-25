import React from "react";
import ReactDOM from "react-dom";
import Page from "@ludens-reklame/rubics-react/dist/components/Page.js";

ReactDOM.hydrate(
  <Page
    store={_STORE}
    renderComponent={renderComponent}
    renderGlobalCss={createCssVariables}
  />,
  document.querySelector("#app")
);

function renderComponent(component, props, children) {
  return (
    <ClientComponent component={component} props={props} children={children} />
  );
}

function createCssVariables(themeConfig) {
  let css = ":root{";

  for (const key in themeConfig) {
    if (Object.hasOwnProperty.call(themeConfig, key)) {
      const value = themeConfig[key];

      css += `--${key}: ${value};`;
    }
  }

  css += "}";

  return css;
}

function ClientComponent({ component, props, children }) {
  const Component = React.lazy(() =>
    import(`./components/${component.component}.js`)
  );

  const componentId = `c_${component.name}`;

  return (
    <React.Suspense
      fallback={
        <div
          id={componentId}
          dangerouslySetInnerHTML={{
            __html: document.getElementById(componentId).innerHTML,
          }}
        />
      }
    >
      <div id={componentId}>
        <Component {...props}>{children}</Component>
      </div>
    </React.Suspense>
  );
}
