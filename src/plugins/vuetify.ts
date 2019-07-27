import Vue from "vue";
import colors from "vuetify/es5/util/colors";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg"
  },
  theme: {
    themes: {
      light: {
        // prettier-ignore
        primary: colors.blueGrey.base,
        secondary: colors.amber.base,
        accent: colors.brown.lighten4,
        // prettier-ignore
        error: colors.pink.base,
        warning: colors.orange.base,
        info: colors.cyan.base,
        success: colors.teal.base
      }
    }
  }
});
