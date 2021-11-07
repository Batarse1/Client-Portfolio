import { useAuth } from "../../Hooks/UseAuth/useAuth";
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute (props){
    
    const auth = useAuth();
    
    return (
        <Route exact path={props.path} render={
            data => auth.user ?
            (<props.component {...data}></props.component>):
            (<Redirect to={{pathname:'/'}}></Redirect>)
        }>
        </Route>
    );
}

export default PrivateRoute;