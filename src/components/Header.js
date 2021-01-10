import React from "react";
import Navbar from "./Navbar";

export default function Header(props) {
  return (
    <div>
      <header className="header">
        <Navbar
          handleLogout={props.handleLogout}
          handleSearch={props.handleSearch}
        />
        <div className="header-image-cropper">
          <img
            src="https://i.ytimg.com/vi/RCSTnK1gfzs/maxresdefault.jpg"
            className="header-pic"
            alt=""
          />
        </div>
        <span className="text-center">QPQ</span>
      </header>
    </div>
  );
}
