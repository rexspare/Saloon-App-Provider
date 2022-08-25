import { View, Text } from 'react-native'
import React from 'react'
import { LightBranding, DarkBranding } from '../assets/svg';
import { useSelector } from 'react-redux';

const Branding = () => {
  return (
    <>
        <LightBranding width={150} height={100} />
    </>
  )
}

export default Branding