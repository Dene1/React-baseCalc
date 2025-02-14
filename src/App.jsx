import {useState} from "react"
import styles from "./app.module.css"

function App() {
    const [operand1, setOperand1] = useState("")
    const [operand2, setOperand2] = useState("")
    const [operator, setOperator] = useState("")
    const [result, setResult] = useState("")

    const NUMS = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"]
    const OPERATIONS = ["+", "-", "*", "/", "C", "="]


    const clear = () => {
        setOperand1("")
        setOperand2("")
        setOperator("")
        setResult("")
    }

    const resetOnError = () => {
        if (result === "Нельзя делить на ноль" || result === "Ошибка") clear();
    }

    const handleNumberClick = (num) => {
        resetOnError()
        if (result) {
            setOperand1(num)
            setResult("")
        } else if (operator === "") {
            setOperand1(operand1 + num);
        } else {
            setOperand2(operand2 + num);
        }
    }


    const handleOperationClick = (operation) => {
        resetOnError()
        if (operation === "C") {
            clear()
        } else if (operation === "=") {
            calculate()
        } else {
            if (operand1 === "" && !result) return
            if (operand1 && !operand2 && result) {
                setOperand1(result)
                setOperand2("")
                setResult("")
            }
            setOperator(operation)
        }
    }

    const calculatorButtons = NUMS.map((num) => (
        <button key={num} onClick={() => handleNumberClick(num)}>
            {num}
        </button>
    ))

    const calculatorOperations = OPERATIONS.map((operation) => (
        <button key={operation}
                onClick={() => handleOperationClick(operation)}>
            {operation}
        </button>
    ))

    const calculate = () => {
        const num1 = parseFloat(operand1)
        const num2 = parseFloat(operand2)

        if (isNaN(num1) || isNaN(num2)) {
            setResult("Ошибка");
            return;
        }
        let calculatedResult

        if (operator === "+") {
            calculatedResult = num1 + num2
        } else if (operator === "-") {
            calculatedResult = num1 - num2
        } else if (operator === "*") {
            calculatedResult = num1 * num2
        } else if (operator === "/") {
            if (num2 === 0) {
                setResult("Нельзя делить на ноль");
                return;
            }
            calculatedResult = num1 / num2;
        } else {
            setResult("Неверная операция")
            return
        }
        setResult(calculatedResult.toFixed(0).toString())
        setOperand1(calculatedResult.toFixed(0).toString())
        setOperand2("")
        setOperator("")
    }


    const monitor = result || `${operand1} ${operator} ${operand2}`

    const monitorStyle = result ? {color: "#f700ff"} : {};

    return (
        <div className={styles.display}>
            <br/>
            <section className={styles.form}>
                <p style={monitorStyle}>{monitor}</p>
            </section>
            <section className={styles.numpad}>
                {calculatorButtons}
                {calculatorOperations}
            </section>
        </div>
    )
}

export default App
