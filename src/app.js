import './styles/main.css'

const operators = ['+', '-', '/', '*']
const equal = '='
const dot = '.'
let numbers = []
let firstNum = true
let lastButton
let operatorValue
let calcOperator
let lastOperator
let total

const result = document.querySelector('#result')

export default function calculate(num1, num2, operator) {
  if (operator === '+') {
    total = parseFloat(num1) + parseFloat(num2)
  } else if (operator === '-') {
    total = parseFloat(num1) - parseFloat(num2)
  } else if (operator === '*') {
    total = parseFloat(num1) * parseFloat(num2)
  } else if (operator === '/') {
    total = parseFloat(num1) / parseFloat(num2)
  } else if (total === result.innerText) {
    return total
  } else {
    return result.innerText
  }
  if (!Number.isInteger(total)) {
    total = total.toPrecision(12)
  }
  return parseFloat(total)
}

function plusMinus() {
  if (typeof lastOperator !== 'undefined') {
    if (numbers.length > 0) {
      if (operators.includes(lastButton)) {
        if (result.innerText === '-') {
          result.innerText = 0
          firstNum = true
          return
        }
        result.innerText = '-'
        firstNum = false
      } else {
        result.innerText = -result.innerText
        if (numbers.length === 1) {
          numbers[0] = result.innerText
        } else {
          numbers[1] = result.innerText
        }
      }
    }
    return
  }
  if (result.innerText === '') {
    result.innerText = '-'
    firstNum = false
    return
  }
  result.innerText = -result.innerText
}

function buttonNumber(button) {
  const operator = document.getElementsByClassName('operator')
  const lastOperationHistory = document.getElementById('operation_history')
  lastButton = button

  if (button === 'C') {
    lastButton = null
    operatorValue = null
    calcOperator = null
    lastOperator = null
    total = null
    lastOperationHistory.innerText = ''
    result.innerText = ''
    return
  }

  if (button === '±') {
    plusMinus()
    return
  }

  if (!operators.includes(button) && button !== equal) {
    if (firstNum) {
      if (button === dot) {
        result.innerText = `0${dot}`
      } else {
        result.innerText = button
      }
      firstNum = false
    } else {
      if (result.innerText.length === 1 && result.innerText === 0) {
        if (button === dot) {
          result.innerText += button
        }
        return
      }
      if (result.innerText.includes(dot) && button === dot) {
        return
      }
      if (result.innerText.length === 10) {
        return
      }
      if (button === dot && result.innerText === '-') {
        result.innerText = `-0${dot}`
      } else {
        result.innerText += button
      }
    }
  } else {
    if (operatorValue != null && button === operatorValue) {
      return
    }
    if (button === '-' && result.innerText === 0) {
      result.innerText = button
      firstNum = false
      operatorValue = button
      return
    }
    if (operators.includes(button) && result.innerText === '-') {
      return
    }
    if (
      button === '-' &&
      operatorValue === '-' &&
      lastOperationHistory.innerText.includes('=')
    ) {
      return
    }

    if (operators.includes(button)) {
      if (typeof lastOperator !== 'undefined' && lastOperator != null) {
        calcOperator = lastOperator
      } else {
        calcOperator = button
      }
      if (button === '*') {
        lastOperator = '×'
      } else if (button === '/') {
        lastOperator = '÷'
      } else {
        lastOperator = button
      }
      operatorValue = button
      firstNum = true
    }

    if (numbers.length === 0) {
      numbers.push(result.innerText)
      if (typeof lastOperator !== 'undefined' && lastOperator != null) {
        lastOperationHistory.innerText = `${result.innerText} ${lastOperator}`
      }
    } else {
      if (numbers.length === 1) {
        numbers[1] = result.innerText
      }
      let tempNum = result.innerText

      if (button === equal && calcOperator != null) {
        total = calculate(numbers[0], numbers[1], calcOperator)
        result.innerText = total
        if (!lastOperationHistory.innerText.includes('=')) {
          lastOperationHistory.innerText += ` ${numbers[1]} =`
        }
        const [num1] = numbers
        tempNum = num1
        numbers[0] = total
        operatorValue = null
        const historyArr = lastOperationHistory.innerText.split(' ')
        historyArr[0] = tempNum
        lastOperationHistory.innerText = historyArr.join(' ')
      } else if (calcOperator != null) {
        lastOperationHistory.innerText = `${tempNum} ${lastOperator}`
        calcOperator = button
        numbers = []
        numbers.push(result.innerText)
      }
    }
  }
  calculate(numbers[0], numbers[1], operator)
}

const calc = document.querySelector('.calc')
if (calc) {
  calc.addEventListener('click', (event) => {
    if (!event.target.classList.contains('calc__btn')) return
    buttonNumber(event.target.innerText)
  })
}
