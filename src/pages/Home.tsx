import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import {Header} from '../components/Header';
import {Task, TasksList} from '../components/TasksList';
import {TodoInput} from '../components/TodoInput';
import UUID from "uuid-int";


export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleAddTask(newTaskTitle: string) {

        const id = 0;
        const generator = UUID(id);
        const uuid = generator.uuid();

        const newTask: Task = {
            id: new Date().getTime(),
            title: newTaskTitle,
            done: false
        };

        const taskExist = tasks.find((task) => task.title === newTaskTitle);

        if (taskExist) {
            Alert.alert("Task já cadastrada");
            return
        }


        // console.log(newTask)

        setTasks(oldState => [...oldState, newTask]);

    }

    function handleToggleTaskDone(id: number) {
        const updatedTasks = tasks.map(task => ({...task}))

        const task = updatedTasks.find((task) => task.id === id);

        if (!task) {
            return
        }

        task.done = !task.done
        setTasks(updatedTasks)

        // console.log(updatedTasks)
        //TODO - toggle task done if exists
    }

    function handleRemoveTask(id: number) {

        Alert.alert("Remove item", "Are you sure to remove this item?", [
            {
                style: 'cancel',
                text: 'no'
            }, {
                style: 'destructive',
                text: 'yes',
                onPress: () => {
                    const updatedTasks = tasks.filter(task => task.id !== id)
                    setTasks(updatedTasks);
                }
            }
        ])

        //TODO - remove task from state
    }

    function handleEditTask(id: number, taskNewTitle: string) {
        const updatedTasks = tasks.map(task => ({...task}))

        const task = updatedTasks.find((task) => task.id === id);

        if (!task) {
            return
        }

        task.title = taskNewTitle
        setTasks(updatedTasks)

    }

    return (
        <View style={styles.container}>
            <Header tasksCounter={tasks.length}/>

            <TodoInput addTask={handleAddTask}/>

            <TasksList
                tasks={tasks}
                toggleTaskDone={handleToggleTaskDone}
                removeTask={handleRemoveTask}
                editTask={handleEditTask}
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
