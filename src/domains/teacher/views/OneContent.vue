<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  props: {
    data: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const deserializedData = ref({});

    const deserializeData = (dataString: string) => {
      try {
        return JSON.parse(dataString);
      } catch (error) {
        console.error("Failed to deserialize data:", error);
        return {};
      }
    };

    onMounted(() => {
      deserializedData.value = deserializeData(props.data);
      console.log("Deserialized data:", deserializedData.value);
    });

    return { deserializedData };
  }
});
</script>

<template>
  <div>
    <h1>Conteúdo</h1>
    <p>Data: {{ deserializedData }}</p>
  </div>
</template>