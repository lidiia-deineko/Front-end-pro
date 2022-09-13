import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    
    if (!localStorage.userId) {
      return <Navigate to={'/sign-up'} replace />;
    }
  
    return props.children;
  };

  export default ProtectedRoute;