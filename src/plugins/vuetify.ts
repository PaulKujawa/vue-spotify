import Vue from "vue";
import colors from "vuetify/es5/util/colors";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdiSvg"
  },
  theme: {
    // see https://material.io/design/color/#color-theme-creation
    themes: {
      light: {
        primary: colors.teal.base,
        // prettier-ignore
        secondary: colors.blueGrey.base,
        // prettier-ignore
        accent: colors.teal.base,
        // prettier-ignore
        error: colors.deepOrange.base,
        warning: colors.amber.base,
        info: colors.cyan.base,
        success: colors.green.base
      }
    }
  }
});
