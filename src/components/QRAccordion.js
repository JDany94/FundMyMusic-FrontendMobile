import React from 'react';
import {View} from 'react-native';

import {List} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import {theme} from '../core/theme';

const QRTicket = ({value, name}) => {
  return (
    <List.Section>
      <List.Accordion title={name}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <QRCode
            value={value}
            backgroundColor={theme.colors.background}
            color={theme.colors.secondary}
            size={220}
          />
        </View>
      </List.Accordion>
    </List.Section>
  );
};

export default QRTicket;
