/* import heroBgSec from "../assets/heroBgSec.jpg"; */
import connect from "../assets/connectt.jpg";
import collaborate from "../assets/collaborate.jpg";
import create from "../assets/create.jpg";
import { LOGIN_PAGE_IMG } from "../utils/mockData";

export default function MiddleSection() {
  const cards = [
    {
      title: "Connect",
      img: connect,
      desc: "Discover developers and expand your network within the community.",
    },
    {
      title: "Collaborate",
      img: collaborate,
      desc: "Work together with developers on exciting and meaningful projects.",
    },
    {
      title: "Create",
      img: create,
      desc: "Turn ideas into real products with your tribe of builders.",
    },
  ];
  return (
    <section
      className="min-h-screen bg-cover bg-center relative flex flex-col"
      style={{ backgroundImage: `url(${LOGIN_PAGE_IMG})` }}
    >
      {/* Overlay (does not affect cards) */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>
      <div className=" mb-6 inset-x-0 h-px bg-linear-to-r from-transparent via-blue-400 to-transparent" />
      {/* Heading */}
      <div className="relative z-10 pt-20 text-center">
        <span className="text-rotate text-7xl text-blue-800 leading-loose tracking-wide">
          <span className="justify-items-center">
            <span>💻 CONNECT</span>
            <span>⌨️ COLLABORATE</span>
            <span>🌎 CREATE</span>
          </span>
        </span>
      </div>

      <div className="relative z-10 lg:mt-auto sm:mt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden
                         hover:shadow-xl hover:-translate-y-1
                         transition-all duration-300"
            >
              {/* Image */}
              <div className="h-48 flex items-center justify-center bg-white">
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {card.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
