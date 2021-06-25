<template>
  <q-item>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label author> {{ author }} </q-item-label>
      <q-item-label album> {{ album }} </q-item-label>
      <q-item-label duration> {{ duration }} </q-item-label>
      <q-item-label release_date> {{ release_date }} </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "SongsComponents",
  props: {
    title: {
      type: String,
      required: true
    },

    author: {
      type: String,
      default: ""
    },

    album: {
      type: String,
      default: ""
    },

    duration: {
      type: Number,
      default: "0"
    },

    release_date: {
      type: Date,
      default: ""
    }
  }
};
</script>
