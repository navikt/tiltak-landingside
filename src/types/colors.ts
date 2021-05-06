import React from 'react';

export interface Color {
    alpha: number;
    hex: string;
    hsl: Hsl;
    hsv: Hsv;
    rgb: Rgb;
    _type: string;
}

export interface Hsl {
    _type: string;
    a: number;
    h: number;
    l: number;
    s: number;
}

export interface Hsv {
    _type: string;
    a: number;
    h: number;
    s: number;
    v: number;
}

export interface Rgb {
    _type: string;
    a: number;
    b: number;
    g: number;
    r: number;
}

