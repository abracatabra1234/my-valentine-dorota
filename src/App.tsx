import { useRef, useState, useEffect } from "react";
import Layout from "./components/layout";

type Position = {
  x: number;
  y: number;
};

const letter = `
\n
It’s already been almost a month since we first started talking online.

When I first saw your profile and started talking to you, I thought you were just a young Polish girl. But the more we talked, the more I realized that you’re much more mature than I first thought. You speak English really well, you have a mind of your own, and most of all, I’ve come to genuinely enjoy the time we spend talking to each other.

To be honest, I know there are some realities that might make things between us difficult.

There’s quite a big age difference between us, we live in different countries so we would have to have a long-distance relationship. I know there will probably be difficult moments and challenges if we want to build a future together.

But even after taking all of that into consideration, I still find myself drawn to you.

As I’ve gotten older, I’ve become much more careful about who I choose to let into my life. I’ve been waiting for someone I could truly feel drawn to, someone I could give my whole heart to without ever feeling that it was too much.

And even though we’re still getting to know each other, as I’ve talked to you and gotten to know you, I’ve started to wonder if maybe you could be the person I’ve been waiting for.

I don’t want us to be simply two people who love each other and call each other partners. I want us to be so much more than that.

Sometimes, I want us to be teammates who always support each other’s dreams, learn together, and grow together. Sometimes, I want us to be friends who can laugh together over the most ordinary, silly little things. And when you’re going through a difficult time, feeling lost, or have something weighing on your mind, I want to be someone you can always talk to — someone who can listen to you, share what I’ve learned from my own experiences, and be there for you as someone a little older and wiser, as well as your boyfriend.

I want us to build something beautiful together — a relationship that goes beyond simply being lovers, where we can fill in each other’s gaps, never have to give up on our own dreams, and help each other become better people along the way.

Thank you for always being there, and for everything you’ve given me.

I love you so much, my misio pysio Dorota`;

