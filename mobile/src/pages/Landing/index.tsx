import React from 'react'
import { View, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import styles from './styles'

import landingImg from '../../assets/images/landing.png'
import storyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'

function Landing() {
  const { navigate } = useNavigation()

  const handleNavigateToGiveClassesPage = () => navigate('GiveClasses')
  const handleNavigateToStudyPage = () => navigate('Study')

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Welcome, {'\n'}
        <Text style={styles.titleBold}>What do you want to do?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton onPress={handleNavigateToStudyPage} style={[styles.button, styles.buttonPrimary]}>
          <Image source={storyIcon}></Image>
          <Text style={styles.buttonText}>Study</Text>
        </RectButton>

        <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Give Classes</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total of 285 connections already made <Image source={heartIcon} />
      </Text>
    </View>
  )
}

export default Landing
