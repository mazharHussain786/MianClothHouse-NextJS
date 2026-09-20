import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/923027726309"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#1f6b4a] text-white shadow-lg transition hover:scale-105 hover:bg-[#18553b] md:right-6 md:bottom-6 md:h-14 md:w-14"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
