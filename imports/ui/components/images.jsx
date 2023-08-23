import React from "react";
import "./styles.module.css";

const ImageCircle = ({ src, alt, style}) => (
    <img
        className={`image-circle`}
        style={style}
        src={src}
        alt={alt}
    />
);

export { ImageCircle };