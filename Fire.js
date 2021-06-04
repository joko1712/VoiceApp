import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyALTdavPNQReVJNWyc2aF8DfexzxzDoXB0',
  authDomain: 'projetofinal-e1147.firebaseapp.com',
  projectId: 'projetofinal-e1147',
  storageBucket: 'projetofinal-e1147.appspot.com',
  messagingSenderId: '546669005614',
  appId: '1:546669005614:web:1b06c375565e04b4c888bf',
  measurementId: 'G-KLJBEWBR3S',
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let ref = this.ref.orderBy('color');

    this.unsubscribe = ref.onSnapshot(snapshot => {
      lists = [];

      snapshot.forEach(doc => {
        lists.push({id: doc.id, ...doc.data()});
      });

      callback(lists);
    });
  }

  addList(list) {
    let ref = this.ref;

    ref.add(list);
  }

  deleteList(list) {
    let ref = this.ref;

    ref.doc(list.id).delete();
  }

  updateList(list) {
    let ref = this.ref;

    ref.doc(list.id).update(list);
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
    return firebase
      .firestore()
      .collection('users')
      .doc(this.userId)
      .collection('lists');
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
