# Axios Singleton Instance

Axios Singleton Instance for **Node** and **Browserify** projects

## Quick start

```js
import axios from 'axios-singleton'

const axiosInstance: any = axios
const result = await axiosInstance.get('https://api.github.com/users/Quynh-Nguyen')

...
```

If you want to customize headers

```js
import axios from 'axios-singleton'

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

...
```

If you want to set Bearer token to headers

```js
import axios from 'axios-singleton'

const axiosInstance: any = axios
axiosInstance.setHeaderToken('YOUR_TOKEN')

...
```