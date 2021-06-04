import React from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from 'react-native';
import {
  CloseOutlined,
  PlusCircleOutlined,
  StopOutlined,
} from '@ant-design/icons-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Colors';

export default class ListasModal extends React.Component {
  state = {
    newLista: '',
  };

  toggleListaBought = index => {
    let list = this.props.list;
    list.lista[index].bought = !list.lista[index].bought;

    this.props.updateList(list);
  };

  addList = () => {
    let list = this.props.list;

    if (!list.lista.some(lista => lista.title === this.state.newLista)) {
      list.lista.push({title: this.state.newLista, bought: false});

      this.props.updateList(list);
    }

    this.setState({newLista: ''});
    Keyboard.dismiss();
  };

  deleteItem = index => {
    let list = this.props.list;
    list.lista.splice(index, 1);

    this.props.updateList(list);
  };

  renderList = (list, index) => {
    return (
      <View style={styles.listaContainer}>
        <TouchableOpacity onPress={() => this.toggleListaBought(index)}>
          <Ionicons
            name={list.bought ? 'Ios-square' : 'Ios-square-outline'}
            size={24}
            color={Colors.gray}
            style={{width: 32}}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.list,
            {
              textDecorationLine: list.bought ? 'line-through' : 'none',
              color: list.bought ? Colors.gray : Colors.black,
            },
          ]}>
          {list.title}
        </Text>
        <View style={{flexDirection: 'row', flex: 1}}>
          <TouchableOpacity
            onPress={() => this.deleteItem(index)}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: 10,
              bottom: -10,
            }}>
            <StopOutlined style={{fontSize: '16px', color: '#08c'}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const list = this.props.list;
    const listaCount = list.lista.length;
    const boughtCount = list.lista.filter(Listas => Listas.bought).length;

    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 50,
              right: 32,
              zIndex: 10,
            }}
            onPress={this.props.closeModal}>
            <CloseOutlined style={{fontSize: '16px', color: '#08c'}} />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              {borderBottomColor: list.color},
            ]}>
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {boughtCount} of {listaCount} items
              </Text>
            </View>
          </View>

          <View style={[styles.section, {flex: 3, marginVertical: 16}]}>
            <FlatList
              data={list.lista}
              renderItem={({item, index}) => this.renderList(item, index)}
              keyExtractor={item => item.title}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, {borderColor: list.color}]}
              onChangeText={text => this.setState({newLista: text})}
              value={this.state.newLista}
            />
            <TouchableOpacity
              style={[styles.addList, {backgroundColor: list.color}]}
              onPress={() => this.addList()}>
              <PlusCircleOutlined style={{fontSize: '16px', color: '#08c'}} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    alignSelf: 'stretch',
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 50,
    borderBottomWidth: 3,
    paddingBottom: 10,
    paddingTop: 30,
  },
  title: {
    fontSize: 30,
    color: Colors.black,
    fontWeight: 'bold',
  },
  listaCount: {
    marginTop: 4,
    marginBottom: 16,
    color: Colors.gray,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 3,
  },
  addList: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listaContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
  },
  list: {
    color: Colors.black,
    fontWeight: '700',
    fontSize: 16,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
