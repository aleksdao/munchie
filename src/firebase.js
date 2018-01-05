import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAUkdHd7acH5F7hVI_Pdr0RYghds-Y9evE',
  authDomain: 'munchie-38cd3.firebaseapp.com',
  databaseURL: 'https://munchie-38cd3.firebaseio.com',
  projectId: 'munchie-38cd3',
  storageBucket: '',
  messagingSenderId: '668005955081',
};

firebase.initializeApp(config);

export default firebase;
