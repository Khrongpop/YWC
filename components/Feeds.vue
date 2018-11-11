<template>
  <div>
    <div class="mt-4" />
    <h2 class="pull-left"> {{ feeds.feed.title }} </h2>
    <vs-button
      v-if="limit < 10"
      :to="getUrl(feeds.feed.title)"
      class="pull-right"
      color="success"
      size="small"
      type="filled">
      ดูทั้งหมด
    </vs-button>
    <vs-row vs-justify="left">
      <vs-col
        v-for="(result,index) in feeds.feed.results"
        v-if="windowWidth>900 ? index < limit : index < limit - 2"
        :key="index"
        :vs-w=" windowWidth>900 ? 2.4 : 4"
        type="flex"
        vs-justify="center"
        vs-align="center">
        <ArtistCard :result="result" />
        <div class="mb-4"/>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import ArtistCard from '~/components/ArtistCard.vue'
export default {
  components: {
    ArtistCard,
  },
  props: {
    feeds: {
      type: '',
      required: true
    },
    limit: {
      type: 0,
      required: true
    },
  },
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
    }
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener("resize", this.getWindowWidth)
      window.addEventListener("resize", this.getWindowHeight)

      //Init
      this.getWindowWidth()
      this.getWindowHeight()
    })
  },
  methods: {
    getUrl(link) {
      let splits = link.split(' ')
      var url = 'category?q='
      splits.forEach((item, index) => {
        url += item
        index != (splits.length - 1) ? url += '-' : url += ''
      });
      return url
    },
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth
    },

    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight
    },
  }
};
</script>


<style scope>
.song {
  font-size: 18px;
  font-weight: bold;
}
</style>
