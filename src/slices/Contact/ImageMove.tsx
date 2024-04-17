import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type ImageProps = {
  image: ImageField;
  className?: string;
};
export default function ImageMove({ image, className }: ImageProps) {
  const component = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        { x: 400, opacity: 0, scale: 1.6 },
        { x: 0, opacity: 1, scale: 1, duration: 1.3, ease: "power3.out" }
      );
      window.onmousemove = (e) => {
        if (!component.current) return;
        const componentRect = (
          component.current as HTMLElement
        ).getBoundingClientRect();
        const componentCenterX = componentRect.left + componentRect.width / 2;

        let componentPercent = {
          x: (e.clientX - componentCenterX) / componentRect.width / 2,
        };
        let distFromCenter = 1 - Math.abs(componentPercent.x);

        gsap
          .timeline({
            defaults: {
              duration: 0.5,
              overwrite: "auto",
              ease: "power3.Out",
              delay:1,
            },
          })
          .to(
            ".avatar",
            {
              rotation: gsap.utils.clamp(-6, 6, 5 * componentPercent.x),
              duration: 0.5,
            },
            0
          )
          .to(
            ".highlight",
            {
              opacity: distFromCenter - 0.7,
              x: (-10 * 20) & componentPercent.x,
              duration: 0.5,
            },
            0
          );
      };
    });
  });

  return (
    <div ref={component} className={clsx("relative h-full w-full", className)}>
      <div className="avatar aspect-square overflow-hidden content-center opacity-0">
        <PrismicNextImage field={image} className="object-fill" />
      </div>
    </div>
  );
}
