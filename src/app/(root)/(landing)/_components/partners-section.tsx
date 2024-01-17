import NextLink from "next/link";
import Image from "next/image";
import { gdgBaku, gdscBeu, goup, speKhazar, wtmBaku } from "#/assets/images";

const partners = [
  {
    imgSrc: gdscBeu,
    name: "GDSC BEU",
    link: "https://www.instagram.com/gdsc.beu?igsh=eWdqejQzOTlpOXE=",
  },
  {
    imgSrc: speKhazar,
    name: "SPE Khazar",
    link: "https://www.instagram.com/spe.khazar?igsh=YWlncWV2eHdiY21z",
  },
  {
    imgSrc: wtmBaku,
    name: "Women Techmakers Baku",
    link: "https://www.instagram.com/wtm.baku?igsh=aGZudG1iaDVnamgx",
  },
  {
    imgSrc: gdgBaku,
    name: "GDG Baku",
    link: "https://www.instagram.com/gdg.baku?igsh=cXlvdWZjbHlqMWR6",
  },
  {
    imgSrc: goup,
    name: "GOUP",
    link: "https://www.linkedin.com/company/goupaz/",
  },
];

export function PartnersSection() {
  const partnersComponent = (
    <div className="flex animate-dvijeniya gap-x-12">
      {partners.map((partner) => (
        <NextLink
          key={partner.name}
          href={partner.link}
          target="_blank"
          className="h-36 w-36 overflow-hidden rounded-full"
        >
          <Image src={partner.imgSrc} alt={partner.name} className="h-full w-full object-cover" priority />
        </NextLink>
      ))}
    </div>
  );

  return (
    <section className="space-y-12 py-24">
      <div className="container">
        <h1 className="text-3xl font-medium">Event Partners</h1>
      </div>

      <div className="flex gap-x-12 overflow-x-hidden [&>div]:hover:[animation-play-state:paused]">
        {partnersComponent}
        {partnersComponent}
        {partnersComponent}
      </div>
    </section>
  );
}
