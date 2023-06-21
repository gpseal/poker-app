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

export const yourHand = [
  {
    card: "4",
    image:
      "https://tekeye.uk/playing_cards/images/svg_playing_cards/fronts/spades_4.svg",
    suit: "spades",
    value: 4,
  },
  {
    card: "7",
    image:
      "https://tekeye.uk/playing_cards/images/svg_playing_cards/fronts/diamonds_7.svg",
    suit: "diamonds",
    value: 7,
  },
];

export const winningHand = [
  {
    card: "9",
    image:
      "https://tekeye.uk/playing_cards/images/svg_playing_cards/fronts/spades_4.svg",
    suit: "clubs",
    value: 9,
  },
  {
    card: "10",
    image:
      "https://tekeye.uk/playing_cards/images/svg_playing_cards/fronts/diamonds_7.svg",
    suit: "diamonds",
    value: 10,
  },
];