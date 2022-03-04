import React from "react";

function Header(props) {
  const title = React.useMemo(() => {
    const siteName = props.site.displayName || props.site.name;

    return siteName
      .toUpperCase()
      .split(" ")
      .map((s) => s.split("").join(" · "));
  }, [props.site]);

  return (
    <div className="Header">
      {title.map((t, k) => (
        <span key={k}>{t}</span>
      ))}
    </div>
  );
}

export default Header;
