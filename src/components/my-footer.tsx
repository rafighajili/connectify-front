import { Divider, Link } from "@nextui-org/react";

export function MyFooter() {
  return (
    <footer className="container space-y-6 py-12">
      <Divider />

      <div className="text-default-500 flex flex-wrap justify-between gap-x-36 gap-y-3 [&_*]:text-sm">
        <p>Copyright @2024 Connectify. All Rights Reserved.</p>
        <p>
          <Link href="#">Terms & Conditions</Link> and <Link href="#">Privacy Policy</Link>.
        </p>
      </div>
    </footer>
  );
}
