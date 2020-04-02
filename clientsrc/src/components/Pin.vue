<template>
  <div class="card p-2 pin shadow">
    <div class="d-flex align-items-center justify-content-between">
      <h4>{{pin.title}}</h4>
      <favorite-icon class="favorite-icon" :pin="pin" />
    </div>
    <p>{{pin.description}}</p>
    <!-- <button @click="drawGraph">draw</button> -->
    <!-- <canvas ref="graph"></canvas> -->
    <hr />
    <div class="d-flex justify-content-between align-items-center">
      <user-avatar :user="pin.creator" height="40" rounded show-name />
      <div
        class="d-flex align-items-center"
        v-if="$auth.isAuthenticated && $auth.user.email == pin.creatorEmail"
      >
        <i class="fa fa-fw fa-trash text-muted mr-2 action muted" @click="deletePin"></i>
        <i class="fa fa-fw fa-pencil text-muted mr-2 action muted" @click="editPin"></i>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "./UserAvatar";
import FavoriteIcon from "./FavoriteIcon";
export default {
  name: "Pin",
  props: {
    pin: { type: Object, required: true }
  },
  components: {
    UserAvatar,
    FavoriteIcon
  },
  methods: {
    async deletePin() {
      let yes = this.$confirm("Delete the pin?");
      if (!yes) {
        return;
      }
      this.$store.dispatch("removePin");
    },
    editPin() {
      this.$emit("edit", this.pin);
    },
    // drawGraph() {
    //   let canvas = this.$refs.graph;
    //   console.log("THE CANVAS ELEM", canvas);
    //   var ctx = canvas.getContext("2d");
    //   ctx.font = "30px Arial";
    //   ctx.strokeText(this.pin.title, 10, 50);
    // }
  }
};
</script>

<style scope lang="scss">
</style>