import { useState } from 'react'
import './App.css'
import Wrapper from './components/Wrapper'
import ButtonBox from './components/ButtonBox'
import Button from './components/Button'
import Display from './components/Display'

const btnValues = [
  ['AC', '+/-', '%', '÷'],
  [7, 8, 9, 'x'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '='],
]

const toLocaleString = (number) =>
  String(number).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')

const removeSpaces = (number) => number.toString()

const math = (a, b, sign) =>
  sign === '+' ? a + b : sign === '-' ? a - b : sign === 'x' ? a * b : a / b

const zeroDivisionError = 'Error'

function App() {
  let [count, setCount] = useState({
    sign: '',
    number: 0,
    res: 0,
  })
  console.log(`res = ${count.res}`)
  console.log(`number = ${count.number}`)
  console.log(`sign = ${count.sign}`)
  console.log('-----------------------')
  const numClickHandler = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML
    if (removeSpaces(count.number).length < 16) {
      setCount({
        ...count,
        number:
          removeSpaces(count.number) % 1 === 0 &&
          !count.number.toString().includes('.')
            ? toLocaleString(Number(removeSpaces(count.number + value)))
            : toLocaleString(count.number + value),
        res: !count.sign ? 0 : count.res,
      })
    }
  }

  const comaClickHandler = (e) => {
    e.preventDefault()
    const value = e.target.innerHTML

    setCount({
      ...count,
      number: !count.number.toString().includes('.')
        ? count.number + value
        : count.number,
    })
  }

  const signClickHandler = (e) => {
    setCount({
      ...count,
      sign: e.target.innerHTML,
      res: !count.number
        ? count.res
        : !count.res
        ? count.number
        : toLocaleString(
            math(
              Number(removeSpaces(count.res)),
              Number(removeSpaces(count.number)),
              count.sign
            )
          ),
      number: 0,
    })
  }

  const equalsClickHandler = () => {
    if (count.sign && count.number) {
      setCount({
        ...count,
        res:
          count.number === '0' && count.sign === '%'
            ? zeroDivisionError
            : toLocaleString(
                math(
                  Number(removeSpaces(count.res)),
                  Number(removeSpaces(count.number)),
                  count.sign
                )
              ),
        sign: '',
        number: 0,
      })
    }
  }

  const invertClickHandler = () => {
    setCount({
      ...count,
      number: count.number
        ? toLocaleString(removeSpaces(count.number) * -1)
        : 0,
      res: count.res ? toLocaleString(removeSpaces(count.res) * -1) : 0,
      sign: '',
    })
  }

  const percentClickHandler = () => {
    let number = count.number ? parseFloat(removeSpaces(count.number)) : 0
    let res = count.res ? parseFloat(removeSpaces(count.res)) : 0
    setCount({
      ...count,
      number: (number * 10 ** 16) / 10 ** 18,
      res: (res * 10 ** 16) / 10 ** 18,
      sign: '',
    })
  }
  const resetClickHandler = () => {
    setCount({
      ...count,
      sign: '',
      number: 0,
      res: 0,
    })
  }

  const buttonClickHandler = (e, btn) => {
    btn === 'AC' || count.res === zeroDivisionError
      ? resetClickHandler()
      : btn === '+/-'
      ? invertClickHandler()
      : btn === '%'
      ? percentClickHandler()
      : btn === '='
      ? equalsClickHandler()
      : btn === '÷' || btn === 'x' || btn === '-' || btn === '+'
      ? signClickHandler(e)
      : btn === '.'
      ? comaClickHandler(e)
      : numClickHandler(e)
  }
  return (
    <Wrapper>
      <Display value={count.number ? count.number : count.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={
                btn === 0
                  ? 'zero'
                  : btn === 'AC' || btn === '+/-' || btn === '%'
                  ? 'upperbuttons'
                  : btn === '÷' ||
                    btn === 'x' ||
                    btn === '-' ||
                    btn === '+' ||
                    btn === '='
                  ? 'rightbuttons'
                  : ''
              }
              value={btn}
              onClick={(e) => buttonClickHandler(e, btn)}
            />
          )
        })}
      </ButtonBox>
    </Wrapper>
  )
}

export default App
