import React from 'react';
import { View } from 'react-native';
import { WalletView, HomeLayout } from '../organisms'
import { styleBackground } from '../utils/styles'

const Wallet = () => {
    return (
        <HomeLayout>
            <View style={styleBackground.container}>
                <WalletView />
            </View>
        </HomeLayout>
    );
};

export default Wallet;