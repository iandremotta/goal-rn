import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import {useState} from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  function addGoalHandler(enteredGoalText)
  {
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, {
      text: enteredGoalText,
      id: Math.random().toString(),
    }]);
    console.log(courseGoals);
  }

  function deleteGoalHandler(id)
  {
    setCourseGoals(currentCourseGoals=>{
      return currentCourseGoals.filter(x=> x.id !== id);
    });
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput 
        onAddGoal={addGoalHandler}
      />
      <View style={styles.goalsContainer}>
        <FlatList
        alwaysBounceVertical={false}
        keyExtractor={(item, index)=> {
          return item.id;
        }}
          data={courseGoals}
          renderItem={({item})=> {
            return(
              <GoalItem 
                text={item.text}
                id={item.id}
                onDeleteItem={deleteGoalHandler}
              />
            )
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
    padding: 50,
  },
  goalsContainer: {
    flex: 5,
  },
});
