import React from 'react';
import {Color} from "./colors";
import {Farge, Knapp} from "./Component";
import {TypoStyle} from "../sanity/Serializer";


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
    }
    borderlineColor: Color;
}


interface Menypunkt {
    linkTitle: string;
    path: {
        current: string;
        _type: string;
    }
    _key: string;
}

export interface Meny extends CommonBlock {
    Knapper: Knapp[]
    Menypunkter: Menypunkt[];
}

export interface Page extends CommonBlock {
    content: [Seksjon | Gridlayout];
    menu: {
        _ref: string;
        _type: string;
    }
}

interface Gridlayout {
    layoutType: LayoutType[]
    _key: string;
    _type: string;
}

interface LayoutType {
    fieldOne: Seksjon[];
    fieldTwo: Seksjon[];
    fieldThree: Seksjon[];
    fieldFour: Seksjon[];
    fieldFive: Seksjon[];
    fieldSix: Seksjon[];
    _key: string;
    _type: string;
}

export interface Seksjon {
    content: SeksjonContent[]
    heading: string;
    image: {
        _type: string;
        asset: {
            _ref: string;
            _type: string;
        }
    }
    _key: string;
    _type: string;
}

export interface SeksjonContent {
    content: Block[]
    _key: string;
    _type: string;
}

export interface Block {
    children: {
        _key: string;
        _type: string;
        marks: [];
        text: string;
    }
    markDefs: [];
    style: TypoStyle;
    _key: string;
    _type: string;
}


