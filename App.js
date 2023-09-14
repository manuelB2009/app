
import React from 'react';
import Navigation from './navigation/navigation';
import Toast from 'react-native-toast-message';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function App() {
  return (
    <>
      <Navigation />
      <Toast
        position='bottom'
        bottomOffset={hp("12%")}
      />
    </>
  );
}