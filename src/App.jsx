import { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./app/MainLayout";
import { HeroSection } from "./components/Hero.jsx";
import TimesPage from "./app/TimesPage.jsx";
import DuaPage from "./app/DuaPage.jsx";
import ScrollToHash from "./components/ScrollToHash.jsx";

function HomePage() {
  const timesRef = useRef(null);

  const scrollToTimes = () => {
    timesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <MainLayout>
      <section id="home">
        <HeroSection onChooseTimes={scrollToTimes} />
      </section>

      <section id="times" ref={timesRef}>
        <TimesPage />
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