import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

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

        // console.log(newTask)

        setTasks(oldState => [...oldState, newTask]);

    }

    function handleToggleTaskDone(id: number) {
        const updatedTasks = tasks.map(task => ({ ...task }))

        const task = updatedTasks.find((task) => task.id === id);

        if (!task){
            return
        }

        task.done = !task.done
        setTasks(updatedTasks)

        // console.log(updatedTasks)
        //TODO - toggle task done if exists
    }

    function handleRemoveTask(id: number) {
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks);
        //TODO - remove task from state
    }

    return (
        <View style={styles.container}>
            <Header tasksCounter={tasks.length}/>

            <TodoInput addTask={handleAddTask}/>

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
