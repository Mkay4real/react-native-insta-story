import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
export default function App() {
  const mStoryRef = React.useRef();
  function createData() {
    const array = [];

    const userCount = 10;
    const userStoryCount = 15;

    for (let i = 1; i <= userCount; i++) {
      const storyArray = [];
      for (let k = 1; k <= userStoryCount; k++) {
        storyArray.push({
          story_id: i,
          story_image: 'https://picsum.photos/500/800?random=' + Math.random(),
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log(`story ${i} swiped`),
        });
      }

      array.push({
        user_id: i,
        user_image: 'https://picsum.photos/200/300?random=' + Math.random(),
        user_name: 'Test User ' + i,
        user_extra: '1hr ago',
        stories: storyArray,
      });
    }
    array.unshift({
      user_id: 1001,
      user_image: 'https://picsum.photos/200/300?random=' + Math.random(),
      user_name: 'Your Story ',
      empty: true,
      addComponent: (
        <View
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
          }}
        >
          <View
            style={{
              backgroundColor: 'blue',
              width: 14,
              height: 14,
              borderRadius: 14,
            }}
          />
        </View>
      ),
      stories: [],
    });
    return array;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <InstaStory
        data={createData()}
        ref={mStoryRef}
        duration={10}
        unPressedBorderColor={'purple'}
        customSwipeUpComponent={
          <View>
            <Text>Swipe</Text>
          </View>
        }
        onProfilePress={(userStory) => {
          console.log('TODO: Pressed', userStory);
        }}
        onStart={(userStory) => {
          if (userStory?.empty) {
            console.log('TODO: Launch add story screen');
          }
        }}
        ringGap={8}
        emptyBorderColor="transparent"
        avatarSize={50}
        style={{ marginTop: 90 }}
      />
      <Button
        onPress={() => {
          console.log('Launch');
          mStoryRef.current?.showStoryAtIndex(2);
        }}
        title="Launch User Profile Status"
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
