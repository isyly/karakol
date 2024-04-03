import { Content, isFilled } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { title } from "process";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="text-center mb-9 font-bold">
      {children}
    </Heading>
  ),

  paragraph: ({ children }) => (
    <p className=" text-xl md:text-2xl font-normal font-body text-slate-600 mb-8">
      {children}
    </p>
  ),
};

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials = async ({
  slice,
}: TestimonialsProps): Promise<JSX.Element> => {
  const client = createClient();
  const Testimonials = await Promise.all(
    slice.items.map((item) => {
      if (
        isFilled.contentRelationship(item.testimonial) &&
        item.testimonial.uid
      ) {
        return client.getByUID("testimonial", item.testimonial.uid);
      }
    })
  );
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText components={components} field={slice.primary.heading} />
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 text-center items-center lg:text-start">
        {Testimonials.map(
          (item, index) =>
            item && (
              <div
                key={index}
                className=" bg-white shadow-lg rounded-lg px-8 md:px-14 py-10 md:py-16 grid content-between"
              >
                <PrismicRichText
                  field={item.data.quote}
                  components={components}
                />

                <div className="flex items-center justify-center lg:justify-start">
                  <PrismicNextImage
                    width={80}
                    height={80}
                    field={item.data.avatar}
                    className="rounded-full m-4 lg:m-0 lg:mr-4"
                    imgixParams={{ fit: "crop", ar: "1:1" }}
                  />
                </div>
                <div>
                  <p className="text-base font-medium text-slate-700">
                    {item.data.name}
                  </p>
                  <p className="text-base text-slate-600">
                    {item.data.job_title}
                  </p>
                </div>
              </div>
            )
        )}
      </div>
    </Bounded>
  );
};

export default Testimonials;
