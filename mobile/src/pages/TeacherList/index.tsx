import React, { useState } from 'react'
import { View, Text } from 'react-native'
import PageHeader from '../../components/PageHeader'
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'

import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { api } from '../../services/api'

import styles from './styles'

function TeacherList() {
  const [areFiltersAvailable, setAreAvailableFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [teachers, setTeachers] = useState([])
  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  const loadFavorites = async () => {
    const response = await AsyncStorage.getItem('favorites')
    if (!response) return

    setFavorites(JSON.parse(response).map((teacher: Teacher) => teacher.id))
  }

  const handleToggleFiltersVisible = () => {
    setAreAvailableFilters(!areFiltersAvailable)
  }

  const handleFiltersSubmit = async () => {
    loadFavorites()
    const teachers = await api
      .get('/classes', { params: { subject, week_day, time } })
      .then(({ data }) => data)

    setTeachers(teachers)
    setAreAvailableFilters(false)
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Available Proffys"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff"></Feather>
          </BorderlessButton>
        }
      >
        {areFiltersAvailable && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder="What is the subject?"
              placeholderTextColor="#c1bccc"
            ></TextInput>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Week Day</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholder="Which week day?"
                  placeholderTextColor="#c1bccc"
                ></TextInput>
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Time</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholder="What time?"
                  placeholderTextColor="#c1bccc"
                ></TextInput>
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
              <Text style={styles.submitButtonText}>Filter</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            ></TeacherItem>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default TeacherList
