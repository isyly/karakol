"use client";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { MdArrowOutward } from "react-icons/md";
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
} from "@prismicio/react";
import LeafIcon from "@/components/LeafIcon";
import Heading from "@/components/Heading";
import { PrismicNextImage } from "@prismicio/next";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      size="md"
      className="md:mb-8 mb-4 mt-12 first:mt-0 last:mb-0"
    >
      {children}
    </Heading>
  ),
};

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_t3wkvdg",
        "template_lmb9hxc",
        {
          from_name: form.name,
          to_name: "Sylvain",
          from_email: form.email,
          to_email: "sylvain.rey.75@gmail.com",
          message: form.message,
        },
        "GwsxXHNqc6bj7ak2N"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("something went wrong");
        }
      );
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="mb-8 text-[clamp(1.2rem,13vmin,13rem)] font-extrabold leading-none tracking-tighter">
        <PrismicRichText field={slice.primary.Title} components={components} />
      </div>
        <div className="grid min-h-[50vh] grid-cols-1 md:grid-cols-2 gap-8">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className=" mt-2 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="text-slate-400 font-medium mb-4">Votre Nom</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Pierre Dupont"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-slate-600 rounded-lg outline-none
              border-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-slate-400 font-medium mb-4">
                Votre courrier électronique
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="exemple@monadresse.com"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-slate-600 rounded-lg outline-none
              border-none font-medium"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-slate-400 font-medium mb-4">
                Votre message
              </span>
              <textarea
                rows={parseInt("7")}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Hello, je voulais vous dire que..."
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-slate-600 rounded-lg outline-none
              border-none font-medium"
              />
            </label>
            <button
              type="submit"
              className="  block w-fit bg-red-orange-500 hover:bg-red-orange-700 transition-color duration-200 ease-in-out py-3 px-12 rounded-full font-display text-white font-bold text-base tracking-wider"
            >
              <span className="relative flex items-center justify-center gap-2">
                {loading ? "Envoi en cours" : "Envoyer"}{" "}
                {<MdArrowOutward className="inline-block" />}
              </span>
            </button>
          </form>
        <PrismicNextImage
          field={slice.primary.image}
          className="first-line:rounded-xl "
        />

      </div>
    </Bounded>
  );
};

export default Contact;
