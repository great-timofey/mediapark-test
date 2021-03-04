import React, { FC, memo, useState } from 'react';
import { ActivityIndicator, View, Image } from 'react-native';

const ImageWithLoader: FC<{ uri: string }> = ({ uri, style, imageProps = {} }) => {
  const [imageLoading, setImageLoading] = useState(false);

  return (
    <View style={style}>
      <Image
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
        style={{ width: '100%', height: '100%' }}
        source={{ uri }}
        {...imageProps}
      />
      {imageLoading && (
        <View
          style={[
            ...style,
            {
              position: 'absolute',
              top: 0,
              left: 0,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default memo(ImageWithLoader);
