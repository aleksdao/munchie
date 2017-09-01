import React from 'react';
import { Text } from 'react-native';

class AppText extends React.Component {
  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }
  render() {
    const { children, style = {}, ...rest } = this.props;
    return (
      <Text ref={component => this._root = component} style={[{ fontFamily: 'Roboto-Medium' }, style]} {...rest} >
        {children}
      </Text>
    );

  }
}

export default AppText;
