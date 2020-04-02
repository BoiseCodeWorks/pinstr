<template>
  <div class="home container-fluid">
    <div class="row mt-3">
      <div class="col-10 m-auto col-md-4" v-for="pin in pins" :key="pin.id">
        <pin class="my-2" :pin="pin" @edit="openPinDetails" />
      </div>
    </div>
    <modal :open="open" @close="open = false" showFoot @save="save">
      <div slot="title">{{activePin.title}}</div>
      <div>
        <form>
          <div class="form-group">
            <label for="title">Title</label>
            <input class="form-control" type="text" v-model="activePin.title" />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" v-model="activePin.description"></textarea>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import Pin from "@/components/Pin.vue";

export default {
  name: "Home",
  components: {
    Pin
  },
  data() {
    return {
      open: false,
      activePin: {}
    };
  },
  computed: {
    pins() {
      return this.$store.state.pins;
    }
  },
  methods: {
    openPinDetails(pin) {
      this.open = true;
      this.activePin = pin;
    },
    save() {
      this.$store.dispatch("updatePin", this.activePin);
    },
    didItWork() {
      console.log("yes", event);
    }
  }
};
</script>

<style scoped lang="scss">
.fake-modal {
  display: none;
  &.open {
    display: block;
    position: fixed;
    min-height: 500px;
    min-width: 80vw;
    background: white;
    border: 1px solid red;
  }
}
</style>