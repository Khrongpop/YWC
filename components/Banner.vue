<template>
  <div>
    <!-- {{ banners }} -->
    <b-carousel
      id="carousel1"
      v-model="slide"
      :interval="4000"
      style="text-shadow: 1px 1px 2px #333;"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- <b-carousel-slide
        v-for="(result, index) in banners.results"
        :key="index"
        :img-src="result.artworkUrl100">
        <h1>Hello world!</h1>
      </b-carousel-slide> -->

      <!-- Text slides with image -->
      <!-- <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/480/?image=52"
      /> -->

      <!-- Slides with custom text -->
      <!-- <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide> -->


      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide
        v-for="(result, index) in banners.results"
        :key="index">
        <img
          slot="img"
          :src="result.artworkUrl100"
          class="w-100"
          width="500"
          height="400"
          alt="image slot">
        <h1 class="text-left "> {{ banners.title[index] }} </h1>
        <p class="text-left song"> {{ result.name }}  -  {{ result.artistName }} </p>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <!-- <b-carousel-slide
        caption="Blank Image"
        img-blank
        img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          eros felis, tincidunt a tincidunt eget, convallis vel est. Ut pellentesque
          ut lacus vel interdum.
        </p>
      </b-carousel-slide> -->

    </b-carousel>


  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      slide: 0,
      sliding: null
    }
  },
  computed: {
    ...mapGetters(['banners'])
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  },
}
</script>

<style scoped>
img {
  object-fit: cover !important;
}
.text-left {
  text-align: left;
}
.song {
  font-size: 22px;
}
</style>

<!-- carousel-1.vue -->
