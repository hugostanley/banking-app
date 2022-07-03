import React, { useRef } from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal'
import User from '../../js/classes/user'
import Transaction from '../../js/classes/transaction'

function ModalUpdateBalance({ user, onUserChange, isOpen, onDialogChange }) {
  const amountRef = useRef(null)
  const closeDialog = () => onDialogChange(false)
  const toggleDialog = () => onDialogChange(bool => !bool)

  const handleUpdate = action => {
    if (amountRef.current.value === '') return

    const amount = parseInt(amountRef.current.value)
    let updatedBalance = parseInt(user.balance)

    if (action === 'Withdraw') {
      updatedBalance -= amount
      if (updatedBalance < 0) {
        alert('insufficient balance')
        return
      }
    } else {
      updatedBalance += amount
    }

    const id = new Date().getTime()
    const transaction = new Transaction(id, action, 'Posted', amount)

    onUserChange(state => {
      return new User(
        state.id,
        state.firstName,
        state.lastName,
        updatedBalance,
        state.email,
        state.pass,
        state.expenses,
        [...state.transactions, transaction]
      )
    })

    amountRef.current.value = ''
    closeDialog()
  }

  return (
    <Modal title='Update Balance' isOpen={isOpen} onClose={closeDialog}>
      <form>
        <div>
          <label className='form-label'>Amount</label>
          <input
            className='form-input'
            type='number'
            placeholder='Enter Amount'
            step={'.01'}
            ref={amountRef}
          />
        </div>
        <div className='dialog-btn-container'>
          <Button
            text='Cancel'
            className='btn-primary'
            onClick={toggleDialog}
          />
          <Button
            text='Deposit'
            className='btn-primary'
            onClick={() => handleUpdate('Deposit')}
          />
          <Button
            text='Withdraw'
            className='btn-primary'
            onClick={() => handleUpdate('Withdraw')}
          />
        </div>
      </form>
    </Modal>
  )
}

export default ModalUpdateBalance
