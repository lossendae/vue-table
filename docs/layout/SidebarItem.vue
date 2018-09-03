<template>
    <li class="nav-section-item">
        <a :href="'#' + item.name">{{ item.title }}</a>
    </li>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
  }
</script>
