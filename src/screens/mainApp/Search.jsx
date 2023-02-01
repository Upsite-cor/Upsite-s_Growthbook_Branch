import React from 'react'
import Button from '../../components/button/Button.component'
import Container from '../../components/layout/container/Container.component'
import auth from '@react-native-firebase/auth';

const Search = () => {
  return (
   <>
   <Container>
    <Button title="Logout" onPress={()=> auth()
  .signOut()
  .then(() => console.log('User signed out!'))}></Button>
   </Container>
   </>
  )
}

export default Search