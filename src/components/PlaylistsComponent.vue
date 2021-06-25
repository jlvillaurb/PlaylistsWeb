<template>

</template>

<script>
export default {
  name: 'PlaylistsComponents',
  data: {
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: 'navigate_next'
    }
  }
}
</script>
