<template>
  <div id="app">
    <div class="row">
      <div
        v-for="(trip, index) in trips"
        :key="index"
        class="col-md-4 col-6 my-3"
      >
        <b-card text-variant="black">
          <b-card-title>
            {{ trip.Name }}
          </b-card-title>
          <b-card-title v-if="checkIfLeader(trip.Leader)">
            (Leader)
          </b-card-title>
          <b-card-title v-else>
            (Participant)
          </b-card-title>
          <b-card-text>
            {{ trip.Date }}
          </b-card-text>
          <b-card-text>
            {{ trip.Description }}
          </b-card-text>
          <div>
            <div class="btn-group">
              <b-button
                title="Delete Trip"
                class="badge badge-danger mr-2"
                v-on:click="deleteTrip(trip)"
                >Delete Trip</b-button
              >
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../main";
import firebase from "firebase";

export default {
  name: "Trips",
  data() {
    return {
      trips: [],
      currentUser: firebase.auth().currentUser.email
    };
  },
  mounted: function() {
    this.getTrips();
  },
  methods: {
    getTrips() {
      console.log("Getting trips");
      let currentUser = this.currentUser;

      let query = db
        .collection("trips")
        .where("Leader", "==", currentUser)
        .orderBy("Date", "asc");

      //.whereField("participants", "arrayContains", this.currentUser)

      let myTrips = this.trips;

      query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let tripData = doc.data();
          db.collection("tracks")
            .doc(tripData.TrackId)
            .get()
            .then(snapshot => {
              let trackData = snapshot.data();
              tripData.Name = trackData.Name;
              tripData.Description = trackData.Description;
              tripData.tripId = doc.id;
              db.collection("trips")
                .doc(doc.id)
                .set(tripData);
            });

          myTrips.push(tripData);
        });
      });

      db.collection("trips")
        .orderBy("Date", "asc")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let tripData = doc.data();
            let tripParticipants = tripData.Participants;
            if (tripParticipants.includes(currentUser)) {
              db.collection("tracks")
                .doc(tripData.TrackId)
                .get()
                .then(snapshot => {
                  let trackData = snapshot.data();
                  tripData.Name = trackData.Name;
                  tripData.Description = trackData.Description;
                  tripData.tripId = doc.id;
                  db.collection("trips")
                    .doc(doc.id)
                    .set(tripData);
                });

              myTrips.push(tripData);
            }
          });
        });
      setTimeout(1000);

      this.trips = myTrips;
      console.log(this.trips);
    },
    deleteTrip(tripToDelete) {
      if (this.currentUser === tripToDelete.Leader) {
        db.collection("trips")
          .doc(tripToDelete.tripId)
          .delete();
      } else {
        tripToDelete.Participants = tripToDelete.Participants.filter(
          user => user != this.currentUser
        );
        db.collection("trips")
          .doc(tripToDelete.tripId)
          .set(tripToDelete);
      }
      const index = this.trips.findIndex(
        trip => trip.tripId == tripToDelete.tripId
      );
      if (~index) this.trips.splice(index, 1);
    },
    checkIfLeader(leader) {
      return leader === this.currentUser;
    }
    // editBoard(index) {
    //   // Make board's title editable
    //   const cardTitle = this.$refs.boardTitle[index];
    //   cardTitle.contentEditable = true;
    //   cardTitle.style.backgroundColor = "white";
    //   this.$refs.submitEditButton[index].style.visibility = "visible";
    // },
    // submitEdit(board, index) {
    //   // Make board's title not editable and submit changes
    //   const cardTitle = this.$refs.boardTitle[index];
    //   cardTitle.contentEditable = false;
    //   cardTitle.style.backgroundColor = "transparent";
    //   this.$refs.submitEditButton[index].style.visibility = "hidden";
    //   const newTitle = cardTitle.innerText;
    //   if (board.name != newTitle) {
    //     const payload = {
    //       name: newTitle,
    //       image: board.image
    //     };
    //     BoardService.update(board._id, payload)
    //       .then(response => {
    //         console.log("Board updated successfully!");
    //         console.log(response.data);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    //   }
  }
  //}
};
</script>

<style></style>
