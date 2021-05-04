import clsx from "clsx";

import { Image } from "..";
import { getSiteMetaData } from "@utils/helpers";

export function Bio({ className }) {
  const { author, social } = getSiteMetaData();

  return (
    <div className={clsx(`flex items-center`, className)}>
      <p className="text-base leading-7">
        Written by <b className="font-semibold">{author.name}</b>{" "}
        {author.summary}<br />
        <a href={`https://twitter.com/${social.twitter}`}>
          Follow him on twitter
        </a>
      </p>
    </div>
  );
}
