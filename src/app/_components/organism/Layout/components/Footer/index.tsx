import type { ReactElement } from "react";

import Anchor from "~/app/_components/atoms/Anchor";

export default function Footer(): ReactElement {
  return (
    <footer className="mt-auto grid gap-8 p-12">
      <nav className="grid grid-flow-col justify-center gap-6">
        <Anchor className="grid grid-cols-[1fr_0]" href="">
          Facebook
        </Anchor>
        <Anchor className="grid grid-cols-[1fr_0]" href="">
          Instagram
        </Anchor>
        <Anchor className="grid grid-cols-[1fr_0]" href="">
          Twitter
        </Anchor>
        <Anchor className="grid grid-cols-[1fr_0]" href="">
          Slack
        </Anchor>
      </nav>
      <p className="px-4 text-center text-sm">
        <span>Search Human limited | 99 Cherry Square | London SE22 9MM</span>{" "}
        <Anchor
          className="text-purple-600"
          href="mailto:info@searchhuman.co.uk"
        >
          info@searchhumana.com
        </Anchor>{" "}
        |{" "}
        <Anchor className="text-purple-600" href="">
          Terms & Conditions
        </Anchor>{" "}
        |{" "}
        <Anchor className="text-purple-600" href="">
          Privacy Policy
        </Anchor>{" "}
      </p>
      <div className="flex items-center justify-center">
        {/* <LogoLonRes className="w-[420px] max-lg:w-[320px]" /> */}
      </div>
    </footer>
  );
}
