import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import Logo from "@/components/Logo";

export default async function footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <Bounded as="footer" className="py-4 md:py-6 lg:py-8">
      <div className="flex gap-4 items-center justify-between sm:flex-row flex-col">
        <Link href="/">
          <Logo />
        </Link>
        <p className="text-xs">
          ©{new Date().getFullYear()} {settings.data.site_title}
        </p>
        <ul className="flex">
          {settings.data.navigation.map(({ link, label }) => (
            <li key={label}>
              <PrismicNextLink field={link} className="p-3">
                {label}
              </PrismicNextLink>
            </li>
          ))}
        </ul>
      </div>
    </Bounded>
  );
}
