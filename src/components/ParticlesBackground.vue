<template>
  <div class="particles-container">
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="configs"
    />
  </div>
</template>

<script setup>
import { Particles } from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'

// 确保导出组件
defineComponent({
  name: 'ParticlesBackground',
  components: {
    Particles,
  },
})

const particlesInit = async engine => {
  try {
    await loadFull(engine)
  } catch (error) {
    console.error('Failed to load particles:', error)
  }
}

const configs = {
  particles: {
    number: {
      value: 80,
    },
    color: {
      value: [
        '#3998D0',
        '#2EB6AF',
        '#A9BD33',
        '#FEC73B',
        '#F89930',
        '#F45623',
        '#D62E32',
        '#EB586E',
        '#9952CF',
      ],
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      value: 1,
    },
    size: {
      value: {
        min: 10,
        max: 15,
      },
    },
    collisions: {
      enable: true,
      mode: 'bounce',
    },
    move: {
      enable: true,
      speed: 3,
      outModes: 'bounce',
    },
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'pop',
      },
    },
  },
  background: {
    color: '#000000',
  },
}
</script>

<style scoped>
.particles-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
