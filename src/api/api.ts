import instance from '.'

export async function loginApi(username: string, password: string) {
  const { data } = await instance.post('/login', {
    username,
    password
  })
  return data
}

export async function registryApi(id: string, username: string, password: string) {
  const { data } = await instance.post('/user/register', {
    id,
    username,
    password
  })
  return data
}

export async function getStickersApi() {
  const data = await instance.get('/stickers')
  return data
}

export async function writeStickerApi(
  id: string,
  sender: string,
  content: string,
  kind: string,
  bgcolor: string
) {
  const { data } = await instance.post('/WriteSticker', {
    id,
    sender,
    content,
    kind,
    bgcolor
  })
  return data
}
