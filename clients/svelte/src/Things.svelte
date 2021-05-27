<script>
  import { onMount } from "svelte";

  let things = [];

  onMount(async () => {
    await fetch(`http://localhost:8000/things`)
      .then(r => r.json())
      .then(data => {
        things = data;
      });
  })

  let data = {
    name: "",
    description: "",
    id: null,
  };

  let addThing = () => {
    const newThing = {
      id: things.length + 1,
      name: data.name,
      description: data.description,
    };
    things = things.concat(newThing);
    data = {
      id: null,
      name: "",
      description: "",
    };
  };

  let deleteThing = (id) => {
    things = things.filter((thing) => thing.id !== id);
  };

  let isEdit = false;
  let editThing = (thing) => {
    isEdit = true;
    data = thing;
  };

  let updateThing = () => {
    isEdit = !isEdit;
    let thingDB = {
      name: data.name,
      description: data.description,
      id: data.id
    };
    let objIndex = things.findIndex(obj => obj.id == thingDB.id);
    if (objIndex > -1) {
      things[objIndex] = thingDB;
      data = {
        id: null,
        name: "",
        description: "",
      };
    } else {
      addThing();
    }
  };
</script>

<section>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-6">
        <div class="card p-2 shadow">
          <div class="card-body">
            <h5 class="card-title mb-4">Add New Thing</h5>
            <form>
              <div class="form-group">
                <label for="title">Name</label>
                <input
                  bind:value={data.name}
                  type="text"
                  class="form-control"
                  id="text"
                  placeholder="Thing name..."
                />
              </div>
              <div class="form-group">
                <label for="content">Description</label>
                <textarea
                  bind:value={data.description}
                  class="form-control"
                  id="content"
                  rows="3"
                  placeholder="Thing description..."
                />
              </div>
              {#if isEdit === false}
                <button
                  type="submit"
                  on:click|preventDefault={addThing}
                  class="btn btn-success"
                >
                  Add Thing</button
                >
              {:else}
                <button
                  type="submit"
                  on:click|preventDefault={updateThing}
                  class="btn btn-success"
                >
                  Save</button
                >
              {/if}
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        {#if things.length > 0}
          {#each things as thing}
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">{thing.name}</h5>
                <p class="card-text">{thing.description}</p>
                <button class="btn btn-primary" on:click={editThing(thing)}>
                  Edit</button
                >
                <button class="btn btn-danger" on:click={deleteThing(thing.id)}
                  >Delete</button
                >
              </div>
            </div>
          {/each}
        {:else}
          <p class="loading">Loading...</p>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  @import url("https://fonts.googleapis.com/css?family=Nunito&display=swap");
  * {
    font-family: "Nunito", sans-serif;
  }

  input:focus::placeholder {
    color: transparent;
  }

  textarea:focus::placeholder {
    color: transparent;
  }
  input::placeholder {
    opacity: 0.3;
  }

  textarea::placeholder {
    opacity: 0.3;
  }
</style>
