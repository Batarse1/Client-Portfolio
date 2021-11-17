import { useAuth } from "../../Hooks/UseAuth/useAuth";
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    let auth = useAuth();

    if (!auth.user) {
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;