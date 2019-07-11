import Vue from 'vue'
import router from '@/router'
import routers from '@/router/routers'
import config from '@/config'
import { GetUser } from "@/api/common";
const { homeName } = config

export default {
  state: {
    deviceready: false,
    isLoading: false,
    direction: 'forward',
    header: {},
    showError: false,
    UserLiat: '',
    UserData: '',
    walletId: '',
    realName: {}, //实名认证
    Enterprise: {}//企业认证
  },

  getters: {

  },

  mutations: {
    updateDiviceReadyStatus(state, payload) {
      state.deviceready = payload.isReady
    },
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection(state, { direction }) {
      state.direction = direction
    },
    updateHeadText(state, meta) {
      state.header = meta
    },
    GetUsers(state, payload) {
      state.UserLiat = payload;
    },
    Userdatas(state, payload) {
      state.UserData = payload;
    },
    walletId(state, payload) {
      state.walletId = payload;
    },
    realName(state, payload) {
      state.realName = payload;
    },
    Enterprise(state, payload) {
      state.Enterprise = payload;
    }
  },

  actions: {

  }
}
