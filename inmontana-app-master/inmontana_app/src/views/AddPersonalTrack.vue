<template>
  <div>
    <b-card text-variant="black">
      <h2>{{ trackTitle }}</h2>

      <label for="example-datepicker">Choose a date</label>
      <b-form-datepicker
        id="example-datepicker"
        v-model="trackDate"
        class="mb-2"
        
      ></b-form-datepicker>
      <b-form-checkbox
        id="checkbox-1"
        v-model="isTrackPublic"
        name="checkbox-1"
      >
        Make the trip public
      </b-form-checkbox>
      <button @click="createPersonalTrack" class="btn btn-success">
        Create Trip
      </button>
    </b-card>
  </div>
</template>

<script>
import { db } from "../main";
import firebase from "firebase";

export default {
  name: "AddPersonalTrack",
  data() {
    return {
      trackTitle: "",
      isTrackPublic: false,
      trackDate: ""
    };
  },
  created: function() {
    this.getTrackTitle();
  },
  methods: {
    getTrackTitle() {
      const trackId = window.location.search.split("=")[1];
      const track = db
        .collection("tracks")
        .doc(trackId)
        .get()
        .then(snapshot => (this.trackTitle = snapshot.data().Name));
    },
    createPersonalTrack() {
        if (this.trackDate === "") {
            alert("Please fill in the date!")
            return
        }
      const trackId = window.location.search.split("=")[1];
      const track = db
        .collection("tracks")
        .doc(trackId)
        .get();
      db.collection("trips").add({
        Leader: firebase.auth().currentUser.email,
        Participants: [],
        Date: this.trackDate,
        TrackId: trackId,
        isPublic: this.isTrackPublic
      });
      this.$router.push("/map");
    }
  }
};
</script>

<style></style>
