import React from "react";

const TextTitle = ({ children, style }) => (
    <h1 className="text-title" style={style}>{children}</h1>
)

const TextTitleDark = ({ children, style }) => (
    <h1 className="text-title-dark" style={style}>{children}</h1>
);

export { TextTitle, TextTitleDark };