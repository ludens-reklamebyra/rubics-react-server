import React from "react";
import ReactDOMServer from "react-dom/server.js";
import Page from "@ludens-reklame/rubics-react/dist/components/Page.js";
import RequestUtil from "./util.js";
import bootstrapper from "../bootstrapper.js";

class RendererHandler {
  static render(req, res) {
    let body = "";

    req.on("data", function (data) {
      body += data;

      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });

    req.on("end", function () {
      try {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

        const host = req.headers["host"];
        const json = JSON.parse(body);
        const store = json.store;
        const preloadedComponents = [];

        if ("base" in bootstrapper.css) {
          res.write(`<style>${bootstrapper.css.base}</style>`);
        }

        res.write(
          `<script type="module" src="//${host}/client.js" defer></script>`
        );

        for (const key in store.componentTree) {
          if (Object.hasOwnProperty.call(store.componentTree, key)) {
            const sections = store.componentTree[key];

            for (const section of sections) {
              if (!preloadedComponents.includes(section.component)) {
                if (section.component in bootstrapper.components) {
                  res.write(
                    `<link rel="modulepreload" href="//${host}/components/${section.component}.js">`
                  );
                }

                preloadedComponents.push(section.component);
              }
            }
          }
        }

        res.write('<div id="app">');

        const page = React.createElement(Page, {
          store,
          renderComponent,
          renderGlobalCss: RendererHandler.#createCssVariables,
        });

        const stream = ReactDOMServer.renderToNodeStream(page);

        stream.pipe(res, { end: false });

        stream.on("end", () => {
          res.write("</div>");
          res.end();
        });
      } catch (error) {
        RequestUtil.badRequest(400, "Bad JSON")(req, res);
      }
    });
  }

  static #createCssVariables(themeConfig) {
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
}

function renderComponent(component, props, children) {
  if (component.component in bootstrapper.components) {
    const Component = bootstrapper.components[component.component];

    return React.createElement(
      "div",
      {
        id: `c_${component.name}`,
      },
      React.createElement(Component, props, children)
    );
  }

  return null;
}

export default RendererHandler;
