import Image from "next/image";
import { StyleProps } from "#/lib/types";

export function ConnectifyLogo(props: StyleProps) {
  return <Image src="/logo.png" alt="Connectify logo" height={428} width={564} {...props} />;
}
