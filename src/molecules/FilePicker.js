import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import randomString from 'random-string';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import { Auth, Storage } from 'aws-amplify';
import awsconfig from '../S3/aws-exports';
import { getSession, withContext } from '../apollo';

const FilePicker = (props) => {
  const [chosenItems, setChosenItems] = useState([]);
  const [loading, setloading] = useState(false);

  const handlerSaveImage = async (uriImage, { session }) => {
    const nameRandom = randomString({
      length: 16,
      numeric: true,
      letters: true,
      special: false,
      exclude: ['a', 'b', '1'],
    });
    const extension = uriImage.type.replace('image/', '.');
    const fullName = `${nameRandom}${extension}`;
    const serverSideEncryption = 'AES256';
    const base64 = await RNFS.readFile(uriImage.uri, 'base64');
    const buffer = await Buffer.from(base64, 'base64');
    const { id } = session;

    return await upload(id, fullName, buffer, serverSideEncryption);
  };

  const upload = async (id, fullName, buffer, serverSideEncryption) => {
    Auth.configure(awsconfig.Auth);
    Storage.configure(awsconfig.Storage);
    const aux = await Storage.put(`${id}/${fullName}`, buffer, {
      serverSideEncryption,
    });
    return aux.key;
  };

  const handlerSingleFilePicker = async () => {
    const session = await getSession();
    setloading(true);
    const { onChangeFile } = props;
    if (Platform.OS === 'ios') {
      await ImagePicker.showImagePicker({}, async (response) => {
        if (response.didCancel) {
          setloading(false);
          return;
        } else if (response.error) {
          setloading(false);
          return alert(response.error);
        } else if (response.customButton) {
          setloading(false);
          return;
        } else {
          const { uri, type } = response;
          const imageResponse = await new Promise((resolve, reject) => {
            ImageResizer.createResizedImage(
              uri,
              672,
              896,
              `${type.replace('image/', '')}`.toUpperCase(),
              70,
            )
              .then((response) => {
                resolve(response);
              })
              .catch((err) => {
                reject(err);
              });
          });

          const chosenItemsNew = chosenItems;
          const s3key = await handlerSaveImage(
            { uri: imageResponse.uri, type },
            session,
          );
          chosenItemsNew.push(s3key);
          const localImages = [];
          localImages.push(imageResponse.uri);
          setChosenItems(chosenItemsNew);

          props.state.mutation({
            evidenceImages: {
              images: localImages,
              __typename: null,
            },
          });

          setloading(false);
          onChangeFile(chosenItems);
        }
      });
    } else {
      try {
        const res = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.images],
        });
        if (chosenItems) {
          const { uri, type } = res[0];

          const imageResponse = await new Promise((resolve, reject) => {
            ImageResizer.createResizedImage(
              uri,
              672,
              896,
              `${type.replace('image/', '')}`.toUpperCase(),
              70,
            )
              .then((response) => {
                resolve(response);
              })
              .catch((err) => {
                reject(err);
              });
          });

          const chosenItemsNew = chosenItems;
          const s3key = await handlerSaveImage(
            { uri: imageResponse.uri, type },
            session,
          );
          chosenItemsNew.push(s3key);
          const localImages = [];
          localImages.push(imageResponse.uri);

          props.state.mutation({
            evidenceImages: {
              images: localImages,
              __typename: null,
            },
          });

          setChosenItems(chosenItemsNew);
          setloading(false);
          onChangeFile(chosenItems);
        }
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          setloading(false);
        } else {
          alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
    }
  };

  return !loading ? (
    <View style={styles.containerPrincipal}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={handlerSingleFilePicker}>
        <View style={styles.container}>
          <Image
            style={styles.icon}
            source={require('../../assets/uploadPhoto.png')}
          />
          <Text numberOfLines={1} style={styles.buttonText}>
            Select images
          </Text>
        </View>
      </TouchableOpacity>
      {props.children}
    </View>
  ) : (
    <ActivityIndicator size="large" color="white" />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    borderWidth: 1,
    height: 60,
    width: '100%',
    borderColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
  containerPrincipal: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    flex: 1,
  },
  icon: {
    flexDirection: 'row',
    width: 50,
    resizeMode: 'contain',
  },
});

export default withContext(FilePicker);
