import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyRegistered = tasks.find(task => task.title === newTaskTitle);

    if(taskAlreadyRegistered) {
      Alert.alert('Você não pode cadastrar uma task com o mesmo nome')
    } else {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
  
      setTasks((oldTasks: Task[]) => [...oldTasks, newTask]);
    }
  };

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    let foundItem = updatedTasks.find((task: Task) => task.id === id);
    if(!foundItem) return;
    foundItem.done = !foundItem.done;

    setTasks(updatedTasks);    
  };

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: 'Não',
          onPress: () => {

          }
        },
        {
          text: 'Sim',
          onPress: () => {
            const updatedTasks = tasks.filter((task: Task)=> task.id !== id);
            setTasks(updatedTasks);
          }
        }
      ]
    );
  };

  function handleEditTask (taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    let foundItem = updatedTasks.find((task: Task) => task.id === taskId);
    if(!foundItem) return;
    foundItem.title = taskNewTitle;

    setTasks(updatedTasks);   
  };

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
});