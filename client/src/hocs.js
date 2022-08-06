import { useParams } from "react-router-dom";

export function withParams (Component) {
    // Higher-Order Componenet (HOCs) are a function that takes a component and returns a new component
    // we are passing in the useParams component as a prop into our SingleProduct.js
    return props => <Component {...props} params={useParams()} />; {/* {...props} is an example of a spread operator */}
};