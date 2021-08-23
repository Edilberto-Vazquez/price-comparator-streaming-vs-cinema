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
  platformprice: number;
}[] = [
  {
    id: "amazon",
    img: amazonImage,
    icon: amazonIcon,
    platformprice: 99,
  },
  {
    id: "netflix",
    img: netflixImage,
    icon: netflixIcon,
    platformprice: 139,
  },
  {
    id: "disney",
    img: disneyImage,
    icon: disneyIcon,
    platformprice: 159,
  },
];

export default platforms;
