import Image from "next/image";
import { StyleProps } from "#/types";

export function ConnectifyLogo({ size = 200, ...otherProps }: StyleProps & { size?: number }) {
  return <Image src="/logo.png" alt="Connectify logo" height={size} width={size} priority {...otherProps} />;
}
