/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
  Platform,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import database from '@react-native-firebase/database';

// import 'react-native-get-random-values';
// import {v4 as uuidv4} from 'uuid';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

let counter = 0;

function App(): JSX.Element {
  const [content, setContent] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const reference = database().ref('/');
  reference.on('value', snapshot => {
    console.log('User data: ', snapshot.val(), Platform.OS);
  });

  const submitForum = () => {
    // const id = uuidv4();
    database()
      .ref('/forum/' + counter++)
      .set({
        userId: Platform.OS,
        content: content,
      });
    setContent('');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle]}>
        <View
          style={[
            {
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            },
            styles.rootContainer,
          ]}>
          <Section title="Forum">
            Enter value on the text input below to be added to the realtime
            database.
          </Section>
          <TextInput
            style={styles.textInput}
            placeholder="enter value"
            value={content}
            onChangeText={text => setContent(text)}
          />
          <Button title="Submit" onPress={submitForum} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 32,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textInput: {
    padding: 16,
    marginVertical: 24,
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default App;
