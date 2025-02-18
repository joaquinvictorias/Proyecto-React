import { useContext } from "react";
import Button from "../UI/Button";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../store/CartContext";
import { UserProgressContext } from "../../store/UserProgressContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../store/UserContext";

function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useUser();

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    const links = [
        { name: "Inicio", path: "/" },
        { name: "Iniciar sesión", path: "/login" },
        { name: "Productos", path: "/dashboard" }
    ];

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    function handleLogout() {
        logout();
    }

    return (
        <header id="main-header">
            <div id="title">
                <h1>Riot Threads</h1>
            </div>
            <nav>
                <ul className="menu">
                    {user ? (
                        <>
                            {links.filter((link) => link.path !== location.pathname && link.name !== "Iniciar sesión").map((link) => (
                                <Button textOnly key={link.path} onClick={() => navigate(link.path)}>{link.name}</Button>
                            ))}
                            <Button textOnly onClick={handleLogout}>Cerrar sesión</Button>
                        </>
                    ) : (
                        links.filter((link) => link.path !== location.pathname).map((link) => (
                            <Button textOnly key={link.path} onClick={() => navigate(link.path)}>{link.name}</Button>
                        ))
                    )}
                    <Button textOnly onClick={handleShowCart}>
                        Cesta ({totalCartItems})
                        <FaShoppingCart />
                    </Button>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
