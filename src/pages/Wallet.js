import React from 'react';
import { View } from 'react-native';
import { WalletView, HomeLayout } from '../organisms';
import { styleBackground } from '../utils/styles';
import { backHandlerControl } from '../utils/backHandlerControl';

const Wallet = (props) => {
    backHandlerControl(props);
    return (
        <HomeLayout>
            <View style={styleBackground.container}>
                <WalletView />
            </View>
        </HomeLayout>
    );
};

export default Wallet;