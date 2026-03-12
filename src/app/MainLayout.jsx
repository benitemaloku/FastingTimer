import { Header } from "../components/Header.jsx";
import grainImage from "../assets/images/grain.jpg";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0F1A2B] text-[#BDC4D4] antialiased font-sans relative overflow-x-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${grainImage})`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10">
        <Header />
        {children}
      </div>
    </div>
  );
}