// import the form component
import MoviesForm from "../components/movies-form";
// import the streaming-platform-button component
import StreamingPlatformButton from "../components/streaming-platform-button";
// import the streaming-platform-card component
import StreamingPlatformCard from "../components/streaming-platform-card";
// import the stremaing platform data
import data from "../utils/data";

const PriceComparator = () => {
  // put the data of the streaming platforms in a variable
  let platforms: {
    id: string;
    img: string;
    icon: string;
    platformprice: number;
  }[] = data;

  // variable to store the form values
  let formValues: {
    numMovies: number;
    moviePrice: number;
  } = { numMovies: 0, moviePrice: 0 };

  // function to get and set the form values in the formValues variable
  const handleInputs = (event: Event) => {
    if ((event.target as HTMLInputElement).className === "movies-form__input") {
      formValues = {
        ...formValues,
        [(event.target as HTMLInputElement).name]: (
          event.target as HTMLInputElement
        ).value,
      };
    }
    // change the cinemaprice atribute in the streaming-platform-card elements
    if (document.querySelectorAll(".streaming-platforms-cards").length > 0) {
      let cards: Element[] = [
        ...document.querySelectorAll("streaming-platform-card"),
      ];
      const cinemaPrice: number = formValues.numMovies * formValues.moviePrice;
      cards = cards.map((card: any) => {
        card.properties.cinemaprice = cinemaPrice;
        return card;
      });
      document.querySelector(".streaming-platforms-cards")!.innerHTML = "";
      document.querySelector(".streaming-platforms-cards")?.append(...cards);
    }
  };

  // function to add or remove a streaming-platform-card element from the DOM
  const handleClick = (event: any) => {
    event.target.display = !event.target.display;
    const cardData = platforms.find(
      (platform) => platform.id === event.target.name
    );
    const cards = document.querySelector(".streaming-platforms-cards");
    const cinemaPrice = formValues.numMovies * formValues.moviePrice;
    if (event.target.display) {
      cards?.append(
        new StreamingPlatformCard({ ...cardData!, cinemaprice: cinemaPrice })
      );
    } else {
      cards?.removeChild(document.querySelector(`#${event.target.name}`)!);
    }
  };

  // variable to get the main container
  const main = document.getElementById("app");

  // create a form
  const form = new MoviesForm();

  // create an array to store the buttons that will add or remove a streaming-platform-card
  const buttonsArray = platforms.map((item) => {
    const button = new StreamingPlatformButton(
      item.id,
      item.icon,
      false,
      handleClick
    );
    return button;
  });

  // create a div node to add the buttons
  const platformsButtons: HTMLDivElement = document.createElement("div");
  platformsButtons.className = "streaming-platforms-buttons";

  // append the butons to the div node
  platformsButtons.append(...buttonsArray);

  // create a node to add or remove a streaming-platform-card element
  const streamingPlatforms = document.createElement("div");
  streamingPlatforms.className = "streaming-platforms-cards";

  // an eventListener is added to listen the changes in the form
  main?.addEventListener("input", handleInputs);

  // the form and buttons are added to the main container
  main?.append(form, platformsButtons, streamingPlatforms);
};

export default PriceComparator;
