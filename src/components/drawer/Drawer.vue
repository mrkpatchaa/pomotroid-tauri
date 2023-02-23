<template>
  <div class="Drawer">
    <transition name="fade" mode="out-in">
      <component :is="currentDrawer" />
    </transition>
    <app-drawer-menu />
  </div>
</template>

<script>
import appDrawerMenu from '@/components/drawer/Drawer-menu.vue'
import appDrawerAbout from '@/components/drawer/Drawer-about.vue'
import appDrawerSettings from '@/components/drawer/Drawer-settings.vue'
import appDrawerTheme from '@/components/drawer/Drawer-theme.vue'
import appDrawerTimer from '@/components/drawer/Drawer-timer.vue'

export default {
  name: 'Drawer',

  components: {
    appDrawerMenu,
    appDrawerAbout,
    appDrawerSettings,
    appDrawerTheme,
    appDrawerTimer
  },

  computed: {
    currentDrawer() {
      return this.$store.getters.currentDrawer
    }
  }
}
</script>

<style lang="scss" scoped>
.Drawer {
  background-color: var(--color-background-light);
  position: relative;
  width: 100%;
  height: calc(100% - 68px);
  z-index: 1;
  -webkit-app-region: no-drag;
}
</style>
