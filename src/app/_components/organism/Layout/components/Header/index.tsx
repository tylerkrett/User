import type { ReactElement } from "react";

import { navigation } from "./utils";
import Anchor from "~/app/_components/atoms/Anchor";
import { Button } from "~/components/ui/button";

export default function Header(): ReactElement {
  return (
    <header>
      <nav className="grid grid-flow-col items-center justify-between gap-4 px-16 py-4 max-lg:px-2">
        <div className="grid grid-flow-col items-center gap-4">
          <Anchor href="/" className="grid grid-cols-[1fr_0]">
            SearchHuman
          </Anchor>
        </div>

        <ul className="grid grid-flow-col items-center justify-end gap-4">
          {navigation.map((nav) => {
            return (
              <li key={`nagivation-${nav.href}`}>
                <Anchor href={nav.href}>{nav.title}</Anchor>
              </li>
            );
          })}
          <li>
            <Button className="border-purple-600 font-normal hover:border-purple-600">
              Contact
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
