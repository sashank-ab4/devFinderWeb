export default function Footer() {
  return (
    <>
      <footer className="mt-auto bg-base-300 text-base-content/70">
        <div className=" mb-6 inset-x-0 h-px bg-linear-to-r from-transparent via-[#6c86ab]/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col items-center gap-4 text-center">
          <p className="text-xs tracking-[0.35em] uppercase opacity-80 ">
            {" "}
            © 2026 DevFinder. All Rights Reserved.
          </p>

          <p className="text-xs tracking-[0.3em] uppercase opacity-60">
            {" "}
            Made for Dev Community
          </p>
          <div className="text-center text-[11px] tracking-widest text-white/60 mt-1">
            Crafted by{" "}
            <a
              href="https://linkedin.com/in/https://www.linkedin.com/in/sashank-akkabattula-22a311247/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6c86ab] uppercase hover:text-[#B89B5E] transition"
            >
              Sashank
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
