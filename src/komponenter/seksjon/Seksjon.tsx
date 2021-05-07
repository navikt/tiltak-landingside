import React, { FunctionComponent } from "react";
import { SeksjonContent, SeksjonType } from "../../types/SanityTypes";
import BEMHelper from "../../utils/bem";
import "./seksjon.less";
import {
  getBlockContentFromList,
  sanityImageLink,
} from "../../sanity/serializer";
import { Systemtittel } from "nav-frontend-typografi";

import SanityBlocktype from "../../sanity/SanityBlock";

interface Props {
  seksjon: SeksjonType;
}

const Seksjon: FunctionComponent<Props> = (props) => {
  const cls = BEMHelper("seksjon");
  const { seksjon } = props;

  if (!seksjon) return null;

  const fargeEditor = (panel: any, index: number) => {
    const bakgrunnsfarge: string = panel.color ? panel.color.hex : "#ffffff";
    return panel.innhold ? (
      <div
        key={index}
        style={{
          backgroundColor: bakgrunnsfarge,
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: "4px",
        }}
      >
        {getBlockContentFromList(panel.innhold)}
      </div>
    ) : null;
  };

  const getType = (
    innhold: SeksjonContent,
    index: number
  ): React.ReactNode | null => {
    switch (innhold._type) {
      case "sectionContent":
        return (
          <div key={index}>
            <SanityBlocktype innhold={innhold} />
          </div>
        );
      case "fargeEditor":
        return fargeEditor(innhold, index);
      default:
        return <SanityBlocktype innhold={innhold} />;
    }
  };

  return (
    <div className={cls.className} id={seksjon?.id ?? ""}>
      <div className={cls.element("header")}>
        {seksjon?.image?.asset?._ref && (
          <div className={cls.element("headikon")}>
            <img
              src={sanityImageLink(seksjon.image.asset._ref)}
              alt="alt text"
            />
          </div>
        )}
        <Systemtittel>{seksjon.heading ?? ""}</Systemtittel>
        <div className={cls.element("block-container")}>
          {seksjon?.content?.map((seksjon, index) => getType(seksjon, index))}
        </div>
      </div>
    </div>
  );
};
export default Seksjon;
