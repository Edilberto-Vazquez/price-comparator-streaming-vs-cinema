// import the form component
import MoviesForm from "./components/movies-form";
// import the streaming-platform-button component
import StreamingPlatformButton from "./components/streaming-platform-button";
// import the streaming-platform-card component
import StreamingPlatformCard from "./components/streaming-platform-card";
// import the stremaing platform data
import data from "./utils/data";

const page = async () => {
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
    formValues = {
      ...formValues,
      [(event.target as HTMLInputElement).name]: (
        event.target as HTMLInputElement
      ).value,
    };
  };

  // function to add or remove a streaming-platform-card element from the DOM
  const handleClick = (event: any) => {
    event.target.display = !event.target.display;
    const cardData = platforms.find(
      (platform) => platform.id === event.target.name
    );
    const main = document.getElementById("main");
    const cinemaPrice = formValues.numMovies * formValues.moviePrice;
    if (event.target.display) {
      main?.append(
        new StreamingPlatformCard({ ...cardData!, cinemaprice: cinemaPrice })
      );
    } else {
      main?.removeChild(document.querySelector(`#${event.target.name}`)!);
    }
  };

  // variable to get the main container
  const main = document.getElementById("main");

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

  // append the butons to the div node
  platformsButtons.append(...buttonsArray);

  // an eventListener is added to listen the changes in the form
  main?.addEventListener("input", handleInputs);

  // the form and buttons are added to the main container
  main?.append(form, platformsButtons);
};

window.addEventListener("load", page);
window.addEventListener("hashchange", page);
