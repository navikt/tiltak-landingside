import { TypoStyle } from "../sanity/serializer";
import { Color } from "./colors";
import { Knapp } from "./Component";

interface CommonBlock {
  title: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

interface Asset {
  _ref: string;
  _type: string;
}

export interface Banner extends CommonBlock {
  backgroundColor: Color;
  bannerImage: {
    asset: Asset;
    _type: string;
  };
  borderlineColor: Color;
}

interface Menypunkt {
  linkTitle: string;
  path: {
    current: string;
    _type: string;
  };
  _key: string;
}

interface EnkeltMenyKnapp {
  knapp: Knapp;
  _key: string;
  _type: string;
}

export interface Meny extends CommonBlock {
  Knapper: EnkeltMenyKnapp[];
  Menypunkter: Menypunkt[];
}

export interface Page extends CommonBlock {
  content: {}[];
  menu: {
    _ref: string;
    _type: string;
  };
}

export interface Gridlayout {
  layoutType: LayoutType[];
  _key: string;
  _type: string;
}

interface LayoutType {
  fieldOne: SeksjonType[];
  fieldTwo: SeksjonType[];
  fieldThree: SeksjonType[];
  fieldFour: SeksjonType[];
  fieldFive: SeksjonType[];
  fieldSix: SeksjonType[];
  _key: string;
  _type: string;
}

export interface SeksjonType {
  content: SeksjonContent[];
  heading: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  _key: string;
  _type: string;
}

export interface SeksjonContent {
  content: Block[];
  _key: string;
  _type: string;
}

export interface Block {
  children: {
    _key: string;
    _type: string;
    marks: [];
    text: string;
  };
  markDefs: [];
  style: TypoStyle;
  _key: string;
  _type: string;
}
