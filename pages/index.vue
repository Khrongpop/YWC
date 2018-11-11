<template>
  <section class="container">
    <div>
      <Banner/>
      <div
        v-for="(feed, index) in feeds.results"
        :key="index">
        <Feeds
          :feeds="feed"
          :limit="5"/>
      </div>

    </div>
  </section>
</template>

<script>
import Feeds from '~/components/Feeds.vue'
import Banner from '~/components/Banner.vue'
import { mapGetters } from "vuex"
import axios from 'axios'

export default {
  components: {
    Banner, Feeds
  },
  data() {
    return {
      slide: 0,
      search: null
    }
  },
  computed: {
    ...mapGetters(['feeds'])
  },
  mounted() {
    this.$store.dispatch("fetch_hottracks");
  },
}
</script>

<style>
.container {
  align-items: center;
  /* text-align: center; */
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
