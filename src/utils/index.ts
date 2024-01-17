import { useEffect, useState } from "react";

export function useMounted() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export function objectToFormData(obj: any, formData?: FormData, namespace?: string): FormData {
  const fd = formData || new FormData();
  let formKey: string;

  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = `${namespace}[${property}]`;
      } else {
        formKey = property;
      }

      if (typeof obj[property] === "object" && !(obj[property] instanceof File)) {
        objectToFormData(obj[property], fd, formKey);
      } else {
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
}

export const packageClassNameHelper = {
  BRONZE: {
    bg: "bg-amber-600 dark:bg-amber-800",
    border: "border-amber-600 dark:border-amber-800",
    text: "text-amber-800 dark:text-amber-600",
  },
  SILVER: {
    bg: "bg-neutral-300 dark:bg-neutral-500",
    border: "border-neutral-300 dark:border-neutral-500",
    text: "text-neutral-500 dark:text-neutral-300",
  },
  GOLD: {
    bg: "bg-amber-400 dark:bg-amber-500",
    border: "border-amber-400 dark:border-amber-500",
    text: "text-amber-500 dark:text-amber-400",
  },
  DIAMOND: {
    bg: "bg-teal-400 dark:bg-teal-500",
    border: "border-teal-400 dark:border-teal-500",
    text: "text-teal-500 dark:text-teal-400",
  },
};
