<template>
  <div id="app" class="app">
    <b-navbar type="dark" variant="dark" class="p-2 shadow">
      <b-navbar-brand href="#">ReflexLeads</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link 1</b-nav-item>
          <b-nav-item href="#">Link 2</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="container-fluid">
      <div class="row flex-xl-nowrap2">
        <div class="bd-sidebar bg-dark border-bottom-0 col-md-3 col-xl-2 col-12">
        </div>
        <div class="bd-content col-md-9 col-xl-8 col-12 pb-md-3 pl-md-5">
          <OrderForm></OrderForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderForm from './components/OrderForm.vue'
export default {
  name: 'App',
  components: {
    OrderForm
  
  }
}
</script>
<style>
.app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
</style>