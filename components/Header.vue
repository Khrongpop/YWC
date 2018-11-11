<template>
  <div>
    <vs-navbar
      v-model="activeItem"
      class="nabarx"
      @keyup.enter.native="submit" >
      <div class="container">

        <vs-navbar-title >
          <router-link
            to="/"
            @click.native="reset" >
            YWC
          </router-link>
        </vs-navbar-title>

        <vs-spacer/>

        <vs-input
          v-model="search"
          icon="search"
          placeholder="Search"/>
      </div>
    </vs-navbar>
  </div>
</template>
<script>
export default {
  data: () => ({
    activeItem: 0,
    search: ''
  }),
  mounted() {
    let keyword = this.$route.query.q
    this.$store.dispatch("fetch_search", keyword)
  },
  methods: {
    submit() {
      let _this = this
      if (this.search != '') {
        this.$vs.loading({ type: 'sound', })
        this.$router.push({ path: `/search?q=${this.search}` })
        this.$store.dispatch("fetch_search", this.search).then(response => {
          // console.log("response revoe", response);
          _this.$vs.loading.close()
        }, error => {
          console.log(error);
        })
      }
    },
    reset() {
      this.search = ''
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
}
.icons-example .vs-input {
  margin: 6px;
}
</style>



