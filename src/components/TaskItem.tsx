/**
 * Created by Pablo Silva
 * Date: 2021/09/05
 * Time: 13:54
 */

import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import {Task} from "./TasksList";

interface TasksItemProps {
    item: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, taskNewTitle: string) => void;
    index: number;
}

export function TaskItem({item, toggleTaskDone, removeTask, editTask, index}: TasksItemProps) {
    const [isEditing, setIsEditing,] = useState(false);
    const [taskNewTitleValue, setTaskNewTitleValue] = useState(item.title);
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setTaskNewTitleValue(item.title)
        setIsEditing(false)
    }

    function handleSubmitEditing() {
        editTask(item.id, taskNewTitleValue)
        setIsEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        } else {
            textInputRef.current.blur();
        }
    }, [isEditing])

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                    //TODO - use onPress (toggle task) prop
                >
                    <View
                        testID={`marker-${index}`}
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                        //TODO - use style prop
                    >
                        {item.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                   {/* <Text
                        style={item.done ? styles.taskTextDone : styles.taskText}
                        //TODO - use style prop
                    >
                        {item.title}
                    </Text>*/}
                    <TextInput value={taskNewTitleValue}
                               onChangeText={setTaskNewTitleValue}
                               editable={isEditing}
                               onSubmitEditing={handleSubmitEditing}
                               style={item.done ? styles.taskTextDone : styles.taskText}
                               ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {isEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#b2b2b2"/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                        //TODO - use onPress (remove task) prop
                    >
                        <Image source={editIcon}/>
                    </TouchableOpacity>
                )}
                <View style={styles.iconsDivider}/>
                <TouchableOpacity
                    testID={`trash-${index}`}
                    disabled={isEditing}
                    onPress={() => removeTask(item.id)}
                    //TODO - use onPress (remove task) prop
                >
                    <Image source={trashIcon} style={{opacity: isEditing ? 0.2 : 1}}/>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoContainer:{
        flex:1
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:12,
        paddingRight:24,
    },
    iconsDivider:{
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196,196,196,0.24)',
        marginHorizontal:12
    },
})
