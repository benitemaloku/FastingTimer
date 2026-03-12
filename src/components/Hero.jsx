import { useNavigate } from "react-router-dom";
import ArrowDown from "../assets/icons/arrow-down.svg";
import ArrowUpRight from "../assets/icons/arrow-up-right.svg";
import starIcon from "../assets/icons/star.svg";
import sparkleIcon from "../assets/icons/sparkle.svg";
import { HeroOrbit } from "./HeroOrbit";
import { useTranslation } from "react-i18next";

export const HeroSection = ({ onChooseTimes }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white z-0 overflow-visible">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="md:size-[620px] size-[500px]  bg-circles"></div>
        <div className="md:size-[900px] size-[650px] bg-circles"></div>
        <div className="md:size-[1200px] size-[800px] bg-circles"></div>
        <div className="md:size-[1500px] size-[950px] bg-circles"></div>
      </div>

      <HeroOrbit size={800} rotation={-71}>
        <img src={starIcon} alt="star" className="size-14 bg-stars" />
      </HeroOrbit>
      <HeroOrbit size={500} rotation={17}>
        <img src={starIcon} alt="star" className="size-12 bg-stars" />
      </HeroOrbit>
      <HeroOrbit size={590} rotation={98}>
        <img src={starIcon} alt="star" className="size-8 bg-stars" />
      </HeroOrbit>

      <HeroOrbit size={430} rotation={-14}>
        <img src={sparkleIcon} alt="sparkle" className="size-8 bg-sparkle" />
      </HeroOrbit>
      <HeroOrbit size={440} rotation={79}>
        <img src={sparkleIcon} alt="sparkle" className="size-5 bg-sparkle" />
      </HeroOrbit>
      <HeroOrbit size={530} rotation={178}>
        <img src={sparkleIcon} alt="sparkle" className="size-10 bg-sparkle" />
      </HeroOrbit>
      <HeroOrbit size={710} rotation={144}>
        <img src={sparkleIcon} alt="sparkle" className="size-14 bg-sparkle" />
      </HeroOrbit>
      <HeroOrbit size={800} rotation={-35}>
        <img src={sparkleIcon} alt="sparkle" className="size-8 bg-sparkle" />
      </HeroOrbit>

      <HeroOrbit size={720} rotation={95}>
        <div className="size-2 bg-heroorbit" />
      </HeroOrbit>
      <HeroOrbit size={520} rotation={-42}>
        <div className="size-2 bg-heroorbit" />
      </HeroOrbit>
      <HeroOrbit size={650} rotation={-5}>
        <div className="size-1 bg-heroorbit" />
      </HeroOrbit>
      <HeroOrbit size={480} rotation={130}>
        <div className="size-1 bg-heroorbit" />
      </HeroOrbit>

      <section className="container px-4">
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-3xl md:text-5xl text-[#BDC4D4] text-center mt-8 tracking-wide">
            {t("hero.title.line1")}
              <br />
            {t("hero.title.line2")}
          </h1>

          <p className="mt-4 text-center text-[#BDC4D4] md:text-lg">
            {t("hero.description.line1")}
               <br />
            {t("hero.description.line2")} <b>{t("hero.iftar")}</b>{" "}
            {t("hero.description.line3")} <b>{t("hero.sunset")}</b>,{" "}
            {t("hero.description.line4")} <b>{t("hero.suhoor")}</b>{" "}
            {t("hero.description.line5")} <b>{t("hero.nauticalDawn")}</b>.
          </p>

        </div>

        <div className=" font-semibold flex flex-wrap justify-center items-center gap-4 mt-8">

          <button
            type="button"
            onClick={() => navigate("/dua")}
            className="inline-flex items-center justify-center gap-2 border border-white/15 px-6 h-12 rounded-xl bg-white/60 text-gray-900 text-sm hover:bg-white/10 transition"
          >    <span>{t("hero.dua")}</span>
            <img src={ArrowUpRight} alt="arrow up right" className="size-4 brightness-0" />
          </button>
            
          <button
            type="button"
            onClick={onChooseTimes}
            className="inline-flex items-center justify-center gap-2 border border-white/15 px-6 h-12 rounded-xl bg-white/5 text-[#BDC4D4] text-sm hover:bg-white/10 transition"
          >
            <span>{t("hero.chooseLocation")}</span>
            <img src={ArrowDown} alt="arrow down" className="size-4 invert" />
          </button>

        </div>
      </section>
    </section>
  );
};