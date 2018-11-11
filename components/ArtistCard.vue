<template>
  <div>
    <vs-card
      v-if="result"
      class="cardx"
      style="height:375px;"
      fixed-height>
      <div slot="media">
        <img :src="result.artworkUrl100">
      </div>
      <div>
        <span class="song">  Song : {{ result.name ? result.name : result.trackName }} </span>  <br>
        <span v-if="result.collectionName">  Album : {{ result.collectionName }}   <br> </span>
        Artist :  {{ result.artistName }}
      </div>
      <div slot="footer">
        <vs-row vs-justify="flex-end">
          <vs-button
            :href="result.artistUrl ? result.artistUrl : result.artistViewUrl"
            target
            color="primary"
            type="gradient">ดูเพิ่มเติม</vs-button>
        </vs-row>
      </div>
    </vs-card>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: '',
      required: true
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
