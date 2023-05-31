import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { DeleteConfirmationPopup } from '../components/generic/DeleteConfirmationPopup'

describe('<DeleteConfirmationPopup />', () => {
  it('renders title and content correctly', () => {
    const title = 'Delete Confirmation'
    const content = 'Are you sure you want to delete this item?'
    const { getByText } = render(
      <DeleteConfirmationPopup title={title} onClose={() => {}}>
        {content}
      </DeleteConfirmationPopup>
    )

    expect(getByText(title)).toBeInTheDocument()
    expect(getByText(content)).toBeInTheDocument()
  })

  it('calls onClick when Confirm button is clicked', () => {
    const onClick = jest.fn()
    const { getByText } = render(
      <DeleteConfirmationPopup title="Delete" onClick={onClick} onClose={() => {}}>
        Delete this item?
      </DeleteConfirmationPopup>
    )

    fireEvent.click(getByText('Confirm'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Cancel button is clicked', () => {
    const onClose = jest.fn()
    const { getByText } = render(
      <DeleteConfirmationPopup title="Delete" onClick={() => {}} onClose={onClose}>
        Delete this item?
      </DeleteConfirmationPopup>
    )

    fireEvent.click(getByText('Cancel'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
