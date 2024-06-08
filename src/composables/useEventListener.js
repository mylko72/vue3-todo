// event.js
import { onMounted, onUnmounted } from 'vue';

// 특정 DOM에 이벤트를 등록하는 기능도 Composable 함수로 만들 수 있습니다.
export function useEventListener(target, event, callback) {
	onMounted(() => target.addEventListener(event, callback));
	onUnmounted(() => target.removeEventListener(event, callback));
}
