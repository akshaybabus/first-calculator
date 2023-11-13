import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [operationStack, setOperationStack] = useState([]);
  const [operands, setOperands] = useState({
    operand1: '',
    operand2: '',
  });
  const [outputString, setOutputString] = useState('');
  const [displayOutputString, setDisplayOutputString] = useState('');

  const updateDisplay = () => {
    if (operationStack.length === 0 && operands.operand1.length > 0) {
      setDisplayOutputString(operands.operand1);
    } else if (operationStack.length === 2) {
      setDisplayOutputString(
        `${operationStack[0]}${operationStack[1]}${operands.operand2}`
      );
    } else if (operationStack.length === 3) {
      setDisplayOutputString(outputString);
    }
  };

  const printConsoleValues = () => {
    console.log('operationStack', operationStack);
    console.log('operands', operands);
    console.log('output', outputString);
  };

  const onPressNumber = (value) => {
    if (operationStack.length === 0) {
      setOperands((prevOperands) => ({
        ...prevOperands,
        operand1: prevOperands.operand1 + value,
      }));
    } else if (operationStack.length === 2) {
      setOperands((prevOperands) => ({
        ...prevOperands,
        operand2: prevOperands.operand2 + value,
      }));
    } else if (operationStack.length === 3) {
      onPressAC();
      setOperands({ operand1: '' + value, operand2: '' });
    }
    printConsoleValues();
    updateDisplay();
  };

  const onPressOperator = (value) => {
    if (operationStack.length === 0) {
      if (operands.operand1.length > 0) {
        setOperationStack((prevStack) => [...prevStack, operands.operand1]);
        setOperationStack((prevStack) => [...prevStack, value]);
      }
    } else if (operationStack.length === 3) {
      const temp = outputString;
      onPressAC();
      setOperands({ operand1: temp, operand2: '' });
      setOperationStack((prevStack) => [...prevStack, temp]);
      setOperationStack((prevStack) => [...prevStack, value]);
    }
    printConsoleValues();
    updateDisplay();
  };

  const onPressEquals = () => {
    if (operationStack.length === 2 && operands.operand2.length > 0) {
      setOperationStack((prevStack) => [...prevStack, operands.operand2]);
      setOutputString(
        performOperation(operationStack[0], operationStack[1], operands.operand2)
      );
    }
    console.log('=', outputString);
    printConsoleValues();
    updateDisplay();
  };

  const calculateResult = () => {
    if (operationStack.length === 2 && operands.operand2.length > 0) {
      const result = performOperation(
        operationStack[0],
        operationStack[1],
        operands.operand2
      );
      return result;
    }
    return '';
  };

  const performOperation = (op1, opr, op2) => {
    switch (opr) {
      case '+':
        return (Number(op1) + Number(op2)).toString();
      case '-':
        return (Number(op1) - Number(op2)).toString();
      case 'x':
        return (Number(op1) * Number(op2)).toString();
      case '/':
        return (Number(op1) / Number(op2)).toString();
      case '%':
        return (Number(op1) % Number(op2)).toString();
      default:
        return '';
    }
  };

  const onPressAC = () => {
    console.log('AC');
    setOperationStack([]);
    setOperands({ operand1: '', operand2: '' });
    setOutputString('');
    setDisplayOutputString('');
    printConsoleValues();
  };

  const onPressPlusMinus = () => {
    if (operationStack.length === 0 && operands.operand1.length > 0) {
      if (operands.operand1.indexOf('-') > -1) {
        setOperands((prevOperands) => ({
          ...prevOperands,
          operand1: prevOperands.operand1.slice(1),
        }));
      } else {
        setOperands((prevOperands) => ({
          ...prevOperands,
          operand1: '-' + prevOperands.operand1,
        }));
      }
    } else if (operationStack.length === 2 && operands.operand2.length > 0) {
      if (operands.operand2.indexOf('-') > -1) {
        setOperands((prevOperands) => ({
          ...prevOperands,
          operand2: prevOperands.operand2.slice(1),
        }));
      } else {
        setOperands((prevOperands) => ({
          ...prevOperands,
          operand2: '-' + prevOperands.operand2,
        }));
      }
    }
    printConsoleValues();
    updateDisplay();
  };

  useEffect(() => {
    updateDisplay();
  }, [displayOutputString, operands.operand1, operands.operand2, operationStack]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{displayOutputString}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={onPressAC}>
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPressPlusMinus}>
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPressOperator('%')}
          >
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPressOperator('/');
            }}
          >
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPressNumber(7);
            }}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPressNumber(8);
            }}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPressNumber(9);
            }}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPressOperator('x');
            }}
          >
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPressNumber(4);
            }}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPressNumber(5);
            }}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPressNumber(6);
            }}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPressOperator('-');
            }}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPressNumber(1);
            }}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPressNumber(2);
            }}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPressNumber(3);
            }}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onPressOperator('+');
            }}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.buttonDoubleWidth]}
            onPress={() => {
              onPressNumber(0);
            }}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonEquals]}
            onPress={() => {
              onPressEquals();
            }}
          >
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  displayContainer:{
    flex: 1,
    backgroundColor: 'lightblue',
    flexDirection:'column-reverse',
    justifyContent: 'flex-start',
    color:'white',
    padding: 10
  },
  displayText:{
    
    height: 40,
    fontSize: 40,
    textAlign: 'right',
  },
  buttonContainer:{
    backgroundColor: 'lightblue'
  },
  buttonRow:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonDoubleWidth: {
    flex: 2,
  },
  button:{
    height: 80,
    flex:1,
    backgroundColor: 'white',
    borderColor: 'lightblue',
    borderWidth: 1,
    margin: -1,
    justifyContent: 'center'
  },
  buttonText:{
    fontSize: 35,
    textAlign: 'center',
  },
  buttonEquals:{
    backgroundColor: 'lightblue',
  },
});
