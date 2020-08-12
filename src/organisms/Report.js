import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ReportContent } from '.';
import { withContext } from '../apollo';
import { onChangeFile } from '../utils/misc';

const Report = (props) => {
  const { usernameMaker, offerAmount } = props.route.params.body;
  const { proposalId } = props.route.params.body.paymentData;
  const [galleryImages, setGalleryImages] = useState([]);
  const [chosenItemsCount, setChosenItemsCount] = useState(0);
  const [showImages, setShowImages] = useState(false);
  const [description, setDescription] = useState('');

  const variables = {
    proposalId,
    galleryImages,
    description,
  };

  return (
    <ReportContent
      showImages={showImages}
      setDescription={setDescription}
      onChangeFile={() =>
        onChangeFile(
          props.state,
          galleryImages,
          setGalleryImages,
          setChosenItemsCount,
        )
      }
      setShowImages={setShowImages}
      chosenItemsCount={chosenItemsCount}
      navigation={props.navigation}
      variables={variables}
      galleryImages={galleryImages}
      usernameMaker={usernameMaker}
      offerAmount={offerAmount}
    />
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
    margin: 10,
  },
  contentFooter: {
    flex: 1,
    marginHorizontal: '6%',
    marginTop: '3%',
  },
});

export default withContext(Report);
