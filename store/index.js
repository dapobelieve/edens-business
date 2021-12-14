const storagePlugin = store => {
  store.subscribe((mutation, state) => {
    if(mutation.type.includes('auth/')) {
    }
  })
}

export const plugins = [storagePlugin]
