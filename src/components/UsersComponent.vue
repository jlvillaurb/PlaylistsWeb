<template>
  <q-item>
    <q-avatar rounded color="primary" text-color="white">{{initial}}</q-avatar>
    <q-item-label> {{ title }} </q-item-label>
  </q-item>
</template>


<script>
export default {
  name: 'UsersComponents',

  data: {
    title: {
      type: String,
      required: true
    }
  },

  computed: {
    initial() {
      return this.title.charAt(0)
    }
  }

}
</script>