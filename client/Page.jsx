import React from "react";

function Page({ renderer, store, getComponent }) {
  const main = store.componentTree.main;

  return (
    <div>
      {main.map((s) => (
        <Section
          key={s.name}
          renderer={renderer}
          section={s}
          getComponent={getComponent}
        />
      ))}
    </div>
  );
}

function Section({ renderer, section, getComponent }) {
  if (renderer === "server") {
    const Component = getComponent(section.component);

    return (
      <div id={section.name}>
        <Component {...section.props} />
      </div>
    );
  }

  const Component = React.lazy(() =>
    import(`/components/${section.component}.js`)
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
