/* eslint-disable no-undef */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Colors from './Colors';
import {
  QuestionCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons-react-native';
import Listas from './components/Listas';
import AddListaModal from './components/AddListaModal';
import SettingsModal from './components/SettingsModal';
import Fire from './Fire';
import LinearGradient from 'react-native-linear-gradient';

export default class App extends React.Component {
  state = {
    addListaVisible: false,
    settingsModalVisible: false,
    lists: [],
    user: {},
    loading: true,
  };

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert('Uh oh, something went wrong');
      }

      firebase.getLists(lists => {
        this.setState({lists, user}, () => {
          this.setState({loading: false});
        });
      });

      this.setState({user});
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleSettingsModal() {
    this.setState({settingsModalVisible: !this.state.settingsModalVisible});
  }

  toggleAddListaModal() {
    this.setState({addListaVisible: !this.state.addListaVisible});
  }

  renderList = list => {
    return (
      <Listas
        list={list}
        updateList={this.updateList}
        deleteList={this.deleteList}
      />
    );
  };

  addList = list => {
    firebase.addList({
      name: list.name,
      color: list.color,
      lista: [],
    });
  };

  deleteList = list => {
    firebase.deleteList(list);
  };

  updateList = list => {
    firebase.updateList(list);
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.mTurqoise} />
        </View>
      );
    }

    const cartas = this.state.lists.reverse();

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.purple, Colors.white]}
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Modal
            animationType="slide"
            visible={this.state.addListaVisible}
            onRequestClose={() => this.toggleAddListaModal()}>
            <AddListaModal
              closeModal={() => this.toggleAddListaModal()}
              addList={this.addList}
            />
          </Modal>

          <Modal
            animationType="slide"
            visible={this.state.settingsModalVisible}>
            <SettingsModal closeModal={() => this.toggleSettingsModal()} />
          </Modal>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.divider} />

            <Text style={styles.title}>
              <Text style={{fontWeight: '300', color: Colors.purple}}>Wha</Text>
              <Text style={{fontWeight: '300', color: Colors.tBLue}}>-</Text>
              <Text
                style={{
                  fontWeight: '300',
                  color: Colors.sBCrayola,
                }}>
                Wha
              </Text>
            </Text>

            <View style={styles.divider} />
          </View>

          <View style={{marginTop: 42, marginBottom: 20}}>
            <TouchableOpacity
              style={{position: 'absolute', left: 120, bottom: 0}}
              onPress={() => this.toggleAddListaModal()}>
              <PlusCircleOutlined style={{fontSize: '16px', color: '#08c'}} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{position: 'absolute', right: 120, bottom: 0}}
              onPress={() => this.toggleSettingsModal()}>
              <QuestionCircleOutlined
                style={{fontSize: '16px', color: '#08c'}}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: 500,
              weight: 500,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FlatList
              data={cartas}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => this.renderList(item)}
              keyboardShouldPersistTaps="always"
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  divider: {
    backgroundColor: Colors.tBLue,
    height: 5,
    flex: 1,
    alignSelf: 'center',
    borderRadius: 4,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: Colors.black,
    paddingHorizontal: 10,
  },
});
