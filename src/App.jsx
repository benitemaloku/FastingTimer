import { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./app/MainLayout";
import { HeroSection } from "./components/Hero.jsx";
import LocationPage from "./app/LocationPage.jsx";
import DuaPage from "./app/DuaPage.jsx";
import ScrollToHash from "./components/ScrollToHash.jsx";

function HomePage() {
  const locationRef = useRef(null);

  const scrollToLocation = () => {
    locationRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <MainLayout>
      <section id="home">
        <HeroSection onChooseLocation={scrollToLocation} />
      </section>

      <section id="location" ref={locationRef}>
        <LocationPage />
      </section>
    </MainLayout>
  );
}

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dua"
          element={
            <MainLayout>
              <DuaPage />
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;