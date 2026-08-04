import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const el = ref.current;
    let raf;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      if (el) el.style.transform = `translate3d(${cx - 220}px, ${cy - 220}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 -z-[6] w-[440px] h-[440px] rounded-full pointer-events-none hidden md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(76,243,255,0.06) 0%, rgba(176,107,255,0.03) 45%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
