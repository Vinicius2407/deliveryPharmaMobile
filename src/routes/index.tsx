import { Loading } from "../components/Loading";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { CartProvider } from "../contexts/CartContext";
import { AppClientRoutes } from "./AppClientRoutes";
import { AppPharmaceuticalRoutes } from "./AppPharmaceuticalRoutes";

import { AuthRoutes } from "./AuthRoutes";

export function Routes() {
    const { isAuthenticated, isLoading, user } = useAuthentication();

    if (isLoading) return <Loading />

    if (isAuthenticated) {
        return user?.usuarioTipo == "CLIENTE" ? <CartProvider><AppClientRoutes /></CartProvider> : <AppPharmaceuticalRoutes />
    } else {
        return <AuthRoutes />
    }
}
