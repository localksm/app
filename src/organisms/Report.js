import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Gallery from 'react-native-image-gallery';
import Textarea from 'react-native-textarea';
import {Button, Icon} from 'native-base';
import { FilePicker } from '../molecules';
import { ScrollView } from 'react-native-gesture-handler';
import { Button as ButtonAt  } from '../atoms';
import { FormLayout } from '.';
import { withContext } from '../apollo';

const Report = props => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [chosenItemsCount, setChosenItemsCount] = useState(0);
  const [showImages, setShowImages] = useState(false);


  const onChangeFile = async images =>{
    const evidence = await props.state.getData('SELECTED_IMAGES');
    const newGalleryImages = [...galleryImages];
    evidence.evidenceImages.images.forEach(x =>
      newGalleryImages.push({source: {uri: x}, dimensions: { width: 150, height: 150 } }),
    );

    setGalleryImages(newGalleryImages);
    setChosenItemsCount(newGalleryImages.length);
    
  }
    
  return (
    <>
      { !showImages && (
      <FormLayout.Content>
        <FormLayout.Body>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.form}>
                <Text style={styles.text}>User:</Text>
                <Text style={styles.text}>Amount $</Text>                
              </View>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={() => {}}
                defaultValue={''}
                maxLength={120}
                placeholder={'Description of the problem'}
                placeholderTextColor={'white'}
                underlineColorAndroid={'transparent'}
                textColor={'white'}
              />
              <Text style={styles.textEvidence}>
                Please add any evidence you have to help the jury evaluate your
                case, such as the transaction receipt made using the selected
                payment method.
              </Text>
              <FilePicker  onChangeFile={ onChangeFile } >
                {chosenItemsCount > 0 &&(
                  <View style={styles.gallery}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() =>setShowImages(!showImages) }>
                      <Text style={styles.linkShowImages}>Show Images</Text>
                    </TouchableOpacity>
                    <Text style={styles.countItem}>{chosenItemsCount}</Text>
                  </View>
                )}
              </FilePicker>

              <View style={styles.feeContainer}>{/*here must be the FEE  */}</View>
              
            </View>
          </ScrollView>
        </FormLayout.Body>
        <FormLayout.Footer>
          <View style={styles.contentFooter}>
            <Text style={styles.textContentFooter}>
              *You’ll be charged an extra fee of $0.01 KSM to pay a mediator to
              resolve the dispute. In case the transaction is resolved in your
              favor you’ll get back $0.01 KSM.
            </Text>
            <ButtonAt label='Submit' action={() => props.navigation.navigate('Mediation')} />
          </View>
        </FormLayout.Footer>
      </FormLayout.Content>
      )}

      {showImages && (
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              height: 50,
              alignItems: 'flex-end',
              justifyContent: 'center',
              position: 'absolute',
              right: 0,
              left: 0,
              top: 0,
              zIndex: 10,
            }}>
            <Button
              transparent
              light
              small
              style={{width: 50}}
              onPress={() =>setShowImages(!showImages)
              }>
              <Icon name="close" style={{color: 'white'}} />
            </Button>
          </View>
          <Gallery
            style={{flex: 1, backgroundColor: 'black' }}
            images={galleryImages}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  text: {
    marginVertical: 3,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  textEvidence: {
    marginVertical: 3,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'white',
    paddingBottom: 20,
  },
  textareaContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    height: 180,
    padding: 5,
    backgroundColor: '#2D2D2D',
    marginVertical: 20,
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
  },
  gallery: {
    marginTop: 10,
  },
  linkShowImages: {
    fontSize: 14,
    paddingLeft: 20,
    fontFamily: 'Poppins-Regular',
    color: '#cc5741',
  },
  countItem: {
    fontSize: 14,
    position: 'absolute',
    right: 40,
    top: 0,
    backgroundColor: '#cc5741',
    color: 'white',
    paddingRight: 6,
    paddingLeft: 6,
    borderRadius: 20,
  },
  feeContainer: {
    backgroundColor: '#FAFAFA',
    marginTop: 10,
  },
  footer: {
    paddingBottom: '40%',
  },
  textContentFooter: {
    alignItems: 'center',
    fontSize: 10,
    margin:10
  },
  contentFooter:{
    flex: 1, 
    marginHorizontal:'6%', 
    marginTop:'3%'
  }
});

export default withContext(Report);
