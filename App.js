import { FlatList, StyleSheet, Button, View } from 'react-native';
import {useState} from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler()
  {
    setModalIsVisible(true);
  }

  function endGoalHandler()
  {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText)
  {
    if(enteredGoalText == '') return; 
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, {
      text: enteredGoalText,
      id: Math.random().toString(),
    }]);
    endGoalHandler();
  }

  function deleteGoalHandler(id)
  {
    setCourseGoals(currentCourseGoals=>{
      return currentCourseGoals.filter(x => x.id !== id);
    })
  }

  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      <Button 
        title='Add New Goal' 
        color='#5e0acc'
        onPress={startAddGoalHandler}
      />      
        <GoalInput
          visible={modalIsVisible}
          onCancel={endGoalHandler}
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
    </>
  );
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
