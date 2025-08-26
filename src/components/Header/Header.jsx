import React ,{useState} from "react";
import Container from "../Container/Container";
import LogOutBtn from "./LogOutBtn";
import { Link} from  "react-router-dom";
import {useNavigate} from  "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Logo";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate()

  const navItems = [
    { name: "Home", slug: "/", active: true, },
    { name: "Login", slug: "/login", active: !authStatus, },
    { name: "SignUp", slug: "/signup", active: !authStatus, },
    { name: "All Posts", slug: "/all-posts", active: authStatus, },
    { name: "Add Post", slug: "/add-post", active: authStatus, },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state

  return (
    <div>
          <header className="header py-3 mb-4 border-bottom">
      <Container>
            <nav className="d-flex align-items-center px-4 py-2">
            <div className="mr-4">
              <Link to="/">
               <Logo/>
              </Link>
            </div>

              <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} >
          &#9776;</button>
            <ul className={`nav ms-auto nav-collapsible ${isMenuOpen ? "open" : ""}`}>
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name} className="mx-2">
                      <button
                        type="button"
                        className="nav-btn"
                        onClick={() =>  {
              navigate(item.slug);
              setIsMenuOpen(false); // ✅ Close menu after click
            }}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li className="mx-2">
                  <LogOutBtn />
                </li>
              )}
            </ul>
             </nav>
      </Container>

          </header>
    </div>
  );
}

export default Header;
