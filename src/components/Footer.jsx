import { FaGithub } from "react-icons/fa6";
export default function Footer() {
  return (
    <>
      <footer className="mt-auto bg-[#dbdee0] text-black">
        <div className=" mb-6 inset-x-0 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col items-center gap-4 text-center">
          <p className="text-xs tracking-[0.35em] uppercase opacity-80 ">
            {" "}
            © 2026 DevTribe. All Rights Reserved.
          </p>

          <p className="text-xs tracking-[0.3em] uppercase ">
            {" "}
            Made for dev community
          </p>
          <div className="text-center text-[11px] tracking-widest text-black mt-1">
            By{" "}
            <a
              href="https://github.com/sashank-ab4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex gap-1 text-[black] uppercase hover:text-blue-500 transition"
            >
              Sashank <FaGithub size={14} className="mb-px" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
