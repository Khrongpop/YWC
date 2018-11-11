import Vuex from "vuex"
import axios from "axios"
import hottrack from "~/assets/json/hot-tracks.json"
import new_releases from "~/assets/json/new-releases.json"
import top_album from "~/assets/json/top-album.json"
import top_songs from "~/assets/json/top-songs.json"

const URL_HOT_TRACK =
  "https://rss.itunes.apple.com/api/v1/th/apple-music/hot-tracks/all/50/explicit.json"
const URL_NEW_RELEASES =
  "https://rss.itunes.apple.com/api/v1/th/apple-music/new-releases/all/50/explicit.json"
const URL_TOP_ALBUM =
  "https://rss.itunes.apple.com/api/v1/th/apple-music/top-albums/all/50/explicit.json"
const URL_TOP_SONG =
  "https://rss.itunes.apple.com/api/v1/th/apple-music/top-songs/all/50/explicit.json"

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      hot_tracks: hottrack,
      new_releases: new_releases,
      top_albums: top_album,
      top_songs: top_songs,
      search: null,
      key: null,
      loading: false
    }),
    getters: {
      banners: state => {
        let banner = {
          title: [],
          results: []
        }
        banner.title.push(state.hot_tracks.feed.title)
        banner.title.push(state.new_releases.feed.title)
        banner.title.push(state.top_albums.feed.title)
        banner.title.push(state.top_songs.feed.title)

        banner.results.push(state.hot_tracks.feed.results[0])
        banner.results.push(state.new_releases.feed.results[0])
        banner.results.push(state.top_albums.feed.results[0])
        banner.results.push(state.top_songs.feed.results[0])
        return banner
      },
      feeds: state => {
        let feeds = { results: [] }
        feeds.results.push(state.hot_tracks)
        feeds.results.push(state.new_releases)
        feeds.results.push(state.top_albums)
        feeds.results.push(state.top_songs)
        return feeds
      }
    },
    mutations: {
      FETCH_HOTTRACKS(state, hot_tracks) {
        state.hot_tracks = hot_tracks
      },
      FETCH_SEARCH(state, search) {
        state.search = search
      },
      FETCH_KEY(state, key) {
        state.key = key
      }
    },
    actions: {
      async fetch_hottracks({ commit }) {
        console.log("hottrack", hottrack)
        try {
          var config = {
            // Access-Control - Allow - Origin: yourhostname: port
            // headers: { "Access-Control-Allow-Origin": "*" }
            headers: { "Access-Control-Allow-Origin": "http://localhost:3000" }
          }
          let res = await axios.get(URL_HOT_TRACK, config)
          // let res = await axios.get("~/assets/json/hot-tracks.json")

          // console.log(res.data)

          // commit("FETCH_HOTTRACKS", res.data)
        } catch (e) {
          console.log("error :", e)
        }
      },
      fetch_search({ commit }, key) {
        key == undefined ? (key = "") : key
        try {
          // return new Promise((resolve, reject) => {
          return axios
            .get(`https://itunes.apple.com/search?term=${key}&country=th`)
            .then(response => {
              commit("FETCH_SEARCH", response.data)
              commit("FETCH_KEY", key)
              // resolve(response.data)
              return response.data
            })
            .catch(err => {
              // reject(err)
              return err
            })
          // })
        } catch (e) {
          console.log("error :", e)
        }
      }
    }
  })
}

export default createStore
