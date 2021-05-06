import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "./serializer";

/*
interface Props {
  innhold: any; // TODO : Legge til riktig type-setting
}
*/

const SanityBlocktype = ({ innhold }: { innhold: any }) => {
  return (
    <>
      <BlockContent blocks={innhold.content} serializers={serializers} />
    </>
  );
};

export default SanityBlocktype;
