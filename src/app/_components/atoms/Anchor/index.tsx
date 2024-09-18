import Link from "next/link";

import type { ReactElement } from "react";
import type { Props } from "./types";

export default function Anchor(props: Props): ReactElement {
  return (
    <Link scroll={true} {...props}>
      {props.children}
    </Link>
  );
}
