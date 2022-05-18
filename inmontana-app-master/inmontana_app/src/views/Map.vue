<template>
    <div>
        <h2>Choose a track</h2>
        <div class="container">
            <iframe class="responsive-iframe" src="https://www.google.com/maps/d/embed?mid=1vTStPxPFaURiKcuqSoFSxfCRaMIOakSf&ehbc=2E312F&z=8">
        </iframe>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Map',
};
</script>

<style>
.container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

/* Then style the iframe to fit in the container div with full height and width */
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
