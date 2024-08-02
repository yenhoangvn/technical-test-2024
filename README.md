# test-assignment-2024
## Description
This is a (very) simplified crm page to create/edit orders. The app is in vue2. Order form is in src/components.  
In src/api folder there's an example of what you'g get from backend in case of editing. For this assignment let's think only of editing.
 
## Assignment
1. Add new fields to the form and add validation - you can find the list of fields and comments about them in src/api/orders.js. Assume backend already has them, and they will be filled with correct values 
2. Improve the overall ux of the form, make it more user-friendly

## Additional info 
The form is used by sales managers, who usually know the business well but are not very tech-savvy  
Managers place orders, set up all the parameters and then active orders buy leads according to it: 
order from this example would buy leads from Spain, Barcelona and Girona regions, excluding zip codes 08880 and 08870, only 10 per day. Order would not buy leads on Saturdays and Sundays and also on 13 June 2024 and 6 July 2024   
It is common to go to reports or leads pages and filter them by orders  

## Limitations 
Keep vue2, keep vue-bootstrap. You can add other packages, rearrange files in the project. If you do so, please, justify.

# How to install & run
```
npm i
npm run serve 
```
