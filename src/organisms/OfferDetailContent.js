import React from 'react';
import { mapPaymentMethod } from '../utils/misc';
import { FormLayout, EnterPin } from '.';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { PaymentForm } from '../molecules';
import { Link, Button } from '../atoms';

function OfferDetailContent({
  enterPinScreen,
  loadingScreen,
  offerDetialsStyles,
  usernameMaker,
  paymentMethod,
  operationType,
  paymentDataform,
  handleTextChange,
  errors,
  loading,
  actionSendAcceptance,
  offerAmount,
  offerAsset,
  setState,
}) {
  return !enterPinScreen ? (
    <FormLayout.Content>
      <FormLayout.Body>
        {!loadingScreen ? (
          <ScrollView>
            <View style={offerDetialsStyles.container}>
              <View style={offerDetialsStyles.form}>
                <View style={offerDetialsStyles.row}>
                  <View style={offerDetialsStyles.left}>
                    <Text style={offerDetialsStyles.text}>
                      {mapPaymentMethod(paymentMethod)}
                    </Text>
                    <Text style={offerDetialsStyles.textSecond}>
                      {usernameMaker}
                    </Text>
                  </View>
                  <View style={offerDetialsStyles.right}>
                    <Text style={offerDetialsStyles.textAmount}>
                      $ {offerAmount} {offerAsset} {'->'} KSM
                    </Text>
                  </View>
                </View>
              </View>
              {operationType !== 'sell' &&
              operationType !== 'withdraw_funds' ? (
                <View style={offerDetialsStyles.form}>
                  <PaymentForm
                    show={paymentDataform}
                    method={paymentMethod}
                    onChangeText={handleTextChange}
                    errors={errors}
                  />
                </View>
              ) : (
                <View />
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={offerDetialsStyles.textLoad}>
            <ActivityIndicator size="small" color="black" />
          </View>
        )}
      </FormLayout.Body>
      <FormLayout.Footer>
        <View style={{ flex: 1, marginTop: '3%' }}>
          {loading ? (
            <View style={offerDetialsStyles.textLoad}>
              <ActivityIndicator size="small" color="black" />
              <Text style={offerDetialsStyles.textLoad}>Please wait...</Text>
            </View>
          ) : (
            <Button
              label="Confirm"
              action={actionSendAcceptance}
              stylect={offerDetialsStyles.buttonConfirm}
            />
          )}
          {!loading && (
            <Link
              label="Cancel"
              color="#cc5741"
              stylect={offerDetialsStyles.linkText}
              action={() => {}}
            />
          )}
        </View>
      </FormLayout.Footer>
    </FormLayout.Content>
  ) : (
    <View style={offerDetialsStyles.enterPinWrapper}>
      <EnterPin
        action={setState}
      />
    </View>
  );
}

export default OfferDetailContent;
