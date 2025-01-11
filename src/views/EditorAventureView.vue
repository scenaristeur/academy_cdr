<template>
  <div v-if="aventure_url != null && aventure != null">
    <a :href="pod.aventureStore" target="_blank">aventure store</a>
    <div class="form-group">
      <label for="Titre">Titre</label>
      <input
        class="form-control"
        id="Titre"
        placeholder="titre"
        v-model="aventure.name"
      />
    </div>
    <div class="form-group">
      <label for="style">style</label>
      <input
        class="form-control"
        id="style"
        placeholder="style"
        v-model="aventure.style"
      />
    </div>

    <div class="form-group">
      <label for="description">description</label>
      <textarea
        class="form-control"
        id="style"
        placeholder="description"
        v-model="aventure.description"
      />
    </div>

    <div class="form-group">
      <label for="start">start</label>
      <input
        class="form-control"
        id="start"
        placeholder="start"
        v-model="aventure.start"
      />
    </div>
    <button @click="enregistrer" class="btn btn-primary">Enregistrer</button>
    <h2>Pages</h2>

    <div class="list-group">
      <button
        v-for="page in aventure.pages"
        v-bind:key="page"
        v-on:click="clickpage(page)"
        type="button"
        class="list-group-item list-group-item-action list-group-item-primary"
      >
        <b>{{ page.id }}</b> {{ page.title }}<br /><small
          ><span>{{ page.description }}</span></small
        >
      </button>
    </div>

    <div class="form-group">
      <label for="page_id">Id de la page</label>
      <input
        class="form-control"
        id="page_id"
        placeholder="id de la page"
        v-model="current_page.id"
        v-on:keyup.enter="updatePage"
      />
    </div>
    <div class="form-group">
      <label for="page_titre">Titre de la page page</label>
      <input
        class="form-control"
        id="page_titre"
        placeholder="titre"
        v-model="current_page.title"
        v-on:keyup.enter="updatePage"
      />
    </div>
    <div class="form-group">
      <label for="page_description">Description page</label>
      <textarea
        class="form-control"
        id="page_description"
        placeholder="description"
        v-model="current_page.description"
        v-on:keyup.enter="updatePage"
      />
    </div>

    <div class="form-group">
      <label for="page_content">Contenu de la page</label>
      <input
        class="form-control"
        id="page_content"
        placeholder="contenu"
        v-model="current_page.content"
        v-on:keyup.enter="updatePage"
      />
      <small id="contentHelp" class="form-text text-muted"
        >ajouter un
        <button class="btn btn-primary btn-sm">texte</button>
        <button class="btn btn-primary btn-sm">lien</button>
        <button class="btn btn-primary btn-sm">media</button>
      </small>
    </div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#contentModal"
    >
      Launch content modal
    </button>

    <div class="form-group">
      <label for="page_choices">Choix de la page page</label>
      <input
        class="form-control"
        id="page_choices"
        placeholder="choix"
        v-model="current_page.choices"
        v-on:keyup.enter="updatePage"
      />
      <button class="btn btn-primary btn-sm">ajouter un choix</button>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#choicesModal"
      >
        Launch choices modal
      </button>
    </div>

    <button @click="enregistrer" class="btn btn-primary">Enregistrer</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="contentModal"
      tabindex="-1"
      aria-labelledby="contentModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="contentModalLabel">Content Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- choices modal-->
    <div
      class="modal fade"
      id="choicesModal"
      tabindex="-1"
      aria-labelledby="choicesModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="choicesModalLabel">Choices Modal title</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditorAventureView",
  data() {
    return {
      current_page: {
        id: 0,
        title: "",
        description: "",
        content: [],
        choices: [],
      },
    };
  },
  mounted() {
    this.$store.dispatch("solid_data/loadAventure");
    // this.current_page = this.default_current_page;
  },
  methods: {
    enregistrer() {
      console.log("enregistrer", this.aventure);
      this.aventure.url = this.aventure_url;
      this.$store.dispatch("solid_data/saveAventure", this.aventure);
    },
    updatePage() {
      console.log("updatePage", this.current_page);
      this.aventure.pages == undefined ? (this.aventure.pages = {}) : null;
      this.aventure.pages[this.current_page.id] = this.current_page;
      this.$store.dispatch("solid_data/saveAventure", this.aventure);
    },
    //   // this.current_page = this.default_current_page;
    //   console.log("updatePage", this.current_page);
    //   this.aventure.pages == undefined ? (this.aventure.pages = []) : null;
    //   this.aventure.pages.push(this.current_page);
    //   this.current_page = this.default_current_page;
    // },
    clickpage(page) {
      console.log("clickpage", page);
      this.current_page = page;
    },
  },
  computed: {
    aventure_url() {
      return this.$store.state.solid_data.aventure_url;
    },
    aventure() {
      return this.$store.state.solid_data.aventure;
    },
    pod() {
      return this.$store.state.solid_data.pod;
    },
  },
};
</script>

<style scoped></style>
