"use client";

import { useRouter } from "next/navigation";

const RedirectButton = ({
  fallbackUrl = "/",
  label = "Back",
  classNames,
}: {
  fallbackUrl?: string;
  label?: string;
  classNames?: string;
}) => {
  const router = useRouter();
  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <button className={classNames} onClick={handleClick}>
      {label}
    </button>
  );
};

export default RedirectButton;
