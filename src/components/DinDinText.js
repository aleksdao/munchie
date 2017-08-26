import React from 'react';
import { Text } from 'react-native';

function DinDinText({ children, style }) {
  return (
    <Text style={[{ fontFamily: 'Helvetica Neue'}, style]}>{children}</Text>
  )
}

export default DinDinText;

