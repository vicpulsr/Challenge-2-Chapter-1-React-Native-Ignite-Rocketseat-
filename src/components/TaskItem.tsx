import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

export interface Task {
    id: number;
    title: string;
    done: boolean;
};

interface TaskItemProps {
    task: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, taskNewTitle: string) => void;
};

export function TasksItem({
    task,
    index,
    toggleTaskDone,
    removeTask,
    editTask
}: TaskItemProps) {
    const textInputRef = useRef<TextInput>(null)

    const [isEditing, setIsEditing] = useState(false);
    const [titleEdited, setTitleEdited] = useState(task.title);

    function handleStartEditing() {
        setIsEditing(true);
    };

    function handleCancelEditing() {
        setTitleEdited(task.title);
        setIsEditing(false);
    };

    function handleSubmitEditing() {
        setIsEditing(true);
        editTask(task.id, titleEdited);
        setIsEditing(false);
    };

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        value={titleEdited}
                        editable={isEditing}
                        onChangeText={setTitleEdited}
                        onSubmitEditing={handleSubmitEditing}
                    />
                </TouchableOpacity>
            </View>

            <View style={ styles.iconsContainer }>
                {
                    isEditing
                        ? (
                            <TouchableOpacity
                                onPress={() => handleCancelEditing()}
                                style={{ paddingRight: 12 }}
                            >
                                <Icon
                                    name="x"
                                    size={24}
                                    color="#B2B2B2"
                                />
                            </TouchableOpacity>
                        )
                        : (
                            <TouchableOpacity
                                onPress={() => handleStartEditing()}
                                style={{ paddingRight: 12 }}
                            >
                                <Image source={editIcon} />
                            </TouchableOpacity>
                    )
                }
            
                <TouchableOpacity
                    onPress={() => removeTask(task.id)}
                    disabled={isEditing}
                    style={{ 
                        borderLeftColor: 'rgba(196, 196, 196, 0.24)', 
                        borderLeftWidth: 1,
                        paddingLeft: 12,
                    }}
                >
                    <Image 
                        source={trashIcon} 
                        style={{ opacity: isEditing ? 0.2 : 1 }}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
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
        maxWidth: 200,
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
    },
    iconsContainer: {
        flexDirection: 'row',
        paddingRight: 20
    },
});