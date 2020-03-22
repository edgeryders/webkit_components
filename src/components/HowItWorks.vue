<template>
  <div class="text-left leading-normal pt-10 md:pt-0 md:bg-gray-200">
    <div class="w-full md:flex md:px-0 section md:section-md md:bg-gray-200">
      <div class="md:w-1/2 mt-0 md:pt-8 pr-8 md:border-r border-gray-200">
        <div class="er_photo">
          <div class="photo">
            <h3>( that's only some of us.. )</h3>
          </div>
        </div>
      </div>
      <div class="md:w-1/2 mt-2 px-0 pt-0 mb-12 md:pl-8 pt-4 border-l border-gray">
        <h3 class="font-display leading-tight text-2xl font-bold text-left md:leading-normal mb-2">
          This is how it works.
        </h3>
        <p class="text-lg m-0 pr-0">
          Edgeryders is platform of over 5.000 people who have been sharing
          their stories, their ideas, their problems, and their solutions
          since 2013. All these posts together are what we call our
          "collective intelligence". Our data analysis team uses open source
          methodologies and technologies to create interactive visualisations
          of the conversations as they evolve. The visualisations make it
          easier for everyone to find and connect across common interests and
          new insights.
        </p>
        <a href="https://edgeryders.eu/c/campfire" target="_blank">
          <button class="text-white bg-primary border border-primary text-xm font-semibold rounded-lg px-4 py-3 mt-6 leading-normal">
            Connect with the community
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<style type="text/css" lang="scss">
@import url("https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap");

.er_photo {
  transform: rotate(-1.2deg);
  .photo {
    background: url("../assets/edgeryders_group.jpg") no-repeat center 15px
      #f7f8f8;
    background-size: 95%;
    height: 200px !important;
    padding-bottom: 10px;
    position: relative;
    border-radius: 10px;
    width: 90%;
    left: 5%;
    margin-top: 2%;
    &:before,
    &:after {
      z-index: -1;
      position: absolute;
      content: "";
      bottom: 15px;
      left: 10px;
      width: 50%;
      top: 80%;
      max-width: 300px;
      background: #777;
      box-shadow: 0 15px 10px #777;
      transform: rotate(-3deg);
    }
    &:after {
      transform: rotate(3deg);
      right: 10px;
      left: auto;
    }
    h3 {
      position: absolute;
      bottom: 0%;
      left: 0%;
      width: 100%;
      text-align: center;
      color: orangered;
      font-size: 1.1em;
      font-family: "Permanent Marker", cursive;
    }
  }
}

@media (max-width: 640px) {
  .er_photo {
    .photo {
      height: 185px !important;
      width: 100%;
      padding-bottom: 30px;
      left: 0;
      h3 {
        bottom: 4%;
      }
    }
  }
}
</style>
