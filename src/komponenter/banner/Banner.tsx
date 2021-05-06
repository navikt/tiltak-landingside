import { Sidetittel } from "nav-frontend-typografi";
import React, { FunctionComponent, useContext } from "react";
import { SommerJobbContext } from "../../ContextProvider";
import { sanityImageLink } from "../../sanity/serializer";
import BEMHelper from "../../utils/bem";
import "./banner.less";

const Banner: FunctionComponent = () => {
  const { banner } = useContext(SommerJobbContext);
  const cls = BEMHelper("banner");

  if (!banner) return null;

  return banner ? (
    <div
      className={cls.className}
      role="banner"
      aria-roledescription="site banner"
      style={{ backgroundColor: `${banner.backgroundColor.hex ?? "#ffffff"}` }}
    >
      <div className={cls.element("tekst")}>
        <Sidetittel>{banner.title}</Sidetittel>
        {banner?.bannerImage?.asset?._ref && (
          <img
            src={sanityImageLink(banner.bannerImage.asset._ref)}
            alt="bilde ungdommer på sommerjobb"
          />
        )}
      </div>
      <div
        className={cls.element("bunnlinje")}
        style={{
          backgroundColor: `${banner.borderlineColor.hex ?? "#ffffff"}`,
        }}
      />
    </div>
  ) : null;
};

export default Banner;
