import React from "react";
import ReactDOM from "react-dom";
import Page from "@ludens-reklame/rubics-react/dist/components/Page.js";

ReactDOM.hydrateRoot(
  document.querySelector("#app"),
  <Page
    store={_STORE}
    renderComponent={renderComponent}
    renderGlobalCss={createCssVariables}
  />
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
  const elem = document.getElementById(componentId);

  return (
    <React.Suspense
      fallback={
        <div
          id={componentId}
          dangerouslySetInnerHTML={
            elem
              ? {
                  __html: elem.innerHTML,
                }
              : undefined
          }
        />
      }
    >
      <div id={componentId}>
        <Component {...props}>{children}</Component>
      </div>
    </React.Suspense>
  );
}
