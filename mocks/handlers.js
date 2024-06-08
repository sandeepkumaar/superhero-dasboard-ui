import { http, HttpResponse } from 'msw'
 
const HOST = import.meta.env.VITE_SERVICE_HOST

const fetchGreetMessage = http.get(`${HOST}/api/message`, () => {
  return HttpResponse.json({
    message: 'hello from mock'
  })
});
export const handlers = [
  fetchGreetMessage
]
