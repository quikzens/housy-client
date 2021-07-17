import React, { useState } from 'react'
import { API, configFormData } from '../../config/api'

function AddAttachment(props) {
  const { id, updateBookings } = props
  const [form, setForm] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('attachment', form.attachment, form.attachment.name)

    const response = await API.patch(
      `/order/addattachment/${id}`,
      data,
      configFormData
    )

    // if error
    if (response.data.status === 'failed') {
      // log the error message that we get from API
      return console.log(`Error: ${response.data.message}`)
    }

    // if success
    updateBookings()
  }

  const handleFile = (e) => {
    const { name, files } = e.target

    setForm({
      ...form,
      [name]: files[0],
    })
  }

  return (
    <>
      <p>Silahkan memasukkan bukti pembayaran</p>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <input
          type='file'
          name='attachment'
          id='attachment'
          accept='image/*'
          onChange={handleFile}
        />
        <button type='submit' className='modal__submit'>
          Tambahkan payment proof
        </button>
      </form>
    </>
  )
}

export default AddAttachment
