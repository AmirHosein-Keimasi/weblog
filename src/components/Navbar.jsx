import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>وبلاگ ریداکسی من</h1>
        <div className="navContent">
          <div className="navLinks"></div>
        </div>
        <Link to={"/"} className="button">
          وبلاگ
        </Link>
        <Link to={"/users"} className="button " style={{marginRight:5}}>
          نویسندگان
        </Link>
      </section>
    </nav>
  );
};

export default Navbar;
