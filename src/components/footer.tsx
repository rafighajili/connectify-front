import { ConnectifyLogo } from "#/components/connectify-logo";
import { Divider, Link } from "#/lib";

const elements = [
  {
    heading: "Company",
    links: ["About", "Pricing", "Jobs", "Blog", "Careers"],
  },
  {
    heading: "Product",
    links: ["Sales Software", "Features", "Privacy and Security", "Marketplace", "API"],
  },
  {
    heading: "Help Center",
    links: ["Community", "Knowledge Base", "Academy", "Support"],
  },
];

export function Footer() {
  return (
    <footer>
      <div className="container space-y-16 py-16">
        <div className="flex justify-between gap-y-16 max-lg:flex-col">
          <ConnectifyLogo className="mr-auto h-20 w-auto" />

          <div className="flex flex-wrap gap-x-32 gap-y-16">
            {elements.map((element) => (
              <ul key={element.heading} className="flex flex-col gap-y-4">
                <li className="text-lg font-medium">{element.heading}</li>
                {element.links.map((link) => (
                  <li key={link} className="w-fit">
                    <Link href="#" className="">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <Divider />

        <div className="flex justify-between gap-4 text-sm text-default-500">
          <p>Copyright @2023 Aspire. All Rights Reserved.</p>
          <p>Terms & Conditions ~ Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}
