import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const Header = () => {
    const authStatus = useSelector((state: RootState) => state.auth.status);

    return (
        <div className="w-full p-4 bg-amber-700">
            ds
        </div>
    );
};

export default Header;