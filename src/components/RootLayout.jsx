import './globals.css'

export default function RootLayout({ children }) {
  return (
    <div className="bg-[#0F1A2B] text-[#BDC4D4] antialiased font-sans">
      {children}
    </div>
  )
}