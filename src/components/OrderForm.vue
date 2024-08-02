<template>
    <b-card>
      <b-card-header>
        <h4>{{ fields.title }}</h4>
      </b-card-header>
      <!-- Skeleton loading can be implemented here -->
      <div v-if="loading">Loading....</div>
      <b-card-body v-else>
        <b-tabs v-model="activeTab" content-class="mt-2">
          <b-tab
            v-for="tab in tabs"
            :key="tab.id"
            :title="tab.title"
            :id="tab.id"
          >
            <b-form @submit.stop.prevent="handleSubmit">
              <field-form
                v-for="(config, key) in getCurrentConfig()"
                :key="key"
                :field-type="config.type"
                :field-value="fields[key]"
                :field-name="key"
                :field-label="config.label"
                :field-options="config.options"
                :field-multiple="config.fieldMultiple"
                :field-label-by="config.fieldLabelBy"
                :field-track-by="config.fieldTrackBy"
                :validation="config.validation"
                :help-text="config.helperText"
                :field-place-holder="config.placeholder"
                :errors="errors[key]"
                @input="updateFieldValue(key, $event)"
              />
            </b-form>
          </b-tab>
        </b-tabs>
        <div class="mt-4">
          <!-- Navigation Buttons -->
          <b-button v-if="activeTab > 0" @click="prevTab" variant="secondary" class="mr-4">
            Previous
          </b-button>
          <b-button
            v-if="activeTab < tabs.length - 1"
            @click="nextTab"
            variant="primary"
            class="mr-4"
          >
            Next
          </b-button>
          <b-button
            v-if="activeTab === tabs.length - 1"
            @click="handleSubmit"
            variant="success"
          >
            Submit
          </b-button>
        </div>
      </b-card-body>
    </b-card>
  </template>
  
  <script>
  import {
    BCard,
    BCardHeader,
    BCardBody,
    BTabs,
    BTab,
    BButton,
    BForm
  } from 'bootstrap-vue';
  import FieldForm from '@/components/FieldForm.vue';
  import getOrder from '@/api/orders';
  import fieldConfig from '@/constants/config';
  import { zipCodes } from '@/constants/zipCodes';
  
  export default {
    components: {
      BCard,
      BCardHeader,
      BCardBody,
      BTabs,
      BTab,
      BButton,
      BForm,
      FieldForm
    },
    data() {
      return {
        fields: {},
        errors: {},
        activeTab: 0,
        loading: true,
        tabs: [
          { id: 'tab-lead-details', title: 'Lead Details', configKeys: [
             'type', 'cpl', 'max_devalidation', 'priority', 'leads_max_age_qualified', 'leads_max_age_raw'
          ] },
          { id: 'tab-capacities', title: 'Capacities', configKeys: [
            'dc1', 'dc2', 'dc3',
            'dc4', 'dc5', 'dc6', 'dc7', 'monthly_cap', 'total_cap'
          ] },
        
          { id: 'tab-addition-info', title: 'Additional Information', configKeys: [
            'country', 'regions', 'excluded_regions', 'status', 'zips', 'excluded_zips',
            'timezone', 'starts_at', 'ends_at', 'excluded_dates', 'delivery_type', 'delivery_emails'
          ] }
        ],
        fieldConfig,
        zipOptions: []
      };
    },
    created() {
      this.fields = getOrder.getOrder("1234567");
    },
    computed: {
      totalTabs() {
        return this.tabs.length;
      }
    },
    watch: {
      fields: {
        deep: true,
        handler(newFields) {
          this.loading = true;
          const country = newFields.country;
          const regions = newFields.regions.map(region => region?.value || region);

  
          if (country && regions) {
            // Check if user changed the country
            //And if the selected regions are in that country or not
            const filteredRegions = this.fieldConfig?.regions?.options?.reduce((acc, currRegion) => {
              
                if(currRegion.country === country &&  regions.includes(currRegion.value)){
                    acc = [...acc, currRegion]
                }
                return acc
            },[])
            // If the selected regions are not in that country, reset the value of field regions
            if(filteredRegions.length === 0 && regions.length > 0){
                this.fields.regions = []
            }

             this.updateZipOptions(country, regions);
          }
          if (newFields.delivery_type) {
            this.fieldConfig.delivery_emails.show = newFields.delivery_type === 'email';
          }
          this.loading = false;
        }
      }
    },
    methods: {
      updateFieldValue(key, value) {
        this.$set(this.fields, key, value);
        this.$set(this.errors, key, null); // Clear errors when field is updated
      },
      nextTab() {
        if (this.validateCurrentTab()) {
          this.activeTab = Math.min(this.activeTab + 1, this.totalTabs - 1);
        }
      },
      prevTab() {
        this.activeTab = Math.max(this.activeTab - 1, 0);
      },
      handleSubmit() {
        if (this.validateForm()) {
          // Handle the form submission logic here
          console.log("Form submitted:", this.fields);
        //   this.$bvToast.toast("Order Form submitted successfully!", {
        //     title: 'Order Form submitted successfully!',
        //     variant:"success",
        //     solid: true,
        //     autoHideDelay: 1000000
        // })
        window.alert("Order Form submitted successfully!")
        }
      },
      validateForm() {
        this.errors = {};
        return this.validateFields(this.getAllConfig());
      },
      validateCurrentTab() {
        this.errors = {};
        return this.validateFields(this.getCurrentConfig());
      },
      validateFields(config) {
        let valid = true;
  
        for (const key in config) {
          const value = this.fields[key];
          const validation = config[key].validation;
          if (validation) {
            if (validation.required && this.isFieldEmpty(value)) {
              this.$set(this.errors, key, 'This field is required.');
              valid = false;
            }
            if (validation.min !== undefined && value < validation.min) {
              this.$set(this.errors, key, `Minimum value is ${validation.min}.`);
              valid = false;
            }
            if (validation.max !== undefined && value > validation.max) {
              this.$set(this.errors, key, `Maximum value is ${validation.max}.`);
              valid = false;
            }
          }
        }
        return valid;
      },
      isFieldEmpty(value) {
        return value === undefined || value === null || (typeof value === 'string' && value.trim() === '');
      },
      getCurrentConfig() {
        const currentTab = this.tabs[this.activeTab];
        return this.filterConfig(currentTab.configKeys);
      },
      getAllConfig() {
        const allKeys = this.tabs.flatMap(tab => tab.configKeys);
        return this.filterConfig(allKeys);
      },
      filterConfig(keys) {
        return Object.fromEntries(
          Object.entries(this.fieldConfig).filter(([key]) => keys.includes(key) && this.fieldConfig[key]?.show !== false)
        );
      },
      updateZipOptions(country, regions) {
        const uniqueZips = new Set();
    
        // Check if country and regions are provided
        if (country && regions?.length > 0 && zipCodes[country]) {
            regions.forEach(region => {
            if (zipCodes[country][region]) {
                zipCodes[country][region].forEach(zip => uniqueZips.add(zip.zip));
            }
            });
        } else {
            // If country or regions are not provided, collect all zip codes
            Object.values(zipCodes).forEach(countries => {
            Object.values(countries).forEach(regions => {
                regions.forEach(zip => uniqueZips.add(zip.zip));
            });
            });
        }

        const zipOptions = Array.from(uniqueZips).map(zip => ({
            value: zip,
            text: zip
        }));
   

        // Update fieldConfig options
        this.fieldConfig['zips'].options = zipOptions;
        this.fieldConfig['excluded_zips'].options = zipOptions;
      }
    }
  };
  </script>
  
  <style scoped>
  .b-card-header {
    background-color: #f8f9fa;
  }
  
  .mt-4 {
    margin-top: 1.5rem;
  }
  .mr-4 {
    margin-right: 1.5rem;
  }
  
  .b-button {
    margin-right: 0.5rem;
  }
  </style>
  