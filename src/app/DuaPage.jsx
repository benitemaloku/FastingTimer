import ArrowDown from "../assets/icons/arrow-down.svg";
import { useTranslation } from "react-i18next";


export default function DuaPage() {
    const { t } = useTranslation();
  return (
    <section className="min-h-screen px-4 pt-28 pb-10 sm:px-6 sm:pt-32 sm:pb-16">
     <section className="container px-4">
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl text-[#BDC4D4] text-center mt-8 tracking-wide">
            {t("dua.title")}
          </h1>
            
            <p className="italic text-center mb-4">
              {t("dua.author")}
            </p>

            <div className="border-t border-white/10 my-8">
              <br/>
                <p className="text-center text-sm sm:text-2xl leading-loose mb-5" dir="rtl">
                   ذهب الظمأ  وابتلت العروق  وثبت الأجر إن شاء الله
                </p>
                <p className="bold text-center text-sm sm:text-xl md:text-2xl mb-4">
                  {t("dua.transliteration")}
                </p>
                <p className="italic text-center mb-5 text-sm">
                  {t("dua.translation")}
                </p> 
            </div>

            <div className="border-t border-white/10 my-8">
              <br/>
                <p className="text-xs text-center leading-7">
                  {t("dua.source")}
                       <br/>
                  {t("dua.translator")}
                </p>
              </div>

              <div className=" text-center font-semibold flex flex-wrap justify-center items-center gap-4 mt-8">
                <a
                  href="https://www.selefi.org/index.php/muaji-i-ramazanit/415-nijeti/1065-a-ekziston-ndonje-fjale-per-ta-bere-nijet-agjerimin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/15 px-6 h-12 rounded-xl bg-white/5 text-[#BDC4D4] text-sm hover:bg-white/10 transition"
                >
                  <span>{t("dua.niyyahQuestion")}</span>
                </a>
              </div>
        </div>
      </section>
    </section>
  );
}