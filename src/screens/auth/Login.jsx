import React from 'react';
import { View } from 'react-native';
import Container from '../../components/layout/container/Container2.component';
import AuthHeader from '../../components/headers/AuthHeader.component';
import SocialLogin from '../../components/authProviders/organisms/SocialLogin.component';
import LineBreak from '../../components/layout/LineBreak.component';
import Button from '../../components/button/Button2.component';
import { layout } from '../../styles/theme.style';
import TermOfService from '../../components/footers/TermsOfService.component';

const Login = ({ navigation }) => {
    const title = "All growth begins with planting a simple seed…";
    return (
        <Container>
            <View style={{ flex: 1, justifyContent: 'space-between', paddingHorizontal: layout.padding.HORIZONTAL }}>
                <View style={{ flex: 1 }}>
                    <AuthHeader title={title} />
                    <SocialLogin style={{ marginTop: layout.margin.VERTICAL }} />
                    <LineBreak style={{ marginVertical: layout.gap.NEIGHBORS }} />
                    <Button onPress={() => navigation.replace('loginEmail')}>
                        Login with Email
                    </Button>
                    <Button onPress={() => navigation.replace('signUp')}
                        style={{ marginTop: layout.gap.NEIGHBORS }}
                        type={'outline'}>
                        New to Growthboook? Create Account
                    </Button>

                </View>
                <View style={{ flex: 0, marginVertical: layout.margin.VERTICAL, paddingHorizontal: layout.padding.HORIZONTAL*2 }}>
                    <TermOfService />
                </View>
            </View>
        </Container>
    )
};

export default Login;