import React from 'react-native';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CloseOutlined from '@ant-design/icons-react-native';
import Colors from '../Colors';
import LinearGradient from 'react-native-linear-gradient';

export default class SettingsModal extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.purple, Colors.white]}
          style={styles.linearGradient}
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}>
          <Image style={styles.image} source={require('../assets/Icon.png')} />
          <TouchableOpacity
            style={{position: 'absolute', top: 60, right: 32}}
            onPress={this.props.closeModal}>
            <CloseOutlined style={{fontSize: '16px', color: '#08c'}} />
          </TouchableOpacity>

          <Text>Screen</Text>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  image: {
    width: 80,
    height: 80,
  },
});