function App() {
  const cardRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLDivElement>(null);
  const letterScrollRef = useRef<HTMLDivElement>(null);

  const [escaped, setEscaped] = useState<boolean>(false);
  const [yesPosition, setYesPosition] = useState<Position | null>(null);
  const [noPosition, setNoPosition] = useState<Position | null>(null);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [typedLetter, setTypedLetter] = useState("Hi, Dorota.");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const handleNoMouseEnter = () => {
    if (!cardRef.current || !noRef.current) return;
    const card = cardRef.current.getBoundingClientRect();
    const no = noRef.current.getBoundingClientRect();
    const oldNoPosition: Position = {
      x: no.left - card.left,
      y: no.top - card.top,
    };
    const buttonWidth = no.width;
    const buttonHeight = no.height;
    const padding = 20;
    const gap = 24;
    const maxX = card.width - buttonWidth - padding;
    const maxY = card.height - buttonHeight - padding;

    let newX = padding;
    let newY = padding;
    let attempts = 0;

    do {
      newX = padding + Math.random() * Math.max(0, maxX - padding);
      newY = padding + Math.random() * Math.max(0, maxY - padding);
      attempts++;
    } while (
      attempts < 100 &&
      newX < oldNoPosition.x + buttonWidth + gap &&
      newX + buttonWidth + gap > oldNoPosition.x &&
      newY < oldNoPosition.y + buttonHeight + gap &&
      newY + buttonHeight + gap > oldNoPosition.y
    );

    setYesPosition(oldNoPosition);
    setNoPosition({
      x: newX,
      y: newY,
    });

    setEscaped(true);
  };

  function onYesButtonClick() {
    setShowLetterModal(true);
  }

  function closeModal() {
    setShowLetterModal(false);
  }

  function handleLetterScroll() {
    const element = letterScrollRef.current;

    if (!element) return;

    const isAtBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight < 10;

    setIsAutoScroll(isAtBottom);
  }

  useEffect(() => {
    if (!showLetterModal) return;

    let index = 0;

    const interval = setInterval(() => {
      setTypedLetter((prev) => prev + letter.slice(index, index + 1));
      index++;

      if (index >= letter.length) {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowLetterModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      setTypedLetter("Hi, Dorota.");
      setIsTypingDone(false);
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showLetterModal]);

  useEffect(() => {
    if (!showLetterModal) return;

    const interval = setInterval(() => {
      if (!isAutoScroll) return;

      const element = letterScrollRef.current;

      if (!element) return;

      element.scrollTop = element.scrollHeight;
    }, 50);

    return () => clearInterval(interval);
  }, [showLetterModal, isAutoScroll]);

  return (
    <Layout>
      <div className="flex min-h-screen items-center">
        <div className="relative mx-auto w-full px-4 select-none">
          <div className="absolute inset-x-2.5 inset-y-1 translate-x-1 translate-y-4">
            <div className="pixel size-full bg-yellow-200" />
          </div>

          <div
            ref={cardRef}
            className="pixel relative z-10 flex w-100 flex-col bg-yellow-50 px-20 py-6 [--pixel-color:#f0b100] md:w-2xl md:px-32 md:py-10"
          >
            <div className="mb-8 text-center text-3xl font-medium md:mb-12 md:text-5xl">
              <p className="text-blue-500">Hi Dorota,</p>

              <h1 className="leading-[1.3] text-neutral-800 md:leading-normal">
                Would you be my
                <br />
                <span className="relative inline-block text-5xl md:text-7xl">
                  Valentine?
                </span>
              </h1>
            </div>

            <div className="mb-8 flex items-center gap-x-2 md:mb-14 md:gap-x-4">
              <div className="w-full border-t-2 border-dashed border-yellow-200 md:border-t-4" />

              <img
                src="/sunflower.png"
                className="size-6 md:size-10"
                alt="sunflower"
              />

              <div className="w-full border-t-2 border-dashed border-yellow-200 md:border-t-4" />
            </div>

            {!escaped ? (
              <div className="flex items-center justify-between">
                <div className="relative">
                  <div className="absolute -inset-x-0.5 inset-y-0 translate-y-2">
                    <div className="pixel size-full bg-yellow-200" />
                  </div>

                  <button
                    type="button"
                    className="pixel relative z-10 h-11 w-20 bg-yellow-400 text-lg font-medium text-yellow-50 transition duration-200 ease-in-out hover:translate-y-2 hover:cursor-pointer hover:bg-yellow-500 hover:text-yellow-100 md:h-14 md:w-32 md:text-2xl"
                    onClick={onYesButtonClick}
                  >
                    YES
                  </button>
                </div>

                <div
                  ref={noRef}
                  className="relative"
                  onMouseEnter={handleNoMouseEnter}
                >
                  <div className="absolute -inset-x-0.5 inset-y-0 translate-y-2">
                    <div className="pixel size-full bg-blue-200 [--pixel-color:#2b7fff]" />
                  </div>

                  <button
                    type="button"
                    className="pixel relative z-10 h-11 w-20 bg-blue-400 text-lg font-medium text-yellow-50 [--pixel-color:#2b7fff] hover:translate-y-2 hover:cursor-pointer hover:bg-blue-500 hover:text-blue-100 md:h-14 md:w-32 md:text-2xl"
                  >
                    NO
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="h-11 md:h-14" />
                <div className="pointer-events-none absolute inset-0">
                  {/* YES */}
                  {yesPosition && (
                    <div
                      className="pointer-events-auto absolute transition-all duration-200 ease-out"
                      style={{
                        left: yesPosition.x,
                        top: yesPosition.y,
                      }}
                    >
                      <div className="relative">
                        <div className="absolute -inset-x-0.5 inset-y-0 translate-y-2">
                          <div className="pixel size-full bg-yellow-200" />
                        </div>

                        <button
                          type="button"
                          className="pixel relative z-10 h-11 w-20 bg-yellow-400 text-lg font-medium text-yellow-50 hover:translate-y-2 hover:cursor-pointer hover:bg-yellow-500 hover:text-yellow-100 md:h-14 md:w-32 md:text-2xl"
                          onClick={onYesButtonClick}
                        >
                          YES
                        </button>
                      </div>
                    </div>
                  )}

                  {noPosition && (
                    <div
                      ref={noRef}
                      className="pointer-events-auto absolute transition-all duration-200 ease-out"
                      style={{
                        left: noPosition.x,
                        top: noPosition.y,
                      }}
                      onMouseEnter={handleNoMouseEnter}
                    >
                      <div className="relative">
                        <div className="absolute -inset-x-0.5 inset-y-0 translate-y-2">
                          <div className="pixel size-full bg-blue-200 [--pixel-color:#2b7fff]" />
                        </div>

                        <button
                          type="button"
                          onClick={(e) => e.preventDefault()}
                          className="pixel relative z-10 h-11 w-20 bg-blue-400 text-lg font-medium text-blue-50 [--pixel-color:#2b7fff] hover:translate-y-2 hover:cursor-pointer hover:bg-blue-500 hover:text-blue-100 md:h-14 md:w-32 md:text-2xl"
                        >
                          NO
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showLetterModal && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-yellow-900/40 p-6 backdrop-blur-md"
          onMouseDown={closeModal}
        >
          <div
            ref={letterScrollRef}
            onWheel={() => setIsAutoScroll(false)}
            onTouchMove={() => setIsAutoScroll(false)}
            onScroll={handleLetterScroll}
            className="overflow-x-hidden-4 z-50 h-120 w-108 scrollbar-thumb-yellow-500/70 overflow-y-scroll border-4 border-yellow-500 bg-yellow-100 md:h-140 md:w-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowLetterModal(false)}
              className="sticky top-1 right-2 z-20 ml-auto block text-2xl text-yellow-400 transition hover:cursor-pointer hover:text-yellow-600 md:text-3xl"
            >
              ×
            </button>

            <div className="px-4 py-2 md:px-12 md:py-4">
              <div className="flex flex-col items-center justify-center gap-y-2 select-none md:gap-y-6">
                <time className="text-lg font-medium text-yellow-600 md:text-2xl">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date())}
                </time>
                <h2 className="text-2xl font-semibold md:text-4xl">
                  Dear Dorota
                </h2>
              </div>

              <div className="my-4 flex items-center gap-x-2 md:my-6 md:gap-x-4">
                <div className="w-full border-t-2 border-dashed border-yellow-200 md:border-t-4" />

                <img
                  src="/sunflower.png"
                  className="size-6 md:size-10"
                  alt="sunflower"
                />

                <div className="w-full border-t-2 border-dashed border-yellow-200 md:border-t-4" />
              </div>

              <article className="text-base whitespace-break-spaces text-neutral-800 md:text-lg md:leading-9">
                <img
                  className="float-right size-32 rounded-sm md:mb-2 md:ml-2 md:size-54"
                  src="/sunflower_me.jpg"
                  alt="sunflower_me"
                />
                {typedLetter}
                {isTypingDone && (
                  <span className="-ml-0.5 text-blue-500"> ♥</span>
                )}
              </article>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
