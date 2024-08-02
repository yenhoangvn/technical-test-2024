import {countries} from "./countries"
import {regions} from "./regions"
// import {mockZipData} from "./zipcode"

// fieldConfig.js
export default {
  // id: { type: 'text', label: 'ID', validation: { required: true } },
  // title: { type: 'text', label: 'Title', validation: { required: true } },
  type: { 
    type: 'select', 
    label: 'Type', 
    options: [
      { value: 'raw', text: 'Raw Leads' },
      { value: 'qualified', text: 'Qualified Leads' }
    ], 
    validation: { required: true },
    helperText: "This is an example of a helper text that help user to understand better."
  },
  cpl: { type: 'number', label: 'CPL', validation: { required: true, min: 0 } },
  max_devalidation: { type: 'number', label: 'Max Devalidation', validation: { required: true, min: 0, max: 100 } },
  priority: { type: 'number', label: 'Priority', validation: { required: true, } },
  leads_max_age_raw: { type: 'number', label: 'Leads Max Age Raw', validation: { required: true, min: 0 } },
  leads_max_age_qualified: { type: 'number', label: 'Leads Max Age Qualified', validation: { required: true, min: 0 } },
  country: { type: 'select', label: 'Country',  options: countries,  validation: { required: true } },
  regions: { type: 'select', fieldMultiple:true, label: 'Regions', options: regions, labelBy:"text", trackBy: "value", internalSearch: true, validation: { required: true } },
  excluded_regions: { type: 'select',  fieldMultiple: true, label: 'Excluded Regions', options: regions },
  status: { type: 'select', label: 'Status',  options: [
    { value: 'active', text: 'Active' },
    { value: 'stopped', text: 'Stopped' }
  ], validation: { required: true } },
  zips: { type: 'select', fieldMultiple:true,  label: 'Zips', placeholder:"Enter a zipcode", options: [], labelBy:"text", trackBy: "value", internalSearch: false },
  excluded_zips: { type: 'text', fieldMultiple:true, options: [], labelBy:"text", trackBy: "value", label: 'Excluded Zips' },
  timezone: { type: 'text', label: 'Timezone', validation: { required: true } },
  starts_at: { type: 'datetime-local', label: 'Starts At', validation: { required: true } },
  ends_at: { type: 'datetime-local', label: 'Ends At', validation: { required: true } },
  excluded_dates: { type: 'text', label: 'Excluded Dates' },
  dc1: { type: 'number', label: 'Daily Cap Monday', validation: { required: true, min: 0 } },
  dc2: { type: 'number', label: 'Daily Cap Tuesday', validation: { required: true, min: 0 } },
  dc3: { type: 'number', label: 'Daily Cap Wednesday', validation: { required: true, min: 0 } },
  dc4: { type: 'number', label: 'Daily Cap Thursday', validation: { required: true, min: 0 } },
  dc5: { type: 'number', label: 'Daily Cap Friday', validation: { required: true, min: 0 } },
  dc6: { type: 'number', label: 'Daily Cap Saturday', validation: { required: true, min: 0 } },
  dc7: { type: 'number', label: 'Daily Cap Sunday', validation: { required: true, min: 0 } },
  monthly_cap: { type: 'number', label: 'Monthly Cap', validation: { required: true, min: -1 } },
  total_cap: { type: 'number', label: 'Total Cap', validation: { required: true, min: -1 } },
  delivery_type: { 
    type: 'select', 
    label: 'Delivery Type', 
    options: [
      { value: 'api', text: 'API' },
      { value: 'email', text: 'Email' }
    ],
    validation: { required: true }
  },
  delivery_emails: { type: 'select', placeholder: "Add an email", fieldMultiple: true, label: 'Delivery Emails', show: true,  validation: { required: true }}
};
