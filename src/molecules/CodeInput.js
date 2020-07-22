import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

const CodeInput = props =>{
    const [codeArr, setCodeArr] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    let codeInputRefs = [];

    useEffect(() => {
        setCodeArr(new Array(props.codeLength).fill(''));        
    }, []);

    const _clear =()=> {    
        setCodeArr(new Array(props.codeLength).fill(''));
        setCurrentIndex(0);
        _setFocus(0);
    }

    const _setFocus =(index)=> {        
        codeInputRefs[index].focus();
    }
      
    const _blur=(index) => {
        codeInputRefs[index].blur();
    }

    const _onFocus =(index) =>{
        const { onCodeChange } = props;
        codeInputRefs[index].clear();
        let newCodeArr = codeArr;        
        const currentEmptyIndex = codeArr.findIndex( element => element =='');
        if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
          return _setFocus(currentEmptyIndex);
        }
        for (let i in newCodeArr) {
          if (i >= index) {
            newCodeArr[i] = '';
          }
        }

        setCodeArr(newCodeArr);
        setCurrentIndex(index);
        onCodeChange(newCodeArr.join(''))
      }

    const _onInputCode =(character, index) => {
        const { codeLength, onCodeChange } = props;
        let newCodeArr = codeArr;
        newCodeArr[index] = character;
        if (index === codeLength - 1) {            
            _blur(currentIndex);            
          } else {
            _setFocus(currentIndex + 1);
          }

        setCodeArr(newCodeArr);
        setCurrentIndex( currentIndex + 1);
        onCodeChange(newCodeArr.join(''))

    }

    const _getClassStyle =(active, id) => {
        const isNotEmpty = codeArr.reduce((accumulator, currentValue, index) =>{
            if(currentValue !== "") 
              accumulator.push(index);
            return accumulator; 
          },new Array()).includes(id);

        return Object.assign({},styles.activeDotStyle,{ 
            backgroundColor: isNotEmpty?'white': 'transparent',
            borderWidth: active? 1 : 0.2,
         });
    }

    let codeInputs = [];
    for (let index = 0; index < props.codeLength; index++) {
        const id = index;
        codeInputs.push(
            <TextInput 
                key={id}
                keyboardType="numeric"
                ref={ref => (codeInputRefs[id] = ref)}
                style={_getClassStyle(currentIndex == id, id )}
                onChangeText={text => _onInputCode(text, id)}
                autoFocus={false}
                onFocus={() => _onFocus(id)}
                selectTextOnFocus={false}
                clearTextOnFocus={true}
                selectionColor={'white'}
                underlineColorAndroid="transparent"
                maxLength={1} />
        );
    }
   return (
        <View style={styles.container}>
            {codeInputs}
        </View>
    );
}

const styles = StyleSheet.create({
    activeDotStyle:{
        borderWidth: 0.2,
        borderRadius: 20,
        marginLeft: 20,
        height: 20,
        width: 20,
        borderColor:'white',
        fontSize: 5
    },
    container:{
        flexDirection:'row',
        marginVertical:10,
        
    }
});

export default CodeInput;
