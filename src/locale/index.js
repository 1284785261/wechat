import Vue from 'vue'
import VueI18n from 'vue-i18n'
import customZhCn from './lang/zh-CN'
import customEnUs from './lang/en-US'


Vue.use(VueI18n)

Vue.config.lang = 'en-US'

Vue.locale = () =>{}
const messages = {
  'zh-CN': Object.assign({}, customZhCn),
  'en-US': Object.assign({}, customEnUs)
}

const i18n = new VueI18n({
	locale: 'en-US',
	messages
})

export default i18n