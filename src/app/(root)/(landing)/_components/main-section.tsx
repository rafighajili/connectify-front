import Image from "next/image";
import { people } from "#/assets/images";
import { Children } from "#/types";

export function MainSection({ children }: Children) {
  return (
    <div className="overflow-x-clip overflow-y-visible">
      <div className="mx-auto sm:w-3/4 md:w-3/5 lg:w-auto">
        <main className="container grid grid-cols-1 gap-12 py-24 lg:grid-cols-2">
          <div className="z-10">{children}</div>

          <div className="relative z-0 h-fit">
            <Image src={people} alt="Networking" className="h-auto w-full" />
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute -bottom-72 -left-48 -z-10"
              width={1200}
              height={1200}
            >
              <path
                d="M44.7,-36.8C55.1,-22.5,58.8,-4.1,56.9,16.4C54.9,36.8,47.2,59.4,29.8,71.5C12.4,83.5,-14.7,85.1,-37.2,75.1C-59.7,65.1,-77.7,43.5,-77.7,23.5C-77.6,3.5,-59.5,-14.8,-43.6,-30.3C-27.6,-45.8,-13.8,-58.5,1.6,-59.9C17.1,-61.2,34.2,-51.1,44.7,-36.8Z"
                transform="translate(100 100)"
                className="fill-primary-50"
              />
            </svg>
          </div>
        </main>
      </div>
    </div>
  );
}
