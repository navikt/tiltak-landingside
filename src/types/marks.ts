export interface Link {
    children: string[];
    mark: {
        href: string;
        linkid: string;
        _key: string;
        _type: string;
    };
    markKey: string;
    _key: string;
    _type: string;
}

export interface PhoneNumber {
    children: string[];
    mark: string;
    markKey: string;
    _key: string;
    _type: string;
}

export interface HighlightColor {
    children: string[];
    mark: string;
    markKey: string;
    _key: string;
    _type: string;
}
