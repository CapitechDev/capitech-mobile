import { Image, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';

const trailImages: Record<string, any> = {
    html: require('../assets/trails/html.png'),
    html5: require('../assets/trails/html.png'),
    javascript: require('../assets/trails/javascript.png'),
    css: require('../assets/trails/css.png'),
    sql: require('../assets/trails/sql.png'),
    default: require('../assets/trails/html.png'),
};

export const TrailImage = ({ trailName }: { trailName: string }) => {
    const normalized = trailName.toLowerCase();
    const source = trailImages[normalized] || trailImages.default;

    const { width, height } = Image.resolveAssetSource(source);
    const desiredWidth = 160;
    const scaleFactor = desiredWidth / width;
    const adjustedHeight = height * scaleFactor;

    return (
        <Image
            source={source}
            style={{
                width: desiredWidth,
                height: adjustedHeight,
            }}
        />
    );
};