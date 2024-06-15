import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
  // Composable에 의해 캡슐화되고 관리되는 상태입니다.
  const x = ref(0);
  const y = ref(0);

  // 상태를 업데이트합니다.
  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  // Composable은 사용중인 컴포넌트 hook 또한 사용할 수 있습니다.
  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));

  // 관리 상태를 반환합니다.
  // 상태값는 ref이며 만약 외부에서 해당값을 변경하면 내부의 값도 동기화되어 변경됩니다.
  return { x, y };
}