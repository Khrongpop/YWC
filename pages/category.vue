<template>
  <section class="container">
    <div v-if="status">
      <div
        v-for="(feed, index) in feeds.results"
        :key="index">
        <Feeds
          v-if="keyword == feed.feed.title"
          :feeds="feed"
          :limit="50"/>
      </div>
    </div>
    <div v-else>
      <notfound/>
    </div>
  </section>
</template>

<script>
import Feeds from '~/components/Feeds.vue'
import notfound from '~/components/404.vue'
import { mapGetters } from "vuex"

export default {
  components: {
    Feeds, notfound
  },
  data() {
    return {
      slide: 0,
      search: null,
      keyword: '',
      status: false
    }
  },
  computed: {
    ...mapGetters(['feeds'])
  },
  mounted() {
    var check = 0
    if (this.$route.query.q != undefined) {
      this.keyword = this.getTitle(this.$route.query.q)
      this.feeds.results.forEach(feed => {
        this.keyword == feed.feed.title ? check++ : check
      });
    }
    check > 0 ? this.status = true : this.status = false
  },
  methods: {
    getTitle(link) {
      let splits = link.split('-')
      var title = ''
      splits.forEach((item, index) => {
        title += item
        index != (splits.length - 1) ? title += ' ' : title += ''
      });
      return title
    }
  }
}
</script>

