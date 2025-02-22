import AboutUs from "../AboutUs/AboutUs";
import Blog from "../Blog/Blog";
import Blurb from "../Blurb/Blurb";
import Clients from "../Clients/Clients";
import Contact from "../Contact/Contact";
import Intro from "../Intro/Intro";
import LatestWorks from "../LatestWorks/LatestWorks";

export const MainContent = () => {
  return (
    <main>
      <Intro />
      <AboutUs />
      <Blurb />
      <LatestWorks />
      <Clients />
      <Contact />
      <Blog />
    </main>
  );
};
