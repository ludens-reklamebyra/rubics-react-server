import React from "react";

function Page({ renderer, store, components }) {
  const main = store.componentTree.main;

  return (
    <div>
      {main.map((s) => (
        <Section
          key={s.name}
          renderer={renderer}
          section={s}
          components={components}
        />
      ))}
    </div>
  );
}

function Section({ renderer, section, components }) {
  if (renderer === "server") {
    if (section.component in components) {
      const Component = components[section.component];

      return (
        <div id={section.name}>
          <Component {...section.props} />
        </div>
      );
    }

    return null;
  }

  const Component = React.lazy(() =>
    import(`./components/${section.component}.js`)
  );

  return (
    <React.Suspense
      fallback={
        <div
          id={section.name}
          dangerouslySetInnerHTML={{
            __html: document.getElementById(section.name).innerHTML,
          }}
        />
      }
    >
      <Component {...section.props} />
    </React.Suspense>
  );
}

export default Page;
