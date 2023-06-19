import UserContext from "../components/UserContext";
import { render } from "react-dom";

export const mockContext = (user, component, container) => {
    return render(
      <UserContext.Provider value={user}>{component}</UserContext.Provider>,
      container
    );
};

export const mockRouter = () => {
    return(
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useNavigate: () => jest.fn(),
      }))
    )
}