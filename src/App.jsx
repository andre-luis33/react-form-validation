import { useState } from 'react'

import { emailIsValid, maskPhone } from './helper'

import './style.css';

function App() {

  const [showError, setShowError] = useState(false)

  const [formInputs, setFormInputs] = useState([
    {
      name: 'nome',
      label: 'Nome',
      value: '',
      isValid: false,
      hasTyped: false,
      customHandler: false
    },
    {
      name: 'email',
      label: 'Email',
      value: '',
      isValid: false,
      hasTyped: false,
      customHandler: handleEmailChange
    },
    {
      name: 'telefone',
      label: 'Telefone',
      value: '',
      isValid: false,
      hasTyped: false,
      customHandler: handlePhoneChange
    },
  ])

  function handleInputChange(event) {
    const { name, value } = event.target
  
    const index = formInputs.findIndex(i => i.name === name)
    
    const inputsCloned = [...formInputs]
    inputsCloned[index].value = value
    inputsCloned[index].isValid = value != '' ? true : false
    inputsCloned[index].hasTyped = true

    setFormInputs((prev) => inputsCloned)
  }

  function handleEmailChange(event) {
    const { value } = event.target

    const index = formInputs.findIndex(i => i.name === 'email')

    const inputsCloned = [...formInputs]
    inputsCloned[index].hasTyped = true
    inputsCloned[index].value = value
    inputsCloned[index].isValid = emailIsValid(value) ? true : false

    setFormInputs((prev) => inputsCloned)
  }

  function handlePhoneChange(event) {
    const { value } = event.target

    const index = formInputs.findIndex(i => i.name === 'telefone')

    const inputsCloned = [...formInputs]
    inputsCloned[index].hasTyped = true
    inputsCloned[index].value = maskPhone(value)
    inputsCloned[index].isValid = value.length < 14 ? false : true
    
    setFormInputs((prev) => inputsCloned)
  }
  

  function handleSubmit(e) {
    e.preventDefault()

    const inputInvalid = formInputs.find(input => !input.isValid)
    if(inputInvalid) {
      setShowError(true)
      return
    }

    setShowError(false)
  }

  return (
    <form className='container mt-2' onSubmit={handleSubmit}>
      <h3 className='text-center'>Form Boladon</h3>

      {formInputs.map(inputEl => {
        const { name, label, value, hasTyped, isValid, customHandler } = inputEl
        const inputId = `id-${name}`

        const inputClass = hasTyped ? (
          isValid ? 'is-valid' : 'is-invalid'
        ) : ''

        return (
          <div key={inputId} className="form-group">
            <label htmlFor={inputId}>{label}</label>
            <input type="text" className={`form-control ${inputClass}`} name={name} id={inputId} value={value} onChange={customHandler || handleInputChange}/>
          </div>
        )
      })}

      <div className={`alert alert-danger text-center ${showError ? 'show' : ''}`}>
        Preencha todos os campos corretamente!
      </div>

      <button className='btn btn-success'>Enviar Formulário</button>

    </form>
  )
}

export default App
