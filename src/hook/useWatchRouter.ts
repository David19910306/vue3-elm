import { watch, WatchStopHandle } from 'vue'
import { useRoute } from 'vue-router'

export default function watchRouter (): WatchStopHandle {
  const route = useRoute()
  const routeChange = watch(() => route.path, (value) => {
    // console.log(value)
    return value
  }, { immediate: true, deep: true })
  return routeChange
}
