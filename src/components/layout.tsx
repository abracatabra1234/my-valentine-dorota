import { useEffect, useState } from "react";
import type React from "react";

type Heart = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  color: string;
};

function Layout({ children }: { children: React.ReactNode }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const colors = ["#f0b100", "#2b7fff", "#f87171", "#fb7185", "#facc15"];

    const generatedHearts = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * -10,
      rotate: Math.random() * 40 - 20,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setHearts(generatedHearts);
  }, []);

  return (
    <div className="font-pixelify-sans relative flex min-h-screen items-center justify-center overflow-hidden bg-yellow-100">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute leading-none font-bold"
            style={{
              left: `${heart.left}%`,
              top: "-30px",
              fontSize: `${heart.size}px`,
              color: heart.color,
              animation: `heart-fall ${heart.duration}s linear ${heart.delay}s infinite`,
              transform: `rotate(${heart.rotate}deg)`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <main className="relative z-10">{children}</main>

      <div className="fixed bottom-0 z-0 w-full">
        <img
          src="footer.png"
          alt="footer"
          className="h-full w-full object-cover object-bottom"
        />
      </div>
    </div>
  );
}

export default Layout;
