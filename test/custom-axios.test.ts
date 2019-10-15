import assert from 'assert'

import axios from '../src'

describe('#Create custom axios instance', function() {
  it('should be a valid response', async function() {
    const axiosInstance: any = axios
    axiosInstance.setConfigure({
      baseURL: 'https://api.github.com',
      headers: {
        common: {
          'Content-Type': 'application/json'
        }
      }
    })
    const result = await axiosInstance.get('/users/Quynh-Nguyen')
    assert.equal('Quynh-Nguyen', result.data.login)
  })
})