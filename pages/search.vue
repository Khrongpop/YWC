<template>
  <section class="container">
    <h2 v-if="search"> ผลการค้นหา  {{ key }} : {{ search.resultCount }} </h2>
    <vs-row
      v-if="search && search.results && search.resultCount > 0"
      vs-justify="left">
      <vs-col
        v-for="(result,index) in search.results"
        :key="index"
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="2.4">
        <ArtistCard :result="result" />
      </vs-col>
    </vs-row>
    <div v-else>
      <h1>ไม่พบการค้นหา</h1>
    </div>
    <br>
    <!-- {{ search }} -->
  </section>
</template>

<script>
import ArtistCard from '~/components/ArtistCard.vue'
import Banner from '~/components/Banner.vue'
import { mapState } from "vuex"
import axios from 'axios'

export default {
  components: {
    ArtistCard, Banner
  },
  data() {
    return {
      slide: 0,
    }
  },
  computed: {
    ...mapState(["key", "search"])
  },
  mounted() {
    let keyword = this.$route.query.q
    let _this = this
    this.$store.dispatch("fetch_search", keyword).then(response => {
      // console.log("response revoe", response);
      _this.$vs.loading.close()
    }, error => {
      _this.$vs.loading.close()
      console.log(error);
    })
  },

}
</script>
