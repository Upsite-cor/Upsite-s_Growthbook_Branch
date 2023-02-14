import React, { useContext } from 'react'
import Button from '../../components/button/Button.component'
import Container from '../../components/layout/container/Container.component'
import auth from '@react-native-firebase/auth';
import BackHeader from '../../components/navigation/organisms/BackHeader';
import { UserContext } from '../../navigators/Application';

const Profile = () => {
  const user = useContext(UserContext);
  return (
   <>
   <Container isScrollable={false}>
   <BackHeader type="text" text={"Profile"} />
    
    {/* <Button title="Logout" onPress={()=> auth()
  .signOut()
  .then(() => console.log('User signed out!'))}></Button> */}
   </Container>
   </>
  )
}

export default Profile