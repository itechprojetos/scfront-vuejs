import { routes as auth } from "../modules/auth";
import { routes as pages } from "../pages/index";
export default [
    ...auth,
    ...pages,
];