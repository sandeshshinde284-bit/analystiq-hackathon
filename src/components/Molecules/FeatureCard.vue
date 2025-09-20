<template>
  <div class="card-container">
    <div class="icon-wrapper">
      <i :class="icon"></i>
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FeatureCard",
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
});
</script>

<style lang="scss" scoped>
.card-container {
  // Use lighten() to make the card slightly lighter than the page background
  background-color: lighten($color-background, 4%);
  border: 1px solid $color-border;
  border-radius: 12px;
  padding: 30px;
  text-align: left;
  transition: all 0.3s ease;

  &:hover {
    // On hover, make the border glow blue and move the card up
    transform: translateY(-5px);
    border-color: rgba($color-accent, 0.5);
    box-shadow: 0 0 25px rgba($color-accent, 0.2);
  }
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;

  // Use the accent color with low opacity for the background
  background-color: rgba($color-accent, 0.1);

  i {
    font-size: 24px;
    color: $color-accent; // The icon itself is the full accent color
  }
}

h3 {
  font-size: 1.4em;
  color: $color-text-primary;
  margin-bottom: 15px;
  font-weight: 500;
}

p {
  color: $color-text-secondary;
  font-size: 1em;
  line-height: 1.6;
}
</style>
