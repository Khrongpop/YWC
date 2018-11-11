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
        v-if="index < limit"
        :key="index"
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="2.4">
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
  }
};
</script>


<style scope>
.song {
  font-size: 18px;
  font-weight: bold;
}
</style>
