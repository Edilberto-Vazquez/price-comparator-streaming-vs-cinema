// import images and icons
import amazonIcon from "../assets/icons/icons8-amazon-prime-video.svg";
import netflixIcon from "../assets/icons/icons8-aplicación-de-escritorio-de-netflix.svg";
import disneyIcon from "../assets/icons/icons8-disney-plus.svg";
import amazonImage from "../assets/images/amazon.svg";
import netflixImage from "../assets/images/netflix.svg";
import disneyImage from "../assets/images/disney.svg";

// create an object with the information of the streaming platforms
const platforms: {
  id: string;
  img: string;
  icon: string;
  plans: { plan: string; price: number }[];
}[] = [
  {
    id: "amazon",
    img: amazonImage,
    icon: amazonIcon,
    plans: [
      { plan: "Mensual", price: 75 },
      { plan: "Anual", price: 899 },
    ],
  },
  {
    id: "netflix",
    img: netflixImage,
    icon: netflixIcon,
    plans: [
      { plan: "Básico", price: 139 },
      { plan: "Estándar", price: 196 },
      { plan: "Premium", price: 266 },
    ],
  },
  {
    id: "disney",
    img: disneyImage,
    icon: disneyIcon,
    plans: [
      { plan: "Mensual", price: 159 },
      { plan: "Anual", price: 1599 },
    ],
  },
];

export default platforms;
