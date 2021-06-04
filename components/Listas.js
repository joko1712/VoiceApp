import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import Colors from '../Colors';
import ListasModal from './ListasModal';

export default class Listas extends React.Component {
  state = {
    showListaVisible: false,
  };

  renderList = list => {
    return (
      <View style={styles.listaContainer}>
        <Text
          style={[
            styles.list,
            {
              textDecorationLine: list.bought ? 'line-through' : 'none',
              color: list.bought ? Colors.gray : Colors.white,
            },
          ]}>
          {list.title}
        </Text>
      </View>
    );
  };

  createTwoButtonAlert = list => {
    Alert.alert(
      'Delete',
      `Do you wish to delete the List: ${this.props.list.name}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => this.props.deleteList(this.props.list),
        },
      ],
    );
  };

  toggleListaModal() {
    this.setState({showListaVisible: !this.state.showListaVisible});
  }

  render() {
    const list = this.props.list;

    const boughtCont = list.lista.filter(Listas => Listas.bought).length;
    const remaining = list.lista.length - boughtCont;

    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showListaVisible}
          onRequestClose={() => this.toggleListaModal()}>
          <ListasModal
            list={list}
            closeModal={() => this.toggleListaModal()}
            updateList={this.props.updateList}
          />
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, {backgroundColor: list.color}]}
          onPress={() => this.toggleListaModal()}
          onLongPress={({item}) => this.createTwoButtonAlert(item)}>
          <Text style={styles.listTitle} numberOfLines={2}>
            {list.name}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{marginRight: 50, marginTop: 5}}>
              <View style={{alignItems: 'center'}}>
                <FlatList
                  data={list.lista.filter(Listas => !Listas.bought).slice(0, 3)}
                  renderItem={({item}) => this.renderList(item)}
                  keyExtractor={item => item.title}
                  contentContainerStyle={{
                    paddingHorizontal: 32,
                    paddingVertical: 64,
                  }}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>

            <View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.count}>{remaining}</Text>
                <Text style={styles.subtitle}>Remaining</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.count}>{boughtCont}</Text>
                <Text style={styles.subtitle}>Bought</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 300,
    marginBottom: 50,
  },
  listTitle: {
    fontSize: 35,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: '200',
    color: Colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },
  list: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 15,
    marginTop: 8,
  },
});
