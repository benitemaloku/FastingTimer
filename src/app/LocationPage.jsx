import { useMemo, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";


const kosovoCities = [
  "Artana", "Dardana", "Deçan", "Sharr", "Drenas", "Ferizaj", "Fushë Kosovë",
  "Gjakovë", "Gjilan", "Graçanicë", "Hani i Elezit", "Burim", "Junik", "Kaçanik",
  "Klinë", "Kllokot", "Albanik", "Lipjan", "Malishevë","Kijevë", "Mamushë", "Mitrovicë",
  "Mitrovica Veriore", "Kastriot", "Partesh", "Pejë", "Besianë", "Prishtinë",
  "Prizren", "Rahovec", "Shtërpcë", "Shtime", "Skënderaj",
  "Therandë", "Vitia", "Vushtrri", "Zubin Potok", "Zveçan",
];

const albaniaCities = [
  "Tiranë", "Durrës", "Elbasan", "Shkodër", "Vlorë", "Korçë",
  "Fier", "Berat", "Lushnjë", "Kavajë", "Pogradec", "Laç",

  "Gjirokastër", "Patos", "Krujë", "Kuçovë", "Kukës", "Lezhë",
  "Sarandë", "Peshkopi", "Burrel", "Cërrik", "Çorovodë", "Shijak",

  "Librazhd", "Tepelenë", "Gramsh", "Poliçan", "Bulqizë", "Përmet",
  "Fushë-Krujë", "Kamëz", "Rrëshen", "Ballsh", "Mamurras", "Bajram Curri",

  "Ersekë", "Divjakë", "Selenicë", "Bilisht", "Roskovec",
  "Pukë", "Memaliaj", "Rrogozhinë", "Ura Vajgurore", "Himarë", "Delvinë",

  "Vorë", "Koplik", "Maliq", "Përrenjas", "Krumë", "Libohovë",
  "Orikum", "Fushë-Arrëz", "Shëngjin", "Rubik", "Milot", "Leskovik",

  "Konispol", "Këlcyrë", "Krastë", 
];

export default function LocationPage() {
  const { t, i18n } = useTranslation();

  const [country, setCountry] = useState("Kosovo");
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resultRef = useRef(null);

  useEffect(() => {
  if (result) {
    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [result]);

  const isAlbanian = i18n.language === "al";

  const cities = useMemo(() => {
    return country === "Kosovo" ? kosovoCities : albaniaCities;
  }, [country]);

  const today = new Date().toLocaleDateString(isAlbanian ? "al-AL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const fetchSunData = async (lat, lng, selectedCity, selectedCountry, label = "") => {
    try {
      const res = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`
      );
      const data = await res.json();

      if (data.status !== "OK") throw new Error();

      setResult({
        city: selectedCity,
        country: selectedCountry,
        label,
        sunset: data.results.sunset,
        nauticalDawn: data.results.nautical_twilight_begin,
      });
    } catch {
      setError(t("location.errors.failedSunData"));
    }
  };

  const handlePresetSubmit = async () => {
    if (!city) {
      setError(t("location.errors.chooseCity"));
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const query = encodeURIComponent(`${city}, ${country}`);
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=jsonv2&limit=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.length) throw new Error();

      const { lat, lon, display_name } = geoData[0];
      await fetchSunData(lat, lon, city, country, display_name);
    } catch {
      setError(t("location.errors.loadCity"));
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async () => {
    if (!search.trim()) {
      setError(t("location.errors.enterCity"));
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const query = encodeURIComponent(search);
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=jsonv2&limit=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.length) throw new Error();

      const place = geoData[0];

      await fetchSunData(
        place.lat,
        place.lon,
        place.name || search,
        place.address?.country || t("location.unknownCountry"),
        place.display_name
      );
    } catch {
      setError(t("location.errors.searchFailed"));
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (value) =>
    new Date(value).toLocaleTimeString(isAlbanian ? "al-AL" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

const getTimeUntilIftar = (sunset) => {
  if (!sunset) return "";

  const now = new Date();
  const iftarTime = new Date(sunset);
  const diff = iftarTime - now;

  if (diff <= 0) {
    return t("location.iftarPassed");
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (i18n.language === "al") {
    return `${hours} h ${minutes} minuta`;
  }

  return `${hours} h ${minutes} minutes`;

};
  return (
    <section className="min-h-screen px-4 pt-28 pb-10 sm:px-6 sm:pt-32 sm:pb-16">
    
      <div className="mx-auto w-full max-w-2xl">

      
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-center text-[#BDC4D4] mb-6 sm:mb-8 md:mb-10">
          {t("location.title")}
        </h1>

       <div className="mx-auto w-full max-w-xl space-y-4">

      {/* Country buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        <button
          onClick={() => {
            setCountry("Kosovo");
            setCity("");
          }}
          className={`h-12 border rounded-xl px-6 text-sm font-semibold transition ${
            country === "Kosovo"
              ? "border-white bg-white/10 text-[#BDC4D4]"
              : "border-white/15 text-[#BDC4D4]"
          }`}
        >
          {t("location.kosovoCities")}
        </button>

        <button
          onClick={() => {
            setCountry("Albania");
            setCity("");
          }}
          className={`h-12 border rounded-xl px-6 text-sm font-semibold transition ${
            country === "Albania"
              ? "border-white bg-white/10 text-[#BDC4D4]"
              : "border-white/15 text-[#BDC4D4]"
          }`}
        >
          {t("location.albaniaCities")}
        </button>

      </div>

      {/* Select city */}
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full h-12 border border-white/15 bg-transparent rounded-xl px-6 text-sm font-semibold text-[#BDC4D4] outline-none"
      >
        <option value="" className="bg-gray-800 text-white">
          {t("location.chooseCity")}
        </option>

        {cities.map((c) => (
          <option
            key={c}
            value={c}
            className="bg-gray-800 text-white"
          >
            {c}
          </option>
        ))}
      </select>
      {/* Submit */}
      <button
        onClick={handlePresetSubmit}
        className="w-full ui-button"
      >
        {t("location.getFastingTimes")}
      </button>

      {/* Search section */}
      <div className="pt-4 border-t border-white/10 space-y-3">

        <p className="text-sm text-[#BDC4D4]">
          {t("location.searchOnline")}
        </p>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchSubmit();
          }}
          placeholder={t("location.searchPlaceholder")}
          className="w-full ui-input"
        />

        <button
          onClick={handleSearchSubmit}
          className="ui-button w-full"
        >
          {t("location.search")}
        </button>

      </div>

    </div>

        {loading && (
          <div className="mt-6 sm:mt-8 text-center text-[#BDC4D4] text-base sm:text-lg">
            {t("location.loading")}
          </div>
        )}

        {error && (
          <div className="mt-6 sm:mt-8 text-center text-red-300 text-sm sm:text-base md:text-lg px-2">
            {error}
          </div>
        )}

        {result && (
  <div
    ref={resultRef}
    className="mx-auto w-full max-w-xl mt-6 sm:mt-8 rounded-[24px] sm:rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md p-4 sm:p-6 md:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
  >
           <h2 className="text-1xl  text-[#BDC4D4] mb-3 text-center break-words tracking-wide">
              {result.city}
            </h2>

            {result.label && (
              <p className="text-xs sm:text-sm text-[#94a3b8] mb-4 sm:mb-5 text-center break-words leading-relaxed">
                {result.label}
              </p>
            )}

            <div className="text-center space-y-3 text-[#BDC4D4] text-sm ">
              <p className="break-words">
                <strong>{t("location.date")}:</strong> {today}
              </p>
              <p className="break-words">
                <strong>{t("location.suhur")}:</strong> {formatTime(result.nauticalDawn)}
              </p>
              <p className="break-words">
                <strong>{t("location.iftar")}:</strong> {formatTime(result.sunset)}
              </p>
              <p className="break-words">
                <strong>{t("location.timeUntilIftar")}</strong> {getTimeUntilIftar(result.sunset)}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}