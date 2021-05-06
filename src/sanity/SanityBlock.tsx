import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { serializers } from './Serializer';
//import { SanityBlockTypes } from './sanityTypes';

interface Props {
    content: any //SanityBlockTypes;
}

const SanityBlocktype = (textblock: Props) => (
            <BlockContent
                blocks={textblock.content.content}
                serializers={serializers}
            />
);

export default SanityBlocktype;
