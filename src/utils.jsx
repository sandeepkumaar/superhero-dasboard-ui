import {useEffect} from 'react'

export function useCheckComponent(name) {
  console.log('called');
  useEffect(() => {
    console.log(name,':: Rendered')
  })
  useEffect(() => {
    console.log(name,':: Mounted')
    return () => console.log(name, ':: UnMounted')
  }, [])
  return;
}
