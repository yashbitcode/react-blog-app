import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import Logout from "./Logout";

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
            name: "All Posts",
            href: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            href: "/add-post",
            active: authStatus,
        },
        {
            name: "Your Posts",
            href: "/your-posts",
            active: authStatus,
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
        }
    ];
    return (
        <div className="w-full p-4 max-w-2xl mx-auto bg-gray-300 mt-6">
            <nav className="flex justify-between">
                <div>logo</div>
                <ul className="flex gap-4">
                    {navItems.map((el) => el.active && (
                        <Link to={el.href} key={el.name}>
                            <li className="text-nowrap">{el.name}</li>
                        </Link>
                    ))}
                    {
                        authStatus && <Logout />
                    }
                </ul>
            </nav>
        </div>
    );
};

export default Header;
