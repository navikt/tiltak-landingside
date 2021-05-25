import { Block } from './SanityTypes';

export interface Knapp {
    buttontype: string[];
    tekst: string;
    url: string;
    _type: string;
}

interface CommonContentType {
    _key: string;
    _type: string;
}

export interface Iframe extends CommonContentType {
    url: string;
}

export interface VeilederPanelType extends CommonContentType {
    innhold: Block[];
    kompakt: boolean;
    paneltype: string[];
    plakat: boolean;
}

export interface LesMerType extends CommonContentType {
    apnetekst: string;
    innhold: Block[];
    introduksjonstekst: string;
    lukktekst: string;
}

interface KnappeType extends CommonContentType {
    buttontype: string[];
    tekst: string;
    url: string;
}

export interface EnkeltKnapp extends CommonContentType {
    knappen: KnappeType;
}

export interface KnappeParType extends CommonContentType {
    knappen: KnappeType;
    knappto: KnappeType;
}

export interface EkspanderbartpanelType extends CommonContentType {
    overskrift: string;
    innhold: string;
}

export interface AlertstripePanelType extends CommonContentType {
    alerttype: string[];
    innhold: Block[];
}

export interface FargeEditor extends CommonContentType {
    color: Farge | undefined;
    innhold: Block[];
}

export interface FargetTekst extends CommonContentType {
    farge: Farge | undefined;
    innhold: string;
}

export interface FargeMerknad extends CommonContentType {
    children: string[];
    mark: Farge | undefined;
}

export interface Highlighted extends CommonContentType {
    children: string[];
    mark: string;
    markKey: string;
}

export interface Children extends CommonContentType {
    marks: [];
    text: string;
}

export interface Farge {
    _type: string;
    alpha: number;
    hex: string;
    rgb: {
        _type: string;
        a: number;
        r: number;
        g: number;
        b: number;
    };
}
