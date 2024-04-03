import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import LeafIcon from "@/components/LeafIcon";
import DoubleCheckIcon from "@/components/DoubleCheckIcon";
import CheckInIcon from "@/components/CheckInIcon";
import ThumbsUpIcon from "@/components/ThumbsUpIcon";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="text-center mb-12">
      {children}
    </Heading>
  ),

  heading3: ({ children }) => (
    <Heading
      as="h3"
      size="sm"
      className="mb-3 font-medium sm:text-left text-center"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className=" text-base font-medium font-body text-slate-600 sm:text-left text-center">
      {children}
    </p>
  ),
};

const icons = {
  Quality: <LeafIcon />,
  Conformity: <DoubleCheckIcon />,
  Design: <CheckInIcon />,
  Team: <ThumbsUpIcon />,
};

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

/**
 * Component for "Features" Slices.
 */
const Features = ({ slice }: FeaturesProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText components={components} field={slice.primary.heading} />
      <div className="  grid sm:grid-cols-2 lg:grid-cols-4 max-w-5xl gap-x-8 gap-y-12 mx-auto sm:place-items-start place-items-center">
        {slice.items.map((item, index) => (
          <div
            key={index}
            className="max-w-xs grid sm:place-items-start place-items-center "
          >
            {item.icon && <div className="mb-5 ">{icons[item.icon]}</div>}
            <PrismicRichText components={components} field={item.title} />
            <PrismicRichText components={components} field={item.description} />
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Features;
