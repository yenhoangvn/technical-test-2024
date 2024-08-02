<template>
    <div>
      <div class="mb-2">
        <span class="mr-2">{{ fieldLabel }}</span>
        <span v-if="helpText?.length > 0" v-b-tooltip.hover :title="helpText">
          <b-icon icon="info-circle" class="ml-2"></b-icon>
        </span>
      </div>
       <!-- Handle excluded_dates with a custom form -->
      <div v-if="fieldName === 'excluded_dates'" class="mb-3">
        <b-form-group>
          <b-form-datepicker v-model="newExcludedDate" placeholder="Select a date" />
          <b-button @click="addExcludedDate" variant="primary" class="mt-2">Add Date</b-button>
        </b-form-group>
        <b-list-group class="mt-3">
          <b-list-group-item
            v-for="(date, index) in inputValue"
            :key="index"
            class="d-flex justify-content-between align-items-center"
          >
            {{ formatDate(date) }}
            <b-button @click="removeExcludedDate(index)" variant="danger" size="sm">Remove</b-button>
          </b-list-group-item>
        </b-list-group>
      </div>
  
      <!-- Multiselect for other fields -->
      <b-form-group v-else-if="fieldMultiple" :state="!errors" class="mb-3">
        <multiselect
          v-model="inputValue"
          :options="fieldOptions"
          :multiple="true"
          :taggable="fieldName === 'delivery_emails' ? true : false"
          :label="fieldLabelBy"
          :track-by="fieldTrackBy"
          :placeholder="fieldPlaceHolder"
          :showNoOptions="fieldName === 'delivery_emails' ? false : true"
          @tag="addTag"
        ></multiselect>
         <small class="invalid" v-if="errors || customError">{{ errors || customError }}</small>
      </b-form-group>
  
      <!-- Other form fields -->
      <b-form-group v-else :state="!errors" class="form-group mb-3">        
        <component
          :is="fieldComponent"
          v-model="inputValue"
          :name="fieldName"
          :type="fieldType"
          :options="fieldOptions"
          :multiple="fieldMultiple"
          :placeholder="fieldPlaceHolder"
          :rows="fieldRows"
          :cols="fieldCols"
          :disabled="fieldDisabled"
          @input="emitInput"
          :state="!errors"
        >
          <!-- Options for select field -->
          <template v-if="fieldType === 'select'">
            <b-form-select v-model="inputValue" :options="fieldOptions" />
          </template>
        </component>
        <b-form-invalid-feedback v-if="errors">{{ errors }}</b-form-invalid-feedback>
      </b-form-group>
    
    </div>
  </template>
  
  <script>
  import {
    BFormInput,
    BFormTextarea,
    BFormSelect,
    BFormCheckbox,
    BFormRadio,
    BFormDatepicker,
    BFormTimepicker,
    BFormInvalidFeedback,
    BTooltip
  } from 'bootstrap-vue';
  import Multiselect from 'vue-multiselect';
  import 'vue-multiselect/dist/vue-multiselect.min.css';
  
  export default {
    name: 'FieldForm',
    components: {
      Multiselect,
      BFormInput,
      BFormTextarea,
      BFormSelect,
      BFormCheckbox,
      BFormRadio,
      BFormDatepicker,
      BFormTimepicker,
      BFormInvalidFeedback,
      BTooltip
    },
    props: {
      fieldPlaceHolder:{
        type: String,
        default: 'Select options'
      },
      fieldType: {
        type: String,
        required: true
      },
      fieldValue: {
        type: [String, Number, Array, Object, Boolean, Date],
        required: true
      },
      fieldName: {
        type: String,
        required: true
      },
      fieldLabel: {
        type: String,
        default: ''
      },
      fieldOptions: {
        type: Array,
        default: () => []
      },
      fieldMultiple: {
        type: Boolean,
        default: false
      },
      fieldLabelBy: {
        type: String,
        default: 'text'
      },
      fieldTrackBy: {
        type: String,
        default: 'value'
      },
      fieldRows: {
        type: Number,
        default: 3
      },
      fieldCols: {
        type: Number,
        default: 20
      },
      fieldDisabled: {
        type: Boolean,
        default: false
      },
      helpText: {
        type: String,
        default: ''
      },
      validation: {
        type: Object,
        default: () => ({})
      },
      errors: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        inputValue: this.formatFieldValue(this.fieldValue),
        newExcludedDate: null,
        customError:null
      };
    },
    computed: {
      fieldComponent() {
        switch (this.fieldType) {
          case 'text':
          case 'number':
          case 'password':
            return 'b-form-input';
          case 'textarea':
            return 'b-form-textarea';
          case 'select':
            return 'b-form-select';
          case 'checkbox':
            return 'b-form-checkbox';
          case 'radio':
            return 'b-form-radio';
          case 'date':
            return 'b-form-datepicker';
          case 'time':
            return 'b-form-timepicker';
          default:
            return 'b-form-input';
        }
      }
    },
    watch: {
      inputValue(newValue) {
        // Only emit input if the newValue differs from the previous value
        if (JSON.stringify(newValue) !== JSON.stringify(this.fieldValue)) {
          this.$emit('input', newValue);
        }
      },
      fieldValue(newValue) {
        // Only update inputValue if fieldValue has changed
        const formattedValue = this.formatFieldValue(newValue);
        if (JSON.stringify(formattedValue) !== JSON.stringify(this.inputValue)) {
          this.inputValue = formattedValue;
        }
      }
    },
    methods: {
      emitInput(value) {
        this.$emit('input', value);
      },
      formatFieldValue(value) {

        if (this.fieldMultiple && Array.isArray(value) && value.every(ele => typeof(ele)=== "string")) {
          // Convert array of strings to array of objects
          return this.fieldOptions.filter(item => value.includes(item[this.fieldTrackBy]));
        }
        return value;
      },
      formatDate(date) {
        // Convert date to a readable format
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      },
      addExcludedDate() {
        if (this.newExcludedDate) {
          this.inputValue.push(this.newExcludedDate);
          this.newExcludedDate = null;
        }
      },
      removeExcludedDate(index) {
        this.inputValue.splice(index, 1);
      },
      addTag (newTag) {
        const trimmedTag = newTag.trim(); // Trim whitespace

        // Validate email format using a simple regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailPattern.test(newTag);
        const existingOptions = [...this.inputValue]
        // Check if the tag is not empty and is a valid email
        if (isValidEmail) {
            if(!existingOptions.some(item => item.value === trimmedTag)){
                 // Add the tag if valid and not a duplicate
                const tag = {
                value: trimmedTag,
                text: trimmedTag
                }
                this.inputValue =  [...this.inputValue || [], tag]
            }
        } else {
            this.customError = 'Invalid email address provided!'
        }
    }
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles if necessary */
  .help-text {
    font-size: 0.875rem;
    color: #6c757d;
  }
  
  .mb-3 {
    margin-bottom: 1rem;
  }
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  .mr-2 {
    margin-right: 0.5rem;
  }
  .invalid{
    color: red;
  }
  </style>
  