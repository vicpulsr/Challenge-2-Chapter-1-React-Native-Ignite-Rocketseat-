import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks((oldTasks: Task[]) => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }));

    let foundItem = updatedTasks.find((task: Task) => task.id === id);
    if(!foundItem) return;
    foundItem.done = !foundItem.done;

    setTasks(updatedTasks);    
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const updatedTasks = tasks.filter((task: Task)=> task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})