"use client";

export const AboutHeroVideo = () => {
  return (
    <section data-navbar="light" className="w-full overflow-hidden">
      <div className="w-full aspect-[5/2] max-h-[55vh]">
        <video
          src="/turb.mp4"
          className="w-full h-full object-cover object-center block"
          style={{ objectPosition: "center 50%" }}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      </div>
    </section>
  );
};
