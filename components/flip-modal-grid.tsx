"use client";

import {
  useRef,
  useEffect,
  useState,
  type ReactNode,
  useCallback,
} from "react";
import { gsap } from "@/lib/gsap";
import { Flip } from "@/lib/gsap";

const DURATION = 0.7;
const OVERLAY_DURATION = 0.35;
const EASE = "power2.inOut";

type FlipModalGridProps = {
  children: ReactNode[];
  gridClassName?: string;
  boxClassName?: string;
  boxContentClassName?: string;
  /** Optional per-item class for the box wrapper (e.g. "lg:col-span-2") */
  itemWrapperClassNames?: (string | undefined)[];
  modalContentClassName?: string;
  /** Optional ref for the grid container (e.g. for GSAP stagger) */
  gridRef?: React.RefObject<HTMLDivElement | null>;
};

export function FlipModalGrid({
  children,
  gridClassName = "",
  boxClassName = "",
  boxContentClassName = "",
  itemWrapperClassNames,
  modalContentClassName = "",
  gridRef,
}: FlipModalGridProps) {
  const count = Array.isArray(children) ? children.length : 0;
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isAnimating = useRef(false);

  const close = useCallback(() => {
    if (openIndex === null || isAnimating.current) return;
    const contentEl = contentRefs.current[openIndex];
    const wrapperEl = wrapperRefs.current[openIndex];
    const modal = modalRef.current;
    const overlay = overlayRef.current;
    if (!contentEl || !wrapperEl || !modal || !overlay) return;

    isAnimating.current = true;
    const state = Flip.getState(contentEl);

    wrapperEl.appendChild(contentEl);
    setOpenIndex(null);

    gsap.to([modal, overlay], {
      autoAlpha: 0,
      ease: "power2.inOut",
      duration: OVERLAY_DURATION,
    });

    Flip.from(state, {
      duration: DURATION,
      ease: EASE,
      absolute: true,
      onComplete: () => {
        gsap.set(contentEl, { zIndex: "auto" });
        isAnimating.current = false;
      },
    });
    gsap.set(contentEl, { zIndex: 1002 });
  }, [openIndex]);

  const open = useCallback(
    (index: number) => {
      if (openIndex !== null || isAnimating.current) return;
      const contentEl = contentRefs.current[index];
      const modal = modalRef.current;
      const modalContent = modalContentRef.current;
      const overlay = overlayRef.current;
      if (!contentEl || !modal || !modalContent || !overlay) return;

      isAnimating.current = true;
      const state = Flip.getState(contentEl);

      modalContent.appendChild(contentEl);
      setOpenIndex(index);

      gsap.set(modal, { autoAlpha: 1 });
      Flip.from(state, {
        duration: DURATION,
        ease: EASE,
        onComplete: () => {
          isAnimating.current = false;
        },
      });
      gsap.to(overlay, { autoAlpha: 0.65, duration: OVERLAY_DURATION });
    },
    [openIndex],
  );

  const handleItemClick = useCallback(
    (index: number) => {
      if (openIndex === index) {
        close();
      } else if (openIndex === null) {
        open(index);
      }
    },
    [openIndex, open, close],
  );

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, count);
    wrapperRefs.current = wrapperRefs.current.slice(0, count);
  }, [count]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openIndex !== null) close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, close]);

  return (
    <>
      <div ref={gridRef} className={gridClassName}>
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div
                key={i}
                ref={(el) => {
                  wrapperRefs.current[i] = el;
                }}
                className={[boxClassName, itemWrapperClassNames?.[i]]
                  .filter(Boolean)
                  .join(" ")}
              >
                {i === openIndex ? (
                  <div className="aspect-square w-full min-h-0" aria-hidden />
                ) : (
                  <div
                    ref={(el) => {
                      contentRefs.current[i] = el;
                    }}
                    role="button"
                    tabIndex={0}
                    className={boxContentClassName}
                    onClick={() => handleItemClick(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleItemClick(i);
                      }
                    }}
                  >
                    {child}
                  </div>
                )}
              </div>
            ))
          : null}
      </div>

      <div
        ref={modalRef}
        className={`fixed inset-0 z-[1000] flex items-center justify-center bg-transparent ${openIndex !== null ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ opacity: 0, visibility: "hidden" }}
        aria-hidden={openIndex === null}
      >
        <div
          ref={overlayRef}
          className="absolute inset-0 w-full h-full bg-black pointer-events-auto"
          style={{ opacity: 0 }}
          onClick={close}
          onKeyDown={(e) => e.key === "Escape" && close()}
          aria-hidden="true"
        />
        <div
          ref={modalContentRef}
          className={`relative pointer-events-none ${modalContentClassName}`}
          style={{ height: "90vh", aspectRatio: "4/5" }}
        />
      </div>
    </>
  );
}
