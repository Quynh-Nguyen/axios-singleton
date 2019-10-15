import assert from 'assert'

import axios from '../src'

describe('#Create default axios instance', function() {
  it('should be a valid response', async function() {
    const axiosInstance: any = axios
    const result = await axiosInstance.get('https://api.github.com/users/Quynh-Nguyen')
    assert.equal('Quynh-Nguyen', result.data.login)
  })
})
