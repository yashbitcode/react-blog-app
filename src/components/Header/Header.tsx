import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { Login } from "../Auth";
// import { useNavigate } from "react-router-dom";

const Header = () => {
    const authStatus = useSelector((state: RootState) => state.auth.status);
    // const navigate = useNavigate();

    const navItems: {
        name: string;
        href: string;
        active: boolean;
    }[] = [
        {
            name: "Home",
            href: "/",
            active: true,
        },
        {
            name: "Login",
            href: "/login",
            active: !authStatus,
        },
        {
            name: "Sign Up",
            href: "/sign-up",
            active: !authStatus,
        },
        {
            name: "Home",
            href: "/",
            active: true,
        },
    ];
    return (
        <div className="w-full p-4">
            <nav>
                <ul>
                    {navItems.map((el) => el.active && (
                        // <Link to={el.href} key={el.name}>
                            <li>{el.name}</li>
                        // </Link>
                    ))}
                </ul>
            </nav>
            <Login />
        </div>
    );
};

export default Header;
