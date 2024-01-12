import { Divider, Tab, Tabs } from "@nextui-org/react";
import { ConnectifyLogo } from "#/components/connectify-logo";
import { ComputerDesktopIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import useMounted from "#/utils";

const footerElements = [
  {
    heading: "Company",
    elements: [
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Pricing",
        href: "/pricing",
      },
      {
        title: "Blog",
        href: "/blog",
      },
    ],
  },
  {
    heading: "Company",
    elements: [
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Pricing",
        href: "/pricing",
      },
      {
        title: "Blog",
        href: "/blog",
      },
    ],
  },
  {
    heading: "Company",
    elements: [
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Pricing",
        href: "/pricing",
      },
      {
        title: "Blog",
        href: "/blog",
      },
    ],
  },
  {
    heading: "Company",
    elements: [
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Pricing",
        href: "/pricing",
      },
      {
        title: "Blog",
        href: "/blog",
      },
    ],
  },
];

export function MyFooter() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  return (
    <footer className="container space-y-6 py-12">
      <Divider />

      <ConnectifyLogo size={80} />

      {/*<ul className="flex flex-wrap gap-x-24 gap-y-3">*/}
      {/*  {footerElements.map((element, key) => (*/}
      {/*    <div key={key}>*/}
      {/*      <h4 className="text-xl">{element.heading}</h4>*/}
      {/*      <ul className="mt-1.5 flex flex-col gap-1.5">*/}
      {/*        {element.elements.map((subElement, subKey) => (*/}
      {/*          <li key={subKey}>*/}
      {/*            <NextLink*/}
      {/*              href={subElement.href}*/}
      {/*              className="text-default-500 duration-200 hover:text-black dark:hover:text-white"*/}
      {/*            >*/}
      {/*              {subElement.title}*/}
      {/*            </NextLink>*/}
      {/*          </li>*/}
      {/*        ))}*/}
      {/*      </ul>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</ul>*/}

      <div className="text-default-500 flex flex-wrap items-end justify-between gap-x-36 gap-y-6 [&_*]:text-sm">
        <p>Copyright @ 2024 Connectify. All Rights Reserved.</p>
        {mounted && (
          <Tabs
            size="sm"
            radius="full"
            variant="bordered"
            color="primary"
            classNames={{ tab: "w-7" }}
            selectedKey={theme}
            // @ts-ignore
            onSelectionChange={setTheme}
          >
            <Tab key="light" title={<SunIcon className="h-4 w-4" />} />
            <Tab key="system" title={<ComputerDesktopIcon className="h-4 w-4" />} />
            <Tab key="dark" title={<MoonIcon className="h-4 w-4" />} />
          </Tabs>
        )}
      </div>
    </footer>
  );
}
